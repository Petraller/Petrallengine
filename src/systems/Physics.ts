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
}
interface RayCircleInfo extends CollisionInfo {
    willIntersect: boolean,
    //isInterior: boolean,
    intersectTime: number,
}
interface CircleCircleInfo extends CollisionInfo {
    willIntersect: boolean,
    //isInterior: boolean,
    intersectTime: number,
    intersectPos1: Vec2,
    intersectPos2: Vec2,
}
interface CircleLineEdgeInfo extends CollisionInfo {
    willIntersect: boolean,
    normalAtCollision: Vec2,
    intersectTime: number,
    intersectPos: Vec2,
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
    private static readonly MAX_COLLISION_STEPS = 10;
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
        // Store next calculated positions for each body
        let nextPos: Map<RigidBody, Vec2> = new Map<RigidBody, Vec2>();
        for (const b of Physics.bodies.values()) {
            // Only save RBs
            if (!(b instanceof RigidBody))
                continue;

            nextPos.set(b, Vec2.add(b.globalPosition, Vec2.multiply(b.velocity, Game.deltaTime)));
        }

        // --- COLLISION DETECTION ---

        let collisions: CollisionInfo[] = []; // all collisions this iteration
        let pairsCalled: Set<SnowflakePair> = new Set<SnowflakePair>(); // pairs of bodies triggered this iteration
        function triggerBody(c1: Collider, c2: Collider) {
            const b1 = Physics.bodies.get(Physics.colliderBodies.get(c1.id)!)!;
            const b2 = Physics.bodies.get(Physics.colliderBodies.get(c2.id)!)!;
            const pair = makeSnowflakePair(b1.id, b2.id);

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
            if (!pairsCalled.has(pair))
                pairsCalled.add(pair);
        }

        // Get colliders as array
        let colliders: Collider[] = Array.from(Physics.colliders.values());

        // Sort by min x
        colliders.sort((c1, c2) => c1.bounds.min.x - c2.bounds.min.x);

        // Iterate all colliders
        let hasCollision = false;
        let collisionIteration = 0;
        do {
            hasCollision = false;
            ++collisionIteration;
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
                            ci.globalPosition, Vec2.multiply(bi.velocity, Game.deltaTime), ci.radius,
                            cj.globalPosition, Vec2.multiply(bj.velocity, Game.deltaTime), cj.radius);
                        if (col.willIntersect) {
                            hasCollision = true;
                            collisions.push(col);
                            triggerBody(ci, cj);

                            // Only respond if both are RBs
                            if (bi instanceof RigidBody && bj instanceof RigidBody) {
                                const normal = Vec2.subtract(col.intersectPos1, col.intersectPos2).normalized;
                                const res = Physics.response(normal, col.intersectTime,
                                    Vec2.multiply(bi.velocity, Game.deltaTime), bi.mass, col.intersectPos1,
                                    Vec2.multiply(bj.velocity, Game.deltaTime), bj.mass, col.intersectPos2);
                                bi.velocity = Vec2.divide(res.reflVel1, Game.deltaTime);
                                bj.velocity = Vec2.divide(res.reflVel2, Game.deltaTime);
                                const ciOff = Vec2.subtract(ci.globalPosition, bi.globalPosition);
                                const cjOff = Vec2.subtract(cj.globalPosition, bj.globalPosition);
                                nextPos.set(bi, Vec2.subtract(res.reflPos1, ciOff));
                                nextPos.set(bj, Vec2.subtract(res.reflPos2, cjOff));
                            }
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
                            ccircle.globalPosition, ccircle.radius, Vec2.multiply(bcircle.velocity, Game.deltaTime),
                            Vec2.transform(cline.globalTransform, cline.start), Vec2.transform(cline.globalTransform, cline.end));
                        if (col.willIntersect) {
                            hasCollision = true;
                            collisions.push(col);
                            triggerBody(ci, cj);

                            // Only respond if both are RBs
                            if (bi instanceof RigidBody && bj instanceof RigidBody) {
                                const normal = col.normalAtCollision.copy();
                                const res = Physics.response(normal, col.intersectTime,
                                    Vec2.multiply(bi.velocity, Game.deltaTime), bi.mass, col.intersectPos,
                                    Vec2.multiply(bj.velocity, Game.deltaTime), bj.mass, col.intersectPos);
                                bi.velocity = Vec2.divide(res.reflVel1, Game.deltaTime);
                                bj.velocity = Vec2.divide(res.reflVel2, Game.deltaTime);
                                nextPos.set(bi, res.reflPos1);
                                nextPos.set(bj, res.reflPos2);
                            }
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
        } while (hasCollision && collisionIteration < Physics.MAX_COLLISION_STEPS);

