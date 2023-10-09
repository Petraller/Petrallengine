/**
 * @author Petraller <me@petraller.com>
 */

import { Snowflake } from '../Snowflake';
import Game from '../Game';
import Body from '../nodes/Body';
import CircleCollider from '../nodes/CircleCollider';
import Collider from '../nodes/Collider';
import ConvexCollider from '../nodes/ConvexCollider';
import LineCollider from '../nodes/LineCollider'
import RigidBody from '../nodes/RigidBody';
import Bounds from '../structures/Bounds';
import Vec2 from '../structures/Vec2';

interface CollisionInfo {
    isIntersecting: boolean,
    willIntersect: boolean,
    intersectTime: number,
    intersectPos1: Vec2,
    intersectPos2: Vec2,
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
    private static readonly PENETRATION_IMPULSE_STRENGTH = 10;
    private static singleton: Physics | null = null;
    private static bodies: Map<Snowflake, Body> = new Map<Snowflake, Body>();
    private static colliders: Map<Snowflake, Collider> = new Map<Snowflake, Collider>();
    private static bodyColliders: Map<Snowflake, Set<Snowflake>> = new Map<Snowflake, Set<Snowflake>>();
    private static colliderBodies: Map<Snowflake, Snowflake> = new Map<Snowflake, Snowflake>();
    private static pairsCollided: Set<SnowflakePair> = new Set<SnowflakePair>();

    constructor() {
        if (Physics.singleton) {
            console.warn("Physics is used as a static class, do not create additional objects of Physics");
            return;
        }
        Physics.singleton = this;
    }

