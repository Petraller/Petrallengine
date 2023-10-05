/**
 * @author Petraller <me@petraller.com>
 */

import Vec2 from '../structures/Vec2';

/**
 * Static class for physics and collisions.
 */
export default class Physics {
    static rayCircleIntersection(posRay: Vec2, velRay: Vec2, posCircle: Vec2, radius: number) {
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

    static circleCircleIntersection(
        pos1: Vec2, vel1: Vec2, radius1: number,
        pos2: Vec2, vel2: Vec2, radius2: number) {
        let output = {
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

    static circleCircleResponse(
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
