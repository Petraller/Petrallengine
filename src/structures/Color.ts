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
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a ?? 1;
    }

    copy = () => new Color(this.r, this.g, this.b, this.a);
    equals = (other: Color) => this.r == other.r && this.g == other.g && this.b == other.b && this.a == other.a;

    /** The red component. */
    get r() { return this._r; }
    set r(value: number) { this._r = Math.clamp(value, 0, 1); }

    /** The green component. */
    get g() { return this._g; }
    set g(value: number) { this._g = Math.clamp(value, 0, 1); }

    /** The blue component. */
    get b() { return this._b; }
    set b(value: number) { this._b = Math.clamp(value, 0, 1); }

    /** The alpha component. */
    get a() { return this._a; }
    set a(value: number) { this._a = Math.clamp(value, 0, 1); }

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
        if (delta > 0) {
            if (cmax === this.r) {
                h = Math.mod((this.g - this.b) / delta, 6);
            }
            else if (cmax === this.g) {
                h = (this.b - this.r) / delta + 2;
            }
            else {
                h = (this.r - this.g) / delta + 4;
            }
        }
        return { h: h / 6, s, v };
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
        if (delta > 0) {
            if (cmax === this.r) {
                h = Math.mod((this.g - this.b) / delta, 6);
            }
            else if (cmax === this.g) {
                h = (this.b - this.r) / delta + 2;
            }
            else {
                h = (this.r - this.g) / delta + 4;
            }
        }
        return { h: h / 6, s, l };
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
            Math.lerp(c1.r, c2.r, t),
            Math.lerp(c1.g, c2.g, t),
            Math.lerp(c1.b, c2.b, t),
            Math.lerp(c1.a, c2.a, t));
    }

    /**
     * Spherically linearly interpolates from one color to another.
     * 
     * Generally will result in less dark colors compared to `lerp`.
     * @param c1 The first color.
     * @param c2 The second color.
     * @param t The amount to interpolate by.
     * @returns The interpolated color.
     */
    static slerp(c1: Color, c2: Color, t: number) {
        return new Color(
            Math.slerp(c1.r, c2.r, t),
            Math.slerp(c1.g, c2.g, t),
            Math.slerp(c1.b, c2.b, t),
            Math.slerp(c1.a, c2.a, t));
    }

    /**
     * Linearly interpolates from one color to another using HSV.
     * @param c1 The first color.
     * @param c2 The second color.
     * @param t The amount to interpolate by.
     * @returns The interpolated color.
     */
    static hueLerp(c1: Color, c2: Color, t: number) {
        const hsv1 = c1.toHSV();
        const hsv2 = c2.toHSV();
        return Color.fromHSV(
            Math.abs(hsv1.h - hsv2.h) < 0.5 ? Math.lerp(hsv1.h, hsv2.h, t) : (hsv1.h > hsv2.h) ? Math.lerp(hsv1.h - 1, hsv2.h, t) : Math.lerp(hsv1.h, hsv2.h - 1, t),
            Math.lerp(hsv1.s, hsv2.s, t),
            Math.lerp(hsv1.v, hsv2.v, t));
    }

    /**
     * Spherically linearly interpolates from one color to another using HSV.
     * 
     * Generally will result in less dark colors compared to `hueLerp`.
     * @param c1 The first color.
     * @param c2 The second color.
     * @param t The amount to interpolate by.
     * @returns The interpolated color.
     */
    static hueSlerp(c1: Color, c2: Color, t: number) {
        const hsv1 = c1.toHSV();
        const hsv2 = c2.toHSV();
        return Color.fromHSV(
            Math.abs(hsv1.h - hsv2.h) < 0.5 ? Math.lerp(hsv1.h, hsv2.h, t) : (hsv1.h > hsv2.h) ? Math.lerp(hsv1.h - 1, hsv2.h, t) : Math.lerp(hsv1.h, hsv2.h - 1, t),
            Math.slerp(hsv1.s, hsv2.s, t),
            Math.slerp(hsv1.v, hsv2.v, t));
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
        [h, s, v] = [Math.mod(h, 1), Math.clamp(s, 0, 1), Math.clamp(v, 0, 1)];
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
        [h, s, l] = [Math.mod(h, 1), Math.clamp(s, 0, 1), Math.clamp(l, 0, 1)];
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