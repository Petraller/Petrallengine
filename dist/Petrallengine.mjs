function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
/**
 * @author Petraller <me@petraller.com>
 */ var $24207f53032a3f4e$exports = {};

$parcel$export($24207f53032a3f4e$exports, "makeSnowflake", () => $24207f53032a3f4e$export$389de06130c9495c);
/**
 * @author Petraller <me@petraller.com>
 */ // Adds two arrays for the given base (10 or 16), returning the result.
// This turns out to be the only "primitive" operation we need.
function $24207f53032a3f4e$var$add(x, y, base) {
    let z = [];
    let n = Math.max(x.length, y.length);
    let carry = 0;
    let i = 0;
    while(i < n || carry){
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
function $24207f53032a3f4e$var$multiplyByNumber(num, x, base) {
    if (num < 0 || num == 0) return [];
    let result = [];
    let power = x;
    while(true){
        if (num & 1) result = $24207f53032a3f4e$var$add(result, power, base);
        num = num >> 1;
        if (num === 0) break;
        power = $24207f53032a3f4e$var$add(power, power, base);
    }
    return result;
}
function $24207f53032a3f4e$var$parseToDigitsArray(str, base) {
    let digits = str.split("");
    let ary = [];
    for(let i = digits.length - 1; i >= 0; i--){
        let n = parseInt(digits[i], base);
        if (isNaN(n)) return null;
        ary.push(n);
    }
    return ary;
}
function $24207f53032a3f4e$var$convertBase(str, fromBase, toBase) {
    let digits = $24207f53032a3f4e$var$parseToDigitsArray(str, fromBase);
    if (digits === null) return null;
    let outArray = [];
    let power = [
        1
    ];
    for(let i = 0; i < digits.length; i++){
        // invariant: at this point, fromBase^i = power
        if (digits[i]) outArray = $24207f53032a3f4e$var$add(outArray, $24207f53032a3f4e$var$multiplyByNumber(digits[i], power, toBase), toBase);
        power = $24207f53032a3f4e$var$multiplyByNumber(fromBase, power, toBase);
    }
    let out = "";
    for(let i = outArray.length - 1; i >= 0; i--)out += outArray[i].toString(toBase);
    return out;
}
function $24207f53032a3f4e$var$decToHex(decStr) {
    let hex = $24207f53032a3f4e$var$convertBase(decStr, 10, 16);
    return hex ? "0x" + hex : null;
}
function $24207f53032a3f4e$var$hexToDec(hexStr) {
    if (hexStr.substring(0, 2) === "0x") hexStr = hexStr.substring(2);
    hexStr = hexStr.toLowerCase();
    return $24207f53032a3f4e$var$convertBase(hexStr, 16, 10);
}
class $24207f53032a3f4e$var$SnowflakeFactory {
    static #_ = (()=>{
        this.TIME_BYTES = 4;
    })();
    static #_1 = (()=>{
        this.RANDOM_BYTES = 2;
    })();
    static #_2 = (()=>{
        this.INCREMENT_BYTES = 2;
    })();
    static #_3 = (()=>{
        this.increment = 0;
    })();
    static #_4 = (()=>{
        this.make = ()=>{
            let id = "";
            id += Date.now().toString(16).slice(-$24207f53032a3f4e$var$SnowflakeFactory.TIME_BYTES * 2).padStart($24207f53032a3f4e$var$SnowflakeFactory.TIME_BYTES * 2, "0");
            id += Math.round(Math.random() * Math.pow(256, $24207f53032a3f4e$var$SnowflakeFactory.RANDOM_BYTES)).toString(16).padStart($24207f53032a3f4e$var$SnowflakeFactory.RANDOM_BYTES * 2, "0");
            id += $24207f53032a3f4e$var$SnowflakeFactory.inc.toString(16).padStart($24207f53032a3f4e$var$SnowflakeFactory.INCREMENT_BYTES * 2, "0");
            return id;
        };
    })();
    static get inc() {
        const lim = Math.pow(256, $24207f53032a3f4e$var$SnowflakeFactory.INCREMENT_BYTES);
        if (++$24207f53032a3f4e$var$SnowflakeFactory.increment >= lim) $24207f53032a3f4e$var$SnowflakeFactory.increment -= lim;
        return $24207f53032a3f4e$var$SnowflakeFactory.increment;
    }
}
const $24207f53032a3f4e$export$389de06130c9495c = $24207f53032a3f4e$var$SnowflakeFactory.make;


/**
 * @author Petraller <me@petraller.com>
 */ /**
 * @author Petraller <me@petraller.com>
 */ /**
 * Checks if an object implements a drawable.
 * @param obj The object.
 * @returns Whether the object implements a drawable.
 */ function $936ba809947b4de6$export$1508030049b632ec(obj) {
    return "onDraw" in obj && obj.onDraw instanceof Function;
}


/**
 * @author Petraller <me@petraller.com>
 */ /**
 * Checks if an object implements a debug drawable.
 * @param obj The object.
 * @returns Whether the object implements a debug drawable.
 */ function $3d145095d1c4fd99$export$c9e1b957c27b07fb(obj) {
    return "onDebugDraw" in obj && obj.onDebugDraw instanceof Function;
}


/**
 * @author Petraller <me@petraller.com>
 */ /**
 * @author Petraller <me@petraller.com>
 */ 
/**
 * @author Petraller <me@petraller.com>
 */ /**
 * @author Petraller <me@petraller.com>
 */ /** */ Math.lerp = (x, y, t)=>x * (1 - t) + y * t;
Math.clamp = (x, min, max)=>Math.min(Math.max(x, min), max);
Math.mod = (x, y)=>x >= 0 ? x % Math.abs(y) : Math.abs(y) - -x % Math.abs(y) % Math.abs(y);


class $8ec4c8ffa911853c$export$2e2bcd8739ae039 {
    constructor(x, y){
        this._x = 0;
        this._y = 0;
        this.copy = ()=>new $8ec4c8ffa911853c$export$2e2bcd8739ae039(this.x, this.y);
        this.equals = (other)=>this.x === other.x && this.y === other.y;
        this._x = x;
        this._y = y;
    }
    /** The x-component. */ get x() {
        return this._x;
    }
    /** The y-component. */ get y() {
        return this._y;
    }
    /** The squared length of this vector. */ get sqrLength() {
        return this.x * this.x + this.y * this.y;
    }
    /** The length of this vector. */ get length() {
        return Math.sqrt(this.sqrLength);
    }
    /** The normalized form of this vector. */ get normalized() {
        const l = this.length;
        return l == 0 ? $8ec4c8ffa911853c$export$2e2bcd8739ae039.zero : $8ec4c8ffa911853c$export$2e2bcd8739ae039.divide(this, l);
    }
    /** A normal to this vector. */ get normal() {
        return new $8ec4c8ffa911853c$export$2e2bcd8739ae039(-this.y, this.x);
    }
    /** The value of the minimum component of this vector. */ get minComponent() {
        return this.x < this.y ? this.x : this.y;
    }
    /** The value of the maximum component of this vector. */ get maxComponent() {
        return this.x > this.y ? this.x : this.y;
    }
    /** The zero vector. */ static get zero() {
        return new $8ec4c8ffa911853c$export$2e2bcd8739ae039(0, 0);
    }
    /** The half vector. */ static get half() {
        return new $8ec4c8ffa911853c$export$2e2bcd8739ae039(0.5, 0.5);
    }
    /** The unit vector. */ static get one() {
        return new $8ec4c8ffa911853c$export$2e2bcd8739ae039(1, 1);
    }
    /** The right vector. */ static get right() {
        return new $8ec4c8ffa911853c$export$2e2bcd8739ae039(1, 0);
    }
    /** The left vector. */ static get left() {
        return new $8ec4c8ffa911853c$export$2e2bcd8739ae039(-1, 0);
    }
    /** The down vector. */ static get down() {
        return new $8ec4c8ffa911853c$export$2e2bcd8739ae039(0, 1);
    }
    /** The up vector. */ static get up() {
        return new $8ec4c8ffa911853c$export$2e2bcd8739ae039(0, -1);
    }
    /** The negative infinity vector. */ static get negativeInfinity() {
        return new $8ec4c8ffa911853c$export$2e2bcd8739ae039(-Infinity, -Infinity);
    }
    /** The infinity vector. */ static get infinity() {
        return new $8ec4c8ffa911853c$export$2e2bcd8739ae039(Infinity, Infinity);
    }
    static #_ = (()=>{
        /**
     * Adds two vectors component-wise.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The sum vector.
     */ this.add = (v1, v2)=>new $8ec4c8ffa911853c$export$2e2bcd8739ae039(v1.x + v2.x, v1.y + v2.y);
    })();
    static #_1 = (()=>{
        /**
     * Multiplies a vector by a constant.
     * @param v The vector.
     * @param n The constant
     * @returns The scaled vector.
     */ this.multiply = (v, n)=>new $8ec4c8ffa911853c$export$2e2bcd8739ae039(v.x * n, v.y * n);
    })();
    static #_2 = (()=>{
        /**
     * Multiplies two vectors component-wise.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The scaled vector.
     */ this.multiplyComponents = (v1, v2)=>new $8ec4c8ffa911853c$export$2e2bcd8739ae039(v1.x * v2.x, v1.y * v2.y);
    })();
    static #_3 = (()=>{
        /**
     * Subtracts one vector from another.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The difference vector.
     */ this.subtract = (v1, v2)=>$8ec4c8ffa911853c$export$2e2bcd8739ae039.add(v1, $8ec4c8ffa911853c$export$2e2bcd8739ae039.multiply(v2, -1));
    })();
    static #_4 = (()=>{
        /**
     * Divides a vector by a constant.
     * @param v The vector.
     * @param n The constant.
     * @returns The scaled vector.
     */ this.divide = (v, n)=>$8ec4c8ffa911853c$export$2e2bcd8739ae039.multiply(v, 1 / n);
    })();
    static #_5 = (()=>{
        /**
     * Inverts a vector component-wise.
     * @param v The vector.
     * @returns The inverted vector.
     */ this.inverse = (v)=>new $8ec4c8ffa911853c$export$2e2bcd8739ae039(1 / v.x, 1 / v.y);
    })();
    static #_6 = (()=>{
        /**
     * Dot multiplies two vectors.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The dot product.
     */ this.dot = (v1, v2)=>v1.x * v2.x + v1.y * v2.y;
    })();
    static #_7 = (()=>{
        /**
     * Cross multiplies two vectors.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The magnitude of the cross product.
     */ this.cross = (v1, v2)=>v1.x * v2.y - v1.y * v2.x;
    })();
    static #_8 = (()=>{
        /**
     * Rotates a vector by an angle.
     * @param deg The angle in degrees.
     * @returns The rotated vector.
     */ this.rotate = (v, deg)=>{
            const r = deg * Math.PI / 180;
            const x = Math.cos(r) * v.x - Math.sin(r) * v.y;
            const y = Math.sin(r) * v.x + Math.cos(r) * v.y;
            return new $8ec4c8ffa911853c$export$2e2bcd8739ae039(x, y);
        };
    })();
    static #_9 = (()=>{
        /**
     * Transforms a vector by a matrix.
     * @param m The matrix.
     * @param v The vector.
     * @returns The transformed vector.
     */ this.transform = (m, v)=>{
            const x = v.x * m.get(0, 0) + v.y * m.get(0, 1) + m.get(0, 2);
            const y = v.x * m.get(1, 0) + v.y * m.get(1, 1) + m.get(1, 2);
            return new $8ec4c8ffa911853c$export$2e2bcd8739ae039(x, y);
        };
    })();
    static #_10 = (()=>{
        /**
     * Converts an angle in degrees to a unit vector.
     * @param deg The angle in degrees.
     * @returns The vector.
     */ this.fromAngle = (deg)=>{
            const r = deg * Math.PI / 180;
            return new $8ec4c8ffa911853c$export$2e2bcd8739ae039(Math.cos(r), Math.sin(r));
        };
    })();
    static #_11 = (()=>{
        /**
     * Converts a vector to its angle from the x-axis.
     * @param v The vector.
     * @returns The angle in degrees.
     */ this.toAngle = (v)=>{
            if (v.x == 0) return v.y >= 0 ? 90 : -90;
            return (v.x > 0 ? 0 : v.y > 0 ? 180 : -180) + Math.atan(v.y / v.x) * 180 / Math.PI;
        };
    })();
    static #_12 = (()=>{
        /**
     * Converts an arbitrary object with x and y properties to a vector.
     * @param obj The object.
     * @returns The vector.
     */ this.fromObjXY = (obj)=>new $8ec4c8ffa911853c$export$2e2bcd8739ae039(obj.x, obj.y);
    })();
    static #_13 = (()=>{
        /**
     * Converts an arbitrary object with width and height properties to a vector.
     * @param obj The object.
     * @returns The vector.
     */ this.fromObjWH = (obj)=>new $8ec4c8ffa911853c$export$2e2bcd8739ae039(obj.width, obj.height);
    })();
    static #_14 = (()=>{
        /**
     * Converts a 3-tuple to a vector, omitting the last element of the tuple.
     * @param obj The 3-tuple.
     * @returns The vector.
     */ this.from3Tuple = (obj)=>new $8ec4c8ffa911853c$export$2e2bcd8739ae039(obj[0], obj[1]);
    })();
    static #_15 = (()=>{
        /**
     * Linearly interpolates from one vector to another.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @param t The amount to interpolate by.
     * @returns The interpolated vector.
     */ this.lerp = (v1, v2, t)=>new $8ec4c8ffa911853c$export$2e2bcd8739ae039(Math.lerp(v1.x, v2.x, t), Math.lerp(v1.y, v2.y, t));
    })();
    static #_16 = (()=>{
        /**
     * Linearly interpolates from one vector to another.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @param t The amount to interpolate by.
     * @returns The interpolated vector.
     */ this.lerpComponents = (v1, v2, t)=>new $8ec4c8ffa911853c$export$2e2bcd8739ae039(Math.lerp(v1.x, v2.x, t.x), Math.lerp(v1.y, v2.y, t.y));
    })();
}


