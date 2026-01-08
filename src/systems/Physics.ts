/**
 * @author Petraller <me@petraller.com>
 */

import { Snowflake } from '../Snowflake';
import Body from '../nodes/Body';
import CircleCollider from '../nodes/CircleCollider';
import Collider from '../nodes/Collider';
import ConvexCollider from '../nodes/ConvexCollider';
import LineCollider from '../nodes/LineCollider'
import RigidBody from '../nodes/RigidBody';
import Bounds from '../structures/Bounds';
import ICopyable from '../structures/ICopyable';
import Vec2 from '../structures/Vec2';

class RBVec implements ICopyable {
    /** The positional component. */
    pos: Vec2 = Vec2.zero;
    /** The rotational component. */
    rot: number = 0;

    constructor(positional: Vec2, rotational: number) {
        this.pos = positional.copy();
        this.rot = rotational;
    }

    copy = () => new RBVec(this.pos, this.rot);

    /** The zero vector. */
    static get zero() { return new RBVec(Vec2.zero, 0); }
}

interface CollisionInput {
    /** Position of the collider. */
    position: Vec2;
    /** Velocity of the collider. */
    velocity: Vec2;
}
interface CircleInput extends CollisionInput {
    /** Radius of the collider. */
    radius: number;
}
interface LineSegmentInput extends CollisionInput {
    /** Direction offset of the collider. */
    direction: Vec2;
}

interface CollisionOutput {
    /** The depth of penetration if already intersecting this frame. */
    penetrationDepth: number;
    /** Whether colliders will intersect this frame. */
    willIntersect: boolean;
    /** Time to intersection. */
    intersectTime: number;
    /** Intersection point of first collider in world coordinates. */
    intersectPos1: Vec2;
    /** Intersection point of second collider in world coordinates. */
    intersectPos2: Vec2;
    /** Contact point of the colliders in world coordinates. */
    contactPos: Vec2;
    /** Normal to the contact point of the colliders in world coordinates. */
    contactNormal: Vec2;
}

type SnowflakePair = Snowflake;
function makeSnowflakePair(id1: Snowflake, id2: Snowflake) {
    if (id1 < id2)
        return id1 + '|' + id2;
    return id2 + '|' + id1;
}
function breakSnowflakePair(pair: SnowflakePair): [Snowflake, Snowflake] {
    const items = pair.split('|');
    return [items[0], items[1]];
}

/**
 * Static class for physics and collisions.
 */
export default class Physics {
    private static readonly PENETRATION_IMPULSE_STRENGTH = 100;
    private static singleton: Physics | null = null;
    private static bodies: Map<Snowflake, Body> = new Map<Snowflake, Body>();
    private static colliders: Map<Snowflake, Collider> = new Map<Snowflake, Collider>();
    private static bodyColliders: Map<Snowflake, Set<Snowflake>> = new Map<Snowflake, Set<Snowflake>>();
    private static colliderBodies: Map<Snowflake, Snowflake> = new Map<Snowflake, Snowflake>();
    private static pairsCollided: Set<SnowflakePair> = new Set<SnowflakePair>();

    // DEBUG
    debugContacts: Map<Vec2, number> = new Map<Vec2, number>();

    constructor() {
        if (Physics.singleton) {
            console.warn("Physics is used as a static class, do not create additional objects of Physics");
            return;
        }
        Physics.singleton = this;
    }

