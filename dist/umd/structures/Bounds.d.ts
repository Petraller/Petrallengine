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
    min: Vec2;
    /** The maximum components. */
    max: Vec2;
    constructor(min: Vec2, max: Vec2);
    copy: () => Bounds;
    equals: (other: Bounds) => boolean;
    /** The size of the bounds. */
    get size(): Vec2;
    /**
     * Determines if a point exists inside this bounds.
     * @param point The point.
     * @returns Whether the point exists inside this bounds.
     */
    contains: (point: Vec2) => boolean;
    /**
     * Determines if this bounds overlaps with another bounds.
     * @param other The other bounds.
     * @returns Whether the bounds overlap.
     */
    overlaps: (other: Bounds) => boolean;
    /** The zero bounds, [(0, 0), (0, 0)]. */
    static get zero(): Bounds;
    /** The unit bounds, [(0, 0), (1, 1)]. */
    static get unit(): Bounds;
    /** The normalized bounds, [(-0.5, -0.5), (0.5, 0.5)]. */
    static get norm(): Bounds;
    /**
     * Create bounds based on a set of vertices.
     * @param vertices The vertices.
     * @returns The bounds.
     */
    static fromVertices: (vertices: Vec2[]) => Bounds;
    /**
     * Create bounds that envelop a set of bounds.
     * @param boundses The set of bounds to envelop.
     * @returns The bounds.
     */
    static makeEnvelop: (boundses: Bounds[]) => Bounds;
    /**
     * Translates bounds.
     * @param b The bounds.
     * @param v The translation vector.
     * @returns The translated bounds.
     */
    static translate: (b: Bounds, v: Vec2) => Bounds;
    /**
     * Scales bounds.
     * @param b The bounds.
     * @param v The scale vector.
     * @param origin The normalized origin to scale from.
     * @returns The scaled bounds.
     */
    static scale: (b: Bounds, v: Vec2, origin?: Vec2) => Bounds;
    /**
     * Shifts bounds such that its origin is at a given position.
     * @param b The bounds.
     * @param pos The position.
     * @param origin The normalized origin of the bounds.
     * @returns The shifted bounds.
     */
    static shift: (b: Bounds, pos: Vec2, origin?: Vec2) => Bounds;
    /**
     * Extends bounds by a vector.
     * @param b The bounds.
     * @param v The extension vector.
     * @returns The extended bounds.
     */
    static extend: (b: Bounds, v: Vec2) => Bounds;
}