/**
 * @author Petraller <me@petraller.com>
 */ 

class $a53cef81bd683a5b$export$2e2bcd8739ae039 {
    constructor(m){
        /** The matrix. */ this._m = [
            [
                0,
                0,
                0
            ],
            [
                0,
                0,
                0
            ],
            [
                0,
                0,
                0
            ]
        ];
        this.copy = ()=>new $a53cef81bd683a5b$export$2e2bcd8739ae039(this._m);
        this.equals = (other)=>{
            for(let r = 0; r < 3; ++r)for(let c = 0; c < 3; ++c)if (this._m[r][c] !== other._m[r][c]) return false;
            return true;
        };
        /**
     * Retrieves an element of the matrix.
     * @param r The row index.
     * @param c The column index.
     * @returns The element.
     */ this.get = (r, c)=>this._m[r][c];
        /**
     * Sets an element of the matrix.
     * @param r The row index.
     * @param c The column index.
     * @param value The value.
     * @returns This matrix after setting.
     */ this.set = (r, c, value)=>{
            this._m[r][c] = value;
            return this;
        };
        /**
     * Retrieves a row of the matrix.
     * @param r The row index.
     * @returns The row.
     */ this.getRow = (r)=>[
                this._m[r][0],
                this._m[r][1],
                this._m[r][2]
            ];
        /**
     * Retrieves a column of the matrix.
     * @param c The column index.
     * @returns The column.
     */ this.getColumn = (c)=>[
                this._m[0][c],
                this._m[1][c],
                this._m[2][c]
            ];
        /**
     * Retrieves a minor of the matrix.
     * @param r The row index to omit.
     * @param c The column index to omit.
     * @returns The minor.
     */ this.getMinor = (r, c)=>[
                r == 0 ? [
                    c == 0 ? this._m[1][1] : this._m[1][0],
                    c == 2 ? this._m[1][1] : this._m[1][2]
                ] : [
                    c == 0 ? this._m[0][1] : this._m[0][0],
                    c == 2 ? this._m[0][1] : this._m[0][2]
                ],
                r == 2 ? [
                    c == 0 ? this._m[1][1] : this._m[1][0],
                    c == 2 ? this._m[1][1] : this._m[1][2]
                ] : [
                    c == 0 ? this._m[2][1] : this._m[2][0],
                    c == 2 ? this._m[2][1] : this._m[2][2]
                ]
            ];
        /**
     * Retrieves the determinant of a cofactor of the matrix.
     * @param r The row index of the element.
     * @param c The column index of the element.
     * @returns The determinant of the cofactor.
     */ this.getCofactorDeterminant = (r, c)=>{
            let minor = this.getMinor(r, c);
            let i = (r + c) % 2 === 0 ? 1 : -1;
            return i * (minor[0][0] * minor[1][1] - minor[1][0] * minor[0][1]);
        };
        for(let r = 0; r < 3; ++r)for(let c = 0; c < 3; ++c)this._m[r][c] = m ? m[r][c] : 0;
    }
    /** The determinant of this matrix. */ get determinant() {
        return this._m[0][0] * (this._m[1][1] * this._m[2][2] - this._m[1][2] * this._m[2][1]) + this._m[0][1] * (this._m[1][2] * this._m[2][0] - this._m[1][0] * this._m[2][2]) + this._m[0][2] * (this._m[1][0] * this._m[2][1] - this._m[1][1] * this._m[2][0]);
    }
    /** The translation component of the matrix. */ get translation() {
        return (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).from3Tuple(this.getColumn(2));
    }
    set translation(value) {
        this.set(0, 2, value.x).set(1, 2, value.y);
    }
    /** The non-negative scale component of the matrix. */ get scale() {
        return new (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039)((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).from3Tuple(this.getColumn(0)).length, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).from3Tuple(this.getColumn(1)).length);
    }
    /** The zero matrix. */ static get zero() {
        return new $a53cef81bd683a5b$export$2e2bcd8739ae039([
            [
                0,
                0,
                0
            ],
            [
                0,
                0,
                0
            ],
            [
                0,
                0,
                0
            ]
        ]);
    }
    /** The identity matrix. */ static get identity() {
        return new $a53cef81bd683a5b$export$2e2bcd8739ae039([
            [
                1,
                0,
                0
            ],
            [
                0,
                1,
                0
            ],
            [
                0,
                0,
                1
            ]
        ]);
    }
    static #_ = (()=>{
        /**
     * Adds two matrices component-wise.
     * 
     * Does not modify the original matrices.
     * @param m1 The first matrix.
     * @param m2 The second matrix.
     * @returns The sum matrix.
     */ this.add = (m1, m2)=>{
            let result = new $a53cef81bd683a5b$export$2e2bcd8739ae039();
            for(let r = 0; r < 3; ++r)for(let c = 0; c < 3; ++c)result._m[r][c] = m1._m[r][c] + m2._m[r][c];
            return result;
        };
    })();
    static #_1 = (()=>{
        /**
     * Multiplies a matrix by a constant.
     * 
     * Does not modify the original matrix.
     * @param m The matrix.
     * @param n The constant
     * @returns The scaled matrix.
     */ this.multiply = (m, n)=>{
            let result = new $a53cef81bd683a5b$export$2e2bcd8739ae039();
            for(let r = 0; r < 3; ++r)for(let c = 0; c < 3; ++c)result._m[r][c] = m._m[r][c] * n;
            return result;
        };
    })();
    static #_2 = (()=>{
        /**
     * Multiplies two matrices.
     * 
     * Does not modify the original matrices.
     * @param m1 The first matrix.
     * @param m2 The second matrix.
     * @returns The multiplied matrix.
     */ this.matrixMultiply = (m1, m2)=>{
            let result = new $a53cef81bd683a5b$export$2e2bcd8739ae039();
            for(let r = 0; r < 3; ++r)for(let c = 0; c < 3; ++c)for(let i = 0; i < 3; ++i)result._m[r][c] += m1._m[r][i] * m2._m[i][c];
            return result;
        };
    })();
    static #_3 = (()=>{
        /**
     * Subtracts one matrix from another.
     * 
     * Does not modify the original matrices.
     * @param m1 The first matrix.
     * @param m2 The second matrix.
     * @returns The difference matrix.
     */ this.subtract = (m1, m2)=>$a53cef81bd683a5b$export$2e2bcd8739ae039.add(m1, $a53cef81bd683a5b$export$2e2bcd8739ae039.multiply(m2, -1));
    })();
    static #_4 = (()=>{
        /**
     * Divides a matrix by a constant.
     * 
     * Does not modify the original matrix.
     * @param m The matrix.
     * @param n The constant
     * @returns The scaled matrix.
     */ this.divide = (m, n)=>$a53cef81bd683a5b$export$2e2bcd8739ae039.multiply(m, 1 / n);
    })();
    static #_5 = (()=>{
        /**
     * Transposes a matrix.
     * @param m The matrix.
     * @returns The transposed matrix.
     */ this.transpose = (m)=>{
            return new $a53cef81bd683a5b$export$2e2bcd8739ae039([
                [
                    m._m[0][0],
                    m._m[1][0],
                    m._m[2][0]
                ],
                [
                    m._m[0][1],
                    m._m[1][1],
                    m._m[2][1]
                ],
                [
                    m._m[0][2],
                    m._m[1][2],
                    m._m[2][2]
                ]
            ]);
        };
    })();
    static #_6 = (()=>{
        /**
     * Inverts a matrix. If the matrix is not invertible, an error is thrown.
     * 
     * Does not modify the original matrix.
     * @param m The matrix.
     * @returns The inverse matrix.
     */ this.inverse = (m)=>{
            const det = m.determinant;
            if (det === 0) {
                console.error(`Matrix ${m._m} is not invertible`);
                return m;
            }
            return $a53cef81bd683a5b$export$2e2bcd8739ae039.multiply(new $a53cef81bd683a5b$export$2e2bcd8739ae039([
                [
                    m.getCofactorDeterminant(0, 0),
                    m.getCofactorDeterminant(1, 0),
                    m.getCofactorDeterminant(2, 0)
                ],
                [
                    m.getCofactorDeterminant(0, 1),
                    m.getCofactorDeterminant(1, 1),
                    m.getCofactorDeterminant(2, 1)
                ],
                [
                    m.getCofactorDeterminant(0, 2),
                    m.getCofactorDeterminant(1, 2),
                    m.getCofactorDeterminant(2, 2)
                ]
            ]), 1 / det);
        };
    })();
    static #_7 = (()=>{
        /**
     * Constructs a translation matrix.
     * @param v The translation vector.
     * @returns The translation matrix.
     */ this.makeTranslation = (v)=>{
            return $a53cef81bd683a5b$export$2e2bcd8739ae039.identity.set(0, 2, v.x).set(1, 2, v.y);
        };
    })();
    static #_8 = (()=>{
        /**
     * Constructs a rotation matrix.
     * @param deg The rotation in degrees.
     * @returns The rotation matrix.
     */ this.makeRotation = (deg)=>{
            const r = deg * Math.PI / 180;
            return $a53cef81bd683a5b$export$2e2bcd8739ae039.identity.set(0, 0, Math.cos(r)).set(0, 1, -Math.sin(r)).set(1, 0, Math.sin(r)).set(1, 1, Math.cos(r));
        };
    })();
    static #_9 = (()=>{
        /**
     * Constructs a scaling matrix.
     * @param v The scaling vector.
     * @returns The scaling matrix.
     */ this.makeScaling = (v)=>{
            return $a53cef81bd683a5b$export$2e2bcd8739ae039.identity.set(0, 0, v.x).set(1, 1, v.y);
        };
    })();
    static #_10 = (()=>{
        /**
     * Constructs a transformation matrix.
     * @param t The translation vector.
     * @param r The rotation in degrees.
     * @param s The scaling vector.
     * @returns The transformation matrix.
     */ this.makeTransformation = (t, r, s)=>{
            return $a53cef81bd683a5b$export$2e2bcd8739ae039.matrixMultiply($a53cef81bd683a5b$export$2e2bcd8739ae039.matrixMultiply($a53cef81bd683a5b$export$2e2bcd8739ae039.makeTranslation(t), $a53cef81bd683a5b$export$2e2bcd8739ae039.makeRotation(r)), $a53cef81bd683a5b$export$2e2bcd8739ae039.makeScaling(s));
        };
    })();
}


