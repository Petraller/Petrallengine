/**
 * @author Petraller <me@petraller.com>
 */

/** */
interface Math {
    /**
     * Linearly interpolates from one value to another.
     * @param x The first value.
     * @param y The second value.
     * @param t The amount to interpolate by.
     * @returns The interpolated value.
     */
    lerp(x: number, y: number, t: number): number;

    /**
     * Clamps a value between two values.
     * @param x The value to clamp.
     * @param min The minimum value.
     * @param max The maximum value.
     * @returns The clamped value.
     */
    clamp(x: number, min: number, max: number): number;

    /**
     * Performs a modified modulo operation on two numbers.
     * 
     * The operation will yield the positive remainder of the dividend divided by the absolute value of the divisor.
     * @param x The dividend.
     * @param y The divisor.
     * @returns The remainder.
     */
    mod(x: number, y: number): number;
}

Math.lerp = (x: number, y: number, t: number) => x * (1 - t) + y * t;
Math.clamp = (x: number, min: number, max: number) => Math.min(Math.max(x, min), max);
Math.mod = (x: number, y: number) => (x >= 0) ? (x % Math.abs(y)) : (Math.abs(y) - (-x % Math.abs((y))) % Math.abs(y));
