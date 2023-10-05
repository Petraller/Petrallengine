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
    m: Matrix = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];

    constructor(m?: Matrix) {
        for (let r = 0; r < 3; ++r)
            for (let c = 0; c < 3; ++c)
                this.m[r][c] = m ? m[r][c] : 0;
    }

    copy = () => new Mat3(this.m);
    copyFrom = (other: Mat3) => {
        for (let r = 0; r < 3; ++r)
            for (let c = 0; c < 3; ++c)
                this.m[r][c] = other.m[r][c];
        return this;
    }
    equals = (other: Mat3) => {
        for (let r = 0; r < 3; ++r)
            for (let c = 0; c < 3; ++c)
                if (this.m[r][c] !== other.m[r][c])
                    return false;
        return true;
    }

    /**
     * Returns the determinant of this matrix.
     * @returns The determinant of this matrix.
     */
    get determinant() {
        return this.m[0][0] * (this.m[1][1] * this.m[2][2] - this.m[1][2] * this.m[2][1]) +
            this.m[0][1] * (this.m[1][2] * this.m[2][0] - this.m[1][0] * this.m[2][2]) +
            this.m[0][2] * (this.m[1][0] * this.m[2][1] - this.m[1][1] * this.m[2][0]);
    }

    /**
     * Retrieves an element of the matrix.
     * 
     * Shorthand for `Mat3.m[r][c]`.
     * @param r The row index.
     * @param c The column index.
     * @returns The element.
     */
    get = (r: number, c: number) => this.m[r][c];

    /**
     * Sets an element of the matrix.
     * 
     * Shorthand for `Mat3.m[r][c] = value`.
     * @param r The row index.
     * @param c The column index.
     * @param value The value.
     * @returns This matrix after setting.
     */
    set = (r: number, c: number, value: number) => { this.m[r][c] = value; return this; }

    /**
     * Retrieves a row of the matrix.
     * @param r The row index.
     * @returns The row.
     */
    getRow = (r: number): Row => [this.m[r][0], this.m[r][1], this.m[r][2]];

    /**
     * Retrieves a column of the matrix.
     * @param c The column index.
     * @returns The column.
     */
    getColumn = (c: number): Column => [this.m[0][c], this.m[1][c], this.m[2][c]];

    /**
     * Retrieves a minor of the matrix.
     * @param r The row index to omit.
     * @param c The column index to omit.
     * @returns The minor.
     */
    getMinor = (r: number, c: number): [[number, number], [number, number]] => [
        r == 0
            ? [c == 0 ? this.m[1][1] : this.m[1][0], c == 2 ? this.m[1][1] : this.m[1][2]]
            : [c == 0 ? this.m[0][1] : this.m[0][0], c == 2 ? this.m[0][1] : this.m[0][2]],
        r == 2
            ? [c == 0 ? this.m[1][1] : this.m[1][0], c == 2 ? this.m[1][1] : this.m[1][2]]
            : [c == 0 ? this.m[2][1] : this.m[2][0], c == 2 ? this.m[2][1] : this.m[2][2]]
    ];

    /**
     * Retrieves the determinant of a cofactor of the matrix.
     * @param r The row index of the element.
     * @param c The column index of the element.
     * @returns The determinant of the cofactor.
     */
    getCofactorDeterminant = (r: number, c: number) => {
        let minor = this.getMinor(r, c);
        let i = (r + c) % 2 === 0 ? 1 : -1;
        return i * (minor[0][0] * minor[1][1] - minor[1][0] * minor[0][1]);
    }

    /**
     * Transposes the matrix.
     * @returns This matrix after transposition.
     */
    transpose = () => {
        this.m = ([
            [this.m[0][0], this.m[1][0], this.m[2][0]],
            [this.m[0][1], this.m[1][1], this.m[2][1]],
            [this.m[0][2], this.m[1][2], this.m[2][2]]
        ]);
        return this;
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
                result.m[r][c] = m1.m[r][c] + m2.m[r][c];
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
                result.m[r][c] = m.m[r][c] * n;
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
                    result.m[r][c] += m1.m[r][i] * m2.m[i][c];
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
     * Inverts a matrix. If the matrix is not invertible, an error is thrown.
     * 
     * Does not modify the original matrix.
     * @param m The matrix.
     * @returns The inverse matrix.
     */
    static inverse = (m: Mat3) => {
        const det = m.determinant;
        if (det === 0) {
            throw `Matrix ${m.m} is not invertible`;
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
}
