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
    /** The red component. */
    r: number;
    /** The green component. */
    g: number;
    /** The blue component. */
    b: number;
    /** The alpha component. */
    a: number;
    constructor(r: number, g: number, b: number, a?: number);
    copy: () => Color;
    equals: (other: Color) => boolean;
    /**
     * Converts the color to its #RRGGBBAA hexadecimal string representation.
     * @param hasAlpha Whether to include the alpha channel (default: false).
     * @returns The hexadecimal string representation.
     */
    toHexString: (hasAlpha?: boolean) => string;
    /**
     * Converts the color to its HSV representation.
     * @returns The HSV representation.
     */
    toHSV: () => {
        h: number;
        s: number;
        v: number;
    };
    /** Black. */
    static get black(): Color;
    /** Blue. */
    static get blue(): Color;
    /** Green. */
    static get green(): Color;
    /** Cyan. */
    static get cyan(): Color;
    /** Red. */
    static get red(): Color;
    /** Magenta. */
    static get magenta(): Color;
    /** Yellow. */
    static get yellow(): Color;
    /** White. */
    static get white(): Color;
    /** Grey. */
    static get grey(): Color;
    /** Transparent. */
    static get transparent(): Color;
    /**
     * Linearly interpolates from one color to another.
     * @param c1 The first color.
     * @param c2 The second color.
     * @param t The amount to interpolate by.
     * @returns The interpolated color.
     */
    static lerp(c1: Color, c2: Color, t: number): Color;
    /**
     * Spherically linearly interpolates from one color to another.
     * @param c1 The first color.
     * @param c2 The second color.
     * @param t The amount to interpolate by.
     * @returns The interpolated color.
     */
    static slerp(c1: Color, c2: Color, t: number): Color;
    /**
     * Creates a color from its hexadecimal string representation.
     * @param str The hexadecimal string representation.
     * @returns The color.
     */
    static fromHexString: (str: string) => Color;
    /**
     * Creates a color from its HSV representation.
     * @param h The hue.
     * @param s The saturation.
     * @param v The value.
     * @returns The color.
     */
    static fromHSV: (h: number, s: number, v: number) => Color;
}
