/**
 * A Snowflake ID.
 */
export type Snowflake = string;
/**
 * Creates a unique Snowflake ID.
 * @returns A unique Snowflake ID.
 */
export const makeSnowflake: () => Snowflake;
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
/**
 * @author Petraller <me@petraller.com>
 */
/**
 * Interface for copy-constructable objects
 */
export interface ICopyable {
    /**
     * Constructs a copy of the object.
     * @returns The copy of the object.
     */
    copy(): ICopyable;
    /**
     * Copies the value of another object.
     * @param other The other object.
     * @returns This object after copying.
     */
    copyFrom(other: ICopyable): ICopyable;
}
/**
 * @author Petraller <me@petraller.com>
 */
/**
 * Interface for equatable objects.
 */
export interface IEquatable {
    /**
     * Determines if this object is equal to another.
     * @param other The other object.
     * @returns Whether the objects are equal.
     */
    equals(other: IEquatable): boolean;
}
type Row = [number, number, number];
type Column = [number, number, number];
type Matrix = [Row, Row, Row];
/**
 * Representation of a 3x3 matrix.
 */
export class Mat3 implements ICopyable, IEquatable {
    constructor(m?: Matrix);
    copy: () => Mat3;
    copyFrom: (other: Mat3) => this;
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
/**
 * Representation of a 2D vector.
 */
export class Vec2 implements ICopyable, IEquatable {
    constructor(x: number, y: number);
    copy: () => Vec2;
    copyFrom: (other: Vec2) => this;
    equals: (other: Vec2) => boolean;
    /** The x-component. */
    get x(): number;
    /** The y-component. */
    get y(): number;
    /** The squared length of this vector. */
    get sqrLength(): number;
    /** The length of this vector. */
    get length(): number;
    /** The normalized form of this vector. */
    get normalized(): Vec2;
    /** The value of the minimum component of this vector. */
    get minComponent(): number;
    /** The value of the maximum component of this vector. */
    get maxComponent(): number;
    /** The zero vector. */
    static get zero(): Vec2;
    /** The unit vector. */
    static get one(): Vec2;
    /** The right vector. */
    static get right(): Vec2;
    /** The left vector. */
    static get left(): Vec2;
    /** The down vector. */
    static get down(): Vec2;
    /** The up vector. */
    static get up(): Vec2;
    /** The negative infinity vector. */
    static get negativeInfinity(): Vec2;
    /** The infinity vector. */
    static get infinity(): Vec2;
    /**
     * Adds two vectors component-wise.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The sum vector.
     */
    static add: (v1: Vec2, v2: Vec2) => Vec2;
    /**
     * Multiplies a vector by a constant.
     * @param v The vector.
     * @param n The constant
     * @returns The scaled vector.
     */
    static multiply: (v: Vec2, n: number) => Vec2;
    /**
     * Multiplies two vectors component-wise.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The scaled vector.
     */
    static multiplyComponents: (v1: Vec2, v2: Vec2) => Vec2;
    /**
     * Subtracts one vector from another.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The difference vector.
     */
    static subtract: (v1: Vec2, v2: Vec2) => Vec2;
    /**
     * Divides a vector by a constant.
     * @param v The vector.
     * @param n The constant.
     * @returns The scaled vector.
     */
    static divide: (v: Vec2, n: number) => Vec2;
    /**
     * Inverts a vector component-wise.
     * @param v The vector.
     * @returns The inverted vector.
     */
    static inverse: (v: Vec2) => Vec2;
    /**
     * Dot multiplies two vectors.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The dot product.
     */
    static dot: (v1: Vec2, v2: Vec2) => number;
    /**
     * Cross multiplies two vectors.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The magnitude of the cross product.
     */
    static cross: (v1: Vec2, v2: Vec2) => number;
    /**
     * Rotates a vector by an angle.
     * @param deg The angle in degrees.
     * @returns The rotated vector.
     */
    static rotate: (v: Vec2, deg: number) => Vec2;
    /**
     * Transforms a vector by a matrix.
     * @param m The matrix.
     * @param v The vector.
     * @returns The transformed vector.
     */
    static transform: (m: Mat3, v: Vec2) => Vec2;
    /**
     * Converts an angle in degrees to a unit vector.
     * @param deg The angle in degrees.
     * @returns The vector.
     */
    static fromAngle: (deg: number) => Vec2;
    /**
     * Converts a vector to its angle from the x-axis.
     * @param v The vector.
     * @returns The angle in degrees.
     */
    static toAngle: (v: Vec2) => number;
    /**
     * Converts an arbitrary object with x and y properties to a vector.
     * @param obj The object.
     * @returns The vector.
     */
    static fromObjXY: (obj: {
        x: number;
        y: number;
    }) => Vec2;
    /**
     * Converts an arbitrary object with width and height properties to a vector.
     * @param obj The object.
     * @returns The vector.
     */
    static fromObjWH: (obj: {
        width: number;
        height: number;
    }) => Vec2;
    /**
     * Converts a 3-tuple to a vector, omitting the last element of the tuple.
     * @param obj The 3-tuple.
     * @returns The vector.
     */
    static from3Tuple: (obj: [number, number, number]) => Vec2;
    /**
     * Linearly interpolates from one vector to another.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @param t The amount to interpolate by.
     * @returns The interpolated vector.
     */
    static lerp: (v1: Vec2, v2: Vec2, t: number) => Vec2;
    /**
     * Linearly interpolates from one vector to another.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @param t The amount to interpolate by.
     * @returns The interpolated vector.
     */
    static lerpComponents: (v1: Vec2, v2: Vec2, t: Vec2) => Vec2;
}
/**
 * Static class for moving the viewport in the world space.
 */
export class Camera {
    /**
     * The position of the camera.
     */
    static position: Vec2;
    /**
     * The rotation of the camera.
     */
    static rotation: number;
    /**
     * The scale of the camera.
     */
    static scale: Vec2;
}
/**
 * Static class for input handling.
 */
export class Input {
    constructor(canvas: HTMLCanvasElement);
    /**
     * Clears all internal flags at the end of the frame.
     *
     * Called by `Petrallengine.create`.
     */
    _endFrame(): void;
    /**
     * Returns whether a keyboard key is down.
     * @param keyCode The code of the key.
     * @returns Whether the key is down.
     */
    static isKey(keyCode: string): boolean;
    /**
     * Returns whether a keyboard key was pressed this frame.
     * @param keyCode The code of the key.
     * @returns Whether the key was pressed this frame.
     */
    static isKeyPressed(keyCode: string): boolean;
    /**
     * Returns whether a keyboard key was released this frame.
     * @param keyCode The code of the key.
     * @returns Whether the key was released this frame.
     */
    static isKeyReleased(keyCode: string): boolean;
    /**
     * Returns whether a mouse button is down.
     * @param button The mouse button.
     * @returns Whether the mouse button is down.
     */
    static isMouse(button?: number): boolean;
    /**
     * Returns whether a mouse button was pressed this frame.
     * @param button The mouse button.
     * @returns Whether the mouse button was pressed this frame.
     */
    static isMousePressed(button?: number): boolean;
    /**
     * Returns whether a mouse button was released this frame.
     * @param button The mouse button.
     * @returns Whether the mouse button was released this frame.
     */
    static isMouseReleased(button?: number): boolean;
    /**
     * Returns the position of the mouse in the canvas.
     * @returns The position of the mouse in the canvas.
     */
    static get mousePosition(): Vec2;
    /**
     * Returns the normalized position of the mouse in the canvas.
     * @returns The normalized position of the mouse in the canvas.
     */
    static get mousePositionNormalized(): Vec2;
    /**
     * Returns the position on the canvas of a world position.
     * @returns The position on the canvas of a world position.
     */
    static worldToCanvas(worldPos: Vec2): Vec2;
    /**
     * Returns the position in the world of a canvas position.
     * @returns The position in the world of a canvas position.
     */
    static canvasToWorld(canvasPos: Vec2): Vec2;
}
type Constructor<T> = {
    new (...args: any[]): T;
};
/**
 * Base class for all nodes in the scene tree.
 *
 * Overrideable callbacks:
 * - onCreate
 * - onStart
 * - onDestroy
 * - onEnable
 * - onDisable
 * - onUpdate
 */
export class Node {
    /** The unique Snowflake ID of this node. */
    readonly id: Snowflake;
    /** The name of this node. */
    name: string;
    /** The children nodes of this node. */
    children: Node[];
    /** Whether this node has started. */
    isStarted: boolean;
    /**
     * Avoid calling `new Node`, call `Petrallengine.root.createChild` instead.
     */
    constructor(flag?: any);
    toString(): string;
    /** The enabled state of this node. */
    get isEnabled(): boolean;
    set isEnabled(value: boolean);
    /** The position of this node. */
    get position(): Vec2;
    set position(value: Vec2);
    /** The global position of this node. */
    get globalPosition(): Vec2;
    set globalPosition(value: Vec2);
    /** The rotation in degrees of this node. */
    get rotation(): number;
    set rotation(value: number);
    /** The global rotation in degrees of this node. */
    get globalRotation(): number;
    set globalRotation(value: number);
    /** The scale of this node. */
    get scale(): Vec2;
    set scale(value: Vec2);
    /** The global scale of this node. */
    get globalScale(): Vec2;
    /** The transformation matrix of this node. */
    get transform(): Mat3;
    /** The global transformation matrix of this node. */
    get globalTransform(): Mat3;
    /** The parent node of this node. */
    get parent(): Node | null;
    set parent(value: Node | null);
    /** The sibling index of this node. */
    get siblingIndex(): number;
    set siblingIndex(value: number);
    /**
     * Creates a new child node of this node.
     * @returns The child node.
     */
    createChild<T extends Node>(type: Constructor<T>): T;
    /**
     * Destroys this node and all children nodes.
     */
    destroy(): void;
    /**
     * Finds a descendant node by its name.
     * @param name The name of the node.
     * @returns The node, or null if not found.
     */
    findDescendantByName(name: string): Node | null;
    /**
     * Finds a descendant node by its type.
     * @param type The type of the node.
     * @returns The node, or null if not found.
     */
    findDescendantByType<T>(type: Constructor<T>): T | null;
    /**
     * Determines if this node is a descendent of another node.
     * @param node The other node.
     * @returns Whether this node is a descendant.
     */
    isDescendantOf(node: Node): boolean;
    /**
     * Called when the node is created.
     */
    onCreate?(): void;
    /**
     * Called when the node is first ticked.
     */
    onStart?(): void;
    /**
     * Called when the node is destroyed.
     */
    onDestroy?(): void;
    /**
     * Called when the node is enabled.
     */
    onEnable?(): void;
    /**
     * Called when the node is disabled.
     */
    onDisable?(): void;
    /**
     * Called when the node is ticked.
     */
    onUpdate?(): void;
}
/**
 * Interface for all drawables.
 */
export interface IDrawable {
    /**
     * Called when drawn.
     * @param context The canvas rendering context.
     */
    onDraw(context: CanvasRenderingContext2D): void;
}
/**
 * Static class for Petrallengine.
 *
 * Call `Petrallengine.create(MY_CANVAS_ELEMENT)` to start building your 2D browser application.
 */
export class Game {
    /** The build number. */
    static readonly BUILD = 1;
    /** The version. */
    static readonly VERSION = "0.0.1";
    /** The number of scheduled frame updates per second. */
    static readonly FRAME_RATE = 60;
    /** The scheduled interval between frame updates in seconds. */
    static readonly FRAME_TIME: number;
    /** Debug draw flags. */
    static readonly DEBUG_DRAWS: {
        colliders: boolean;
        boundingBoxes: boolean;
    };
    /** The root node of the whole game. */
    static get root(): Node;
    /**
     * Initialises the engine.
     * @param target The target canvas element to render onto.
     */
    static create(target?: HTMLCanvasElement): void;
    /**
     * Returns the total elapsed game time in seconds.
     */
    static get time(): number;
    /**
     * Returns the actual elapsed time for the frame in seconds.
     */
    static get deltaTime(): number;
}
/**
 * Representation of a RGBA color.
 */
export class Color implements ICopyable, IEquatable {
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
    copyFrom: (other: Color) => this;
    equals: (other: Color) => boolean;
    /**
     * Converts the color to its #RRGGBBAA hexadecimal string representation.
     * @param hasAlpha Whether to include the alpha channel.
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
    /** Teal. */
    static get teal(): Color;
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
/**
 * A node that draws an image on the canvas.
*/
export class Sprite extends Node implements IDrawable {
    /** The normalized pivot. */
    pivot: Vec2;
    onDraw(context: CanvasRenderingContext2D): void;
    /** The image path. */
    get image(): string | null;
    set image(value: string | null);
    /** The color. */
    get color(): Color;
    set color(value: Color);
}
/**
 * Representation of 2D bounds.
 */
export class Bounds implements ICopyable, IEquatable {
    /** The minimum components. */
    min: Vec2;
    /** The maximum components. */
    max: Vec2;
    constructor(min: Vec2, max: Vec2);
    copy: () => Bounds;
    copyFrom: (other: Bounds) => this;
    equals: (other: Bounds) => boolean;
    /** The size of the bounds. */
    get size(): Vec2;
    /**
     * Determines if a point exists inside this bounds.
     * @param point The point.
     * @returns Whether the point exists inside this bounds.
     */
    contains: (point: Vec2) => boolean;
    /**
     * Determines if this bounds overlaps with another bounds.
     * @param other The other bounds.
     * @returns Whether the bounds overlap.
     */
    overlaps: (other: Bounds) => boolean;
    /** The zero bounds, [(0, 0), (0, 0)]. */
    static get zero(): Bounds;
    /** The unit bounds, [(0, 0), (1, 1)]. */
    static get unit(): Bounds;
    /** The normalized bounds, [(-0.5, -0.5), (0.5, 0.5)]. */
    static get norm(): Bounds;
    /**
     * Create bounds based on a set of vertices.
     * @param vertices The vertices.
     * @returns The bounds.
     */
    static fromVertices: (vertices: Vec2[]) => Bounds;
    /**
     * Create bounds that envelop a set of bounds.
     * @param boundses The set of bounds to envelop.
     * @returns The bounds.
     */
    static makeEnvelop: (boundses: Bounds[]) => Bounds;
    /**
     * Translates bounds.
     * @param b The bounds.
     * @param v The translation vector.
     * @returns The translated bounds.
     */
    static translate: (b: Bounds, v: Vec2) => Bounds;
    /**
     * Scales bounds.
     * @param b The bounds.
     * @param v The scale vector.
     * @param origin The normalized origin to scale from.
     * @returns The scaled bounds.
     */
    static scale: (b: Bounds, v: Vec2, origin?: Vec2) => Bounds;
    /**
     * Shifts bounds such that its origin is at a given position.
     * @param b The bounds.
     * @param pos The position.
     * @param origin The normalized origin of the bounds.
     * @returns The shifted bounds.
     */
    static shift: (b: Bounds, pos: Vec2, origin?: Vec2) => Bounds;
    /**
     * Extends bounds by a vector.
     * @param b The bounds.
     * @param v The extension vector.
     * @returns The extended bounds.
     */
    static extend: (b: Bounds, v: Vec2) => Bounds;
}

//# sourceMappingURL=Petrallengine.d.ts.map