class $3f8760cc7c29435c$export$2e2bcd8739ae039 {
    /**
     * Avoid calling `new Node`, call `Petrallengine.root.createChild` instead.
     */ constructor(flag, name = "New Node"){
        this._isEnabled = true;
        this._position = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).zero;
        this._rotation = 0;
        this._scale = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).one;
        this._parent = null;
        this._transform = (0, $a53cef81bd683a5b$export$2e2bcd8739ae039).identity;
        this._globalTransform = (0, $a53cef81bd683a5b$export$2e2bcd8739ae039).identity;
        this._isDirty = false;
        /** The unique Snowflake ID of this node. */ this.id = (0, $24207f53032a3f4e$export$389de06130c9495c)();
        /** The name of this node. */ this.name = "New Node";
        /** The children nodes of this node. */ this.children = [];
        /** Whether this node has started. */ this.isStarted = false;
        if (!flag) {
            console.warn(`Avoid calling \`new Node\`, call \`Petrallengine.root.createChild\` instead`);
            console.trace(`\`new Node\` call occured here:`);
        }
        this.name = name;
    }
    toString() {
        return `${this.name}#${this.id}`;
    }
    /** The enabled state of this node. */ get isEnabled() {
        return this._isEnabled;
    }
    set isEnabled(value) {
        this._isEnabled = value;
        if (value) this.onEnable?.call(this);
        else this.onDisable?.call(this);
    }
    /** The position of this node. */ get position() {
        return this._position;
    }
    set position(value) {
        this._position = value;
        this._isDirty = true;
    }
    /** The global position of this node. */ get globalPosition() {
        return this.globalTransform.translation;
    }
    set globalPosition(value) {
        const parent = this.parent ? this.parent.globalTransform : (0, $a53cef81bd683a5b$export$2e2bcd8739ae039).identity;
        const parentInverse = (0, $a53cef81bd683a5b$export$2e2bcd8739ae039).inverse(parent);
        const local = (0, $a53cef81bd683a5b$export$2e2bcd8739ae039).matrixMultiply(parentInverse, (0, $a53cef81bd683a5b$export$2e2bcd8739ae039).makeTransformation(value, this._rotation, this._scale));
        this.position = local.translation;
    }
    /** The rotation in degrees of this node. */ get rotation() {
        return this._rotation;
    }
    set rotation(value) {
        this._rotation = (value + 180) % 360 - 180;
        this._isDirty = true;
    }
    /** The global rotation in degrees of this node. */ get globalRotation() {
        let rot = this._rotation;
        let curr = this._parent;
        while(curr !== null){
            rot += curr._rotation;
            curr = curr._parent;
        }
        return rot;
    }
    set globalRotation(value) {
        let rot = 0;
        let curr = this._parent;
        while(curr !== null){
            rot += curr._rotation;
            curr = curr._parent;
        }
        this.rotation = value - rot;
    }
    /** The scale of this node. */ get scale() {
        return this._scale;
    }
    set scale(value) {
        this._scale = value;
        this._isDirty = true;
    }
    /** The global scale of this node. */ get globalScale() {
        return this.globalTransform.scale;
    }
    /** The transformation matrix of this node. */ get transform() {
        this.recalculateTransformMatrix();
        return this._transform;
    }
    /** The global transformation matrix of this node. */ get globalTransform() {
        this.recalculateTransformMatrix();
        return this._globalTransform;
    }
    /** The parent node of this node. */ get parent() {
        return this._parent;
    }
    set parent(value) {
        if (value && value.isDescendantOf(this)) {
            // Hey stop that. No circular hierarchy pls
            console.error(`Making \`${value.toString()}\` a parent of \`${this.toString()}\` will create a circular hierarchy`);
            return;
        }
        if (this._parent) {
            const i = this._parent.children.indexOf(this);
            if (i !== -1) this._parent.children.splice(i, 1);
        }
        this._parent = value;
        if (this._parent) this._parent.children.push(this);
    }
    /** The sibling index of this node. */ get siblingIndex() {
        if (!this._parent) return 0;
        return this._parent.children.indexOf(this);
    }
    set siblingIndex(value) {
        if (!this._parent) return;
        const i = this.siblingIndex;
        this._parent.children.splice(i, 1);
        this._parent.children.splice(value, 0, this);
    }
    /**
     * Creates a new child node of this node.
     * @returns The child node.
     */ createChild(type) {
        const node = new type(this.createChild);
        node.parent = this;
        node.onCreate?.call(node);
        return node;
    }
    /**
     * Destroys this node and all children nodes.
     */ destroy() {
        for (let child of this.children)child.destroy();
        this.onDestroy?.call(this);
        this.parent = null;
    }
    /**
     * Finds a descendant node by its name.
     * @param name The name of the node.
     * @returns The node, or null if not found.
     */ findDescendantByName(name) {
        for (let child of this.children){
            if (child.name == name) return child;
        }
        for (let child of this.children){
            const result = child.findDescendantByName(name);
            if (result) return result;
        }
        return null;
    }
    /**
     * Finds a descendant node by its type.
     * @param type The type of the node.
     * @returns The node, or null if not found.
     */ findDescendantByType(type) {
        for (let child of this.children){
            if (child instanceof type) return child;
        }
        for (let child of this.children){
            const result = child.findDescendantByType(type);
            if (result) return result;
        }
        return null;
    }
    /**
     * Determines if this node is a descendent of another node.
     * @param node The other node.
     * @returns Whether this node is a descendant.
     */ isDescendantOf(node) {
        let curr = this.parent;
        while(curr !== null){
            if (curr === node) return true;
            curr = curr.parent;
        }
        return false;
    }
    /**
     * Recalculates the transformation matrices and unsets the dirty flag.
     */ recalculateTransformMatrix() {
        if (!this._isDirty) return;
        // Calculate
        this._transform = (0, $a53cef81bd683a5b$export$2e2bcd8739ae039).makeTransformation(this._position, this._rotation, this._scale);
        if (this.parent) this._globalTransform = (0, $a53cef81bd683a5b$export$2e2bcd8739ae039).matrixMultiply(this.parent.globalTransform, this._transform);
        else this._globalTransform = this._transform.copy();
        // Dirty children
        for (const child of this.children)child._isDirty = true;
        this._isDirty = false;
    }
}



class $46a097085382b218$export$2e2bcd8739ae039 extends (0, $3f8760cc7c29435c$export$2e2bcd8739ae039) {
    /** The velocity of this body. */ get velocity() {
        return this._velocity;
    }
    set velocity(value) {
        this._velocity = value;
    }
    constructor(...args){
        super(...args);
        this._velocity = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).zero;
    }
}


/**
 * @author Petraller <me@petraller.com>
 */ 
/**
 * @author Petraller <me@petraller.com>
 */ 

class $b31606e820d5109e$export$2e2bcd8739ae039 {
    constructor(min, max){
        /** The minimum components. */ this.min = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).zero;
        /** The maximum components. */ this.max = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).zero;
        this.copy = ()=>new $b31606e820d5109e$export$2e2bcd8739ae039(this.min, this.max);
        this.equals = (other)=>this.min.equals(other.min) && this.max.equals(other.max);
        /**
     * Determines if a point exists inside this bounds.
     * @param point The point.
     * @returns Whether the point exists inside this bounds.
     */ this.contains = (point)=>point.x >= this.min.x && point.x <= this.max.x && point.y >= this.min.y && point.y <= this.max.y;
        /**
     * Determines if this bounds overlaps with another bounds.
     * @param other The other bounds.
     * @returns Whether the bounds overlap.
     */ this.overlaps = (other)=>this.min.x <= other.max.x && this.max.x >= other.min.x && this.max.y >= other.min.y && this.min.y <= other.max.y;
        this.min = min.copy();
        this.max = max.copy();
    }
    /** The size of the bounds. */ get size() {
        return (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(this.max, this.min);
    }
    /** The zero bounds, [(0, 0), (0, 0)]. */ static get zero() {
        return new $b31606e820d5109e$export$2e2bcd8739ae039((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).zero, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).zero);
    }
    /** The unit bounds, [(0, 0), (1, 1)]. */ static get unit() {
        return new $b31606e820d5109e$export$2e2bcd8739ae039((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).zero, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).one);
    }
    /** The normalized bounds, [(-0.5, -0.5), (0.5, 0.5)]. */ static get norm() {
        return new $b31606e820d5109e$export$2e2bcd8739ae039((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).one, -0.5), (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).one, 0.5));
    }
    static #_ = (()=>{
        /**
     * Create bounds based on a set of vertices.
     * @param vertices The vertices.
     * @returns The bounds.
     */ this.fromVertices = (vertices)=>{
            let b = new $b31606e820d5109e$export$2e2bcd8739ae039((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).infinity, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).negativeInfinity);
            // Iterate all vertices
            for (const vertex of vertices){
                if (vertex.x > b.max.x) b.max = new (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039)(vertex.x, b.max.y);
                if (vertex.x < b.min.x) b.min = new (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039)(vertex.x, b.min.y);
                if (vertex.y > b.max.y) b.max = new (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039)(b.max.x, vertex.y);
                if (vertex.y < b.min.y) b.min = new (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039)(b.min.x, vertex.y);
            }
            return b;
        };
    })();
    static #_1 = (()=>{
        /**
     * Create bounds that envelop a set of bounds.
     * @param boundses The set of bounds to envelop.
     * @returns The bounds.
     */ this.makeEnvelop = (boundses)=>{
            let b = new $b31606e820d5109e$export$2e2bcd8739ae039((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).infinity, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).negativeInfinity);
            // Iterate all bounds
            for (const bounds of boundses){
                if (bounds.max.x > b.max.x) b.max = new (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039)(bounds.max.x, b.max.y);
                if (bounds.min.x < b.min.x) b.min = new (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039)(bounds.min.x, b.min.y);
                if (bounds.max.y > b.max.y) b.max = new (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039)(b.max.x, bounds.max.y);
                if (bounds.min.y < b.min.y) b.min = new (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039)(b.min.x, bounds.min.y);
            }
            return b;
        };
    })();
    static #_2 = (()=>{
        /**
     * Translates bounds.
     * @param b The bounds.
     * @param v The translation vector.
     * @returns The translated bounds.
     */ this.translate = (b, v)=>{
            return new $b31606e820d5109e$export$2e2bcd8739ae039((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(b.min, v), (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(b.max, v));
        };
    })();
    static #_3 = (()=>{
        /**
     * Scales bounds.
     * @param b The bounds.
     * @param v The scale vector.
     * @param origin The normalized origin to scale from.
     * @returns The scaled bounds.
     */ this.scale = (b, v, origin = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).one, 0.5))=>{
            const o = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).lerpComponents(b.min, b.max, origin);
            return new $b31606e820d5109e$export$2e2bcd8739ae039((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiplyComponents((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(b.min, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(o, -1)), v), o), (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiplyComponents((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(b.max, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(o, -1)), v), o));
        };
    })();
    static #_4 = (()=>{
        /**
     * Shifts bounds such that its origin is at a given position.
     * @param b The bounds.
     * @param pos The position.
     * @param origin The normalized origin of the bounds.
     * @returns The shifted bounds.
     */ this.shift = (b, pos, origin = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).one, 0.5))=>{
            const o = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).lerpComponents(b.min, b.max, origin);
            return $b31606e820d5109e$export$2e2bcd8739ae039.translate(b, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(pos, o));
        };
    })();
    static #_5 = (()=>{
        /**
     * Extends bounds by a vector.
     * @param b The bounds.
     * @param v The extension vector.
     * @returns The extended bounds.
     */ this.extend = (b, v)=>{
            if (v.x > 0) b.max = new (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039)(b.max.x + v.x, b.max.y);
            else b.min = new (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039)(b.min.x + v.x, b.min.y);
            if (v.y > 0) b.max = new (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039)(b.max.x, b.max.y + v.y);
            else b.min = new (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039)(b.min.x, b.min.y + v.y);
            return b;
        };
    })();
}