    tick(deltaTime: number) {
        // --- DYNAMICS ---

        for (const [_, body] of Physics.bodies) {
            if (!(body instanceof RigidBody))
                continue;

            // Gravity
            body.velocity = Vec2.add(body.velocity, Vec2.multiply(body.gravity, deltaTime / body.mass));

            // Drag
            body.velocity = Vec2.divide(body.velocity, body.drag + 1);
        }

        // --- COLLISION DETECTION ---

        type Collision = [Collider, Collider, CollisionOutput];
        let collisions: Collision[] = []; // all collisions this iteration
        let bodyCollisionCount: Map<Body, number> = new Map<Body, number>(); // number of collisions per body this iteration
        let bodyPairsCalled: Set<SnowflakePair> = new Set<SnowflakePair>(); // pairs of bodies triggered this iteration
        const collideBodies = (c1: Collider, c2: Collider, col: CollisionOutput) => {
            const b1 = Physics.bodies.get(Physics.colliderBodies.get(c1.id)!)!;
            const b2 = Physics.bodies.get(Physics.colliderBodies.get(c2.id)!)!;
            const pair = makeSnowflakePair(b1.id, b2.id);

            if (!bodyPairsCalled.has(pair)) {
                // Call collision enter callback
                if (!Physics.pairsCollided.has(pair)) {
                    Physics.pairsCollided.add(pair);
                    b1.onCollisionEnter?.call(b1, b2);
                    b2.onCollisionEnter?.call(b2, b1);
                }

                // Call collision update callback
                b1.onCollisionUpdate?.call(b1, b2);
                b2.onCollisionUpdate?.call(b2, b1);

                // Mark this pair as being called this frame
                bodyPairsCalled.add(pair);
            }

            // Register collision between bodies for resolution
            bodyCollisionCount.set(b1, (bodyCollisionCount.get(b1) ?? 0) + 1);
            bodyCollisionCount.set(b2, (bodyCollisionCount.get(b2) ?? 0) + 1);
            collisions.push([c1, c2, col]);

            // DEBUG
            if (col.willIntersect) {
                this.debugContacts.set(col.contactPos, 0);
            }
        }

        // Get colliders as array
        let colliders: Collider[] = Array.from(Physics.colliders.values());

        // Sort by min x
        colliders.sort((c1, c2) => c1.bounds.min.x - c2.bounds.min.x);

        // Iterate all colliders
        for (let i = 0; i < colliders.length; i++) {
            const ci = colliders[i];
            ci.globalTransform;
            ci.regenerate();
            const biid = Physics.colliderBodies.get(ci.id);
            if (biid === undefined) {
                Physics.colliders.delete(ci.id);
                continue;
            }
            const bi = Physics.bodies.get(biid);
            if (bi === undefined) {
                Physics.colliderBodies.delete(ci.id);
                continue;
            }
            for (let j = i + 1; j < colliders.length; j++) {
                const cj = colliders[j];
                cj.globalTransform;
                cj.regenerate();
                const bjid = Physics.colliderBodies.get(cj.id);
                if (bjid === undefined) {
                    Physics.colliders.delete(cj.id);
                    continue;
                }
                const bj = Physics.bodies.get(bjid);
                if (bj === undefined) {
                    Physics.colliderBodies.delete(cj.id);
                    continue;
                }

                // Same body
                if (bi.id === bj.id) {
                    continue;
                }

                // --- BROAD PHASE ---

                // Non-intersecting layers
                if (!ci.canCollideWith(cj)) {
                    continue;
                }

                // Extend bounds
                const bndi = Bounds.extend(ci.bounds, Vec2.multiply(bi.velocity, deltaTime));
                const bndj = Bounds.extend(cj.bounds, Vec2.multiply(bj.velocity, deltaTime));

                // X limits
                if (bndj.min.x > bndi.max.x) {
                    break;
                }

                // Y overlap
                if (bndi.max.y < bndj.min.y || bndi.min.y > bndj.max.y) {
                    continue;
                }

                // BB overlap
                if (!bndi.overlaps(bndj)) {
                    continue;
                }

                // --- NARROW PHASE ---

                if (ci instanceof CircleCollider && cj instanceof CircleCollider) {
                    // Circle-circle
                    const col = Physics.circleCircleIntersection({
                        position: ci.globalPosition,
                        velocity: Vec2.multiply(bi.velocity, deltaTime),
                        radius: ci.globalRadius
                    }, {
                        position: cj.globalPosition,
                        velocity: Vec2.multiply(bj.velocity, deltaTime),
                        radius: cj.globalRadius
                    });
                    if (col.penetrationDepth > 0 || col.willIntersect) {
                        collideBodies(ci, cj, col);
                    }
                    continue;
                }
                else if ((ci instanceof CircleCollider && cj instanceof LineCollider) ||
                    ci instanceof LineCollider && cj instanceof CircleCollider) {
                    // Circle-line
                    const ccircle = (ci instanceof CircleCollider ? ci : cj) as CircleCollider;
                    const cline = (ci instanceof LineCollider ? ci : cj) as LineCollider;
                    const bcircle = (ccircle == ci) ? bi : bj;
                    const bline = (cline == ci) ? bi : bj;
                    const col = Physics.circleLineSegmentIntersection({
                        position: ccircle.globalPosition,
                        velocity: Vec2.multiply(bcircle.velocity, deltaTime),
                        radius: ccircle.globalRadius
                    }, {
                        position: cline.globalPosition,
                        velocity: Vec2.multiply(bline.velocity, deltaTime),
                        direction: cline.globalDirection
                    });
                    if (col.penetrationDepth > 0 || col.willIntersect) {
                        collideBodies(ccircle, cline, col);
                    }
                    continue;
                }
                else if (ci instanceof ConvexCollider && cj instanceof ConvexCollider) {
                    // Polygon-polygon
                    // TODO
                    continue;
                }
                else if (
                    (ci instanceof CircleCollider && cj instanceof ConvexCollider) ||
                    (ci instanceof ConvexCollider && cj instanceof CircleCollider)) {
                    // Circle-polygon
                    // TODO
                    continue;
                }
            }
        }

        // Clear uncalled pairs
        for (const pair of Physics.pairsCollided.values()) {
            const [b1id, b2id] = breakSnowflakePair(pair);
            if (bodyPairsCalled.has(pair)) {
                continue;
            }
            Physics.pairsCollided.delete(pair);
            if (!Physics.bodies.has(b1id) || !Physics.bodies.get(b2id)) {
                continue;
            }
            const [b1, b2] = [Physics.bodies.get(b1id)!, Physics.bodies.get(b2id)!];
            b1.onCollisionExit?.call(b1, b2);
            b2.onCollisionExit?.call(b2, b1);
        }

        // --- COLLISION RESPONSE ---

        // Store next calculated values for each body
        type Cached = { pos: Vec2, vel: Vec2 };
        let cached: Map<Body, Cached> = new Map<Body, Cached>();
        for (const b of Physics.bodies.values()) {
            cached.set(b, {
                pos: b.globalPosition,
                vel: b.velocity
            });
        }

        // Solve collisions
        for (const collision of collisions) {
            const [c1, c2, col] = collision;
            const b1 = Physics.bodies.get(Physics.colliderBodies.get(c1.id)!)!;
            const b2 = Physics.bodies.get(Physics.colliderBodies.get(c2.id)!)!;
            let b1cache = cached.get(b1)!;
            let b2cache = cached.get(b2)!;

            // Only respond if both are RBs
            if (b1 instanceof RigidBody && b2 instanceof RigidBody) {
                // Mass splitting
                let [m1, m2] = [b1.mass / (bodyCollisionCount.get(b1) ?? 1), b2.mass / (bodyCollisionCount.get(b2) ?? 1)];

                // Infinite mass case
                if (b1.mass === Infinity && b2.mass === Infinity)
                    continue;

                const w = Physics.massToWeights(m1, m2);

                // Impulse response
                if (col.willIntersect) {
                    const restitution = (c1.restitution + c2.restitution) / 2;

                    // Magnitude of velocity in direction of normal
                    const [a1, a2] = [
                        Vec2.dot(Vec2.multiply(b1.velocity, deltaTime), col.contactNormal),
                        Vec2.dot(Vec2.multiply(b2.velocity, deltaTime), col.contactNormal)];

                    // Get calculated reflected velocities and position
                    const reflVel1 = Vec2.multiply(Vec2.add(Vec2.multiply(b1.velocity, deltaTime), Vec2.multiply(col.contactNormal, 2 * (a2 - a1) * w[0])), restitution);
                    const reflVel2 = Vec2.multiply(Vec2.add(Vec2.multiply(b2.velocity, deltaTime), Vec2.multiply(col.contactNormal, 2 * (a1 - a2) * w[1])), restitution);
                    const reflPos1 = Vec2.add(col.intersectPos1, Vec2.multiply(reflVel1, (1 - col.intersectTime)));
                    const reflPos2 = Vec2.add(col.intersectPos2, Vec2.multiply(reflVel2, (1 - col.intersectTime)));

                    // Offset of collider from body
                    const c1Off = Vec2.subtract(c1.globalPosition, b1.globalPosition);
                    const c2Off = Vec2.subtract(c2.globalPosition, b2.globalPosition);

                    // Accumulate deltas
                    let dp1 = Vec2.subtract(Vec2.subtract(reflPos1, c1Off), b1cache.pos);
                    let dp2 = Vec2.subtract(Vec2.subtract(reflPos2, c2Off), b2cache.pos);
                    let dv1 = Vec2.subtract(Vec2.divide(reflVel1, deltaTime), b1cache.vel);
                    let dv2 = Vec2.subtract(Vec2.divide(reflVel2, deltaTime), b2cache.vel);

                    b1cache.pos = Vec2.add(b1cache.pos, dp1);
                    b2cache.pos = Vec2.add(b2cache.pos, dp2);
                    b1cache.vel = Vec2.add(b1cache.vel, dv1);
                    b2cache.vel = Vec2.add(b2cache.vel, dv2);
                }

                // Penetration response
                if (col.penetrationDepth > 0) {
                    b1cache.vel = Vec2.add(b1cache.vel, Vec2.multiply(col.contactNormal, Physics.PENETRATION_IMPULSE_STRENGTH * col.penetrationDepth * w[0]));
                    b2cache.vel = Vec2.add(b2cache.vel, Vec2.multiply(col.contactNormal, -Physics.PENETRATION_IMPULSE_STRENGTH * col.penetrationDepth * w[1]));
                }

                // Normal response
                b1cache.pos = Vec2.add(b1cache.pos, Vec2.multiply(col.contactNormal, (1 + col.penetrationDepth) * w[0] * deltaTime));
                b2cache.pos = Vec2.add(b2cache.pos, Vec2.multiply(col.contactNormal, -(1 + col.penetrationDepth) * w[1] * deltaTime));
            }
        }

        // --- PHYSICS RESOLUTION ---

        for (const [body, next] of cached) {
            body.velocity = next.vel;
            body.globalPosition = Vec2.add(next.pos, Vec2.multiply(next.vel, deltaTime));
        }
    }

