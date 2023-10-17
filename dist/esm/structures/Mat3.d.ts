/**
 * @author Petraller <me@petraller.com>
 */
import '../Math';
import ICopyable from './ICopyable';
import IEquatable from './IEquatable';
import Vec2 from './Vec2';
type Row = [number, number, number];
type Column = [number, number, number];
type Matrix = [Row, Row, Row];
/**
 * Representation of a 3x3 matrix.
 */
export default class Mat3 implements ICopyable, IEquatable {
    /** The matrix. */
    private _m;
    constructor(m?: Matrix);
    copy: () => Mat3;
    equals: (other: Mat3) => boolean;
    /** The determinant of this matrix. */
    get determinant(): number;
    /** The translation component of the matrix. */
    get translation(): Vec2;
    set translation(value: Vec2);
    /** The non-negative scale component of the matrix. */
    get scale(): Vec2;
    /**
     * Retrieves an element of the matrix.
     * @param r The row index.
     * @param c The column index.
     * @returns The element.
     */
    get: (r: number, c: number) => number;
    /**
     * Sets an element of the matrix.
     * @param r The row index.
     * @param c The column index.
     * @param value The value.
     * @returns This matrix after setting.
     */
    set: (r: number, c: number, value: number) => this;
    /**
     * Retrieves a row of the matrix.
     * @param r The row index.
     * @returns The row.
     */
    getRow: (r: number) => Row;
    /**
     * Retrieves a column of the matrix.
     * @param c The column index.
     * @returns The column.
     */
    getColumn: (c: number) => Column;
    /**
     * Retrieves a minor of the matrix.
     * @param r The row index to omit.
     * @param c The column index to omit.
     * @returns The minor.
     */
    private getMinor;
    /**
     * Retrieves the determinant of a cofactor of the matrix.
     * @param r The row index of the element.
     * @param c The column index of the element.
     * @returns The determinant of the cofactor.
     */
    private getCofactorDeterminant;
    /** The zero matrix. */
    static get zero(): Mat3;
    /** The identity matrix. */
    static get identity(): Mat3;
    /**
     * Adds two matrices component-wise.
     *
     * Does not modify the original matrices.
     * @param m1 The first matrix.
     * @param m2 The second matrix.
     * @returns The sum matrix.
     */
    static add: (m1: Mat3, m2: Mat3) => Mat3;
    /**
     * Multiplies a matrix by a constant.
     *
     * Does not modify the original matrix.
     * @param m The matrix.
     * @param n The constant
     * @returns The scaled matrix.
     */
    static multiply: (m: Mat3, n: number) => Mat3;
    /**
     * Multiplies two matrices.
     *
     * Does not modify the original matrices.
     * @param m1 The first matrix.
     * @param m2 The second matrix.
     * @returns The multiplied matrix.
     */
    static matrixMultiply: (m1: Mat3, m2: Mat3) => Mat3;
    /**
     * Subtracts one matrix from another.
     *
     * Does not modify the original matrices.
     * @param m1 The first matrix.
     * @param m2 The second matrix.
     * @returns The difference matrix.
     */
    static subtract: (m1: Mat3, m2: Mat3) => Mat3;
    /**
     * Divides a matrix by a constant.
     *
     * Does not modify the original matrix.
     * @param m The matrix.
     * @param n The constant
     * @returns The scaled matrix.
     */
    static divide: (m: Mat3, n: number) => Mat3;
    /**
     * Transposes a matrix.
     * @param m The matrix.
     * @returns The transposed matrix.
     */
    static transpose: (m: Mat3) => Mat3;
    /**
     * Inverts a matrix. If the matrix is not invertible, an error is thrown.
     *
     * Does not modify the original matrix.
     * @param m The matrix.
     * @returns The inverse matrix.
     */
    static inverse: (m: Mat3) => Mat3;
    /**
     * Constructs a translation matrix.
     * @param v The translation vector.
     * @returns The translation matrix.
     */
    static makeTranslation: (v: Vec2) => Mat3;
    /**
     * Constructs a rotation matrix.
     * @param deg The rotation in degrees.
     * @returns The rotation matrix.
     */
    static makeRotation: (deg: number) => Mat3;
    /**
     * Constructs a scaling matrix.
     * @param v The scaling vector.
     * @returns The scaling matrix.
     */
    static makeScaling: (v: Vec2) => Mat3;
    /**
     * Constructs a transformation matrix.
     * @param t The translation vector.
     * @param r The rotation in degrees.
     * @param s The scaling vector.
     * @returns The transformation matrix.
     */
    static makeTransformation: (t: Vec2, r: number, s: Vec2) => Mat3;
}
export {};
