/**
 * @author Petraller <me@petraller.com>
 */

import '../Math';
import ICopyable from './ICopyable';
import Vec2 from './Vec2';

/**
 * Representation of an ordered set of points.
 * 
 * Points are ordered in clockwise direction.
 */
export default class Path implements ICopyable {
    /** The list of vectors */
    points: Vec2[] = [];

    constructor(points: Vec2[]) {
        this.points = points.map(e => e.copy());
    }

    copy = () => new Path(this.points);

    /** The mean of all points. */
    get mean() {
        let sum = Vec2.zero;
        for (const pt of this.points) {
            sum = Vec2.add(sum, pt);
        }
        return Vec2.divide(sum, this.points.length == 0 ? 1 : this.points.length);
    }

    /** The signed area inside the path. */
    get signedArea() {
        let area = 0;
        for (let i = 0; i < this.points.length; ++i) {
            const j = (i + 1) % this.points.length;
            area += this.points[i].y * this.points[j].x - this.points[i].x * this.points[j].y;
        }
        return area / 2;
    }

    /** The area inside the path. */
    get area() { return Math.abs(this.signedArea); }

    /** The centroid of the area. */
    get centroid() {
        let area = this.signedArea;
        let centroid = Vec2.zero;
        for (let i = 0; i < this.points.length; ++i) {
            const j = (i + 1) % this.points.length;
            centroid = Vec2.add(centroid, Vec2.multiply(Vec2.add(this.points[i], this.points[j]), Vec2.cross(this.points[i], this.points[j])));
        }
        return Vec2.divide(centroid, 6 * area);
    }

    /**
     * Determines if a point exists inside this path.
     * 
     * Assumes that the path is convex.
     * @param point The point.
     * @returns Whether the point exists inside this path.
     */
    contains = (point: Vec2) => {
        for (let i = 0; i < this.points.length; ++i) {
            const j = (i + 1) % this.points.length;
            const ip = Vec2.subtract(point, this.points[i]);
            const ijn = Vec2.subtract(this.points[j], this.points[i]).normal;
            if (Vec2.dot(ip, ijn) < 0)
                return false;
        }
        return true;
    };

    /**
     * Translates a path.
     * @param p The path.
     * @param v The translation vector.
     * @returns The translated path.
     */
    static translate = (p: Path, v: Vec2) => { return new Path(p.points.map(p => Vec2.add(p, v))); };

    /**
     * Rotates a path around the centroid.
     * @param p The path.
     * @param deg The angle in degrees.
     * @returns The rotated path.
     */
    static rotate = (p: Path, deg: number) => {
        const c = p.centroid;
        return new Path(p.points.map(p => Vec2.add(Vec2.rotate(Vec2.add(p, Vec2.multiply(c, -1)), deg), c)));
    };

    /**
     * Scales a path from the centroid.
     * @param p The path.
     * @param v The scale vector.
     * @returns The scaled path.
     */
    static scale = (p: Path, v: Vec2) => {
        const c = p.centroid;
        return new Path(p.points.map(p => Vec2.add(Vec2.multiplyComponents(Vec2.add(p, Vec2.multiply(c, -1)), v), c)));
    };

    /**
     * Sorts vertices in a path such that they are in clockwise order around the mean.
     * @returns The sorted path.
     */
    static sort = (p: Path) => {
        let path = p.copy();
        const m = path.mean;
        path.points.sort((a, b) => Vec2.toAngle(Vec2.subtract(a, m)) - Vec2.toAngle(Vec2.subtract(b, m)));
        return path;
    };
}
