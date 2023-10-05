/**
 * @author Petraller <me@petraller.com>
 */

import '../Math';
import ICopyable from './ICopyable';
import IEquatable from './IEquatable';
import Vec2 from './Vec2';

/**
 * Representation of 2D bounds.
 */
export default class Bounds implements ICopyable, IEquatable {
    /** The minimum components. */
    min: Vec2 = Vec2.zero;
    /** The maximum components. */
    max: Vec2 = Vec2.zero;

    constructor(min: Vec2, max: Vec2) {
        this.min.copyFrom(min);
        this.max.copyFrom(max);
    }

    copy = () => new Bounds(this.min, this.max);
    copyFrom = (other: Bounds) => { this.min.copyFrom(other.min); this.max.copyFrom(other.max); return this; };
    equals = (other: Bounds) => this.min.equals(other.min) && this.max.equals(other.max);

    /** The size of the bounds. */
    get size() { return Vec2.subtract(this.max, this.min); }

    /**
     * Determines if a point exists inside this bounds.
     * @param point The point.
     * @returns Whether the point exists inside this bounds.
     */
    contains = (point: Vec2) => point.x >= this.min.x && point.x <= this.max.x && point.y >= this.min.y && point.y <= this.max.y;

    /**
     * Determines if this bounds overlaps with another bounds.
     * @param other The other bounds.
     * @returns Whether the bounds overlap.
     */
    overlaps = (other: Bounds) => this.min.x <= other.max.x && this.max.x >= other.min.x && this.max.y >= other.min.y && this.min.y <= other.max.y;

    /** The zero bounds, [(0, 0), (0, 0)]. */
    static get zero() { return new Bounds(Vec2.zero, Vec2.zero); }
    /** The unit bounds, [(0, 0), (1, 1)]. */
    static get unit() { return new Bounds(Vec2.zero, Vec2.one); }
    /** The normalized bounds, [(-0.5, -0.5), (0.5, 0.5)]. */
    static get norm() { return new Bounds(Vec2.multiply(Vec2.one, -0.5), Vec2.multiply(Vec2.one, 0.5)); }

    /**
     * Create bounds based on a set of vertices.
     * @param vertices The vertices.
     * @returns The bounds.
     */
    static fromVertices = (vertices: Vec2[]) => {
        let b = new Bounds(Vec2.infinity, Vec2.negativeInfinity);

        // Iterate all vertices
        for (const vertex of vertices) {
            if (vertex.x > b.max.x) b.max = new Vec2(vertex.x, b.max.y);
            if (vertex.x < b.min.x) b.min = new Vec2(vertex.x, b.min.y);
            if (vertex.y > b.max.y) b.max = new Vec2(b.max.x, vertex.y);
            if (vertex.y < b.min.y) b.min = new Vec2(b.min.x, vertex.y);
        }
        return b;
    };

    /**
     * Create bounds that envelop a set of bounds.
     * @param boundses The set of bounds to envelop.
     * @returns The bounds.
     */
    static makeEnvelop = (boundses: Bounds[],) => {
        let b = new Bounds(Vec2.infinity, Vec2.negativeInfinity);

        // Iterate all bounds
        for (const bounds of boundses) {
            if (bounds.max.x > b.max.x) b.max = new Vec2(bounds.max.x, b.max.y);
            if (bounds.min.x < b.min.x) b.min = new Vec2(bounds.min.x, b.min.y);
            if (bounds.max.y > b.max.y) b.max = new Vec2(b.max.x, bounds.max.y);
            if (bounds.min.y < b.min.y) b.min = new Vec2(b.min.x, bounds.min.y);
        }
        return b;
    };

    /**
     * Translates bounds.
     * @param b The bounds.
     * @param v The translation vector.
     * @returns The translated bounds.
     */
    static translate = (b: Bounds, v: Vec2) => { return new Bounds(Vec2.add(b.min, v), Vec2.add(b.max, v)); };

    /**
     * Scales bounds.
     * @param b The bounds.
     * @param v The scale vector.
     * @param origin The normalized origin to scale from.
     * @returns The scaled bounds.
     */
    static scale = (b: Bounds, v: Vec2, origin: Vec2 = Vec2.multiply(Vec2.one, 0.5)) => {
        const o = Vec2.lerpComponents(b.min, b.max, origin);
        return new Bounds(
            Vec2.add(Vec2.multiplyComponents(Vec2.add(b.min, Vec2.multiply(o, -1)), v), o),
            Vec2.add(Vec2.multiplyComponents(Vec2.add(b.max, Vec2.multiply(o, -1)), v), o)
        );
    };

    /**
     * Shifts bounds such that its origin is at a given position.
     * @param b The bounds.
     * @param pos The position.
     * @param origin The normalized origin of the bounds.
     * @returns The shifted bounds.
     */
    static shift = (b: Bounds, pos: Vec2, origin: Vec2 = Vec2.multiply(Vec2.one, 0.5)) => {
        const o = Vec2.lerpComponents(b.min, b.max, origin);
        return Bounds.translate(b, Vec2.subtract(pos, o));
    };

    /**
     * Extends bounds by a vector.
     * @param b The bounds.
     * @param v The extension vector.
     * @returns The extended bounds.
     */
    static extend = (b: Bounds, v: Vec2) => {
        if (v.x > 0) {
            b.max = new Vec2(b.max.x + v.x, b.max.y);
        } else {
            b.min = new Vec2(b.min.x + v.x, b.min.y);
        }
        if (v.y > 0) {
            b.max = new Vec2(b.max.x, b.max.y + v.y);
        } else {
            b.min = new Vec2(b.min.x, b.min.y + v.y);
        }
        return b;
    }
}