class $084fb6562cdf6a86$export$2e2bcd8739ae039 extends (0, $3f8760cc7c29435c$export$2e2bcd8739ae039) {
    static #_ = (()=>{
        this.BOUNDS_PADDING = 10;
    })();
    /** The globally positioned bounds of this collider. */ get bounds() {
        return this._bounds.copy();
    }
    /** 
     * The "bounciness" of this collider.
     * 
     * A value of 0 is perfectly inelastic.
     * A value of 1 is perfectly elastic.
     * A value above 1 is energy generating.
     */ get restitution() {
        return this._restitution;
    }
    set restitution(value) {
        this._restitution = Math.max(value, 0);
    }
    /**
     * Determines if this collider can interact with another collider based on their layers.
     * @param other The other collider.
     * @returns Whether the colliders can interact.
     */ canCollideWith(other) {
        return (other.layers & this.filter) !== 0;
    }
    onDebugDraw(context) {
        // Draw bb
        context.strokeStyle = "#00ffff";
        context.strokeRect(this._bounds.min.x, this._bounds.min.y, this._bounds.size.x, this._bounds.size.y);
    }
    constructor(...args){
        super(...args);
        this._bounds = (0, $b31606e820d5109e$export$2e2bcd8739ae039).zero;
        this._restitution = 1;
        /** The layers this body is part of. */ this.layers = 0x00000001;
        /** The layers this body can interact with. */ this.filter = 0x00000001;
    }
}



/**
 * @author Petraller <me@petraller.com>
 */ 
class $511d31ae5212a454$export$2e2bcd8739ae039 {
    static #_ = (()=>{
        /**
     * The position of the camera.
     */ this.position = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).zero;
    })();
    static #_1 = (()=>{
        /**
     * The rotation of the camera.
     */ this.rotation = 0;
    })();
    static #_2 = (()=>{
        /**
     * The scale of the camera.
     */ this.scale = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).one;
    })();
}


/**
 * @author Petraller <me@petraller.com>
 */ 


