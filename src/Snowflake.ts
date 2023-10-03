/**
 * @author Petraller <me@petraller.com>
 */

// Adds two arrays for the given base (10 or 16), returning the result.
// This turns out to be the only "primitive" operation we need.
function add(x: number[], y: number[], base: number) {
    let z: number[] = [];
    let n = Math.max(x.length, y.length);
    let carry = 0;
    let i = 0;
    while (i < n || carry) {
        let xi = i < x.length ? x[i] : 0;
        let yi = i < y.length ? y[i] : 0;
        let zi = carry + xi + yi;
        z.push(zi % base);
        carry = Math.floor(zi / base);
        i++;
    }
    return z;
}

// Returns a*x, where x is an array of decimal digits and a is an ordinary
// JavaScript number. base is the number base of the array x.
function multiplyByNumber(num: number, x: number[], base: number) {
    if (num < 0 || num == 0) return [];

    let result: number[] = [];
    let power = x;
    while (true) {
        if (num & 1) {
            result = add(result, power, base);
        }
        num = num >> 1;
        if (num === 0) break;
        power = add(power, power, base);
    }

    return result;
}

function parseToDigitsArray(str: string, base: number) {
    let digits = str.split('');
    let ary: number[] = [];
    for (let i = digits.length - 1; i >= 0; i--) {
        let n = parseInt(digits[i], base);
        if (isNaN(n)) return null;
        ary.push(n);
    }
    return ary;
}

function convertBase(str: string, fromBase: number, toBase: number) {
    let digits = parseToDigitsArray(str, fromBase);
    if (digits === null) return null;

    let outArray: number[] = [];
    let power = [1];
    for (let i = 0; i < digits.length; i++) {
        // invariant: at this point, fromBase^i = power
        if (digits[i]) {
            outArray = add(outArray, multiplyByNumber(digits[i], power, toBase), toBase);
        }
        power = multiplyByNumber(fromBase, power, toBase);
    }

    let out = '';
    for (let i = outArray.length - 1; i >= 0; i--) {
        out += outArray[i].toString(toBase);
    }
    return out;
}

function decToHex(decStr: string) {
    let hex = convertBase(decStr, 10, 16);
    return hex ? '0x' + hex : null;
}

function hexToDec(hexStr: string) {
    if (hexStr.substring(0, 2) === '0x') hexStr = hexStr.substring(2);
    hexStr = hexStr.toLowerCase();
    return convertBase(hexStr, 16, 10);
}

/**
 * A Snowflake ID.
 */
export type Snowflake = string;

class SnowflakeFactory {
    private static readonly TIME_BYTES = 4;
    private static readonly RANDOM_BYTES = 2;
    private static readonly INCREMENT_BYTES = 2;

    private static increment = 0;

    static make = () => {
        let id = "";
        id += Date.now().toString(16).slice(-SnowflakeFactory.TIME_BYTES * 2).padStart(SnowflakeFactory.TIME_BYTES * 2, '0');
        id += Math.round(Math.random() * Math.pow(256, SnowflakeFactory.RANDOM_BYTES)).toString(16).padStart(SnowflakeFactory.RANDOM_BYTES * 2, '0');
        id += SnowflakeFactory.inc.toString(16).padStart(SnowflakeFactory.INCREMENT_BYTES * 2, '0');
        return id;
    }

    private static get inc() {
        const lim = Math.pow(256, SnowflakeFactory.INCREMENT_BYTES);
        if (++SnowflakeFactory.increment >= lim) { SnowflakeFactory.increment -= lim; }
        return SnowflakeFactory.increment;
    }
}

/**
 * Creates a unique Snowflake ID.
 * @returns A unique Snowflake ID.
 */
export const makeSnowflake: () => Snowflake = SnowflakeFactory.make;
