/**
 * @author Petraller <me@petraller.com>
 */
import '../Math';
import ICopyable from './ICopyable';
import IEquatable from './IEquatable';
import Mat3 from './Mat3';
/**
 * Representation of a 2D vector.
 */
export default class Vec2 implements ICopyable, IEquatable {
    private _x;
    private _y;
    constructor(x: number, y: number);
    copy: () => Vec2;
    equals: (other: Vec2) => boolean;
    /** The x-component. */
    get x(): number;
    /** The y-component. */
    get y(): number;
    /** The squared length of this vector. */
    get sqrLength(): number;
    /** The length of this vector. */
    get length(): number;
    /** The normalized form of this vector. */
    get normalized(): Vec2;
    /** A normal to this vector. */
    get normal(): Vec2;
    /** The value of the minimum component of this vector. */
    get minComponent(): number;
    /** The value of the maximum component of this vector. */
    get maxComponent(): number;
    /** The zero vector. */
    static get zero(): Vec2;
    /** The half vector. */
    static get half(): Vec2;
    /** The unit vector. */
    static get one(): Vec2;
    /** The right vector. */
    static get right(): Vec2;
    /** The left vector. */
    static get left(): Vec2;
    /** The down vector. */
    static get down(): Vec2;
    /** The up vector. */
    static get up(): Vec2;
    /** The negative infinity vector. */
    static get negativeInfinity(): Vec2;
    /** The infinity vector. */
    static get infinity(): Vec2;
    /**
     * Adds two vectors component-wise.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The sum vector.
     */
    static add: (v1: Vec2, v2: Vec2) => Vec2;
    /**
     * Multiplies a vector by a constant.
     * @param v The vector.
     * @param n The constant
     * @returns The scaled vector.
     */
    static multiply: (v: Vec2, n: number) => Vec2;
    /**
     * Multiplies two vectors component-wise.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The scaled vector.
     */
    static multiplyComponents: (v1: Vec2, v2: Vec2) => Vec2;
    /**
     * Subtracts one vector from another.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The difference vector.
     */
    static subtract: (v1: Vec2, v2: Vec2) => Vec2;
    /**
     * Divides a vector by a constant.
     * @param v The vector.
     * @param n The constant.
     * @returns The scaled vector.
     */
    static divide: (v: Vec2, n: number) => Vec2;
    /**
     * Inverts a vector component-wise.
     * @param v The vector.
     * @returns The inverted vector.
     */
    static inverse: (v: Vec2) => Vec2;
    /**
     * Dot multiplies two vectors.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The dot product.
     */
    static dot: (v1: Vec2, v2: Vec2) => number;
    /**
     * Cross multiplies two vectors.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The magnitude of the cross product.
     */
    static cross: (v1: Vec2, v2: Vec2) => number;
    /**
     * Rotates a vector by an angle.
     * @param deg The angle in degrees.
     * @returns The rotated vector.
     */
    static rotate: (v: Vec2, deg: number) => Vec2;
    /**
     * Transforms a vector by a matrix.
     * @param m The matrix.
     * @param v The vector.
     * @returns The transformed vector.
     */
    static transform: (m: Mat3, v: Vec2) => Vec2;
    /**
     * Converts an angle in degrees to a unit vector.
     * @param deg The angle in degrees.
     * @returns The vector.
     */
    static fromAngle: (deg: number) => Vec2;
    /**
     * Converts a vector to its angle from the x-axis.
     * @param v The vector.
     * @returns The angle in degrees.
     */
    static toAngle: (v: Vec2) => number;
    /**
     * Converts an arbitrary object with x and y properties to a vector.
     * @param obj The object.
     * @returns The vector.
     */
    static fromObjXY: (obj: {
        x: number;
        y: number;
    }) => Vec2;
    /**
     * Converts an arbitrary object with width and height properties to a vector.
     * @param obj The object.
     * @returns The vector.
     */
    static fromObjWH: (obj: {
        width: number;
        height: number;
    }) => Vec2;
    /**
     * Converts a 3-tuple to a vector, omitting the last element of the tuple.
     * @param obj The 3-tuple.
     * @returns The vector.
     */
    static from3Tuple: (obj: [number, number, number]) => Vec2;
    /**
     * Linearly interpolates from one vector to another.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @param t The amount to interpolate by.
     * @returns The interpolated vector.
     */
    static lerp: (v1: Vec2, v2: Vec2, t: number) => Vec2;
    /**
     * Linearly interpolates from one vector to another.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @param t The amount to interpolate by.
     * @returns The interpolated vector.
     */
    static lerpComponents: (v1: Vec2, v2: Vec2, t: Vec2) => Vec2;
}