class $35fd48d1ddd84d0f$export$2e2bcd8739ae039 {
    static #_ = (()=>{
        this.singleton = null;
    })();
    static #_1 = (()=>{
        this.canvas = null;
    })();
    static #_2 = (()=>{
        this.keyStates = new Set();
    })();
    static #_3 = (()=>{
        this.keyTransits = new Set();
    })();
    static #_4 = (()=>{
        this.mouseStates = new Set();
    })();
    static #_5 = (()=>{
        this.mouseTransits = new Set();
    })();
    static #_6 = (()=>{
        this.mousePos = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).zero;
    })();
    constructor(canvas){
        if ($35fd48d1ddd84d0f$export$2e2bcd8739ae039.singleton) {
            console.warn("Input is used as a static class, do not create additional objects of Input");
            return;
        }
        $35fd48d1ddd84d0f$export$2e2bcd8739ae039.singleton = this;
        // Register canvas events
        $35fd48d1ddd84d0f$export$2e2bcd8739ae039.canvas = canvas;
        canvas.onmousedown = (ev)=>{
            const b = ev.button;
            $35fd48d1ddd84d0f$export$2e2bcd8739ae039.mouseStates.add(b);
            $35fd48d1ddd84d0f$export$2e2bcd8739ae039.mouseTransits.add(b);
        };
        canvas.onmouseup = canvas.onmouseleave = (ev)=>{
            const b = ev.button;
            $35fd48d1ddd84d0f$export$2e2bcd8739ae039.mouseStates.delete(b);
            $35fd48d1ddd84d0f$export$2e2bcd8739ae039.mouseTransits.add(b);
        };
        canvas.onmousemove = (ev)=>{
            $35fd48d1ddd84d0f$export$2e2bcd8739ae039.mousePos = new (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039)(ev.offsetX, ev.offsetY);
        };
        // Register window events
        window.onkeydown = (ev)=>{
            const c = ev.code;
            if (!ev.repeat) {
                $35fd48d1ddd84d0f$export$2e2bcd8739ae039.keyStates.add(c);
                $35fd48d1ddd84d0f$export$2e2bcd8739ae039.keyTransits.add(c);
            }
            ev.preventDefault();
        };
        window.onkeyup = (ev)=>{
            const c = ev.code;
            $35fd48d1ddd84d0f$export$2e2bcd8739ae039.keyStates.delete(c);
            $35fd48d1ddd84d0f$export$2e2bcd8739ae039.keyTransits.add(c);
            ev.preventDefault();
        };
    }
    /**
     * Clears all internal flags at the end of the frame.
     * 
     * Called by `Petrallengine.create`.
     */ endFrame() {
        for (let i of $35fd48d1ddd84d0f$export$2e2bcd8739ae039.keyTransits.keys())$35fd48d1ddd84d0f$export$2e2bcd8739ae039.keyTransits.delete(i);
        for (let i of $35fd48d1ddd84d0f$export$2e2bcd8739ae039.mouseTransits.keys())$35fd48d1ddd84d0f$export$2e2bcd8739ae039.mouseTransits.delete(i);
    }
    /**
     * Returns whether a keyboard key is down.
     * @param keyCode The code of the key.
     * @returns Whether the key is down.
     */ static isKey(keyCode) {
        return $35fd48d1ddd84d0f$export$2e2bcd8739ae039.keyStates.has(keyCode);
    }
    /**
     * Returns whether a keyboard key was pressed this frame.
     * @param keyCode The code of the key.
     * @returns Whether the key was pressed this frame.
     */ static isKeyPressed(keyCode) {
        return $35fd48d1ddd84d0f$export$2e2bcd8739ae039.keyTransits.has(keyCode) && $35fd48d1ddd84d0f$export$2e2bcd8739ae039.isKey(keyCode);
    }
    /**
     * Returns whether a keyboard key was released this frame.
     * @param keyCode The code of the key.
     * @returns Whether the key was released this frame.
     */ static isKeyReleased(keyCode) {
        return $35fd48d1ddd84d0f$export$2e2bcd8739ae039.keyTransits.has(keyCode) && !$35fd48d1ddd84d0f$export$2e2bcd8739ae039.isKey(keyCode);
    }
    /**
     * Returns whether a mouse button is down.
     * @param button The mouse button.
     * @returns Whether the mouse button is down.
     */ static isMouse(button = 0) {
        return $35fd48d1ddd84d0f$export$2e2bcd8739ae039.mouseStates.has(button);
    }
    /**
     * Returns whether a mouse button was pressed this frame.
     * @param button The mouse button.
     * @returns Whether the mouse button was pressed this frame.
     */ static isMousePressed(button = 0) {
        return $35fd48d1ddd84d0f$export$2e2bcd8739ae039.mouseTransits.has(button) && $35fd48d1ddd84d0f$export$2e2bcd8739ae039.isMouse(button);
    }
    /**
     * Returns whether a mouse button was released this frame.
     * @param button The mouse button.
     * @returns Whether the mouse button was released this frame.
     */ static isMouseReleased(button = 0) {
        return $35fd48d1ddd84d0f$export$2e2bcd8739ae039.mouseTransits.has(button) && !$35fd48d1ddd84d0f$export$2e2bcd8739ae039.isMouse(button);
    }
    /**
     * Returns the position of the mouse in the canvas.
     * @returns The position of the mouse in the canvas.
     */ static get mousePosition() {
        return $35fd48d1ddd84d0f$export$2e2bcd8739ae039.mousePos;
    }
    /**
     * Returns the normalized position of the mouse in the canvas.
     * @returns The normalized position of the mouse in the canvas.
     */ static get mousePositionNormalized() {
        return (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiplyComponents($35fd48d1ddd84d0f$export$2e2bcd8739ae039.mousePos, new (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039)(1 / $35fd48d1ddd84d0f$export$2e2bcd8739ae039.canvas.width, 1 / $35fd48d1ddd84d0f$export$2e2bcd8739ae039.canvas.height));
    }
    /**
     * Returns the position on the canvas of a normalized canvas position.
     * @returns The position on the canvas of a normalized canvas position.
     */ static normalizedToCanvas(normalizedPos) {
        return (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiplyComponents(normalizedPos, new (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039)($35fd48d1ddd84d0f$export$2e2bcd8739ae039.canvas.width, $35fd48d1ddd84d0f$export$2e2bcd8739ae039.canvas.height));
    }
    /**
     * Returns the normalized position of a canvas position.
     * @returns The normalized position of a canvas position.
     */ static canvasToNormalized(canvasPos) {
        return (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiplyComponents(canvasPos, new (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039)(1 / $35fd48d1ddd84d0f$export$2e2bcd8739ae039.canvas.width, 1 / $35fd48d1ddd84d0f$export$2e2bcd8739ae039.canvas.height));
    }
    /**
     * Returns the position on the canvas of a world position.
     * @returns The position on the canvas of a world position.
     */ static worldToCanvas(worldPos) {
        return (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).transform((0, $a53cef81bd683a5b$export$2e2bcd8739ae039).makeTransformation((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply((0, $511d31ae5212a454$export$2e2bcd8739ae039).position, -1), -(0, $511d31ae5212a454$export$2e2bcd8739ae039).rotation, (0, $511d31ae5212a454$export$2e2bcd8739ae039).scale), worldPos), (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).fromObjWH($35fd48d1ddd84d0f$export$2e2bcd8739ae039.canvas), 0.5));
    }
    /**
     * Returns the position in the world of a canvas position.
     * @returns The position in the world of a canvas position.
     */ static canvasToWorld(canvasPos) {
        return (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).transform((0, $a53cef81bd683a5b$export$2e2bcd8739ae039).inverse((0, $a53cef81bd683a5b$export$2e2bcd8739ae039).makeTransformation((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply((0, $511d31ae5212a454$export$2e2bcd8739ae039).position, -1), -(0, $511d31ae5212a454$export$2e2bcd8739ae039).rotation, (0, $511d31ae5212a454$export$2e2bcd8739ae039).scale)), (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(canvasPos, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).fromObjWH($35fd48d1ddd84d0f$export$2e2bcd8739ae039.canvas), -0.5)));
    }
    /**
     * Returns the normalized position on the canvas of a world position.
     * @returns The normalized position on the canvas of a world position.
     */ static worldToNormalized(worldPos) {
        return $35fd48d1ddd84d0f$export$2e2bcd8739ae039.canvasToNormalized($35fd48d1ddd84d0f$export$2e2bcd8739ae039.worldToCanvas(worldPos));
    }
    /**
     * Returns position in the world of a normalized canvas position.
     * @returns The position in the world of a normalized canvas position.
     */ static normalizedToWorld(normalizedPos) {
        return $35fd48d1ddd84d0f$export$2e2bcd8739ae039.canvasToWorld($35fd48d1ddd84d0f$export$2e2bcd8739ae039.normalizedToCanvas(normalizedPos));
    }
}


/**
 * @author Petraller <me@petraller.com>
 */ 
/**
 * @author Petraller <me@petraller.com>
 */ 


class $e59215a0bab84dac$export$2e2bcd8739ae039 extends (0, $084fb6562cdf6a86$export$2e2bcd8739ae039) {
    /** The radius of the circle. */ get radius() {
        return this._radius;
    }
    set radius(value) {
        this._radius = Math.max(value, 0);
    }
    /** The global radius of the circle. */ get globalRadius() {
        return (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).dot((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).half, this.globalScale) * this._radius;
    }
    regenerate() {
        this._bounds = new (0, $b31606e820d5109e$export$2e2bcd8739ae039)((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(this.globalPosition, new (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039)(this.globalRadius + (0, $084fb6562cdf6a86$export$2e2bcd8739ae039).BOUNDS_PADDING, this.globalRadius + (0, $084fb6562cdf6a86$export$2e2bcd8739ae039).BOUNDS_PADDING)), (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(this.globalPosition, new (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039)(this.globalRadius + (0, $084fb6562cdf6a86$export$2e2bcd8739ae039).BOUNDS_PADDING, this.globalRadius + (0, $084fb6562cdf6a86$export$2e2bcd8739ae039).BOUNDS_PADDING)));
    }
    onDebugDraw(context) {
        // Draw vertices
        context.strokeStyle = "#ff00ff";
        context.beginPath();
        context.arc(this.globalPosition.x, this.globalPosition.y, this.globalRadius, 0, 360);
        context.stroke();
        super.onDebugDraw(context);
    }
    constructor(...args){
        super(...args);
        this._radius = 1;
    }
}


/**
 * @author Petraller <me@petraller.com>
 */ 
class $2f54bffac7b55ad5$export$2e2bcd8739ae039 extends (0, $084fb6562cdf6a86$export$2e2bcd8739ae039) {
    /** The globally positioned vertices of the collider. */ get vertices() {
        return this._vertices.slice();
    }
    /** The axes of this collider for SAT. */ get axes() {
        return this._axes.slice();
    }
    onDebugDraw(context) {
        // Draw vertices
        context.strokeStyle = "#ff00ff";
        context.beginPath();
        for(let i = 0; i <= this._vertices.length; ++i){
            const v = this._vertices[i % this._vertices.length];
            if (i == 0) context.moveTo(v.x, v.y);
            else context.lineTo(v.x, v.y);
        }
        context.stroke();
        // Draw bb
        context.strokeStyle = "#00ffff";
        context.strokeRect(this._bounds.min.x, this._bounds.min.y, this._bounds.size.x, this._bounds.size.y);
        super.onDebugDraw(context);
    }
    constructor(...args){
        super(...args);
        this._vertices = [];
        this._axes = [];
    }
}


/**
 * @author Petraller <me@petraller.com>
 */ 



class $ab128ccc83fbab1a$export$2e2bcd8739ae039 extends (0, $084fb6562cdf6a86$export$2e2bcd8739ae039) {
    /** The offset of the end from the middle of the line segment. */ get direction() {
        return this._direction.copy();
    }
    set direction(value) {
        this._direction = value.copy();
    }
    /** The start of the line segment. */ get start() {
        return (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(this.position, this._direction);
    }
    set start(value) {
        const end = this.end;
        this.position = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).divide((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(value, end), 2);
        this._direction = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(end, this.position);
    }
    /** The end of the line segment. */ get end() {
        return (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(this.position, this._direction);
    }
    set end(value) {
        const start = this.start;
        this.position = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).divide((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(start, value), 2);
        this._direction = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(this.position, start);
    }
    /** The global start of the line segment. */ get globalStart() {
        return (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).transform(this.globalTransform, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(this._direction, -1));
    }
    set globalStart(value) {
        const end = this.globalEnd;
        this.globalPosition = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).divide((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(value, end), 2);
        this._direction = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).transform((0, $a53cef81bd683a5b$export$2e2bcd8739ae039).inverse(this.globalTransform), value), -1);
    }
    /** The global end of the line segment. */ get globalEnd() {
        return (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).transform(this.globalTransform, this._direction);
    }
    set globalEnd(value) {
        const start = this.globalStart;
        this.globalPosition = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).divide((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(start, value), 2);
        this._direction = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).transform((0, $a53cef81bd683a5b$export$2e2bcd8739ae039).inverse(this.globalTransform), value);
    }
    /** The offset of the global end from the global middle of the line segment. */ get globalDirection() {
        return (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).divide((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(this.globalEnd, this.globalStart), 2);
    }
    regenerate() {
        this._bounds = (0, $b31606e820d5109e$export$2e2bcd8739ae039).fromVertices([
            (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(this.globalStart, new (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039)((0, $084fb6562cdf6a86$export$2e2bcd8739ae039).BOUNDS_PADDING, (0, $084fb6562cdf6a86$export$2e2bcd8739ae039).BOUNDS_PADDING)),
            (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(this.globalEnd, new (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039)((0, $084fb6562cdf6a86$export$2e2bcd8739ae039).BOUNDS_PADDING, (0, $084fb6562cdf6a86$export$2e2bcd8739ae039).BOUNDS_PADDING)),
            (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(this.globalStart, new (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039)((0, $084fb6562cdf6a86$export$2e2bcd8739ae039).BOUNDS_PADDING, (0, $084fb6562cdf6a86$export$2e2bcd8739ae039).BOUNDS_PADDING)),
            (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(this.globalEnd, new (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039)((0, $084fb6562cdf6a86$export$2e2bcd8739ae039).BOUNDS_PADDING, (0, $084fb6562cdf6a86$export$2e2bcd8739ae039).BOUNDS_PADDING))
        ]);
    }
    onDebugDraw(context) {
        // Draw vertices
        const sGlobal = this.globalStart;
        const eGlobal = this.globalEnd;
        context.strokeStyle = "#ff00ff";
        context.beginPath();
        context.moveTo(sGlobal.x, sGlobal.y);
        context.lineTo(eGlobal.x, eGlobal.y);
        context.stroke();
        super.onDebugDraw(context);
    }
    constructor(...args){
        super(...args);
        this._direction = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).right, 100);
    }
}


/**
 * @author Petraller <me@petraller.com>
 */ 


var $ffe9b9059661caa3$export$e5420644cab0dad8;
(function(EForceType) {
    EForceType[EForceType["Impulse"] = 0] = "Impulse";
    EForceType[EForceType["Force"] = 1] = "Force";
})($ffe9b9059661caa3$export$e5420644cab0dad8 || ($ffe9b9059661caa3$export$e5420644cab0dad8 = {}));
class $ffe9b9059661caa3$export$2e2bcd8739ae039 extends (0, $46a097085382b218$export$2e2bcd8739ae039) {
    /** The mass. */ get mass() {
        return this._mass;
    }
    set mass(value) {
        this._mass = Math.max(value, Number.EPSILON);
    }
    addForce(force, type = $ffe9b9059661caa3$export$e5420644cab0dad8.Impulse) {
        let a;
        switch(type){
            case $ffe9b9059661caa3$export$e5420644cab0dad8.Impulse:
                a = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(force, 1 / this.mass);
                break;
            case $ffe9b9059661caa3$export$e5420644cab0dad8.Force:
                a = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(force, (0, $05bad183ec6d4f44$export$2e2bcd8739ae039).deltaTime / this.mass);
                break;
        }
        this.velocity = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(this.velocity, a);
    }
    constructor(...args){
        super(...args);
        this._mass = 1;
        /** The linear drag. */ this.drag = 0;
        /** The force of gravity. */ this.gravity = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).zero;
    }
}




class $faf0e2bf52520646$var$RBVec {
    constructor(positional, rotational){
        /** The positional component. */ this.pos = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).zero;
        /** The rotational component. */ this.rot = 0;
        this.copy = ()=>new $faf0e2bf52520646$var$RBVec(this.pos, this.rot);
        this.pos = positional.copy();
        this.rot = rotational;
    }
    /** The zero vector. */ static get zero() {
        return new $faf0e2bf52520646$var$RBVec((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).zero, 0);
    }
}
function $faf0e2bf52520646$var$makeSnowflakePair(id1, id2) {
    if (id1 < id2) return id1 + "|" + id2;
    return id2 + "|" + id1;
}
function $faf0e2bf52520646$var$breakSnowflakePair(pair) {
    const items = pair.split("|");
    return [
        items[0],
        items[1]
    ];
}
class $faf0e2bf52520646$export$2e2bcd8739ae039 {
    static #_ = (()=>{
        this.PENETRATION_IMPULSE_STRENGTH = 100;
    })();
    static #_1 = (()=>{
        this.singleton = null;
    })();
    static #_2 = (()=>{
        this.bodies = new Map();
    })();
    static #_3 = (()=>{
        this.colliders = new Map();
    })();
    static #_4 = (()=>{
        this.bodyColliders = new Map();
    })();
    static #_5 = (()=>{
        this.colliderBodies = new Map();
    })();
    static #_6 = (()=>{
        this.pairsCollided = new Set();
    })();
    constructor(){
        // DEBUG
        this.debugContacts = new Map();
        if ($faf0e2bf52520646$export$2e2bcd8739ae039.singleton) {
            console.warn("Physics is used as a static class, do not create additional objects of Physics");
            return;
        }
        $faf0e2bf52520646$export$2e2bcd8739ae039.singleton = this;
    }
    tick() {
        // --- DYNAMICS ---
        for (const [_, body] of $faf0e2bf52520646$export$2e2bcd8739ae039.bodies){
            if (!(body instanceof (0, $ffe9b9059661caa3$export$2e2bcd8739ae039))) continue;
            // Gravity
            body.velocity = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(body.velocity, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(body.gravity, (0, $05bad183ec6d4f44$export$2e2bcd8739ae039).deltaTime / body.mass));
            // Drag
            body.velocity = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).divide(body.velocity, body.drag + 1);
        }
        let collisions = []; // all collisions this iteration
        let bodyCollisionCount = new Map(); // number of collisions per body this iteration
        let bodyPairsCalled = new Set(); // pairs of bodies triggered this iteration
        const collideBodies = (c1, c2, col)=>{
            const b1 = $faf0e2bf52520646$export$2e2bcd8739ae039.bodies.get($faf0e2bf52520646$export$2e2bcd8739ae039.colliderBodies.get(c1.id));
            const b2 = $faf0e2bf52520646$export$2e2bcd8739ae039.bodies.get($faf0e2bf52520646$export$2e2bcd8739ae039.colliderBodies.get(c2.id));
            const pair = $faf0e2bf52520646$var$makeSnowflakePair(b1.id, b2.id);
            if (!bodyPairsCalled.has(pair)) {
                // Call collision enter callback
                if (!$faf0e2bf52520646$export$2e2bcd8739ae039.pairsCollided.has(pair)) {
                    $faf0e2bf52520646$export$2e2bcd8739ae039.pairsCollided.add(pair);
                    b1.onCollisionEnter?.call(b1, b2);
                    b2.onCollisionEnter?.call(b2, b1);
                }
                // Call collision update callback
                b1.onCollisionUpdate?.call(b1, b2);
                b2.onCollisionUpdate?.call(b2, b1);
                // Mark this pair as being called this frame
                bodyPairsCalled.add(pair);
            }
            // Register collision between bodies for resolution
            bodyCollisionCount.set(b1, (bodyCollisionCount.get(b1) ?? 0) + 1);
            bodyCollisionCount.set(b2, (bodyCollisionCount.get(b2) ?? 0) + 1);
            collisions.push([
                c1,
                c2,
                col
            ]);
            // DEBUG
            if (col.willIntersect) this.debugContacts.set(col.contactPos, 0.1);
        };
        // Get colliders as array
        let colliders = Array.from($faf0e2bf52520646$export$2e2bcd8739ae039.colliders.values());
        // Sort by min x
        colliders.sort((c1, c2)=>c1.bounds.min.x - c2.bounds.min.x);
        // Iterate all colliders
        for(let i = 0; i < colliders.length; i++){
            const ci = colliders[i];
            ci.globalTransform;
            ci.regenerate();
            const bi = $faf0e2bf52520646$export$2e2bcd8739ae039.bodies.get($faf0e2bf52520646$export$2e2bcd8739ae039.colliderBodies.get(ci.id));
            for(let j = i + 1; j < colliders.length; j++){
                const cj = colliders[j];
                ci.globalTransform;
                cj.regenerate();
                const bj = $faf0e2bf52520646$export$2e2bcd8739ae039.bodies.get($faf0e2bf52520646$export$2e2bcd8739ae039.colliderBodies.get(cj.id));
                // Same body
                if (bi.id === bj.id) continue;
                // --- BROAD PHASE ---
                // Non-intersecting layers
                if (!ci.canCollideWith(cj)) continue;
                // Extend bounds
                const bndi = (0, $b31606e820d5109e$export$2e2bcd8739ae039).extend(ci.bounds, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(bi.velocity, (0, $05bad183ec6d4f44$export$2e2bcd8739ae039).deltaTime));
                const bndj = (0, $b31606e820d5109e$export$2e2bcd8739ae039).extend(cj.bounds, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(bj.velocity, (0, $05bad183ec6d4f44$export$2e2bcd8739ae039).deltaTime));
                // X limits
                if (bndj.min.x > bndi.max.x) break;
                // Y overlap
                if (bndi.max.y < bndj.min.y || bndi.min.y > bndj.max.y) continue;
                // BB overlap
                if (!bndi.overlaps(bndj)) continue;
                // --- NARROW PHASE ---
                if (ci instanceof (0, $e59215a0bab84dac$export$2e2bcd8739ae039) && cj instanceof (0, $e59215a0bab84dac$export$2e2bcd8739ae039)) {
                    // Circle-circle
                    const col = $faf0e2bf52520646$export$2e2bcd8739ae039.circleCircleIntersection({
                        position: ci.globalPosition,
                        velocity: (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(bi.velocity, (0, $05bad183ec6d4f44$export$2e2bcd8739ae039).deltaTime),
                        radius: ci.globalRadius
                    }, {
                        position: cj.globalPosition,
                        velocity: (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(bj.velocity, (0, $05bad183ec6d4f44$export$2e2bcd8739ae039).deltaTime),
                        radius: cj.globalRadius
                    });
                    if (col.penetrationDepth > 0 || col.willIntersect) collideBodies(ci, cj, col);
                    continue;
                } else if (ci instanceof (0, $e59215a0bab84dac$export$2e2bcd8739ae039) && cj instanceof (0, $ab128ccc83fbab1a$export$2e2bcd8739ae039) || ci instanceof (0, $ab128ccc83fbab1a$export$2e2bcd8739ae039) && cj instanceof (0, $e59215a0bab84dac$export$2e2bcd8739ae039)) {
                    // Circle-line
                    const ccircle = ci instanceof (0, $e59215a0bab84dac$export$2e2bcd8739ae039) ? ci : cj;
                    const cline = ci instanceof (0, $ab128ccc83fbab1a$export$2e2bcd8739ae039) ? ci : cj;
                    const bcircle = ccircle == ci ? bi : bj;
                    const bline = cline == ci ? bi : bj;
                    const col = $faf0e2bf52520646$export$2e2bcd8739ae039.circleLineSegmentIntersection({
                        position: ccircle.globalPosition,
                        velocity: (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(bcircle.velocity, (0, $05bad183ec6d4f44$export$2e2bcd8739ae039).deltaTime),
                        radius: ccircle.globalRadius
                    }, {
                        position: cline.globalPosition,
                        velocity: (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(bline.velocity, (0, $05bad183ec6d4f44$export$2e2bcd8739ae039).deltaTime),
                        direction: cline.globalDirection
                    });
                    if (col.penetrationDepth > 0 || col.willIntersect) collideBodies(ccircle, cline, col);
                    continue;
                } else if (ci instanceof (0, $2f54bffac7b55ad5$export$2e2bcd8739ae039) && cj instanceof (0, $2f54bffac7b55ad5$export$2e2bcd8739ae039)) continue;
                else if (ci instanceof (0, $e59215a0bab84dac$export$2e2bcd8739ae039) && cj instanceof (0, $2f54bffac7b55ad5$export$2e2bcd8739ae039) || ci instanceof (0, $2f54bffac7b55ad5$export$2e2bcd8739ae039) && cj instanceof (0, $e59215a0bab84dac$export$2e2bcd8739ae039)) continue;
            }
        }
        // Clear uncalled pairs
        for (const pair of $faf0e2bf52520646$export$2e2bcd8739ae039.pairsCollided.values()){
            const [b1id, b2id] = $faf0e2bf52520646$var$breakSnowflakePair(pair);
            if (bodyPairsCalled.has(pair)) continue;
            const [b1, b2] = [
                $faf0e2bf52520646$export$2e2bcd8739ae039.bodies.get(b1id),
                $faf0e2bf52520646$export$2e2bcd8739ae039.bodies.get(b2id)
            ];
            $faf0e2bf52520646$export$2e2bcd8739ae039.pairsCollided.delete(pair);
            b1.onCollisionExit?.call(b1, b2);
            b2.onCollisionExit?.call(b2, b1);
        }
        let cached = new Map();
        for (const b of $faf0e2bf52520646$export$2e2bcd8739ae039.bodies.values())cached.set(b, {
            pos: b.globalPosition,
            vel: b.velocity
        });
        // Solve collisions
        for (const collision of collisions){
            const [c1, c2, col] = collision;
            const b1 = $faf0e2bf52520646$export$2e2bcd8739ae039.bodies.get($faf0e2bf52520646$export$2e2bcd8739ae039.colliderBodies.get(c1.id));
            const b2 = $faf0e2bf52520646$export$2e2bcd8739ae039.bodies.get($faf0e2bf52520646$export$2e2bcd8739ae039.colliderBodies.get(c2.id));
            let b1cache = cached.get(b1);
            let b2cache = cached.get(b2);
            // Only respond if both are RBs
            if (b1 instanceof (0, $ffe9b9059661caa3$export$2e2bcd8739ae039) && b2 instanceof (0, $ffe9b9059661caa3$export$2e2bcd8739ae039)) {
                // Mass splitting
                let [m1, m2] = [
                    b1.mass / (bodyCollisionCount.get(b1) ?? 1),
                    b2.mass / (bodyCollisionCount.get(b2) ?? 1)
                ];
                // Infinite mass case
                if (b1.mass === Infinity && b2.mass === Infinity) continue;
                const w = $faf0e2bf52520646$export$2e2bcd8739ae039.massToWeights(m1, m2);
                // Impulse response
                if (col.willIntersect) {
                    const restitution = (c1.restitution + c2.restitution) / 2;
                    // Magnitude of velocity in direction of normal
                    const [a1, a2] = [
                        (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).dot((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(b1.velocity, (0, $05bad183ec6d4f44$export$2e2bcd8739ae039).deltaTime), col.contactNormal),
                        (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).dot((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(b2.velocity, (0, $05bad183ec6d4f44$export$2e2bcd8739ae039).deltaTime), col.contactNormal)
                    ];
                    // Get calculated reflected velocities and position
                    const reflVel1 = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(b1.velocity, (0, $05bad183ec6d4f44$export$2e2bcd8739ae039).deltaTime), (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(col.contactNormal, 2 * (a2 - a1) * w[0])), restitution);
                    const reflVel2 = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(b2.velocity, (0, $05bad183ec6d4f44$export$2e2bcd8739ae039).deltaTime), (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(col.contactNormal, 2 * (a1 - a2) * w[1])), restitution);
                    const reflPos1 = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(col.intersectPos1, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(reflVel1, 1 - col.intersectTime));
                    const reflPos2 = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(col.intersectPos2, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(reflVel2, 1 - col.intersectTime));
                    // Offset of collider from body
                    const c1Off = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(c1.globalPosition, b1.globalPosition);
                    const c2Off = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(c2.globalPosition, b2.globalPosition);
                    // Accumulate deltas
                    let dp1 = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(reflPos1, c1Off), b1cache.pos);
                    let dp2 = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(reflPos2, c2Off), b2cache.pos);
                    let dv1 = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).divide(reflVel1, (0, $05bad183ec6d4f44$export$2e2bcd8739ae039).deltaTime), b1cache.vel);
                    let dv2 = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).divide(reflVel2, (0, $05bad183ec6d4f44$export$2e2bcd8739ae039).deltaTime), b2cache.vel);
                    b1cache.pos = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(b1cache.pos, dp1);
                    b2cache.pos = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(b2cache.pos, dp2);
                    b1cache.vel = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(b1cache.vel, dv1);
                    b2cache.vel = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(b2cache.vel, dv2);
                }
                // Penetration response
                if (col.penetrationDepth > 0) {
                    b1cache.vel = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(b1cache.vel, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(col.contactNormal, $faf0e2bf52520646$export$2e2bcd8739ae039.PENETRATION_IMPULSE_STRENGTH * col.penetrationDepth * w[0]));
                    b2cache.vel = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(b2cache.vel, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(col.contactNormal, -$faf0e2bf52520646$export$2e2bcd8739ae039.PENETRATION_IMPULSE_STRENGTH * col.penetrationDepth * w[1]));
                }
                // Normal response
                b1cache.pos = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(b1cache.pos, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(col.contactNormal, (1 + col.penetrationDepth) * w[0] * (0, $05bad183ec6d4f44$export$2e2bcd8739ae039).deltaTime));
                b2cache.pos = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(b2cache.pos, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(col.contactNormal, -(1 + col.penetrationDepth) * w[1] * (0, $05bad183ec6d4f44$export$2e2bcd8739ae039).deltaTime));
            }
        }
        // --- PHYSICS RESOLUTION ---
        for (const [body, next] of cached){
            body.velocity = next.vel;
            body.globalPosition = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(next.pos, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(next.vel, (0, $05bad183ec6d4f44$export$2e2bcd8739ae039).deltaTime));
        }
    }
    static registerBody(body) {
        if ($faf0e2bf52520646$export$2e2bcd8739ae039.bodies.has(body.id) || $faf0e2bf52520646$export$2e2bcd8739ae039.bodyColliders.has(body.id)) {
            console.error(`Body #${body.id} already registered in physics system`);
            return;
        }
        $faf0e2bf52520646$export$2e2bcd8739ae039.bodies.set(body.id, body);
        $faf0e2bf52520646$export$2e2bcd8739ae039.bodyColliders.set(body.id, new Set);
    }
    static registerCollider(collider, owner) {
        if ($faf0e2bf52520646$export$2e2bcd8739ae039.colliders.has(collider.id) || $faf0e2bf52520646$export$2e2bcd8739ae039.colliderBodies.has(collider.id)) {
            console.error(`Collider #${owner.id} already registered in physics system`);
            return;
        }
        if (!$faf0e2bf52520646$export$2e2bcd8739ae039.bodies.has(owner.id)) {
            console.error(`Body #${owner.id} not registered in physics system`);
            return;
        }
        if ($faf0e2bf52520646$export$2e2bcd8739ae039.bodyColliders.get(owner.id)?.has(collider.id) || $faf0e2bf52520646$export$2e2bcd8739ae039.colliderBodies.has(collider.id)) {
            console.warn(`Collider #${collider.id} already registered with body #${$faf0e2bf52520646$export$2e2bcd8739ae039.colliderBodies.get(collider.id)} in physics system`);
            return;
        }
        $faf0e2bf52520646$export$2e2bcd8739ae039.colliders.set(collider.id, collider);
        $faf0e2bf52520646$export$2e2bcd8739ae039.colliderBodies.set(collider.id, owner.id);
        $faf0e2bf52520646$export$2e2bcd8739ae039.bodyColliders.get(owner.id)?.add(collider.id);
    }
    static circleLineSegmentIntersection(c1, c2) {
        let output = {
            penetrationDepth: 0,
            willIntersect: false,
            intersectTime: 0,
            intersectPos1: (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).zero,
            intersectPos2: (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).zero,
            contactPos: (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).zero,
            contactNormal: (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).zero
        };
        // Line properties
        const lineStart = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(c2.position, c2.direction);
        const lineMid = c2.position.copy();
        const lineEnd = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(c2.position, c2.direction);
        const lineDirNorm = c2.direction.normalized;
        const lineNormal = c2.direction.normal.normalized;
        // Relative vel of 1 from 2
        const relVel = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(c1.velocity, c2.velocity);
        // Parallel distance along line
        const d = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).dot((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(c1.position, c2.position), lineDirNorm);
        // Closest point on line
        const cpline = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(c2.position, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(lineDirNorm, Math.clamp(d, -c2.direction.length, c2.direction.length)));
        output.contactNormal = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(c1.position, cpline).normalized;
        output.penetrationDepth = Math.max(c1.radius - (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(c1.position, cpline).length, 0);
        // Zero relative velocity
        if (relVel.sqrLength === 0) return output;
        function lineEdgeCase(withinBothLines) {
            // Relative vel normal
            const relVelN = relVel.normal.normalized;
            let closer = lineEnd;
            let dist = 0;
            if (withinBothLines) {
                // Closer to start
                if ((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).dot((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(c1.position, lineMid), c2.direction) < 0) closer = lineStart;
                else closer = lineEnd;
                dist = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).dot((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(closer, c1.position), relVelN);
            } else {
                // Perpendicular distance to start, end
                const dStart = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).dot((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(lineStart, c1.position), relVelN);
                const dEnd = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).dot((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(lineEnd, c1.position), relVelN);
                const dStartAbs = Math.abs(dStart);
                const dEndAbs = Math.abs(dEnd);
                dist = dEnd;
                // No collision
                if (dStartAbs > c1.radius && dEndAbs > c1.radius) return output;
                else if (dStartAbs <= c1.radius && dEndAbs <= c1.radius) {
                    // V distance to start, end
                    const m0 = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).dot((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(lineStart, c1.position), relVel);
                    const m1 = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).dot((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(lineEnd, c1.position), relVel);
                    const m0Abs = Math.abs(m0);
                    const m1Abs = Math.abs(m1);
                    // Closer to start
                    if (m0Abs < m1Abs) {
                        closer = lineStart;
                        dist = dStart;
                    }
                } else if (dStartAbs <= c1.radius) {
                    closer = lineStart;
                    dist = dStart;
                }
            // Else end possible collision only
            }
            // Delta from start to CPA
            const m = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).dot((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(closer, c1.position), relVel.normalized);
            if (m <= 0) return;
            // Delta from collision pt to CPA
            const s = Math.sqrt(c1.radius * c1.radius - dist * dist);
            if (Math.abs(dist) > c1.radius) return;
            // Time to intersect
            const it = (m - s) / relVel.length;
            if (it >= 0 && it <= 1) {
                output.willIntersect = true;
                output.intersectTime = it;
                output.intersectPos1 = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(c1.position, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(c1.velocity, output.intersectTime));
                output.intersectPos2 = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(c2.position, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(c2.velocity, output.intersectTime));
                output.contactPos = closer.copy();
            }
        }
        // Signed distance of circle from line segment
        const sd = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).dot(lineNormal, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(c1.position, c2.position));
        if (sd > -c1.radius && sd < c1.radius) // Circle between distant lines
        lineEdgeCase(true);
        else {
            let extrudeFn = (pos)=>pos.copy();
            let itFn = ()=>-1;
            let contactFn = (ipos1)=>ipos1.copy();
            // Circle in inner half plane opposite direction of normal
            if (sd <= -c1.radius) {
                extrudeFn = (pos)=>(0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(pos, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(lineNormal, c1.radius));
                itFn = ()=>-(sd + c1.radius) / (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).dot(lineNormal, relVel);
                contactFn = (ipos1)=>(0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(ipos1, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(lineNormal, c1.radius));
            } else if (sd >= c1.radius) {
                extrudeFn = (pos)=>(0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(pos, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(lineNormal, c1.radius));
                itFn = ()=>-(sd - c1.radius) / (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).dot(lineNormal, relVel);
                contactFn = (ipos1)=>(0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(ipos1, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(lineNormal, c1.radius));
            }
            // Extrude points
            const pStart = extrudeFn(lineStart);
            const pEnd = extrudeFn(lineEnd);
            // Moving into segment
            if ((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).dot(relVel.normal, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(pStart, c1.position)) * (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).dot(relVel.normal, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(pEnd, c1.position)) < 0) {
                // Perpendicular distance / perpendicular velocity
                // = Time to intersect
                const it = itFn();
                if (it >= 0 && it <= 1) {
                    output.willIntersect = true;
                    output.intersectTime = it;
                    output.intersectPos1 = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(c1.position, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(c1.velocity, output.intersectTime));
                    output.intersectPos2 = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(c2.position, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(c2.velocity, output.intersectTime));
                    output.contactPos = contactFn(output.intersectPos1);
                }
            } else lineEdgeCase(false);
        }
        return output;
    }
    static circleCircleIntersection(c1, c2) {
        let output = {
            penetrationDepth: 0,
            willIntersect: false,
            intersectTime: 0,
            intersectPos1: (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).zero,
            intersectPos2: (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).zero,
            contactPos: (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).zero,
            contactNormal: (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(c1.position, c2.position).normalized
        };
        // Relative circle radius
        const relCircleRadius = c1.radius + c2.radius;
        // Relative position of 1 from 2
        const relPos = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(c1.position, c2.position);
        output.penetrationDepth = Math.max(relCircleRadius - relPos.length, 0);
        // Relative vel of 1 from 2
        const relVel = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(c1.velocity, c2.velocity);
        // Zero relative velocity
        if (relVel.sqrLength === 0) return output;
        // Convert to ray-circle problem
        const relRayPos = c1.position.copy();
        const relRayVel = relVel.copy();
        const relCirclePos = c2.position.copy();
        // Distance squared
        const distSqr = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(relRayPos, relCirclePos).sqrLength;
        // Ray length
        const rl = relRayVel.length;
        // Delta from start to CPA
        const m = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).dot((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(relCirclePos, relRayPos), relRayVel.normalized);
        // CPA
        const nSqr = distSqr - m * m;
        if (nSqr > relCircleRadius * relCircleRadius) return output;
        // Delta from collision point to CPA
        const s = Math.sqrt(relCircleRadius * relCircleRadius - nSqr);
        // Time to intersect
        const it = (m - s) / rl;
        if (it >= 0 && it <= 1) {
            output.willIntersect = true;
            output.intersectTime = it;
            output.intersectPos1 = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(c1.position, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(c1.velocity, output.intersectTime));
            output.intersectPos2 = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).add(c2.position, (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply(c2.velocity, output.intersectTime));
            output.contactPos = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).lerp(output.intersectPos1, output.intersectPos2, c1.radius / (c1.radius + c2.radius));
            output.contactNormal = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).subtract(output.intersectPos1, output.intersectPos2).normalized;
        }
        return output;
    }
    static massToWeights(m1, m2) {
        return [
            m2 < Infinity ? m2 / (m1 + m2) : 1,
            m1 < Infinity ? m1 / (m1 + m2) : 1
        ];
    }
}


class $05bad183ec6d4f44$export$2e2bcd8739ae039 {
    static #_ = (()=>{
        /** The build number. */ this.BUILD = 1;
    })();
    static #_1 = (()=>{
        /** The version. */ this.VERSION = "0.0.1";
    })();
    static #_2 = (()=>{
        /** The number of scheduled frame updates per second. */ this.FRAME_RATE = 60;
    })();
    static #_3 = (()=>{
        /** The scheduled interval between frame updates in seconds. */ this.FRAME_TIME = 1 / $05bad183ec6d4f44$export$2e2bcd8739ae039.FRAME_RATE;
    })();
    static #_4 = (()=>{
        /** Debug draw flags. */ this.DEBUG_DRAWS = {
            colliders: true,
            boundingBoxes: true
        };
    })();
    static #_5 = (()=>{
        this._deltaTime = $05bad183ec6d4f44$export$2e2bcd8739ae039.FRAME_TIME;
    })();
    static #_6 = (()=>{
        this._time = 0;
    })();
    static #_7 = (()=>{
        this.rootNode = new (0, $3f8760cc7c29435c$export$2e2bcd8739ae039)($05bad183ec6d4f44$export$2e2bcd8739ae039, "_ROOT_");
    })();
    /** The root node of the whole game. */ static get root() {
        return $05bad183ec6d4f44$export$2e2bcd8739ae039.rootNode;
    }
    /**
     * Initialises the engine.
     * @param target The target canvas element to render onto.
     */ static create(target) {
        console.debug(`%cPetrallengine v${$05bad183ec6d4f44$export$2e2bcd8739ae039.VERSION}\nby Petraller`, "color: #0799ce");
        console.debug(`https://petraller.com/`);
        // Fallback target
        if (!target) {
            const targetDefaultID = "app";
            console.debug(`No canvas provided, using default target canvas #${targetDefaultID}`);
            const ele = document.getElementById(targetDefaultID);
            if (!ele || !(ele instanceof HTMLCanvasElement)) {
                console.error(`Unable to find a canvas with ID #${targetDefaultID}`);
                console.error(`Please create a canvas element with ID #${targetDefaultID}, or provide your own canvas to Petrallengine.create`);
                return;
            }
            target = ele;
        }
        console.debug(`Using ${target.outerHTML} as render canvas`);
        // Initialise systems
        const input = new (0, $35fd48d1ddd84d0f$export$2e2bcd8739ae039)(target);
        const physics = new (0, $faf0e2bf52520646$export$2e2bcd8739ae039)();
        // Get context
        const canvas = target;
        const context = canvas.getContext("2d");
        // Create game loop
        const ft = 1000 / $05bad183ec6d4f44$export$2e2bcd8739ae039.FRAME_RATE;
        const gameLoop = ()=>{
            const tStart = Date.now();
            // Update all
            function update(node) {
                if (!node.isEnabled) return;
                if (!node.isStarted) {
                    node.onStart?.call(node);
                    node.isStarted = true;
                    if (node instanceof (0, $46a097085382b218$export$2e2bcd8739ae039)) (0, $faf0e2bf52520646$export$2e2bcd8739ae039).registerBody(node);
                    if (node instanceof (0, $084fb6562cdf6a86$export$2e2bcd8739ae039)) {
                        let curr = node.parent;
                        while(curr !== null){
                            if (curr instanceof (0, $46a097085382b218$export$2e2bcd8739ae039)) {
                                (0, $faf0e2bf52520646$export$2e2bcd8739ae039).registerCollider(node, curr);
                                break;
                            }
                            curr = curr.parent;
                        }
                        if (curr === null) console.error(`Collider does not have a parent Body, it will not be registered by the Physics system`);
                    }
                }
                node.onUpdate?.call(node);
                node.globalTransform;
                // Iterate children
                for (let child of node.children)update(child);
            }
            update($05bad183ec6d4f44$export$2e2bcd8739ae039.rootNode);
            // Physics step
            physics.tick();
            // Reset
            context.reset();
            // Clear
            context.clearRect(0, 0, canvas.width, canvas.height);
            // Apply camera transforms
            context.translate(canvas.width / 2, canvas.height / 2);
            context.translate(-(0, $511d31ae5212a454$export$2e2bcd8739ae039).position.x, -(0, $511d31ae5212a454$export$2e2bcd8739ae039).position.y);
            context.rotate(-(0, $511d31ae5212a454$export$2e2bcd8739ae039).rotation * Math.PI / 180);
            context.scale((0, $511d31ae5212a454$export$2e2bcd8739ae039).scale.x, (0, $511d31ae5212a454$export$2e2bcd8739ae039).scale.y);
            // Draw all
            function draw(node) {
                if (!node.isEnabled) return;
                // Draw drawables
                if ((0, $936ba809947b4de6$export$1508030049b632ec)(node)) {
                    context.save();
                    // Apply node transforms
                    context.transform(node.globalTransform.get(0, 0), node.globalTransform.get(1, 0), node.globalTransform.get(0, 1), node.globalTransform.get(1, 1), node.globalTransform.get(0, 2), node.globalTransform.get(1, 2));
                    node.onDraw.call(node, context);
                    context.restore();
                }
                // Iterate children
                for (let child of node.children)draw(child);
            }
            draw($05bad183ec6d4f44$export$2e2bcd8739ae039.rootNode);
            // Debug draw
            function debugDraw(node) {
                if (!node.isEnabled) return;
                // // Draw colliders
                // if (isCollider(node)) {
                //     // Draw debug
                //     node.debugDraw(context);
                // }
                // Draw drawables
                if ((0, $3d145095d1c4fd99$export$c9e1b957c27b07fb)(node)) {
                    context.save();
                    node.onDebugDraw.call(node, context);
                    context.restore();
                }
                // Iterate children
                for (let child of node.children)debugDraw(child);
            }
            debugDraw($05bad183ec6d4f44$export$2e2bcd8739ae039.rootNode);
            // Physics general debug draw
            for (let contact of physics.debugContacts){
                context.strokeStyle = "#ff0000";
                context.beginPath();
                context.arc(contact[0].x, contact[0].y, 4, 0, 360);
                context.stroke();
                physics.debugContacts.set(contact[0], contact[1] - this.deltaTime);
                if (contact[1] < 0) physics.debugContacts.delete(contact[0]);
            }
            // Clear transition flags
            input.endFrame();
            const tEnd = Date.now();
            const dt = tEnd - tStart;
            const wait = Math.max(ft - dt, 1);
            $05bad183ec6d4f44$export$2e2bcd8739ae039._time += $05bad183ec6d4f44$export$2e2bcd8739ae039._deltaTime = dt + wait;
            setTimeout(gameLoop, wait);
        };
        gameLoop();
    }
    /**
     * Returns the total elapsed game time in seconds.
     */ static get time() {
        return $05bad183ec6d4f44$export$2e2bcd8739ae039._time / 1000;
    }
    /**
     * Returns the actual elapsed time for the frame in seconds.
     */ static get deltaTime() {
        return $05bad183ec6d4f44$export$2e2bcd8739ae039._deltaTime / 1000;
    }
}








