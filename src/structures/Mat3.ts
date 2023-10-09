/**
 * @author Petraller <me@petraller.com>
 */

import '../Math';
import ICopyable from './ICopyable';
import IEquatable from './IEquatable';
import Vec2 from './Vec2';

type Row = [number, number, number];
type Column = [number, number, number];
type Matrix = [Row, Row, Row]; /* your boat */

/**
 * Representation of a 3x3 matrix.
 */
export default class Mat3 implements ICopyable, IEquatable {
    /** The matrix. */
    private _m: Matrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    constructor(m?: Matrix) {
        for (let r = 0; r < 3; ++r)
            for (let c = 0; c < 3; ++c)
                this._m[r][c] = m ? m[r][c] : 0;
    }

    copy = () => new Mat3(this._m);
    equals = (other: Mat3) => {
        for (let r = 0; r < 3; ++r)
            for (let c = 0; c < 3; ++c)
                if (this._m[r][c] !== other._m[r][c])
                    return false;
        return true;
    }

    /** The determinant of this matrix. */
    get determinant() {
        return this._m[0][0] * (this._m[1][1] * this._m[2][2] - this._m[1][2] * this._m[2][1]) +
            this._m[0][1] * (this._m[1][2] * this._m[2][0] - this._m[1][0] * this._m[2][2]) +
            this._m[0][2] * (this._m[1][0] * this._m[2][1] - this._m[1][1] * this._m[2][0]);
    }

    /** The translation component of the matrix. */
    get translation() { return Vec2.from3Tuple(this.getColumn(2)); }
    set translation(value: Vec2) { this.set(0, 2, value.x).set(1, 2, value.y); }

    /** The non-negative scale component of the matrix. */
    get scale() { return new Vec2(Vec2.from3Tuple(this.getColumn(0)).length, Vec2.from3Tuple(this.getColumn(1)).length); }

    /**
     * Retrieves an element of the matrix.
     * @param r The row index.
     * @param c The column index.
     * @returns The element.
     */
    get = (r: number, c: number) => this._m[r][c];

    /**
     * Sets an element of the matrix.
     * @param r The row index.
     * @param c The column index.
     * @param value The value.
     * @returns This matrix after setting.
     */
    set = (r: number, c: number, value: number) => { this._m[r][c] = value; return this; }

    /**
     * Retrieves a row of the matrix.
     * @param r The row index.
     * @returns The row.
     */
    getRow = (r: number): Row => [this._m[r][0], this._m[r][1], this._m[r][2]];

    /**
     * Retrieves a column of the matrix.
     * @param c The column index.
     * @returns The column.
     */
    getColumn = (c: number): Column => [this._m[0][c], this._m[1][c], this._m[2][c]];

    /**
     * Retrieves a minor of the matrix.
     * @param r The row index to omit.
     * @param c The column index to omit.
     * @returns The minor.
     */
    private getMinor = (r: number, c: number): [[number, number], [number, number]] => [
        r == 0
            ? [c == 0 ? this._m[1][1] : this._m[1][0], c == 2 ? this._m[1][1] : this._m[1][2]]
            : [c == 0 ? this._m[0][1] : this._m[0][0], c == 2 ? this._m[0][1] : this._m[0][2]],
        r == 2
            ? [c == 0 ? this._m[1][1] : this._m[1][0], c == 2 ? this._m[1][1] : this._m[1][2]]
            : [c == 0 ? this._m[2][1] : this._m[2][0], c == 2 ? this._m[2][1] : this._m[2][2]]
    ];

    /**
     * Retrieves the determinant of a cofactor of the matrix.
     * @param r The row index of the element.
     * @param c The column index of the element.
     * @returns The determinant of the cofactor.
     */
    private getCofactorDeterminant = (r: number, c: number) => {
        let minor = this.getMinor(r, c);
        let i = (r + c) % 2 === 0 ? 1 : -1;
        return i * (minor[0][0] * minor[1][1] - minor[1][0] * minor[0][1]);
    }

    /** The zero matrix. */
    static get zero() { return new Mat3([[0, 0, 0], [0, 0, 0], [0, 0, 0]]); }
    /** The identity matrix. */
    static get identity() { return new Mat3([[1, 0, 0], [0, 1, 0], [0, 0, 1]]); }

    /**
     * Adds two matrices component-wise.
     * 
     * Does not modify the original matrices.
     * @param m1 The first matrix.
     * @param m2 The second matrix.
     * @returns The sum matrix.
     */
    static add = (m1: Mat3, m2: Mat3) => {
        let result = new Mat3();
        for (let r = 0; r < 3; ++r)
            for (let c = 0; c < 3; ++c)
                result._m[r][c] = m1._m[r][c] + m2._m[r][c];
        return result;
    }