    static registerBody(body: Body) {
        if (Physics.bodies.has(body.id) || Physics.bodyColliders.has(body.id)) {
            console.error(`Body #${body.id} already registered in physics system`);
            return;
        }
        Physics.bodies.set(body.id, body);
        Physics.bodyColliders.set(body.id, new Set<Snowflake>);
    }

    static deregisterBody(body: Body) {
        for (const col of Physics.bodyColliders.get(body.id) ?? []) {
            Physics.colliderBodies.delete(col);
        }
        Physics.bodies.delete(body.id);
        Physics.bodyColliders.delete(body.id);
    }

    static registerCollider(collider: Collider, owner: Body) {
        if (Physics.colliders.has(collider.id) || Physics.colliderBodies.has(collider.id)) {
            console.error(`Collider #${owner.id} already registered in physics system`);
            return;
        }
        if (!Physics.bodies.has(owner.id)) {
            console.error(`Body #${owner.id} not registered in physics system`);
            return;
        }
        if (Physics.bodyColliders.get(owner.id)?.has(collider.id) || Physics.colliderBodies.has(collider.id)) {
            console.warn(`Collider #${collider.id} already registered with body #${Physics.colliderBodies.get(collider.id)} in physics system`);
            return;
        }
        Physics.colliders.set(collider.id, collider);
        Physics.colliderBodies.set(collider.id, owner.id);
        Physics.bodyColliders.get(owner.id)?.add(collider.id);
    }