    tick() {
        // --- COLLISION DETECTION ---

        type Collision = [Collider, Collider, CollisionInfo];
        let collisions: Collision[] = []; // all collisions this iteration
        let bodyCollisionCount: Map<Body, number> = new Map<Body, number>(); // number of collisions per body this iteration
        let bodyPairsCalled: Set<SnowflakePair> = new Set<SnowflakePair>(); // pairs of bodies triggered this iteration
        function collideBodies(c1: Collider, c2: Collider, col: CollisionInfo) {
            const b1 = Physics.bodies.get(Physics.colliderBodies.get(c1.id)!)!;
            const b2 = Physics.bodies.get(Physics.colliderBodies.get(c2.id)!)!;
            const pair = makeSnowflakePair(b1.id, b2.id);

            if (!bodyPairsCalled.has(pair)) {
                // Callbacks
                if (!Physics.pairsCollided.has(pair)) {
                    // Call collision enter callback
                    Physics.pairsCollided.add(pair);
                    b1.onCollisionEnter?.call(b1, b2);
                    b2.onCollisionEnter?.call(b2, b1);
                }
                else {
                    // Call collision update callback
                    b1.onCollisionUpdate?.call(b1, b2);
                    b2.onCollisionUpdate?.call(b2, b1);
                }

                // Mark this pair as being called this frame
                bodyPairsCalled.add(pair);
            }

            // Register collision between bodies for resolution
            bodyCollisionCount.set(b1, (bodyCollisionCount.get(b1) ?? 0) + 1);
            bodyCollisionCount.set(b2, (bodyCollisionCount.get(b2) ?? 0) + 1);
            collisions.push([c1, c2, col]);
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
            const bi = Physics.bodies.get(Physics.colliderBodies.get(ci.id)!)!;
            for (let j = i + 1; j < colliders.length; j++) {
                const cj = colliders[j];
                ci.globalTransform;
                cj.regenerate();
                const bj = Physics.bodies.get(Physics.colliderBodies.get(cj.id)!)!;

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
                const bndi = Bounds.extend(ci.bounds, Vec2.multiply(bi.velocity, Game.deltaTime));
                const bndj = Bounds.extend(cj.bounds, Vec2.multiply(bj.velocity, Game.deltaTime));

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
                    const col = Physics.circleCircleIntersection(
                        ci.globalPosition, Vec2.multiply(bi.velocity, Game.deltaTime), Vec2.dot(Vec2.half, ci.globalScale) * ci.radius,
                        cj.globalPosition, Vec2.multiply(bj.velocity, Game.deltaTime), Vec2.dot(Vec2.half, cj.globalScale) * cj.radius);
                    if (col.isIntersecting || col.willIntersect) {
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
                    const col = Physics.circleLineSegmentIntersection(
                        ccircle.globalPosition, Vec2.dot(Vec2.half, ccircle.globalScale) * ccircle.radius, Vec2.multiply(bcircle.velocity, Game.deltaTime),
                        Vec2.transform(cline.globalTransform, cline.start), Vec2.transform(cline.globalTransform, cline.end));
                    if (col.isIntersecting || col.willIntersect) {
                        collideBodies(ci, cj, col);
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
            const [b1, b2] = [Physics.bodies.get(b1id)!, Physics.bodies.get(b2id)!];
            Physics.pairsCollided.delete(pair);
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
                // Impulse response
                if (col.willIntersect) {
                    // Mass splitting
                    const [m1, m2] = [b1.mass / (bodyCollisionCount.get(b1) ?? 1), b2.mass / (bodyCollisionCount.get(b2) ?? 1)];

                    const normal = Vec2.subtract(col.intersectPos1, col.intersectPos2).normalized;
                    const res = Physics.response(normal, col.intersectTime,
                        Vec2.multiply(b1.velocity, Game.deltaTime), m1, col.intersectPos1,
                        Vec2.multiply(b2.velocity, Game.deltaTime), m2, col.intersectPos2);
                    const c1Off = Vec2.subtract(c1.globalPosition, b1.globalPosition);
                    const c2Off = Vec2.subtract(c2.globalPosition, b2.globalPosition);
                    // b1.velocity = Vec2.divide(res.reflVel1, Game.deltaTime);
                    // b2.velocity = Vec2.divide(res.reflVel2, Game.deltaTime);
                    // cached.get(b1)!.pos = Vec2.subtract(res.reflPos1, c1Off);
                    // cached.get(b2)!.pos = Vec2.subtract(res.reflPos2, c2Off);

                    // Accumulate deltas
                    let dp1 = Vec2.subtract(Vec2.subtract(res.reflPos1, c1Off), b1cache.pos);
                    let dp2 = Vec2.subtract(Vec2.subtract(res.reflPos2, c2Off), b2cache.pos);
                    let dv1 = Vec2.subtract(Vec2.divide(res.reflVel1, 2 * Game.deltaTime), b1cache.vel);
                    let dv2 = Vec2.subtract(Vec2.divide(res.reflVel2, 2 * Game.deltaTime), b2cache.vel);

                    b1cache.pos = Vec2.add(b1cache.pos, dp1);
                    b2cache.pos = Vec2.add(b2cache.pos, dp2);
                    b1cache.vel = Vec2.add(b1cache.vel, dv1);
                    b2cache.vel = Vec2.add(b2cache.vel, dv2);
                }

                // Penetration response
                if (col.isIntersecting) {
                    const normal = Vec2.subtract(c1.globalPosition, c2.globalPosition).normalized;
                    const w = Physics.massToWeights(b1.mass, b2.mass);
                    b1cache.vel = Vec2.add(b1cache.vel, Vec2.multiply(normal, Physics.PENETRATION_IMPULSE_STRENGTH * w[0]));
                    b2cache.vel = Vec2.add(b2cache.vel, Vec2.multiply(normal, -Physics.PENETRATION_IMPULSE_STRENGTH * w[1]));
                }
            }
        }

        // --- DYNAMICS ---

        for (const [body, next] of cached) {
            body.velocity = next.vel;
            body.globalPosition = Vec2.add(next.pos, Vec2.multiply(next.vel, Game.deltaTime));
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

    private static circleLineSegmentIntersection(
        posCircle: Vec2,
        radiusCircle: number,
        velCircle: Vec2,
        posLine1: Vec2,
        posLine2: Vec2) {
        let output: CollisionInfo = {
            isIntersecting: true,
            willIntersect: false,
            intersectTime: 0,
            intersectPos1: Vec2.zero,
            intersectPos2: Vec2.zero,
        };

        // Line normal
        const lineNormal = Vec2.subtract(posLine2, posLine1).normal.normalized;

        // N.(Bs - P0) <= -r
        // Circle in inner half plane
        const hp = Vec2.dot(lineNormal, Vec2.subtract(posCircle, posLine1));
        if (hp <= -radiusCircle) {
            // Extrude points
            const p0 = Vec2.subtract(posLine1, Vec2.multiply(lineNormal, radiusCircle));
            const p1 = Vec2.subtract(posLine2, Vec2.multiply(lineNormal, radiusCircle));

            // Moving into segment
            if (Vec2.dot(velCircle.normal, Vec2.subtract(p0, posCircle))
                * Vec2.dot(velCircle.normal, Vec2.subtract(p1, posCircle)) < 0) {
                // Perpendicular distance / perpendicular velocity
                // = Time to intersect
                const it = (Vec2.dot(lineNormal, Vec2.subtract(posLine1, posCircle)) - radiusCircle)
                    / Vec2.dot(lineNormal, velCircle);

                if (it >= 0 && it <= 1) {
                    output.willIntersect = true;
                    output.intersectTime = it;

                    // Current pos + displacement to intersect
                    // = Pos of intersect
                    output.intersectPos1 = Vec2.add(posCircle, Vec2.multiply(velCircle, output.intersectTime));
                    output.intersectPos2 = output.intersectPos1.copy();

                    return output;
                }
            }
            // Moving out of segment
            else {
                return Physics.circleLineEdgeIntersection(
                    false,
                    posCircle,
                    radiusCircle,
                    velCircle,
                    posLine1,
                    posLine2);
            }
        }
        // N.(Bs - P0) >= r
        // Circle in outer half plane
        else if (hp >= radiusCircle) {
            // Extrude points
            const p0 = Vec2.add(posLine1, Vec2.multiply(lineNormal, radiusCircle));
            const p1 = Vec2.add(posLine2, Vec2.multiply(lineNormal, radiusCircle));

            // Moving into segment
            if (Vec2.dot(velCircle.normal, Vec2.subtract(p0, posCircle))
                * Vec2.dot(velCircle.normal, Vec2.subtract(p1, posCircle)) < 0) {
                // Perpendicular distance / perpendicular velocity
                // = Time to intersect
                const it = (Vec2.dot(lineNormal, Vec2.subtract(posLine1, posCircle)) + radiusCircle)
                    / Vec2.dot(lineNormal, velCircle);

                if (it >= 0 && it <= 1) {
                    output.willIntersect = true;
                    output.intersectTime = it;

                    // Current pos + displacement to intersect
                    // = Pos of intersect
                    output.intersectPos1 = Vec2.add(posCircle, Vec2.multiply(velCircle, output.intersectTime));
                    output.intersectPos2 = output.intersectPos1.copy();

                    return output;
                }
            }
            // Moving out of segment
            else {
                return Physics.circleLineEdgeIntersection(
                    false,
                    posCircle,
                    radiusCircle,
                    velCircle,
                    posLine1,
                    posLine2);
            }
        }
        else {
            // Circle between distant lines
            output = Physics.circleLineEdgeIntersection(
                true,
                posCircle,
                radiusCircle,
                velCircle,
                posLine1,
                posLine2);

            // Parallel distance along line
            const d = Vec2.dot(Vec2.subtract(posLine1, posCircle), Vec2.subtract(posLine2, posLine1).normalized);

            // Overlap line segment
            if (d >= -radiusCircle && d <= Vec2.subtract(posLine2, posLine1).length + radiusCircle)
                output.isIntersecting = true;
        }
        return output;
    }

    private static circleLineEdgeIntersection(
        withinBothLines: boolean,
        posCircle: Vec2,
        radiusCircle: number,
        velCircle: Vec2,
        posLine1: Vec2,
        posLine2: Vec2) {
        let output: CollisionInfo = {
            isIntersecting: false,
            willIntersect: false,
            intersectTime: 0,
            intersectPos1: Vec2.zero,
            intersectPos2: Vec2.zero,
        };

        if (withinBothLines) {
            // Closer to pos1
            if (Vec2.dot(Vec2.subtract(posLine1, posCircle), Vec2.subtract(posLine2, posLine1)) > 0) {
                // Delta from start to CPA
                const m = Vec2.dot(Vec2.subtract(posLine1, posCircle), velCircle) / velCircle.length;
                if (m <= 0)
                    return output;

                // CPA
                const dist = Vec2.dot(Vec2.subtract(posLine1, posCircle), velCircle.normal.normalized);
                if (Math.abs(dist) > radiusCircle)
                    return output;

                // Delta from collision pt to CPA
                const s = Math.sqrt(radiusCircle * radiusCircle - dist * dist);

                // Time to intersect
                const it = (m - s) / velCircle.length;

                if (it <= 1) {
                    output.willIntersect = true;
                    output.intersectTime = it;

                    // Current pos + displacement to intersect
                    // = Pos of intersect
                    output.intersectPos1 = Vec2.add(posCircle, Vec2.multiply(velCircle, output.intersectTime));
                    output.intersectPos2 = output.intersectPos1.copy();

                    return output;
                }
            }
            // Closer to pos2
            else {
                // Delta from start to CPA
                const m = Vec2.dot(Vec2.subtract(posLine2, posCircle), velCircle) / velCircle.length;
                if (m <= 0)
                    return output;

                // CPA
                const dist = Vec2.dot(Vec2.subtract(posLine2, posCircle), velCircle.normal.normalized);
                if (Math.abs(dist) > radiusCircle)
                    return output;

                // Delta from collision pt to CPA
                const s = Math.sqrt(radiusCircle * radiusCircle - dist * dist);

                // Time to intersect
                const it = (m - s) / velCircle.length;

                if (it <= 1) {
                    output.willIntersect = true;
                    output.intersectTime = it;

                    // Current pos + displacement to intersect
                    // = Pos of intersect
                    output.intersectPos1 = Vec2.add(posCircle, Vec2.multiply(velCircle, output.intersectTime));
                    output.intersectPos2 = output.intersectPos1.copy();

                    return output;
                }
            }
        }
        else {
            let p0Side = false;

            // Perpendicular distance to p0, p1
            const d0 = Vec2.dot(Vec2.subtract(posLine1, posCircle), velCircle.normal.normalized);
            const d1 = Vec2.dot(Vec2.subtract(posLine2, posCircle), velCircle.normal.normalized);
            const d0Abs = Math.abs(d0);
            const d1Abs = Math.abs(d1);

            // No collision
            if (d0Abs > radiusCircle && d1Abs > radiusCircle)
                return output;
            // Two possible collisions
            else if (d0Abs <= radiusCircle && d1Abs <= radiusCircle) {
                // V distance to p0, p1
                const m0 = Vec2.dot(Vec2.subtract(posLine1, posCircle), velCircle);
                const m1 = Vec2.dot(Vec2.subtract(posLine2, posCircle), velCircle);
                const m0Abs = Math.abs(m0);
                const m1Abs = Math.abs(m1);

                // Closer to p0
                if (m0Abs < m1Abs)
                    p0Side = true;
            }
            // p0 possible collision only
            else if (d0Abs <= radiusCircle)
                p0Side = true;
            // Else p1 possible collision only

            if (p0Side) {
                // Delta from start to CPA
                const m = Vec2.dot(Vec2.subtract(posLine1, posCircle), velCircle) / velCircle.length;
                if (m <= 0)
                    return output;

                // Delta from collision pt to CPA
                const s = Math.sqrt(radiusCircle * radiusCircle - d0 * d0);

                // Time to intersect
                const it = (m - s) / velCircle.length;

                if (it <= 1) {
                    output.willIntersect = true;
                    output.intersectTime = it;

                    // Current pos + displacement to intersect
                    // = Pos of intersect
                    output.intersectPos1 = Vec2.add(posCircle, Vec2.multiply(velCircle, output.intersectTime));
                    output.intersectPos2 = output.intersectPos1.copy();

                    return output;
                }
            }
            else {
                // Delta from start to CPA
                const m = Vec2.dot(Vec2.subtract(posLine2, posCircle), velCircle) / velCircle.length;
                if (m <= 0)
                    return output;

                // Delta from collision pt to CPA
                const s = Math.sqrt(radiusCircle * radiusCircle - d1 * d1);

                // Time to intersect
                const it = (m - s) / velCircle.length;

                if (it <= 1) {
                    output.willIntersect = true;
                    output.intersectTime = it;

                    // Current pos + displacement to intersect
                    // = Pos of intersect
                    output.intersectPos1 = Vec2.add(posCircle, Vec2.multiply(velCircle, output.intersectTime));
                    output.intersectPos2 = output.intersectPos1.copy();

                    return output;
                }
            }
        }

        return output;
    }

    // private static circleLineSegmentResponse(
    //     normal: Vec2,
    //     intersectPos: Vec2,
    //     vel: Vec2) {
    //     let output = {
    //         reflVel: Vec2.zero,
    //         reflPos: Vec2.zero,
    //     };

    //     output.reflVel = Vec2.subtract(vel, Vec2.multiply(normal, 2 * Vec2.dot(vel, normal)));
    //     output.reflPos = Vec2.add(intersectPos, output.reflVel);
    //     return output;
    // }

    private static circleCircleIntersection(
        pos1: Vec2, vel1: Vec2, radius1: number,
        pos2: Vec2, vel2: Vec2, radius2: number) {
        let output: CollisionInfo = {
            isIntersecting: false,
            willIntersect: false,
            //isInterior: false,
            intersectTime: 0,
            intersectPos1: Vec2.zero,
            intersectPos2: Vec2.zero,
        };

        // Relative position of 1 from 2
        const relPos = Vec2.subtract(pos1, pos2);
        output.isIntersecting = relPos.sqrLength <= (radius1 + radius2) * (radius1 + radius2);

        // Relative vel of 1 from 2
        const relvel = Vec2.subtract(vel1, vel2);

        // Zero relative velocity
        if (relvel.sqrLength === 0) {
            output.willIntersect = output.isIntersecting;
            return output;
        }

        // Relative ray
        const relRayPos = pos1.copy();
        const relRayVel = relvel;

        // Check if interior or exterior intersection
        //output.isInterior = (relPos.sqrLength < (radius1 - radius2) * (radius1 - radius2));
        // if (!output.isInterior && relPos.sqrLength < (radius1 + radius2) * (radius1 + radius2)) {
        //     // Overlapping circles, I don't care about this case
        //     return output;
        // }

        // Relative circle
        const relCirclePos = pos2.copy();
        const relCircleRadius = /*output.isInterior ? Math.abs((radius1 - radius2)) :*/ radius1 + radius2;

        // Ray-circle
        const col = Physics.rayStaticCircleIntersection(relRayPos, relRayVel, relCirclePos, relCircleRadius);

        // Intersection points
        if (col.willIntersect) {
            output.willIntersect = col.willIntersect;
            output.intersectTime = col.intersectTime;
            output.intersectPos1 = Vec2.add(pos1, Vec2.multiply(vel1, col.intersectTime));
            output.intersectPos2 = Vec2.add(pos2, Vec2.multiply(vel2, col.intersectTime));
        }
        return output;
    }

    private static rayStaticCircleIntersection(posRay: Vec2, velRay: Vec2, posCircle: Vec2, radius: number) {
        let output: CollisionInfo = {
            isIntersecting: false,
            willIntersect: false,
            //isInterior: false,
            intersectTime: 0,
            intersectPos1: Vec2.zero,
            intersectPos2: Vec2.zero,
        };

        // Distance squared
        const distSqr = Vec2.subtract(posRay, posCircle).sqrLength;

        // Check if interior or exterior ray
        //output.isInterior = (distSqr < radius * radius);

        // Ray length
        const rl = velRay.length;

        // Delta from start to CPA
        const m = Vec2.dot(Vec2.subtract(posCircle, posRay), velRay.normalized);
        // if (!output.isInterior && m < 0 && distSqr > radius * radius)
        //     return output;

        // CPA
        const nSqr = distSqr - m * m;
        if (nSqr > radius * radius)
            return output;

        // Delta from collision point to CPA
        const s = Math.sqrt(radius * radius - nSqr);

        // Time to intersect
        const it = /*output.isInterior
            ? ((m + s) / rl)
            :*/ ((m - s) / rl);

        if (it >= 0 && it <= 1) {
            output.isIntersecting = distSqr <= radius * radius;
            output.willIntersect = true;
            output.intersectTime = it;
            output.intersectPos1 = Vec2.add(posRay, Vec2.multiply(velRay, output.intersectTime));
            output.intersectPos1 = posCircle;
        }

        return output;
    }

    private static response(
        normal: Vec2, intersectTime: number,
        vel1: Vec2, mass1: number, intersectPos1: Vec2,
        vel2: Vec2, mass2: number, intersectPos2: Vec2) {
        let output = {
            reflVel1: Vec2.zero,
            reflVel2: Vec2.zero,
            reflPos1: Vec2.zero,
            reflPos2: Vec2.zero,
        };

        // Magnitude of velocity in direction of normal
        const a1 = Vec2.dot(vel1, normal);
        const a2 = Vec2.dot(vel2, normal);

        // Factor of normal to add
        const w = Physics.massToWeights(mass1, mass2);
        const f1 = -2 * (a1 - a2) * w[0];
        const f2 = +2 * (a1 - a2) * w[1];

        output.reflVel1 = Vec2.add(vel1, Vec2.multiply(normal, f1));
        output.reflVel2 = Vec2.add(vel2, Vec2.multiply(normal, f2));
        output.reflPos1 = Vec2.add(intersectPos1, Vec2.multiply(output.reflVel1, (1 - intersectTime)));
        output.reflPos2 = Vec2.add(intersectPos2, Vec2.multiply(output.reflVel2, (1 - intersectTime)));

        return output;
    }

    private static massToWeights(m1: number, m2: number) {
        return [
            m2 < Infinity ? (m2 / (m1 + m2)) : 1,
            m1 < Infinity ? (m1 / (m1 + m2)) : 1
        ];
    }
}