    /**
     * Multiplies a matrix by a constant.
     * 
     * Does not modify the original matrix.
     * @param m The matrix.
     * @param n The constant
     * @returns The scaled matrix.
     */
    static multiply = (m: Mat3, n: number) => {
        let result = new Mat3();
        for (let r = 0; r < 3; ++r)
            for (let c = 0; c < 3; ++c)
                result._m[r][c] = m._m[r][c] * n;
        return result;
    }

    /**
     * Multiplies two matrices.
     * 
     * Does not modify the original matrices.
     * @param m1 The first matrix.
     * @param m2 The second matrix.
     * @returns The multiplied matrix.
     */
    static matrixMultiply = (m1: Mat3, m2: Mat3) => {
        let result = new Mat3();
        for (let r = 0; r < 3; ++r)
            for (let c = 0; c < 3; ++c)
                for (let i = 0; i < 3; ++i)
                    result._m[r][c] += m1._m[r][i] * m2._m[i][c];
        return result;
    }

    /**
     * Subtracts one matrix from another.
     * 
     * Does not modify the original matrices.
     * @param m1 The first matrix.
     * @param m2 The second matrix.
     * @returns The difference matrix.
     */
    static subtract = (m1: Mat3, m2: Mat3) => Mat3.add(m1, Mat3.multiply(m2, -1));

    /**
     * Divides a matrix by a constant.
     * 
     * Does not modify the original matrix.
     * @param m The matrix.
     * @param n The constant
     * @returns The scaled matrix.
     */
    static divide = (m: Mat3, n: number) => Mat3.multiply(m, 1 / n);

    /**
     * Transposes a matrix.
     * @param m The matrix.
     * @returns The transposed matrix.
     */
    static transpose = (m: Mat3) => {
        return new Mat3([
            [m._m[0][0], m._m[1][0], m._m[2][0]],
            [m._m[0][1], m._m[1][1], m._m[2][1]],
            [m._m[0][2], m._m[1][2], m._m[2][2]]
        ]);;
    }

    /**
     * Inverts a matrix. If the matrix is not invertible, an error is thrown.
     * 
     * Does not modify the original matrix.
     * @param m The matrix.
     * @returns The inverse matrix.
     */
    static inverse = (m: Mat3) => {
        const det = m.determinant;
        if (det === 0) {
            console.error(`Matrix ${m._m} is not invertible`);
            return m;
        }
        return Mat3.multiply(new Mat3([
            [m.getCofactorDeterminant(0, 0), m.getCofactorDeterminant(1, 0), m.getCofactorDeterminant(2, 0)],
            [m.getCofactorDeterminant(0, 1), m.getCofactorDeterminant(1, 1), m.getCofactorDeterminant(2, 1)],
            [m.getCofactorDeterminant(0, 2), m.getCofactorDeterminant(1, 2), m.getCofactorDeterminant(2, 2)]
        ]), 1 / det);
    }

    /**
     * Constructs a translation matrix.
     * @param v The translation vector.
     * @returns The translation matrix.
     */
    static makeTranslation = (v: Vec2) => {
        return Mat3.identity.set(0, 2, v.x).set(1, 2, v.y);
    }

    /**
     * Constructs a rotation matrix.
     * @param deg The rotation in degrees.
     * @returns The rotation matrix.
     */
    static makeRotation = (deg: number) => {
        const r = deg * Math.PI / 180;
        return Mat3.identity
            .set(0, 0, Math.cos(r)).set(0, 1, -Math.sin(r))
            .set(1, 0, Math.sin(r)).set(1, 1, Math.cos(r));
    }

    /**
     * Constructs a scaling matrix.
     * @param v The scaling vector.
     * @returns The scaling matrix.
     */
    static makeScaling = (v: Vec2) => {
        return Mat3.identity.set(0, 0, v.x).set(1, 1, v.y);
    }

    /**
     * Constructs a transformation matrix.
     * @param t The translation vector.
     * @param r The rotation in degrees.
     * @param s The scaling vector.
     * @returns The transformation matrix.
     */
    static makeTransformation = (t: Vec2, r: number, s: Vec2) => {
        return Mat3.matrixMultiply(
            Mat3.matrixMultiply(
                Mat3.makeTranslation(t),
                Mat3.makeRotation(r)
            ), Mat3.makeScaling(s)
        );
    }
}