        // Clear uncalled pairs
        for (const pair of Physics.pairsCollided.values()) {
            const [b1id, b2id] = breakSnowflakePair(pair);
            if (pairsCalled.has(pair)) {
                continue;
            }
            const [b1, b2] = [Physics.bodies.get(b1id)!, Physics.bodies.get(b2id)!];
            Physics.pairsCollided.delete(pair);
            b1.onCollisionExit?.call(b1, b2);
            b2.onCollisionExit?.call(b2, b1);
        }

        // --- PHYSICS STEP ---

        for (const pair of nextPos) {
            pair[0].globalPosition = pair[1];
        }

        return collisions;
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
        let output: CircleLineEdgeInfo = {
            willIntersect: false,
            normalAtCollision: Vec2.zero,
            intersectTime: 0,
            intersectPos: Vec2.zero,
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
                    output.intersectPos = Vec2.add(posCircle, Vec2.multiply(velCircle, output.intersectTime));

                    // Collision normal
                    output.normalAtCollision = Vec2.multiply(lineNormal, -1);

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
                    output.intersectPos = Vec2.add(posCircle, Vec2.multiply(velCircle, output.intersectTime));

                    // Collision normal
                    output.normalAtCollision = lineNormal.copy();

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
            return Physics.circleLineEdgeIntersection(
                true,
                posCircle,
                radiusCircle,
                velCircle,
                posLine1,
                posLine2);
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
        let output: CircleLineEdgeInfo = {
            willIntersect: false,
            normalAtCollision: Vec2.zero,
            intersectTime: 0,
            intersectPos: Vec2.zero,
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
                    output.intersectPos = Vec2.add(posCircle, Vec2.multiply(velCircle, output.intersectTime));

                    // Collision normal
                    output.normalAtCollision = Vec2.subtract(output.intersectPos, posLine1).normalized;

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
                    output.intersectPos = Vec2.add(posCircle, Vec2.multiply(velCircle, output.intersectTime));

                    // Collision normal
                    output.normalAtCollision = Vec2.subtract(output.intersectPos, posLine2).normalized;

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
                    output.intersectPos = Vec2.add(posCircle, Vec2.multiply(velCircle, output.intersectTime));

                    // Collision normal
                    output.normalAtCollision = Vec2.subtract(output.intersectPos, posLine1).normalized;

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
                    output.intersectPos = Vec2.add(posCircle, Vec2.multiply(velCircle, output.intersectTime));

                    // Collision normal
                    output.normalAtCollision = Vec2.subtract(output.intersectPos, posLine2).normalized;

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

    private static rayCircleIntersection(posRay: Vec2, velRay: Vec2, posCircle: Vec2, radius: number) {
        let output: RayCircleInfo = {
            willIntersect: false,
            //isInterior: false,
            intersectTime: 0,
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
            output.willIntersect = true;
            output.intersectTime = it;
        }

        return output;
    }

    private static circleCircleIntersection(
        pos1: Vec2, vel1: Vec2, radius1: number,
        pos2: Vec2, vel2: Vec2, radius2: number) {
        let output: CircleCircleInfo = {
            willIntersect: false,
            //isInterior: false,
            intersectTime: 0,
            intersectPos1: Vec2.zero,
            intersectPos2: Vec2.zero,
        };

        // Relative position of 1 from 2
        const relPos = Vec2.subtract(pos1, pos2);

        // Relative vel of 1 from 2
        const relvel = Vec2.subtract(vel1, vel2);

        // Zero relative velocity
        if (relvel.sqrLength === 0) {
            output.willIntersect = relPos.sqrLength <= (radius1 + radius2) * (radius1 + radius2);
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
        const col = Physics.rayCircleIntersection(relRayPos, relRayVel, relCirclePos, relCircleRadius);

        // Intersection points
        if (col.willIntersect) {
            output.willIntersect = col.willIntersect;
            output.intersectTime = col.intersectTime;
            output.intersectPos1 = Vec2.add(pos1, Vec2.multiply(vel1, col.intersectTime));
            output.intersectPos2 = Vec2.add(pos2, Vec2.multiply(vel2, col.intersectTime));
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
        const f1 = -2 * (a1 - a2) * (mass2 < Infinity ? (mass2 / (mass1 + mass2)) : 1);
        const f2 = +2 * (a1 - a2) * (mass1 < Infinity ? (mass1 / (mass1 + mass2)) : 1);

        output.reflVel1 = Vec2.add(vel1, Vec2.multiply(normal, f1));
        output.reflVel2 = Vec2.add(vel2, Vec2.multiply(normal, f2));
        output.reflPos1 = Vec2.add(intersectPos1, Vec2.multiply(output.reflVel1, (1 - intersectTime)));
        output.reflPos2 = Vec2.add(intersectPos2, Vec2.multiply(output.reflVel2, (1 - intersectTime)));

        return output;
    }
}