    static deregisterCollider(collider: Collider) {
        Physics.bodyColliders.get(Physics.colliderBodies.get(collider.id) ?? "")?.delete(collider.id);
        Physics.colliders.delete(collider.id);
        Physics.colliderBodies.delete(collider.id);
    }

    private static circleLineSegmentIntersection(c1: CircleInput, c2: LineSegmentInput) {
        let output: CollisionOutput = {
            penetrationDepth: 0,
            willIntersect: false,
            intersectTime: 0,
            intersectPos1: Vec2.zero,
            intersectPos2: Vec2.zero,
            contactPos: Vec2.zero,
            contactNormal: Vec2.zero,
        };

        // Line properties
        const lineStart = Vec2.subtract(c2.position, c2.direction);
        const lineMid = c2.position.copy();
        const lineEnd = Vec2.add(c2.position, c2.direction);
        const lineDirNorm = c2.direction.normalized;
        const lineNormal = c2.direction.normal.normalized;

        // Relative vel of 1 from 2
        const relVel = Vec2.subtract(c1.velocity, c2.velocity);

        // Parallel distance along line
        const d = Vec2.dot(Vec2.subtract(c1.position, c2.position), lineDirNorm);

        // Closest point on line
        const cpline = Vec2.add(c2.position, Vec2.multiply(lineDirNorm, Math.clamp(d, -c2.direction.length, c2.direction.length)));
        output.contactNormal = Vec2.subtract(c1.position, cpline).normalized;
        output.penetrationDepth = Math.max(c1.radius - Vec2.subtract(c1.position, cpline).length, 0);

        // Zero relative velocity
        if (relVel.sqrLength === 0) {
            return output;
        }

        function lineEdgeCase(withinBothLines: boolean) {
            // Relative vel normal
            const relVelN = relVel.normal.normalized;

            let closer: Vec2 = lineEnd;
            let dist: number = 0;

            if (withinBothLines) {
                // Closer to start
                if (Vec2.dot(Vec2.subtract(c1.position, lineMid), c2.direction) < 0) {
                    closer = lineStart;
                }
                // Closer to end
                else {
                    closer = lineEnd;
                }

                dist = Vec2.dot(Vec2.subtract(closer, c1.position), relVelN);
            }
            else {
                // Perpendicular distance to start, end
                const dStart = Vec2.dot(Vec2.subtract(lineStart, c1.position), relVelN);
                const dEnd = Vec2.dot(Vec2.subtract(lineEnd, c1.position), relVelN);
                const dStartAbs = Math.abs(dStart);
                const dEndAbs = Math.abs(dEnd);

                dist = dEnd;

                // No collision
                if (dStartAbs > c1.radius && dEndAbs > c1.radius) {
                    return output;
                }
                // Two possible collisions
                else if (dStartAbs <= c1.radius && dEndAbs <= c1.radius) {
                    // V distance to start, end
                    const m0 = Vec2.dot(Vec2.subtract(lineStart, c1.position), relVel);
                    const m1 = Vec2.dot(Vec2.subtract(lineEnd, c1.position), relVel);
                    const m0Abs = Math.abs(m0);
                    const m1Abs = Math.abs(m1);

                    // Closer to start
                    if (m0Abs < m1Abs) {
                        closer = lineStart;
                        dist = dStart;
                    }
                }
                // Start possible collision only
                else if (dStartAbs <= c1.radius) {
                    closer = lineStart;
                    dist = dStart;
                }
                // Else end possible collision only
            }

            // Delta from start to CPA
            const m = Vec2.dot(Vec2.subtract(closer, c1.position), relVel.normalized);
            if (m <= 0)
                return;

            // Delta from collision pt to CPA
            const s = Math.sqrt(c1.radius * c1.radius - dist * dist);
            if (Math.abs(dist) > c1.radius)
                return;

            // Time to intersect
            const it = (m - s) / relVel.length;

            if (it >= 0 && it <= 1) {
                output.willIntersect = true;
                output.intersectTime = it;
                output.intersectPos1 = Vec2.add(c1.position, Vec2.multiply(c1.velocity, output.intersectTime));
                output.intersectPos2 = Vec2.add(c2.position, Vec2.multiply(c2.velocity, output.intersectTime));
                output.contactPos = closer.copy();
            }
        }

        // Signed distance of circle from line segment
        const sd = Vec2.dot(lineNormal, Vec2.subtract(c1.position, c2.position));
        if (sd > -c1.radius && sd < c1.radius) {
            // Circle between distant lines
            lineEdgeCase(true);
        }
        else {
            let extrudeFn = (pos: Vec2) => pos.copy();
            let itFn = () => -1;
            let contactFn = (ipos1: Vec2) => ipos1.copy();

            // Circle in inner half plane opposite direction of normal
            if (sd <= -c1.radius) {
                extrudeFn = (pos: Vec2) => Vec2.subtract(pos, Vec2.multiply(lineNormal, c1.radius));
                itFn = () => -(sd + c1.radius) / Vec2.dot(lineNormal, relVel);
                contactFn = (ipos1: Vec2) => Vec2.add(ipos1, Vec2.multiply(lineNormal, c1.radius));
            }
            // Circle in outer half plane in direction of normal
            else if (sd >= c1.radius) {
                extrudeFn = (pos: Vec2) => Vec2.add(pos, Vec2.multiply(lineNormal, c1.radius));
                itFn = () => -(sd - c1.radius) / Vec2.dot(lineNormal, relVel);
                contactFn = (ipos1: Vec2) => Vec2.subtract(ipos1, Vec2.multiply(lineNormal, c1.radius));
            }

            // Extrude points
            const pStart = extrudeFn(lineStart);
            const pEnd = extrudeFn(lineEnd);

            // Moving into segment
            if (Vec2.dot(relVel.normal, Vec2.subtract(pStart, c1.position))
                * Vec2.dot(relVel.normal, Vec2.subtract(pEnd, c1.position)) < 0) {
                // Perpendicular distance / perpendicular velocity
                // = Time to intersect
                const it = itFn();

                if (it >= 0 && it <= 1) {
                    output.willIntersect = true;
                    output.intersectTime = it;
                    output.intersectPos1 = Vec2.add(c1.position, Vec2.multiply(c1.velocity, output.intersectTime));
                    output.intersectPos2 = Vec2.add(c2.position, Vec2.multiply(c2.velocity, output.intersectTime));
                    output.contactPos = contactFn(output.intersectPos1);
                }
            }
            // Moving out of segment
            else {
                lineEdgeCase(false);
            }
        }
        return output;
    }

