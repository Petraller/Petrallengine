/**
 * @author Petraller <me@petraller.com>
 */

import '../Math';
import ICopyable from './ICopyable';
import IEquatable from './IEquatable';

/**
 * Representation of a RGBA color.
 */
export default class Color implements ICopyable, IEquatable {
    private _r: number = 0;
    private _g: number = 0;
    private _b: number = 0;
    private _a: number = 1;

    constructor(r: number, g: number, b: number, a?: number) {
        this._r = Math.clamp(r, 0, 1);
        this._g = Math.clamp(g, 0, 1);
        this._b = Math.clamp(b, 0, 1);
        this._a = Math.clamp(a ?? 1, 0, 1);
    }

    copy = () => new Color(this.r, this.g, this.b, this.a);
    equals = (other: Color) => this.r == other.r && this.g == other.g && this.b == other.b && this.a == other.a;

    /** The red component. */
    get r() { return this._r; }

    /** The green component. */
    get g() { return this._g; }

    /** The blue component. */
    get b() { return this._b; }

    /** The alpha component. */
    get a() { return this._a; }

    /** The tuple representation of this color. */
    toTuple = (): [number, number, number, number] => [this.r, this.g, this.b, this.a];

    /**
     * Converts the color to its #RRGGBBAA hexadecimal string representation.
     * @param hasAlpha Whether to include the alpha channel (default: false).
     * @returns The hexadecimal string representation.
     */
    toHexString = (hasAlpha: boolean = false) => {
        let str: string = "#";
        str += ((this.r * 255) & 0xFF).toString(16).padStart(2, '0');
        str += ((this.g * 255) & 0xFF).toString(16).padStart(2, '0');
        str += ((this.b * 255) & 0xFF).toString(16).padStart(2, '0');
        if (hasAlpha) str += ((this.a * 255) & 0xFF).toString(16).padStart(2, '0');
        return str;
    }

    /**
     * Converts the color to its HSV representation.
     * @returns The HSV representation.
     */
    toHSV = () => {
        const cmax = Math.max(this.r, this.g, this.b);
        const cmin = Math.min(this.r, this.g, this.b);
        const delta = cmax - cmin;
        let [h, s, v] = [0, cmax === 0 ? 0 : delta / cmax, cmax];
        if (cmax === this.r) {
            h = Math.mod((this.g - this.b) / delta, 6);
        }
        else if (cmax === this.g) {
            h = (this.g - this.b) / delta + 2;
        }
        else {
            h = (this.g - this.b) / delta + 4;
        }
        return { h, s, v };
    }

    /**
     * Converts the color to its HSL representation.
     * @returns The HSL representation.
     */
    toHSL = () => {
        const cmax = Math.max(this.r, this.g, this.b);
        const cmin = Math.min(this.r, this.g, this.b);
        const delta = cmax - cmin;
        let [h, s, l] = [0, 0, (cmax + cmin) / 2];
        s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
        if (cmax === this.r) {
            h = Math.mod((this.g - this.b) / delta, 6);
        }
        else if (cmax === this.g) {
            h = (this.g - this.b) / delta + 2;
        }
        else {
            h = (this.g - this.b) / delta + 4;
        }
        return { h, s, l };
    }

    /** Black. */
    static get black() { return new Color(0, 0, 0); }
    /** Blue. */
    static get blue() { return new Color(0, 0, 1); }
    /** Green. */
    static get green() { return new Color(0, 1, 0); }
    /** Cyan. */
    static get cyan() { return new Color(0, 1, 1); }
    /** Red. */
    static get red() { return new Color(1, 0, 0); }
    /** Magenta. */
    static get magenta() { return new Color(1, 0, 1); }
    /** Yellow. */
    static get yellow() { return new Color(1, 1, 0); }
    /** White. */
    static get white() { return new Color(1, 1, 1); }
    /** Grey. */
    static get grey() { return new Color(0.5, 0.5, 0.5); }
    /** Transparent. */
    static get transparent() { return new Color(0, 0, 0, 0); }

    /**
     * Linearly interpolates from one color to another.
     * @param c1 The first color.
     * @param c2 The second color.
     * @param t The amount to interpolate by.
     * @returns The interpolated color.
     */
    static lerp(c1: Color, c2: Color, t: number) {
        return new Color(
            c1.r * (1 - t) + c2.r * t,
            c1.g * (1 - t) + c2.g * t,
            c1.b * (1 - t) + c2.b * t,
            c1.a * (1 - t) + c2.a * t);
    }

    /**
     * Spherically linearly interpolates from one color to another.
     * @param c1 The first color.
     * @param c2 The second color.
     * @param t The amount to interpolate by.
     * @returns The interpolated color.
     */
    static slerp(c1: Color, c2: Color, t: number) {
        const func = (t: number) => Math.sin(t * Math.PI / 2)
        const [u, v] = [func(1 - t), func(t)];
        return new Color(
            c1.r * u + c2.r * v,
            c1.g * u + c2.g * v,
            c1.b * u + c2.b * v,
            c1.a * u + c2.a * v);
    }

    /**
     * Creates a color from its hexadecimal string representation.
     * @param str The hexadecimal string representation.
     * @returns The color.
     */
    static fromHexString = (str: string) => {
        str = str.trim();
        const r = parseInt(str.substring(1, 3), 16);
        const g = parseInt(str.substring(3, 5), 16);
        const b = parseInt(str.substring(5, 7), 16);
        const a = str.length >= 7 ? parseInt(str.substring(7, 9), 16) : 255;
        return new Color(r / 255, g / 255, b / 255, a / 255);
    }

    /**
     * Creates a color from its HSV representation.
     * @param h The hue.
     * @param s The saturation.
     * @param v The value.
     * @returns The color.
     */
    static fromHSV = (h: number, s: number, v: number) => {
        [h, s, v] = [Math.clamp(h, 0, 1), Math.clamp(s, 0, 1), Math.clamp(v, 0, 1)];
        h = h * 360;
        const c = s * v;
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = v - c;
        let [r, g, b] = [0, 0, 0];
        if (h < 60) {
            [r, g, b] = [c, x, 0];
        }
        else if (h < 120) {
            [r, g, b] = [x, c, 0];
        }
        else if (h < 180) {
            [r, g, b] = [0, c, x];
        }
        else if (h < 240) {
            [r, g, b] = [0, x, c];
        }
        else if (h < 300) {
            [r, g, b] = [x, 0, c];
        }
        else {
            [r, g, b] = [c, 0, x];
        }
        return new Color(r + m, g + m, b + m);
    }

    /**
     * Creates a color from its HSL representation.
     * @param h The hue.
     * @param s The saturation.
     * @param l The lightness.
     * @returns The color.
     */
    static fromHSL = (h: number, s: number, l: number) => {
        [h, s, l] = [Math.clamp(h, 0, 1), Math.clamp(s, 0, 1), Math.clamp(l, 0, 1)];
        h = h * 360;
        const c = s * (1 - Math.abs(2 * l - 1));
        const x = c * (1 - Math.abs((h / 60) % 2 - 1));
        const m = l - c / 2;
        let [r, g, b] = [0, 0, 0];
        if (h < 60) {
            [r, g, b] = [c, x, 0];
        }
        else if (h < 120) {
            [r, g, b] = [x, c, 0];
        }
        else if (h < 180) {
            [r, g, b] = [0, c, x];
        }
        else if (h < 240) {
            [r, g, b] = [0, x, c];
        }
        else if (h < 300) {
            [r, g, b] = [x, 0, c];
        }
        else {
            [r, g, b] = [c, 0, x];
        }
        return new Color(r + m, g + m, b + m);
    }
}