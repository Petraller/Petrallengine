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
    private _x: number = 0;
    private _y: number = 0;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    copy = () => new Vec2(this.x, this.y);
    equals = (other: Vec2) => this.x === other.x && this.y === other.y;

    /** The x-component. */
    get x() { return this._x; }

    /** The y-component. */
    get y() { return this._y; }

    /** The squared length of this vector. */
    get sqrLength() { return this.x * this.x + this.y * this.y; }

    /** The length of this vector. */
    get length() { return Math.sqrt(this.sqrLength); }

    /** The normalized form of this vector. */
    get normalized() { const l = this.length; return l == 0 ? Vec2.zero : Vec2.divide(this, l); };

    /** A normal to this vector. */
    get normal() { return new Vec2(-this.y, this.x); };

    /** The value of the minimum component of this vector. */
    get minComponent() { return this.x < this.y ? this.x : this.y; }

    /** The value of the maximum component of this vector. */
    get maxComponent() { return this.x > this.y ? this.x : this.y; }

    /** The zero vector. */
    static get zero() { return new Vec2(0, 0); }
    /** The half vector. */
    static get half() { return new Vec2(0.5, 0.5); }
    /** The unit vector. */
    static get one() { return new Vec2(1, 1); }
    /** The right vector. */
    static get right() { return new Vec2(1, 0); }
    /** The left vector. */
    static get left() { return new Vec2(-1, 0); }
    /** The down vector. */
    static get down() { return new Vec2(0, 1); }
    /** The up vector. */
    static get up() { return new Vec2(0, -1); }
    /** The negative infinity vector. */
    static get negativeInfinity() { return new Vec2(-Infinity, -Infinity); }
    /** The infinity vector. */
    static get infinity() { return new Vec2(Infinity, Infinity); }

    /**
     * Adds two vectors component-wise.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The sum vector.
     */
    static add = (v1: Vec2, v2: Vec2) => new Vec2(v1.x + v2.x, v1.y + v2.y);

    /**
     * Multiplies a vector by a constant.
     * @param v The vector.
     * @param n The constant
     * @returns The scaled vector.
     */
    static multiply = (v: Vec2, n: number) => new Vec2(v.x * n, v.y * n);

    /**
     * Multiplies two vectors component-wise.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The scaled vector.
     */
    static multiplyComponents = (v1: Vec2, v2: Vec2) => new Vec2(v1.x * v2.x, v1.y * v2.y);

    /**
     * Subtracts one vector from another.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The difference vector.
     */
    static subtract = (v1: Vec2, v2: Vec2) => Vec2.add(v1, Vec2.multiply(v2, -1));

    /**
     * Divides a vector by a constant.
     * @param v The vector.
     * @param n The constant.
     * @returns The scaled vector.
     */
    static divide = (v: Vec2, n: number) => Vec2.multiply(v, 1 / n);

    /**
     * Inverts a vector component-wise.
     * @param v The vector.
     * @returns The inverted vector.
     */
    static inverse = (v: Vec2) => new Vec2(1 / v.x, 1 / v.y);

    /**
     * Dot multiplies two vectors.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The dot product.
     */
    static dot = (v1: Vec2, v2: Vec2) => v1.x * v2.x + v1.y * v2.y;

    /**
     * Cross multiplies two vectors.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The magnitude of the cross product.
     */
    static cross = (v1: Vec2, v2: Vec2) => v1.x * v2.y - v1.y * v2.x;

    /**
     * Rotates a vector by an angle.
     * @param deg The angle in degrees.
     * @returns The rotated vector.
     */
    static rotate = (v: Vec2, deg: number) => {
        const r = deg * Math.PI / 180;
        const x = Math.cos(r) * v.x - Math.sin(r) * v.y;
        const y = Math.sin(r) * v.x + Math.cos(r) * v.y;
        return new Vec2(x, y);
    };

    /**
     * Transforms a vector by a matrix.
     * @param m The matrix.
     * @param v The vector.
     * @returns The transformed vector.
     */
    static transform = (m: Mat3, v: Vec2) => {
        const x = v.x * m.get(0, 0) + v.y * m.get(0, 1) + m.get(0, 2);
        const y = v.x * m.get(1, 0) + v.y * m.get(1, 1) + m.get(1, 2);
        return new Vec2(x, y);
    };

    /**
     * Converts an angle in degrees to a unit vector.
     * @param deg The angle in degrees.
     * @returns The vector.
     */
    static fromAngle = (deg: number) => { const r = deg * Math.PI / 180; return new Vec2(Math.cos(r), Math.sin(r)); };

    /**
     * Converts a vector to its angle from the x-axis.
     * @param v The vector.
     * @returns The angle in degrees.
     */
    static toAngle = (v: Vec2) => {
        if (v.x == 0)
            return v.y >= 0 ? 90 : -90;
        return (v.x > 0 ? 0 : (v.y > 0 ? 180 : -180)) + Math.atan(v.y / v.x) * 180 / Math.PI;
    }

    /**
     * Converts an arbitrary object with x and y properties to a vector.
     * @param obj The object.
     * @returns The vector.
     */
    static fromObjXY = (obj: { x: number, y: number }) => new Vec2(obj.x, obj.y);

    /**
     * Converts an arbitrary object with width and height properties to a vector.
     * @param obj The object.
     * @returns The vector.
     */
    static fromObjWH = (obj: { width: number, height: number }) => new Vec2(obj.width, obj.height);

    /**
     * Converts a 3-tuple to a vector, omitting the last element of the tuple.
     * @param obj The 3-tuple.
     * @returns The vector.
     */
    static from3Tuple = (obj: [number, number, number]) => new Vec2(obj[0], obj[1]);

    /**
     * Linearly interpolates from one vector to another.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @param t The amount to interpolate by.
     * @returns The interpolated vector.
     */
    static lerp = (v1: Vec2, v2: Vec2, t: number) => new Vec2(Math.lerp(v1.x, v2.x, t), Math.lerp(v1.y, v2.y, t));

    /**
     * Linearly interpolates from one vector to another.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @param t The amount to interpolate by.
     * @returns The interpolated vector.
     */
    static lerpComponents = (v1: Vec2, v2: Vec2, t: Vec2) => new Vec2(Math.lerp(v1.x, v2.x, t.x), Math.lerp(v1.y, v2.y, t.y));
}