    private static circleCircleIntersection(c1: CircleInput, c2: CircleInput) {
        let output: CollisionOutput = {
            penetrationDepth: 0,
            willIntersect: false,
            intersectTime: 0,
            intersectPos1: Vec2.zero,
            intersectPos2: Vec2.zero,
            contactPos: Vec2.zero,
            contactNormal: Vec2.subtract(c1.position, c2.position).normalized,
        };

        // Relative circle radius
        const relCircleRadius = c1.radius + c2.radius;

        // Relative position of 1 from 2
        const relPos = Vec2.subtract(c1.position, c2.position);
        output.penetrationDepth = Math.max(relCircleRadius - relPos.length, 0);

        // Relative vel of 1 from 2
        const relVel = Vec2.subtract(c1.velocity, c2.velocity);

        // Zero relative velocity
        if (relVel.sqrLength === 0) {
            return output;
        }

        // Convert to ray-circle problem
        const relRayPos = c1.position.copy();
        const relRayVel = relVel.copy();
        const relCirclePos = c2.position.copy();

        // Distance squared
        const distSqr = Vec2.subtract(relRayPos, relCirclePos).sqrLength;

        // Ray length
        const rl = relRayVel.length;

        // Delta from start to CPA
        const m = Vec2.dot(Vec2.subtract(relCirclePos, relRayPos), relRayVel.normalized);

        // CPA
        const nSqr = distSqr - m * m;
        if (nSqr > relCircleRadius * relCircleRadius)
            return output;

        // Delta from collision point to CPA
        const s = Math.sqrt(relCircleRadius * relCircleRadius - nSqr);

        // Time to intersect
        const it = (m - s) / rl;
        if (it >= 0 && it <= 1) {
            output.willIntersect = true;
            output.intersectTime = it;
            output.intersectPos1 = Vec2.add(c1.position, Vec2.multiply(c1.velocity, output.intersectTime));
            output.intersectPos2 = Vec2.add(c2.position, Vec2.multiply(c2.velocity, output.intersectTime));
            output.contactPos = Vec2.lerp(output.intersectPos1, output.intersectPos2, c1.radius / (c1.radius + c2.radius));
            output.contactNormal = Vec2.subtract(output.intersectPos1, output.intersectPos2).normalized;
        }
        return output;
    }

    private static massToWeights(m1: number, m2: number) {
        return [
            m2 < Infinity ? (m2 / (m1 + m2)) : 1,
            m1 < Infinity ? (m1 / (m1 + m2)) : 1
        ];
    }
}
