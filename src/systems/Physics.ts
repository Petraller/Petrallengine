/**
 * @author Petraller <me@petraller.com>
 */

import { Snowflake } from '../Snowflake';
import Game from '../Game';
import Body from '../nodes/Body';
import CircleCollider from '../nodes/CircleCollider';
import Collider from '../nodes/Collider';
import ConvexCollider from '../nodes/ConvexCollider';
import Bounds from '../structures/Bounds';
import Vec2 from '../structures/Vec2';

interface CollisionInfo {
}
interface CircleCircleInfo extends CollisionInfo {
    willIntersect: boolean,
    isInterior: boolean,
    intersectTime: number,
    intersectPos1: Vec2,
    intersectPos2: Vec2,
}

type SnowflakePair = Snowflake;
function makeSnowflakePair(id1: Snowflake, id2: Snowflake) {
    if (id1 < id2)
        return id1 + '|' + id2;
    return id2 + '|' + id2;
}
function breakSnowflakePair(pair: SnowflakePair): [Snowflake, Snowflake] {
    const items = pair.split('|');
    return [items[0], items[1]];
}

/**
 * Static class for physics and collisions.
 */
export default class Physics {
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

        setInterval(() => {
            Physics.tick();
        }, 1000 * Game.FIXED_FRAME_TIME);
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

    private static tick() {
        let collisions: CollisionInfo[] = [];
        let pairsCalled: Set<SnowflakePair> = new Set<SnowflakePair>();
        function triggerBody(c1: Collider, c2: Collider) {
            const b1 = Physics.bodies.get(Physics.colliderBodies.get(c1.id)!)!;
            const b2 = Physics.bodies.get(Physics.colliderBodies.get(c2.id)!)!;
            const pair = makeSnowflakePair(c1.id, c2.id);

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
        let colliders: Collider[] = Array.from(this.colliders.values());

        // Sort by min x
        colliders.sort((c1, c2) => c1.bounds.min.x - c2.bounds.min.x);

        // Iterate all colliders
        for (let i = 0; i < colliders.length; i++) {
            const ci = colliders[i];
            const bi = Physics.bodies.get(Physics.colliderBodies.get(ci.id)!)!;
            for (let j = i + 1; j < colliders.length; j++) {
                const cj = colliders[j];
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
                const bndi = Bounds.extend(ci.bounds, bi.velocity);
                const bndj = Bounds.extend(cj.bounds, bj.velocity);

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
                        ci.globalPosition, Vec2.zero, ci.radius,
                        cj.globalPosition, Vec2.zero, cj.radius);
                    if (col.willIntersect) {
                        collisions.push(col);
                        triggerBody(ci, cj);
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
                console.error(`Colliders ${typeof ci} and ${typeof cj} not supported by collision detection`)
            }
        }

        // Clear uncalled pairs
        for (const pair of Physics.pairsCollided.values()) {
            const [b1, b2] = breakSnowflakePair(pair).map((id) => Physics.bodies.get(id)!);
            if (pairsCalled.has(pair)) {
                continue;
            }
            Physics.pairsCollided.delete(pair);
            b1.onCollisionExit?.call(b1, b2);
            b2.onCollisionExit?.call(b2, b1);
        }

        return collisions;
    }

    private static rayCircleIntersection(posRay: Vec2, velRay: Vec2, posCircle: Vec2, radius: number) {
        let output = {
            willIntersect: false,
            isInterior: false,
            intersectTime: 0,
        };

        // Distance squared
        const distSqr = Vec2.subtract(posRay, posCircle).sqrLength;

        // Check if interior or exterior ray
        output.isInterior = (distSqr < radius * radius);

        // Ray length
        const rl = velRay.length;

        // Delta from start to CPA
        const m = Vec2.dot(Vec2.subtract(posCircle, posRay), velRay.normalized);
        if (!output.isInterior && m < 0 && distSqr > radius * radius)
            return output;

        // CPA
        const nSqr = distSqr - m * m;
        if (nSqr > radius * radius)
            return output;

        // Delta from collision point to CPA
        const s = Math.sqrt(radius * radius - nSqr);

        // Time to intersect
        const it = output.isInterior
            ? ((m + s) / rl)
            : ((m - s) / rl);

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
            isInterior: false,
            intersectTime: 0,
            intersectPos1: Vec2.zero,
            intersectPos2: Vec2.zero,
        };

        // Relative vel of 1 from 2
        const relvel = Vec2.subtract(vel1, vel2);

        // Relative ray
        const relRayPos = pos1.copy();
        const relRayVel = relvel;

        // Check if interior or exterior intersection
        const relPos = Vec2.subtract(pos1, pos2);
        output.isInterior = (relPos.sqrLength < (radius1 - radius2) * (radius1 - radius2));
        if (!output.isInterior && relPos.sqrLength < (radius1 + radius2) * (radius1 + radius2)) {
            // Overlapping circles, I don't care about this case
            return output;
        }

        // Relative circle
        const relCirclePos = pos2.copy();
        const relCircleRadius = output.isInterior ? Math.abs((radius1 - radius2)) : radius1 + radius2;

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

    private static circleCircleResponse(
        normal: Vec2, intersectTime: number,
        vel1: Vec2, mass1: number, intersectPos1: Vec2,
        vel2: Vec2, mass2: number, intersectPos2: Vec2) {
        let output = {
            reflVel1: Vec2.zero,
            reflVel2: Vec2.zero,
            reflPos1: Vec2.zero,
            reflPos2: Vec2.zero,
        };

        // Just in case
        const n = normal.normalized;

        // Magnitude of velocity in direction of normal
        const a1 = Vec2.dot(vel1, n);
        const a2 = Vec2.dot(vel2, n);

        // Factor of normal to add
        const f1 = -2 * (a1 - a2) * (mass2 < Infinity ? (mass2 / (mass1 + mass2)) : 1);
        const f2 = +2 * (a1 - a2) * (mass1 < Infinity ? (mass1 / (mass1 + mass2)) : 1);

        output.reflVel1 = Vec2.add(vel1, Vec2.multiply(n, f1));
        output.reflVel2 = Vec2.add(vel2, Vec2.multiply(n, f2));
        output.reflPos1 = Vec2.add(intersectPos1, Vec2.multiply(output.reflVel1, (1 - intersectTime)));
        output.reflPos2 = Vec2.add(intersectPos2, Vec2.multiply(output.reflVel2, (1 - intersectTime)));

        return output;
    }
}
