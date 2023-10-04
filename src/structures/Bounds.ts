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
    copyFrom = (b: Bounds) => { this.min.copyFrom(b.min); this.max.copyFrom(b.max); return this; };
    equals = (b: Bounds) => this.min.equals(b.min) && this.max.equals(b.max);

    /**
     * Updates this bounds based on a set of vertices and an optional velocity.
     * @param vertices The vertices.
     * @param velocity The velocity.
     */
    setVertices = (vertices: Vec2[], velocity?: Vec2) => {
        this.min = Vec2.infinity;
        this.max = Vec2.negativeInfinity;

        // Iterate all vertices
        for (const vertex of vertices) {
            if (vertex.x > this.max.x)
                this.max.x = vertex.x;
            if (vertex.x < this.min.x)
                this.min.x = vertex.x;
            if (vertex.y > this.max.y)
                this.max.y = vertex.y;
            if (vertex.y < this.min.y)
                this.min.y = vertex.y;
        }

        // Extend
        if (velocity) {
            if (velocity.x > 0) {
                this.max.x += velocity.x;
            } else {
                this.min.x += velocity.x;
            }

            if (velocity.y > 0) {
                this.max.y += velocity.y;
            } else {
                this.min.y += velocity.y;
            }
        }
    };

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

    /**
     * Translates this bounds.
     * @param v The translation vector.
     * @returns This bounds after translating.
     */
    translate = (v: Vec2) => { this.min.translate(v); this.max.translate(v); return this; };

    /**
     * Scales this bounds.
     * @param v The scale vector.
     * @param origin The normalized origin to scale from.
     * @returns This bounds after scaling.
     */
    scale = (v: Vec2, origin: Vec2 = Vec2.one.scale(0.5)) => {
        const o = Vec2.lerpComponents(this.min, this.max, origin);
        this.min.translate(Vec2.multiply(o, -1)).scaleComponents(v).translate(o);
        this.max.translate(Vec2.multiply(o, -1)).scaleComponents(v).translate(o);
        return this;
    };

    /**
     * Shifts this bounds such that its origin is at a given position.
     * @param pos The position.
     * @param origin The normalized origin of the bounds.
     * @returns This bounds after shifting.
     */
    shift = (pos: Vec2, origin: Vec2 = Vec2.one.scale(0.5)) => {
        const o = Vec2.lerpComponents(this.min, this.max, origin);
        return this.translate(Vec2.subtract(pos, o));
    };

    /** The zero bounds, [(0, 0), (0, 0)]. */
    static get zero() { return new Bounds(Vec2.zero, Vec2.zero); }
    /** The unit bounds, [(0, 0), (1, 1)]. */
    static get unit() { return new Bounds(Vec2.zero, Vec2.one); }
    /** The normalized bounds, [(-0.5, -0.5), (0.5, 0.5)]. */
    static get norm() { return new Bounds(Vec2.one.scale(-0.5), Vec2.one.scale(0.5)); }
}