/**
 * @author Petraller <me@petraller.com>
 */ /**
 * @author Petraller <me@petraller.com>
 */ 
class $65b04c82fca59f60$export$2e2bcd8739ae039 {
    constructor(r, g, b, a){
        /** The red component. */ this.r = 0;
        /** The green component. */ this.g = 0;
        /** The blue component. */ this.b = 0;
        /** The alpha component. */ this.a = 1;
        this.copy = ()=>new $65b04c82fca59f60$export$2e2bcd8739ae039(this.r, this.g, this.b, this.a);
        this.equals = (other)=>this.r == other.r && this.g == other.g && this.b == other.b && this.a == other.a;
        /**
     * Converts the color to its #RRGGBBAA hexadecimal string representation.
     * @param hasAlpha Whether to include the alpha channel.
     * @returns The hexadecimal string representation.
     */ this.toHexString = (hasAlpha = false)=>{
            let str = "#";
            str += (this.r * 255 & 0xFF).toString(16).padStart(2, "0");
            str += (this.g * 255 & 0xFF).toString(16).padStart(2, "0");
            str += (this.b * 255 & 0xFF).toString(16).padStart(2, "0");
            if (hasAlpha) str += (this.a * 255 & 0xFF).toString(16).padStart(2, "0");
            return str;
        };
        /**
     * Converts the color to its HSV representation.
     * @returns The HSV representation.
     */ this.toHSV = ()=>{
            const cmax = Math.max(this.r, this.g, this.b);
            const cmin = Math.min(this.r, this.g, this.b);
            const delta = cmax - cmin;
            let [h, s, v] = [
                0,
                cmax === 0 ? 0 : delta / cmax,
                cmax
            ];
            if (cmax === this.r) h = Math.mod((this.g - this.b) / delta, 6);
            else if (cmax === this.g) h = (this.g - this.b) / delta + 2;
            else h = (this.g - this.b) / delta + 4;
            return {
                h: h,
                s: s,
                v: v
            };
        };
        this.r = Math.clamp(r, 0, 1);
        this.g = Math.clamp(g, 0, 1);
        this.b = Math.clamp(b, 0, 1);
        this.a = Math.clamp(a ?? 1, 0, 1);
    }
    /** Black. */ static get black() {
        return new $65b04c82fca59f60$export$2e2bcd8739ae039(0, 0, 0);
    }
    /** Blue. */ static get blue() {
        return new $65b04c82fca59f60$export$2e2bcd8739ae039(0, 0, 1);
    }
    /** Green. */ static get green() {
        return new $65b04c82fca59f60$export$2e2bcd8739ae039(0, 1, 0);
    }
    /** Cyan. */ static get cyan() {
        return new $65b04c82fca59f60$export$2e2bcd8739ae039(0, 1, 1);
    }
    /** Red. */ static get red() {
        return new $65b04c82fca59f60$export$2e2bcd8739ae039(1, 0, 0);
    }
    /** Magenta. */ static get magenta() {
        return new $65b04c82fca59f60$export$2e2bcd8739ae039(1, 0, 1);
    }
    /** Yellow. */ static get yellow() {
        return new $65b04c82fca59f60$export$2e2bcd8739ae039(1, 1, 0);
    }
    /** White. */ static get white() {
        return new $65b04c82fca59f60$export$2e2bcd8739ae039(1, 1, 1);
    }
    /** Grey. */ static get grey() {
        return new $65b04c82fca59f60$export$2e2bcd8739ae039(0.5, 0.5, 0.5);
    }
    /** Transparent. */ static get transparent() {
        return new $65b04c82fca59f60$export$2e2bcd8739ae039(0, 0, 0, 0);
    }
    /**
     * Linearly interpolates from one color to another.
     * @param c1 The first color.
     * @param c2 The second color.
     * @param t The amount to interpolate by.
     * @returns The interpolated color.
     */ static lerp(c1, c2, t) {
        return new $65b04c82fca59f60$export$2e2bcd8739ae039(c1.r * (1 - t) + c2.r * t, c1.g * (1 - t) + c2.g * t, c1.b * (1 - t) + c2.b * t, c1.a * (1 - t) + c2.a * t);
    }
    /**
     * Spherically linearly interpolates from one color to another.
     * @param c1 The first color.
     * @param c2 The second color.
     * @param t The amount to interpolate by.
     * @returns The interpolated color.
     */ static slerp(c1, c2, t) {
        const func = (t)=>Math.sin(t * Math.PI / 2);
        const [u, v] = [
            func(1 - t),
            func(t)
        ];
        return new $65b04c82fca59f60$export$2e2bcd8739ae039(c1.r * u + c2.r * v, c1.g * u + c2.g * v, c1.b * u + c2.b * v, c1.a * u + c2.a * v);
    }
    static #_ = (()=>{
        /**
     * Creates a color from its hexadecimal string representation.
     * @param str The hexadecimal string representation.
     * @returns The color.
     */ this.fromHexString = (str)=>{
            str = str.trim();
            const r = parseInt(str.substring(1, 3), 16);
            const g = parseInt(str.substring(3, 5), 16);
            const b = parseInt(str.substring(5, 7), 16);
            const a = str.length >= 7 ? parseInt(str.substring(7, 9), 16) : 255;
            return new $65b04c82fca59f60$export$2e2bcd8739ae039(r / 255, g / 255, b / 255, a / 255);
        };
    })();
    static #_1 = (()=>{
        /**
     * Creates a color from its HSV representation.
     * @param h The hue.
     * @param s The saturation.
     * @param v The value.
     * @returns The color.
     */ this.fromHSV = (h, s, v)=>{
            h = h * 360;
            const c = s * v;
            const x = c * (1 - Math.abs(h / 60 % 2 - 1));
            const m = v - c;
            let [r, g, b] = [
                0,
                0,
                0
            ];
            if (h < 60) [r, g, b] = [
                c,
                x,
                0
            ];
            else if (h < 120) [r, g, b] = [
                x,
                c,
                0
            ];
            else if (h < 180) [r, g, b] = [
                0,
                c,
                x
            ];
            else if (h < 240) [r, g, b] = [
                0,
                x,
                c
            ];
            else if (h < 300) [r, g, b] = [
                x,
                0,
                c
            ];
            else [r, g, b] = [
                c,
                0,
                x
            ];
            return new $65b04c82fca59f60$export$2e2bcd8739ae039(r + m, g + m, b + m);
        };
    })();
}




