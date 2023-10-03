/**
 * @author Petraller <me@petraller.com>
 */

import '../Math';
import ICopyable from './ICopyable';

/**
 * Representation of a 2D vector.
 */
export default class Vec2 implements ICopyable {
    /** The x-component. */
    x: number = 0;
    /** The y-component. */
    y: number = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    copy = () => new Vec2(this.x, this.y);

    /**
     * Returns the squared length of this vector.
     * @returns The squared length of this vector.
     */
    sqrLength = () => this.x * this.x + this.y * this.y;

    /**
     * Returns the length of this vector.
     * @returns The length of this vector.
     */
    length = () => Math.sqrt(this.sqrLength());

    /**
     * Returns the normalized form of this vector.
     * 
     * Does not modify the original vector.
     * @returns The normalized form of this vector.
     */
    normalized = () => { const l = this.length(); return l == 0 ? Vec2.zero : Vec2.divide(this, l); };

    /**
     * Returns the value of the minimum component of this vector.
     * @returns The value of the minimum component of this vector.
     */
    minComponent = () => this.x < this.y ? this.x : this.y;

    /**
     * Returns the value of the maximum component of this vector.
     * @returns The value of the maximum component of this vector.
     */
    maxComponent = () => this.x > this.y ? this.x : this.y;

    /**
     * Normalizes this vector.
     * @returns This vector after normalizing.
     */
    normalize = () => { const l = this.length(); return this.scale(l == 0 ? 0 : 1 / l); };

    /**
     * Copies the value of another vector.
     * @param v The other vector.
     * @returns This vector after copying.
     */
    copyFrom = (v: Vec2) => { this.x = v.x; this.y = v.y; return this; };

    /**
     * Translates this vector by another vector.
     * @param v The other vector.
     * @returns This vector after translating.
     */
    translate = (v: Vec2) => { this.x += v.x; this.y += v.y; return this; };

    /**
     * Rotates this vector by an angle.
     * @param deg The angle in degrees.
     * @returns This vector after rotating.
     */
    rotate = (deg: number) => {
        const r = deg * Math.PI / 180;
        const x = Math.cos(r) * this.x - Math.sin(r) * this.y;
        const y = Math.sin(r) * this.x + Math.cos(r) * this.y;
        this.x = x; this.y = y;
        return this;
    };

    /**
     * Scales this vector by a factor.
     * @param n The scaling factor.
     * @returns This vector after scaling.
     */
    scale = (n: number) => { this.x *= n; this.y *= n; return this; };

    /**
     * Scales this vector by another vector component-wise.
     * @param v The other vector.
     * @returns This vector after scaling.
     */
    scaleComponents = (v: Vec2) => { this.x *= v.x; this.y *= v.y; return this; };

    /**
     * Inverts this vector component-wise.
     * @returns This vector after inverting.
     */
    invert = () => { this.x = 1 / this.x; this.y = 1 / this.y; return this; }

    /** @returns The zero vector. */
    static get zero() { return new Vec2(0, 0); }
    /** @returns The unit vector. */
    static get one() { return new Vec2(1, 1); }
    /** @returns The right vector. */
    static get right() { return new Vec2(1, 0); }
    /** @returns The left vector. */
    static get left() { return new Vec2(-1, 0); }
    /** @returns The down vector. */
    static get down() { return new Vec2(0, 1); }
    /** @returns The up vector. */
    static get up() { return new Vec2(0, -1); }

    /**
     * Adds two vectors component-wise.
     * 
     * Does not modify the original vectors.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The sum vector.
     */
    static add = (v1: Vec2, v2: Vec2) => new Vec2(v1.x + v2.x, v1.y + v2.y);

    /**
     * Multiplies a vector by a constant.
     * 
     * Does not modify the original vector.
     * @param v The vector.
     * @param n The constant
     * @returns The scaled vector.
     */
    static multiply = (v: Vec2, n: number) => new Vec2(v.x * n, v.y * n);

    /**
     * Multiplies two vectors component-wise.
     * 
     * Does not modify the original vectors.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The scaled vector.
     */
    static multiplyComponents = (v1: Vec2, v2: Vec2) => new Vec2(v1.x * v2.x, v1.y * v2.y);

    /**
     * Subtracts one vector from another.
     * 
     * Does not modify the original vectors.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The difference vector.
     */
    static subtract = (v1: Vec2, v2: Vec2) => Vec2.add(v1, Vec2.multiply(v2, -1));

    /**
     * Divides a vector by a constant.
     * 
     * Does not modify the original vector.
     * @param v The vector.
     * @param n The constant.
     * @returns The scaled vector.
     */
    static divide = (v: Vec2, n: number) => Vec2.multiply(v, 1 / n);

    /**
     * Inverts a vector component-wise.
     * 
     * Does not modify the original vector.
     * @param v The vector.
     * @returns The inverted vector.
     */
    static inverse = (v: Vec2) => new Vec2(1 / v.x, 1 / v.y);

    /**
     * Dot multiplies two vectors.
     * 
     * Does not modify the original vectors.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The dot product.
     */
    static dot = (v1: Vec2, v2: Vec2) => v1.x * v2.x + v1.y * v2.y;

    /**
     * Cross multiplies two vectors.
     * 
     * Does not modify the original vectors.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The magnitude of the cross product.
     */
    static cross = (v1: Vec2, v2: Vec2) => v1.x * v2.y - v1.y * v2.x;

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
     * Linearly interpolates from one vector to another.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @param t The amount to interpolate by.
     * @returns The interpolated vector.
     */
    static lerp = (v1: Vec2, v2: Vec2, t: number) => new Vec2(Math.lerp(v1.x, v2.x, t), Math.lerp(v1.y, v2.y, t));
}