class $31caad46b2dacdff$export$2e2bcd8739ae039 extends (0, $3f8760cc7c29435c$export$2e2bcd8739ae039) {
    static #_ = (()=>{
        this.bitmapStore = new Map();
    })();
    static #_1 = (()=>{
        this.workingCanvas = new OffscreenCanvas(256, 256);
    })();
    onDraw(context) {
        if (this.bitmap) {
            context.save();
            context.translate(-this.pivot.x * this.bitmap.width, -this.pivot.y * this.bitmap.height);
            context.drawImage(this.bitmap, 0, 0);
            context.restore();
        }
    }
    /** The image path. */ get image() {
        return this._image;
    }
    set image(value) {
        const changed = this._image !== value;
        this._image = value;
        if (changed) this.updateBitmap();
    }
    /** The color. */ get color() {
        return this._color;
    }
    set color(value) {
        const changed = this._color !== value;
        this._color = value;
        if (changed) this.updateBitmap();
    }
    async updateBitmap() {
        if (this._image === null) {
            this.bitmap = null;
            return;
        }
        const bmp = await $31caad46b2dacdff$export$2e2bcd8739ae039.load(this._image);
        if (this.color.r == 1 && this.color.g == 1 && this.color.b == 1 && this.color.a == 1) this.bitmap = bmp;
        else {
            let data = $31caad46b2dacdff$export$2e2bcd8739ae039.bitmapToData(bmp);
            $31caad46b2dacdff$export$2e2bcd8739ae039.colorise(data, this.color);
            this.bitmap = $31caad46b2dacdff$export$2e2bcd8739ae039.dataToBitmap(data);
        }
    }
    static load(path) {
        if ($31caad46b2dacdff$export$2e2bcd8739ae039.bitmapStore.has(path)) return new Promise((resolve)=>{
            resolve($31caad46b2dacdff$export$2e2bcd8739ae039.bitmapStore.get(path));
        });
        return new Promise((resolve)=>{
            let image = new Image();
            image.onload = async ()=>{
                let bmp = await createImageBitmap(image, 0, 0, image.width, image.height);
                $31caad46b2dacdff$export$2e2bcd8739ae039.bitmapStore.set(path, bmp);
                image.remove();
                resolve(bmp);
            };
            image.src = path;
        });
    }
    static unload(path) {
        $31caad46b2dacdff$export$2e2bcd8739ae039.bitmapStore.get(path)?.close();
        $31caad46b2dacdff$export$2e2bcd8739ae039.bitmapStore.delete(path);
    }
    static bitmapToData(bmp) {
        if ($31caad46b2dacdff$export$2e2bcd8739ae039.workingCanvas.width < bmp.width) $31caad46b2dacdff$export$2e2bcd8739ae039.workingCanvas.width = bmp.width;
        if ($31caad46b2dacdff$export$2e2bcd8739ae039.workingCanvas.height < bmp.height) $31caad46b2dacdff$export$2e2bcd8739ae039.workingCanvas.height = bmp.height;
        let ctx = $31caad46b2dacdff$export$2e2bcd8739ae039.workingCanvas.getContext("2d", {
            willReadFrequently: true
        });
        ctx.clearRect(0, 0, bmp.width, bmp.height);
        ctx.drawImage(bmp, 0, 0);
        return ctx.getImageData(0, 0, bmp.width, bmp.height);
    }
    static dataToBitmap(dat) {
        if ($31caad46b2dacdff$export$2e2bcd8739ae039.workingCanvas.width != dat.width) $31caad46b2dacdff$export$2e2bcd8739ae039.workingCanvas.width = dat.width;
        if ($31caad46b2dacdff$export$2e2bcd8739ae039.workingCanvas.height != dat.height) $31caad46b2dacdff$export$2e2bcd8739ae039.workingCanvas.height = dat.height;
        let ctx = $31caad46b2dacdff$export$2e2bcd8739ae039.workingCanvas.getContext("2d", {
            willReadFrequently: true
        });
        ctx.clearRect(0, 0, dat.width, dat.height);
        ctx.putImageData(dat, 0, 0);
        return $31caad46b2dacdff$export$2e2bcd8739ae039.workingCanvas.transferToImageBitmap();
    }
    static colorise(img, color) {
        for(let p = 0; p < img.data.length; p += 4){
            const [r, g, b] = [
                p,
                p + 1,
                p + 2
            ];
            img.data[r] *= color.r;
            img.data[g] *= color.g;
            img.data[b] *= color.b;
        }
    }
    constructor(...args){
        super(...args);
        this._image = null;
        this._color = (0, $65b04c82fca59f60$export$2e2bcd8739ae039).white;
        this.bitmap = null;
        /** The normalized pivot. */ this.pivot = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).one, 0.5);
    }
}











export {$05bad183ec6d4f44$export$2e2bcd8739ae039 as Game, $46a097085382b218$export$2e2bcd8739ae039 as Body, $e59215a0bab84dac$export$2e2bcd8739ae039 as CircleCollider, $084fb6562cdf6a86$export$2e2bcd8739ae039 as Collider, $ab128ccc83fbab1a$export$2e2bcd8739ae039 as LineCollider, $3f8760cc7c29435c$export$2e2bcd8739ae039 as Node, $ffe9b9059661caa3$export$2e2bcd8739ae039 as RigidBody, $31caad46b2dacdff$export$2e2bcd8739ae039 as Sprite, $b31606e820d5109e$export$2e2bcd8739ae039 as Bounds, $65b04c82fca59f60$export$2e2bcd8739ae039 as Color, $a53cef81bd683a5b$export$2e2bcd8739ae039 as Mat3, $8ec4c8ffa911853c$export$2e2bcd8739ae039 as Vec2, $511d31ae5212a454$export$2e2bcd8739ae039 as Camera, $35fd48d1ddd84d0f$export$2e2bcd8739ae039 as Input, $faf0e2bf52520646$export$2e2bcd8739ae039 as Physics, $24207f53032a3f4e$export$389de06130c9495c as makeSnowflake};
//# sourceMappingURL=Petrallengine.mjs.map
