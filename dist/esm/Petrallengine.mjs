/**
 * @author Petraller <me@petraller.com>
 */
// Adds two arrays for the given base (10 or 16), returning the result.
// This turns out to be the only "primitive" operation we need.
class SnowflakeFactory {
    static TIME_BYTES = 4;
    static RANDOM_BYTES = 2;
    static INCREMENT_BYTES = 2;
    static increment = 0;
    static make = () => {
        let id = "";
        id += Date.now().toString(16).slice(-SnowflakeFactory.TIME_BYTES * 2).padStart(SnowflakeFactory.TIME_BYTES * 2, '0');
        id += Math.round(Math.random() * Math.pow(256, SnowflakeFactory.RANDOM_BYTES)).toString(16).padStart(SnowflakeFactory.RANDOM_BYTES * 2, '0');
        id += SnowflakeFactory.inc.toString(16).padStart(SnowflakeFactory.INCREMENT_BYTES * 2, '0');
        return id;
    };
    static get inc() {
        const lim = Math.pow(256, SnowflakeFactory.INCREMENT_BYTES);
        if (++SnowflakeFactory.increment >= lim) {
            SnowflakeFactory.increment -= lim;
        }
        return SnowflakeFactory.increment;
    }
}
/**
 * Creates a unique Snowflake ID.
 * @returns A unique Snowflake ID.
 */
const makeSnowflake = SnowflakeFactory.make;

/**
 * @author Petraller <me@petraller.com>
 */
/**
 * Checks if an object implements a drawable.
 * @param obj The object.
 * @returns Whether the object implements a drawable.
 */
function isDrawable(obj) {
    return 'onDraw' in obj && obj.onDraw instanceof Function;
}

/**
 * @author Petraller <me@petraller.com>
 */
/**
 * Checks if an object implements a debug drawable.
 * @param obj The object.
 * @returns Whether the object implements a debug drawable.
 */
function isDebugDrawable(obj) {
    return 'onDebugDraw' in obj && obj.onDebugDraw instanceof Function;
}

/**
 * @author Petraller <me@petraller.com>
 */
Math.lerp = (x, y, t) => x * (1 - t) + y * t;
Math.clamp = (x, min, max) => Math.min(Math.max(x, min), max);
Math.mod = (x, y) => (x >= 0) ? (x % Math.abs(y)) : (Math.abs(y) - (-x % Math.abs((y))) % Math.abs(y));

/**
 * @author Petraller <me@petraller.com>
 */
/**
 * Representation of a 2D vector.
 */
class Vec2 {
    _x = 0;
    _y = 0;
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }
    copy = () => new Vec2(this.x, this.y);
    equals = (other) => this.x === other.x && this.y === other.y;
    /** The x-component. */
    get x() { return this._x; }
    /** The y-component. */
    get y() { return this._y; }
    /** The squared length of this vector. */
    get sqrLength() { return this.x * this.x + this.y * this.y; }
    /** The length of this vector. */
    get length() { return Math.sqrt(this.sqrLength); }
    /** The normalized form of this vector. */
    get normalized() { const l = this.length; return l == 0 ? Vec2.zero : Vec2.divide(this, l); }
    ;
    /** A normal to this vector. */
    get normal() { return new Vec2(-this.y, this.x); }
    ;
    /** The value of the minimum component of this vector. */
    get minComponent() { return this.x < this.y ? this.x : this.y; }
    /** The value of the maximum component of this vector. */
    get maxComponent() { return this.x > this.y ? this.x : this.y; }
    /** The zero vector. */
    static get zero() { return new Vec2(0, 0); }
    /** The half vector. */
    static get half() { return new Vec2(0.5, 0.5); }
    /** The unit vector. */
    static get one() { return new Vec2(1, 1); }
    /** The right vector. */
    static get right() { return new Vec2(1, 0); }
    /** The left vector. */
    static get left() { return new Vec2(-1, 0); }
    /** The down vector. */
    static get down() { return new Vec2(0, 1); }
    /** The up vector. */
    static get up() { return new Vec2(0, -1); }
    /** The negative infinity vector. */
    static get negativeInfinity() { return new Vec2(-Infinity, -Infinity); }
    /** The infinity vector. */
    static get infinity() { return new Vec2(Infinity, Infinity); }
    /**
     * Adds two vectors component-wise.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The sum vector.
     */
    static add = (v1, v2) => new Vec2(v1.x + v2.x, v1.y + v2.y);
    /**
     * Multiplies a vector by a constant.
     * @param v The vector.
     * @param n The constant
     * @returns The scaled vector.
     */
    static multiply = (v, n) => new Vec2(v.x * n, v.y * n);
    /**
     * Multiplies two vectors component-wise.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The scaled vector.
     */
    static multiplyComponents = (v1, v2) => new Vec2(v1.x * v2.x, v1.y * v2.y);
    /**
     * Subtracts one vector from another.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The difference vector.
     */
    static subtract = (v1, v2) => Vec2.add(v1, Vec2.multiply(v2, -1));
    /**
     * Divides a vector by a constant.
     * @param v The vector.
     * @param n The constant.
     * @returns The scaled vector.
     */
    static divide = (v, n) => Vec2.multiply(v, 1 / n);
    /**
     * Inverts a vector component-wise.
     * @param v The vector.
     * @returns The inverted vector.
     */
    static inverse = (v) => new Vec2(1 / v.x, 1 / v.y);
    /**
     * Dot multiplies two vectors.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The dot product.
     */
    static dot = (v1, v2) => v1.x * v2.x + v1.y * v2.y;
    /**
     * Cross multiplies two vectors.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The magnitude of the cross product.
     */
    static cross = (v1, v2) => v1.x * v2.y - v1.y * v2.x;
    /**
     * Rotates a vector by an angle.
     * @param deg The angle in degrees.
     * @returns The rotated vector.
     */
    static rotate = (v, deg) => {
        const r = deg * Math.PI / 180;
        const x = Math.cos(r) * v.x - Math.sin(r) * v.y;
        const y = Math.sin(r) * v.x + Math.cos(r) * v.y;
        return new Vec2(x, y);
    };
    /**
     * Transforms a vector by a matrix.
     * @param m The matrix.
     * @param v The vector.
     * @returns The transformed vector.
     */
    static transform = (m, v) => {
        const x = v.x * m.get(0, 0) + v.y * m.get(0, 1) + m.get(0, 2);
        const y = v.x * m.get(1, 0) + v.y * m.get(1, 1) + m.get(1, 2);
        return new Vec2(x, y);
    };
    /**
     * Converts an angle in degrees to a unit vector.
     * @param deg The angle in degrees.
     * @returns The vector.
     */
    static fromAngle = (deg) => { const r = deg * Math.PI / 180; return new Vec2(Math.cos(r), Math.sin(r)); };
    /**
     * Converts a vector to its angle from the x-axis.
     * @param v The vector.
     * @returns The angle in degrees.
     */
    static toAngle = (v) => {
        if (v.x == 0)
            return v.y >= 0 ? 90 : -90;
        return (v.x > 0 ? 0 : (v.y > 0 ? 180 : -180)) + Math.atan(v.y / v.x) * 180 / Math.PI;
    };
    /**
     * Converts an arbitrary object with x and y properties to a vector.
     * @param obj The object.
     * @returns The vector.
     */
    static fromObjXY = (obj) => new Vec2(obj.x, obj.y);
    /**
     * Converts an arbitrary object with width and height properties to a vector.
     * @param obj The object.
     * @returns The vector.
     */
    static fromObjWH = (obj) => new Vec2(obj.width, obj.height);
    /**
     * Converts a 3-tuple to a vector, omitting the last element of the tuple.
     * @param obj The 3-tuple.
     * @returns The vector.
     */
    static from3Tuple = (obj) => new Vec2(obj[0], obj[1]);
    /**
     * Linearly interpolates from one vector to another.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @param t The amount to interpolate by.
     * @returns The interpolated vector.
     */
    static lerp = (v1, v2, t) => new Vec2(Math.lerp(v1.x, v2.x, t), Math.lerp(v1.y, v2.y, t));
    /**
     * Linearly interpolates from one vector to another.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @param t The amount to interpolate by.
     * @returns The interpolated vector.
     */
    static lerpComponents = (v1, v2, t) => new Vec2(Math.lerp(v1.x, v2.x, t.x), Math.lerp(v1.y, v2.y, t.y));
}

/**
 * @author Petraller <me@petraller.com>
 */
/**
 * Representation of a 3x3 matrix.
 */
class Mat3 {
    /** The matrix. */
    _m = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
    constructor(m) {
        for (let r = 0; r < 3; ++r)
            for (let c = 0; c < 3; ++c)
                this._m[r][c] = m ? m[r][c] : 0;
    }
    copy = () => new Mat3(this._m);
    equals = (other) => {
        for (let r = 0; r < 3; ++r)
            for (let c = 0; c < 3; ++c)
                if (this._m[r][c] !== other._m[r][c])
                    return false;
        return true;
    };
    /** The determinant of this matrix. */
    get determinant() {
        return this._m[0][0] * (this._m[1][1] * this._m[2][2] - this._m[1][2] * this._m[2][1]) +
            this._m[0][1] * (this._m[1][2] * this._m[2][0] - this._m[1][0] * this._m[2][2]) +
            this._m[0][2] * (this._m[1][0] * this._m[2][1] - this._m[1][1] * this._m[2][0]);
    }
    /** The translation component of the matrix. */
    get translation() { return Vec2.from3Tuple(this.getColumn(2)); }
    set translation(value) { this.set(0, 2, value.x).set(1, 2, value.y); }
    /** The non-negative scale component of the matrix. */
    get scale() { return new Vec2(Vec2.from3Tuple(this.getColumn(0)).length, Vec2.from3Tuple(this.getColumn(1)).length); }
    /**
     * Retrieves an element of the matrix.
     * @param r The row index.
     * @param c The column index.
     * @returns The element.
     */
    get = (r, c) => this._m[r][c];
    /**
     * Sets an element of the matrix.
     * @param r The row index.
     * @param c The column index.
     * @param value The value.
     * @returns This matrix after setting.
     */
    set = (r, c, value) => { this._m[r][c] = value; return this; };
    /**
     * Retrieves a row of the matrix.
     * @param r The row index.
     * @returns The row.
     */
    getRow = (r) => [this._m[r][0], this._m[r][1], this._m[r][2]];
    /**
     * Retrieves a column of the matrix.
     * @param c The column index.
     * @returns The column.
     */
    getColumn = (c) => [this._m[0][c], this._m[1][c], this._m[2][c]];
    /**
     * Retrieves a minor of the matrix.
     * @param r The row index to omit.
     * @param c The column index to omit.
     * @returns The minor.
     */
    getMinor = (r, c) => [
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
    getCofactorDeterminant = (r, c) => {
        let minor = this.getMinor(r, c);
        let i = (r + c) % 2 === 0 ? 1 : -1;
        return i * (minor[0][0] * minor[1][1] - minor[1][0] * minor[0][1]);
    };
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
    static add = (m1, m2) => {
        let result = new Mat3();
        for (let r = 0; r < 3; ++r)
            for (let c = 0; c < 3; ++c)
                result._m[r][c] = m1._m[r][c] + m2._m[r][c];
        return result;
    };
    /**
     * Multiplies a matrix by a constant.
     *
     * Does not modify the original matrix.
     * @param m The matrix.
     * @param n The constant
     * @returns The scaled matrix.
     */
    static multiply = (m, n) => {
        let result = new Mat3();
        for (let r = 0; r < 3; ++r)
            for (let c = 0; c < 3; ++c)
                result._m[r][c] = m._m[r][c] * n;
        return result;
    };
    /**
     * Multiplies two matrices.
     *
     * Does not modify the original matrices.
     * @param m1 The first matrix.
     * @param m2 The second matrix.
     * @returns The multiplied matrix.
     */
    static matrixMultiply = (m1, m2) => {
        let result = new Mat3();
        for (let r = 0; r < 3; ++r)
            for (let c = 0; c < 3; ++c)
                for (let i = 0; i < 3; ++i)
                    result._m[r][c] += m1._m[r][i] * m2._m[i][c];
        return result;
    };
    /**
     * Subtracts one matrix from another.
     *
     * Does not modify the original matrices.
     * @param m1 The first matrix.
     * @param m2 The second matrix.
     * @returns The difference matrix.
     */
    static subtract = (m1, m2) => Mat3.add(m1, Mat3.multiply(m2, -1));
    /**
     * Divides a matrix by a constant.
     *
     * Does not modify the original matrix.
     * @param m The matrix.
     * @param n The constant
     * @returns The scaled matrix.
     */
    static divide = (m, n) => Mat3.multiply(m, 1 / n);
    /**
     * Transposes a matrix.
     * @param m The matrix.
     * @returns The transposed matrix.
     */
    static transpose = (m) => {
        return new Mat3([
            [m._m[0][0], m._m[1][0], m._m[2][0]],
            [m._m[0][1], m._m[1][1], m._m[2][1]],
            [m._m[0][2], m._m[1][2], m._m[2][2]]
        ]);
    };
    /**
     * Inverts a matrix. If the matrix is not invertible, an error is thrown.
     *
     * Does not modify the original matrix.
     * @param m The matrix.
     * @returns The inverse matrix.
     */
    static inverse = (m) => {
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
    };
    /**
     * Constructs a translation matrix.
     * @param v The translation vector.
     * @returns The translation matrix.
     */
    static makeTranslation = (v) => {
        return Mat3.identity.set(0, 2, v.x).set(1, 2, v.y);
    };
    /**
     * Constructs a rotation matrix.
     * @param deg The rotation in degrees.
     * @returns The rotation matrix.
     */
    static makeRotation = (deg) => {
        const r = deg * Math.PI / 180;
        return Mat3.identity
            .set(0, 0, Math.cos(r)).set(0, 1, -Math.sin(r))
            .set(1, 0, Math.sin(r)).set(1, 1, Math.cos(r));
    };
    /**
     * Constructs a scaling matrix.
     * @param v The scaling vector.
     * @returns The scaling matrix.
     */
    static makeScaling = (v) => {
        return Mat3.identity.set(0, 0, v.x).set(1, 1, v.y);
    };
    /**
     * Constructs a transformation matrix.
     * @param t The translation vector.
     * @param r The rotation in degrees.
     * @param s The scaling vector.
     * @returns The transformation matrix.
     */
    static makeTransformation = (t, r, s) => {
        return Mat3.matrixMultiply(Mat3.matrixMultiply(Mat3.makeTranslation(t), Mat3.makeRotation(r)), Mat3.makeScaling(s));
    };
}

/**
 * @author Petraller <me@petraller.com>
 */
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
class Node {
    _isEnabled = true;
    _position = Vec2.zero;
    _rotation = 0;
    _scale = Vec2.one;
    _parent = null;
    _transform = Mat3.identity;
    _globalTransform = Mat3.identity;
    _isDirty = false;
    /** The unique Snowflake ID of this node. */
    id = makeSnowflake();
    /** The name of this node. */
    name = "New Node";
    /** The children nodes of this node. */
    children = [];
    /** Whether this node has started. */
    isStarted = false;
    /** Whether this node is marked for destruction. */
    isDestroyed = false;
    /**
     * Avoid calling `new Node`, call `Petrallengine.root.createChild` instead.
     */
    constructor(flag, name = "New Node") {
        if (!flag) {
            console.warn(`Avoid calling \`new Node\`, call \`Petrallengine.root.createChild\` instead`);
            console.trace(`\`new Node\` call occured here:`);
        }
        this.name = name;
    }
    toString() { return `${this.name}#${this.id}`; }
    /** The enabled state of this node. */
    get isEnabled() { return this._isEnabled; }
    set isEnabled(value) {
        this._isEnabled = value;
        if (value) {
            this.onEnable?.call(this);
        }
        else {
            this.onDisable?.call(this);
        }
    }
    /** The position of this node. */
    get position() { return this._position; }
    set position(value) { this._position = value; this._isDirty = true; }
    /** The global position of this node. */
    get globalPosition() { return this.globalTransform.translation; }
    set globalPosition(value) {
        const parent = this.parent ? this.parent.globalTransform : Mat3.identity;
        const parentInverse = Mat3.inverse(parent);
        const local = Mat3.matrixMultiply(parentInverse, Mat3.makeTransformation(value, this._rotation, this._scale));
        this.position = local.translation;
    }
    /** The rotation in degrees of this node. */
    get rotation() { return this._rotation; }
    set rotation(value) { this._rotation = (value + 180) % 360 - 180; this._isDirty = true; }
    /** The global rotation in degrees of this node. */
    get globalRotation() {
        let rot = this._rotation;
        let curr = this._parent;
        while (curr !== null) {
            rot += curr._rotation;
            curr = curr._parent;
        }
        return rot;
    }
    set globalRotation(value) {
        let rot = 0;
        let curr = this._parent;
        while (curr !== null) {
            rot += curr._rotation;
            curr = curr._parent;
        }
        this.rotation = value - rot;
    }
    /** The scale of this node. */
    get scale() { return this._scale; }
    set scale(value) { this._scale = value; this._isDirty = true; }
    /** The global scale of this node. */
    get globalScale() { return this.globalTransform.scale; }
    /** The transformation matrix of this node. */
    get transform() { this.recalculateTransformMatrix(); return this._transform; }
    /** The global transformation matrix of this node. */
    get globalTransform() { this.recalculateTransformMatrix(); return this._globalTransform; }
    /** The parent node of this node. */
    get parent() { return this._parent; }
    set parent(value) {
        if (value && value.isDescendantOf(this)) {
            // Hey stop that. No circular hierarchy pls
            console.error(`Making \`${value.toString()}\` a parent of \`${this.toString()}\` will create a circular hierarchy`);
            return;
        }
        if (this._parent) {
            const i = this._parent.children.indexOf(this);
            if (i !== -1) {
                this._parent.children.splice(i, 1);
            }
        }
        this._parent = value;
        if (this._parent) {
            this._parent.children.push(this);
        }
    }
    /** The sibling index of this node. */
    get siblingIndex() {
        if (!this._parent)
            return 0;
        return this._parent.children.indexOf(this);
    }
    set siblingIndex(value) {
        if (!this._parent)
            return;
        const i = this.siblingIndex;
        this._parent.children.splice(i, 1);
        this._parent.children.splice(value, 0, this);
    }
    /**
     * Creates a new child node of this node.
     * @returns The child node.
     */
    createChild(type) {
        const node = new type(this.createChild);
        node.parent = this;
        node.onCreate?.call(node);
        return node;
    }
    /**
     * Destroys this node and all children nodes.
     */
    destroy() {
        this.isDestroyed = true;
    }
    /**
     * Finds a descendant node by its name.
     * @param name The name of the node.
     * @returns The node, or null if not found.
     */
    findDescendantByName(name) {
        for (let child of this.children) {
            if (child.name == name)
                return child;
        }
        for (let child of this.children) {
            const result = child.findDescendantByName(name);
            if (result)
                return result;
        }
        return null;
    }
    /**
     * Finds a descendant node by its type.
     * @param type The type of the node.
     * @returns The node, or null if not found.
     */
    findDescendantByType(type) {
        for (let child of this.children) {
            if (child instanceof type)
                return child;
        }
        for (let child of this.children) {
            const result = child.findDescendantByType(type);
            if (result)
                return result;
        }
        return null;
    }
    /**
     * Determines if this node is a descendent of another node.
     * @param node The other node.
     * @returns Whether this node is a descendant.
     */
    isDescendantOf(node) {
        let curr = this.parent;
        while (curr !== null) {
            if (curr === node)
                return true;
            curr = curr.parent;
        }
        return false;
    }
    /**
     * Recalculates the transformation matrices and unsets the dirty flag.
     */
    recalculateTransformMatrix() {
        if (!this._isDirty)
            return;
        // Calculate
        this._transform = Mat3.makeTransformation(this._position, this._rotation, this._scale);
        if (this.parent)
            this._globalTransform = Mat3.matrixMultiply(this.parent.globalTransform, this._transform);
        else
            this._globalTransform = this._transform.copy();
        // Dirty children
        for (const child of this.children) {
            child._isDirty = true;
        }
        this._isDirty = false;
    }
}

/**
 * @author Petraller <me@petraller.com>
 */
/**
 * Base class for all physics-based nodes that responds to collisions but not physics.
 *
 * Overrideable callbacks:
 * - onCollisionEnter
 * - onCollisionUpdate
 * - onCollisionExit
 */
class Body extends Node {
    _velocity = Vec2.zero;
    /** The velocity of this body. */
    get velocity() { return this._velocity; }
    set velocity(value) { this._velocity = value; }
}

/**
 * @author Petraller <me@petraller.com>
 */
/**
 * Representation of 2D bounds.
 */
class Bounds {
    /** The minimum components. */
    min = Vec2.zero;
    /** The maximum components. */
    max = Vec2.zero;
    constructor(min, max) {
        this.min = min.copy();
        this.max = max.copy();
    }
    copy = () => new Bounds(this.min, this.max);
    equals = (other) => this.min.equals(other.min) && this.max.equals(other.max);
    /** The size of the bounds. */
    get size() { return Vec2.subtract(this.max, this.min); }
    /**
     * Determines if a point exists inside this bounds.
     * @param point The point.
     * @returns Whether the point exists inside this bounds.
     */
    contains = (point) => point.x >= this.min.x && point.x <= this.max.x && point.y >= this.min.y && point.y <= this.max.y;
    /**
     * Determines if this bounds overlaps with another bounds.
     * @param other The other bounds.
     * @returns Whether the bounds overlap.
     */
    overlaps = (other) => this.min.x <= other.max.x && this.max.x >= other.min.x && this.max.y >= other.min.y && this.min.y <= other.max.y;
    /** The zero bounds, [(0, 0), (0, 0)]. */
    static get zero() { return new Bounds(Vec2.zero, Vec2.zero); }
    /** The unit bounds, [(0, 0), (1, 1)]. */
    static get unit() { return new Bounds(Vec2.zero, Vec2.one); }
    /** The normalized bounds, [(-0.5, -0.5), (0.5, 0.5)]. */
    static get norm() { return new Bounds(Vec2.multiply(Vec2.one, -0.5), Vec2.multiply(Vec2.one, 0.5)); }
    /**
     * Create bounds based on a set of vertices.
     * @param vertices The vertices.
     * @returns The bounds.
     */
    static fromVertices = (vertices) => {
        let b = new Bounds(Vec2.infinity, Vec2.negativeInfinity);
        // Iterate all vertices
        for (const vertex of vertices) {
            if (vertex.x > b.max.x)
                b.max = new Vec2(vertex.x, b.max.y);
            if (vertex.x < b.min.x)
                b.min = new Vec2(vertex.x, b.min.y);
            if (vertex.y > b.max.y)
                b.max = new Vec2(b.max.x, vertex.y);
            if (vertex.y < b.min.y)
                b.min = new Vec2(b.min.x, vertex.y);
        }
        return b;
    };
    /**
     * Create bounds that envelop a set of bounds.
     * @param boundses The set of bounds to envelop.
     * @returns The bounds.
     */
    static makeEnvelop = (boundses) => {
        let b = new Bounds(Vec2.infinity, Vec2.negativeInfinity);
        // Iterate all bounds
        for (const bounds of boundses) {
            if (bounds.max.x > b.max.x)
                b.max = new Vec2(bounds.max.x, b.max.y);
            if (bounds.min.x < b.min.x)
                b.min = new Vec2(bounds.min.x, b.min.y);
            if (bounds.max.y > b.max.y)
                b.max = new Vec2(b.max.x, bounds.max.y);
            if (bounds.min.y < b.min.y)
                b.min = new Vec2(b.min.x, bounds.min.y);
        }
        return b;
    };
    /**
     * Translates bounds.
     * @param b The bounds.
     * @param v The translation vector.
     * @returns The translated bounds.
     */
    static translate = (b, v) => { return new Bounds(Vec2.add(b.min, v), Vec2.add(b.max, v)); };
    /**
     * Scales bounds.
     * @param b The bounds.
     * @param v The scale vector.
     * @param origin The normalized origin to scale from.
     * @returns The scaled bounds.
     */
    static scale = (b, v, origin = Vec2.multiply(Vec2.one, 0.5)) => {
        const o = Vec2.lerpComponents(b.min, b.max, origin);
        return new Bounds(Vec2.add(Vec2.multiplyComponents(Vec2.add(b.min, Vec2.multiply(o, -1)), v), o), Vec2.add(Vec2.multiplyComponents(Vec2.add(b.max, Vec2.multiply(o, -1)), v), o));
    };
    /**
     * Shifts bounds such that its origin is at a given position.
     * @param b The bounds.
     * @param pos The position.
     * @param origin The normalized origin of the bounds.
     * @returns The shifted bounds.
     */
    static shift = (b, pos, origin = Vec2.multiply(Vec2.one, 0.5)) => {
        const o = Vec2.lerpComponents(b.min, b.max, origin);
        return Bounds.translate(b, Vec2.subtract(pos, o));
    };
    /**
     * Extends bounds by a vector.
     * @param b The bounds.
     * @param v The extension vector.
     * @returns The extended bounds.
     */
    static extend = (b, v) => {
        if (v.x > 0) {
            b.max = new Vec2(b.max.x + v.x, b.max.y);
        }
        else {
            b.min = new Vec2(b.min.x + v.x, b.min.y);
        }
        if (v.y > 0) {
            b.max = new Vec2(b.max.x, b.max.y + v.y);
        }
        else {
            b.min = new Vec2(b.min.x, b.min.y + v.y);
        }
        return b;
    };
}

/**
 * @author Petraller <me@petraller.com>
 */
/**
 * Base class for all collider nodes.
 *
 * A collider must have a parent PhysicsBody to detect collisions.
 */
class Collider extends Node {
    static BOUNDS_PADDING = 10;
    _bounds = Bounds.zero;
    _restitution = 1;
    /** The layers this body is part of. */
    layers = 0x00000001;
    /** The layers this body can interact with. */
    filter = 0x00000001;
    /** The globally positioned bounds of this collider. */
    get bounds() { return this._bounds.copy(); }
    /**
     * The "bounciness" of this collider.
     *
     * A value of 0 is perfectly inelastic.
     * A value of 1 is perfectly elastic.
     * A value above 1 is energy generating.
     */
    get restitution() { return this._restitution; }
    set restitution(value) { this._restitution = Math.max(value, 0); }
    /**
     * Determines if this collider can interact with another collider based on their layers.
     * @param other The other collider.
     * @returns Whether the colliders can interact.
     */
    canCollideWith(other) {
        return ((other.layers & this.filter) !== 0);
    }
    onDebugDraw(context) {
        // Draw bb
        context.strokeStyle = "#00ffff";
        context.strokeRect(this._bounds.min.x, this._bounds.min.y, this._bounds.size.x, this._bounds.size.y);
    }
}

/**
 * @author Petraller <me@petraller.com>
 */
/**
 * Static class for moving the viewport in the world space.
 */
class Camera {
    /**
     * The position of the camera.
     */
    static position = Vec2.zero;
    /**
     * The rotation of the camera.
     */
    static rotation = 0;
    /**
     * The scale of the camera.
     */
    static scale = Vec2.one;
}

/**
 * @author Petraller <me@petraller.com>
 */
/**
 * Static class for input handling.
 */
class Input {
    static singleton = null;
    static canvas = null;
    static keyStates = new Set();
    static keyTransits = new Set();
    static mouseStates = new Set();
    static mouseTransits = new Set();
    static mousePos = Vec2.zero;
    constructor(canvas) {
        if (Input.singleton) {
            console.warn("Input is used as a static class, do not create additional objects of Input");
            return;
        }
        Input.singleton = this;
        // Register canvas events
        Input.canvas = canvas;
        canvas.onmousedown = (ev) => {
            const b = ev.button;
            Input.mouseStates.add(b);
            Input.mouseTransits.add(b);
        };
        canvas.onmouseup = canvas.onmouseleave = (ev) => {
            const b = ev.button;
            Input.mouseStates.delete(b);
            Input.mouseTransits.add(b);
        };
        canvas.onmousemove = (ev) => {
            Input.mousePos = new Vec2(ev.offsetX, ev.offsetY);
        };
        // Register window events
        window.onkeydown = (ev) => {
            const c = ev.code;
            if (!ev.repeat) {
                Input.keyStates.add(c);
                Input.keyTransits.add(c);
            }
            ev.preventDefault();
        };
        window.onkeyup = (ev) => {
            const c = ev.code;
            Input.keyStates.delete(c);
            Input.keyTransits.add(c);
            ev.preventDefault();
        };
    }
    /**
     * Clears all internal flags at the end of the frame.
     *
     * Called by `Petrallengine.create`.
     */
    endFrame() {
        for (let i of Input.keyTransits.keys()) {
            Input.keyTransits.delete(i);
        }
        for (let i of Input.mouseTransits.keys()) {
            Input.mouseTransits.delete(i);
        }
    }
    /**
     * Returns whether a keyboard key is down.
     * @param keyCode The code of the key.
     * @returns Whether the key is down.
     */
    static isKey(keyCode) {
        return Input.keyStates.has(keyCode);
    }
    /**
     * Returns whether a keyboard key was pressed this frame.
     * @param keyCode The code of the key.
     * @returns Whether the key was pressed this frame.
     */
    static isKeyPressed(keyCode) {
        return Input.keyTransits.has(keyCode) && Input.isKey(keyCode);
    }
    /**
     * Returns whether a keyboard key was released this frame.
     * @param keyCode The code of the key.
     * @returns Whether the key was released this frame.
     */
    static isKeyReleased(keyCode) {
        return Input.keyTransits.has(keyCode) && !Input.isKey(keyCode);
    }
    /**
     * Returns whether a mouse button is down.
     * @param button The mouse button.
     * @returns Whether the mouse button is down.
     */
    static isMouse(button = 0) {
        return Input.mouseStates.has(button);
    }
    /**
     * Returns whether a mouse button was pressed this frame.
     * @param button The mouse button.
     * @returns Whether the mouse button was pressed this frame.
     */
    static isMousePressed(button = 0) {
        return Input.mouseTransits.has(button) && Input.isMouse(button);
    }
    /**
     * Returns whether a mouse button was released this frame.
     * @param button The mouse button.
     * @returns Whether the mouse button was released this frame.
     */
    static isMouseReleased(button = 0) {
        return Input.mouseTransits.has(button) && !Input.isMouse(button);
    }
    /**
     * Returns the position of the mouse in the canvas.
     * @returns The position of the mouse in the canvas.
     */
    static get mousePosition() {
        return Input.mousePos;
    }
    /**
     * Returns the normalized position of the mouse in the canvas.
     * @returns The normalized position of the mouse in the canvas.
     */
    static get mousePositionNormalized() {
        return Vec2.multiplyComponents(Input.mousePos, new Vec2(1 / Input.canvas.width, 1 / Input.canvas.height));
    }
    /**
     * Returns the position on the canvas of a normalized canvas position.
     * @returns The position on the canvas of a normalized canvas position.
     */
    static normalizedToCanvas(normalizedPos) {
        return Vec2.multiplyComponents(normalizedPos, new Vec2(Input.canvas.width, Input.canvas.height));
    }
    /**
     * Returns the normalized position of a canvas position.
     * @returns The normalized position of a canvas position.
     */
    static canvasToNormalized(canvasPos) {
        return Vec2.multiplyComponents(canvasPos, new Vec2(1 / Input.canvas.width, 1 / Input.canvas.height));
    }
    /**
     * Returns the position on the canvas of a world position.
     * @returns The position on the canvas of a world position.
     */
    static worldToCanvas(worldPos) {
        return Vec2.add(Vec2.transform(Mat3.makeTransformation(Vec2.multiply(Camera.position, -1), -Camera.rotation, Camera.scale), worldPos), Vec2.multiply(Vec2.fromObjWH(Input.canvas), 0.5));
    }
    /**
     * Returns the position in the world of a canvas position.
     * @returns The position in the world of a canvas position.
     */
    static canvasToWorld(canvasPos) {
        return Vec2.transform(Mat3.inverse(Mat3.makeTransformation(Vec2.multiply(Camera.position, -1), -Camera.rotation, Camera.scale)), Vec2.add(canvasPos, Vec2.multiply(Vec2.fromObjWH(Input.canvas), -0.5)));
    }
    /**
     * Returns the normalized position on the canvas of a world position.
     * @returns The normalized position on the canvas of a world position.
     */
    static worldToNormalized(worldPos) {
        return Input.canvasToNormalized(Input.worldToCanvas(worldPos));
    }
    /**
     * Returns position in the world of a normalized canvas position.
     * @returns The position in the world of a normalized canvas position.
     */
    static normalizedToWorld(normalizedPos) {
        return Input.canvasToWorld(Input.normalizedToCanvas(normalizedPos));
    }
}

/**
 * @author Petraller <me@petraller.com>
 */
/**
 * A node that has a circle collider shape.
 */
class CircleCollider extends Collider {
    _radius = 1;
    /** The radius of the circle. */
    get radius() { return this._radius; }
    set radius(value) { this._radius = Math.max(value, 0); }
    /** The global radius of the circle. */
    get globalRadius() { return Vec2.dot(Vec2.half, this.globalScale) * this._radius; }
    regenerate() {
        this._bounds = new Bounds(Vec2.subtract(this.globalPosition, new Vec2(this.globalRadius + Collider.BOUNDS_PADDING, this.globalRadius + Collider.BOUNDS_PADDING)), Vec2.add(this.globalPosition, new Vec2(this.globalRadius + Collider.BOUNDS_PADDING, this.globalRadius + Collider.BOUNDS_PADDING)));
    }
    onDebugDraw(context) {
        // Draw vertices
        context.strokeStyle = "#ff00ff";
        context.beginPath();
        context.arc(this.globalPosition.x, this.globalPosition.y, this.globalRadius, 0, 360);
        context.stroke();
        super.onDebugDraw(context);
    }
}

/**
 * @author Petraller <me@petraller.com>
 */
/**
 * Base class for convex polygon colliders.
 */
class ConvexCollider extends Collider {
    _vertices = [];
    _axes = [];
    /** The globally positioned vertices of the collider. */
    get vertices() { return this._vertices.slice(); }
    /** The axes of this collider for SAT. */
    get axes() { return this._axes.slice(); }
    onDebugDraw(context) {
        // Draw vertices
        context.strokeStyle = "#ff00ff";
        context.beginPath();
        for (let i = 0; i <= this._vertices.length; ++i) {
            const v = this._vertices[i % this._vertices.length];
            if (i == 0) {
                context.moveTo(v.x, v.y);
            }
            else {
                context.lineTo(v.x, v.y);
            }
        }
        context.stroke();
        // Draw bb
        context.strokeStyle = "#00ffff";
        context.strokeRect(this._bounds.min.x, this._bounds.min.y, this._bounds.size.x, this._bounds.size.y);
        super.onDebugDraw(context);
    }
}

/**
 * @author Petraller <me@petraller.com>
 */
/**
 * A node that has a single line segment collider shape.
 */
class LineCollider extends Collider {
    _direction = Vec2.multiply(Vec2.right, 100);
    /** The offset of the end from the middle of the line segment. */
    get direction() { return this._direction.copy(); }
    set direction(value) {
        this._direction = value.copy();
    }
    /** The start of the line segment. */
    get start() { return Vec2.subtract(this.position, this._direction); }
    set start(value) {
        const end = this.end;
        this.position = Vec2.divide(Vec2.add(value, end), 2);
        this._direction = Vec2.subtract(end, this.position);
    }
    /** The end of the line segment. */
    get end() { return Vec2.add(this.position, this._direction); }
    set end(value) {
        const start = this.start;
        this.position = Vec2.divide(Vec2.add(start, value), 2);
        this._direction = Vec2.subtract(this.position, start);
    }
    /** The global start of the line segment. */
    get globalStart() { return Vec2.transform(this.globalTransform, Vec2.multiply(this._direction, -1)); }
    set globalStart(value) {
        const end = this.globalEnd;
        this.globalPosition = Vec2.divide(Vec2.add(value, end), 2);
        this._direction = Vec2.multiply(Vec2.transform(Mat3.inverse(this.globalTransform), value), -1);
    }
    /** The global end of the line segment. */
    get globalEnd() { return Vec2.transform(this.globalTransform, this._direction); }
    set globalEnd(value) {
        const start = this.globalStart;
        this.globalPosition = Vec2.divide(Vec2.add(start, value), 2);
        this._direction = Vec2.transform(Mat3.inverse(this.globalTransform), value);
    }
    /** The offset of the global end from the global middle of the line segment. */
    get globalDirection() { return Vec2.divide(Vec2.subtract(this.globalEnd, this.globalStart), 2); }
    regenerate() {
        this._bounds = Bounds.fromVertices([
            Vec2.subtract(this.globalStart, new Vec2(Collider.BOUNDS_PADDING, Collider.BOUNDS_PADDING)),
            Vec2.subtract(this.globalEnd, new Vec2(Collider.BOUNDS_PADDING, Collider.BOUNDS_PADDING)),
            Vec2.add(this.globalStart, new Vec2(Collider.BOUNDS_PADDING, Collider.BOUNDS_PADDING)),
            Vec2.add(this.globalEnd, new Vec2(Collider.BOUNDS_PADDING, Collider.BOUNDS_PADDING))
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
}

/**
 * @author Petraller <me@petraller.com>
 */
var EForceType;
(function (EForceType) {
    EForceType[EForceType["Impulse"] = 0] = "Impulse";
    EForceType[EForceType["Force"] = 1] = "Force";
})(EForceType || (EForceType = {}));
/**
 * A node that responds to physics and collisions.
*/
class RigidBody extends Body {
    _mass = 1;
    /** The linear drag. */
    drag = 0;
    /** The force of gravity. */
    gravity = Vec2.zero;
    /** The mass. */
    get mass() { return this._mass; }
    set mass(value) { this._mass = Math.max(value, Number.EPSILON); }
    addForce(force, type = EForceType.Impulse) {
        let a;
        switch (type) {
            case EForceType.Impulse:
                a = Vec2.multiply(force, 1 / this.mass);
                break;
            case EForceType.Force:
                a = Vec2.multiply(force, Game.deltaTime / this.mass);
                break;
        }
        this.velocity = Vec2.add(this.velocity, a);
    }
}

/**
 * @author Petraller <me@petraller.com>
 */
function makeSnowflakePair(id1, id2) {
    if (id1 < id2)
        return id1 + '|' + id2;
    return id2 + '|' + id1;
}
function breakSnowflakePair(pair) {
    const items = pair.split('|');
    return [items[0], items[1]];
}
/**
 * Static class for physics and collisions.
 */
class Physics {
    static PENETRATION_IMPULSE_STRENGTH = 100;
    static singleton = null;
    static bodies = new Map();
    static colliders = new Map();
    static bodyColliders = new Map();
    static colliderBodies = new Map();
    static pairsCollided = new Set();
    // DEBUG
    debugContacts = new Map();
    constructor() {
        if (Physics.singleton) {
            console.warn("Physics is used as a static class, do not create additional objects of Physics");
            return;
        }
        Physics.singleton = this;
    }
    tick() {
        // --- DYNAMICS ---
        for (const [_, body] of Physics.bodies) {
            if (!(body instanceof RigidBody))
                continue;
            // Gravity
            body.velocity = Vec2.add(body.velocity, Vec2.multiply(body.gravity, Game.deltaTime / body.mass));
            // Drag
            body.velocity = Vec2.divide(body.velocity, body.drag + 1);
        }
        let collisions = []; // all collisions this iteration
        let bodyCollisionCount = new Map(); // number of collisions per body this iteration
        let bodyPairsCalled = new Set(); // pairs of bodies triggered this iteration
        const collideBodies = (c1, c2, col) => {
            const b1 = Physics.bodies.get(Physics.colliderBodies.get(c1.id));
            const b2 = Physics.bodies.get(Physics.colliderBodies.get(c2.id));
            const pair = makeSnowflakePair(b1.id, b2.id);
            if (!bodyPairsCalled.has(pair)) {
                // Call collision enter callback
                if (!Physics.pairsCollided.has(pair)) {
                    Physics.pairsCollided.add(pair);
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
            collisions.push([c1, c2, col]);
            // DEBUG
            if (col.willIntersect) {
                this.debugContacts.set(col.contactPos, 0.1);
            }
        };
        // Get colliders as array
        let colliders = Array.from(Physics.colliders.values());
        // Sort by min x
        colliders.sort((c1, c2) => c1.bounds.min.x - c2.bounds.min.x);
        // Iterate all colliders
        for (let i = 0; i < colliders.length; i++) {
            const ci = colliders[i];
            ci.globalTransform;
            ci.regenerate();
            const biid = Physics.colliderBodies.get(ci.id);
            if (biid === undefined) {
                Physics.colliders.delete(ci.id);
                continue;
            }
            const bi = Physics.bodies.get(biid);
            if (bi === undefined) {
                Physics.colliderBodies.delete(ci.id);
                continue;
            }
            for (let j = i + 1; j < colliders.length; j++) {
                const cj = colliders[j];
                cj.globalTransform;
                cj.regenerate();
                const bjid = Physics.colliderBodies.get(cj.id);
                if (bjid === undefined) {
                    Physics.colliders.delete(cj.id);
                    continue;
                }
                const bj = Physics.bodies.get(bjid);
                if (bj === undefined) {
                    Physics.colliderBodies.delete(cj.id);
                    continue;
                }
                // Same body
                if (bi.id === bj.id) {
                    continue;
                }
                // --- BROAD PHASE ---
                // Non-intersecting layers
                if (!ci.canCollideWith(cj)) {
                    continue;
                }
                // Extend bounds
                const bndi = Bounds.extend(ci.bounds, Vec2.multiply(bi.velocity, Game.deltaTime));
                const bndj = Bounds.extend(cj.bounds, Vec2.multiply(bj.velocity, Game.deltaTime));
                // X limits
                if (bndj.min.x > bndi.max.x) {
                    break;
                }
                // Y overlap
                if (bndi.max.y < bndj.min.y || bndi.min.y > bndj.max.y) {
                    continue;
                }
                // BB overlap
                if (!bndi.overlaps(bndj)) {
                    continue;
                }
                // --- NARROW PHASE ---
                if (ci instanceof CircleCollider && cj instanceof CircleCollider) {
                    // Circle-circle
                    const col = Physics.circleCircleIntersection({
                        position: ci.globalPosition,
                        velocity: Vec2.multiply(bi.velocity, Game.deltaTime),
                        radius: ci.globalRadius
                    }, {
                        position: cj.globalPosition,
                        velocity: Vec2.multiply(bj.velocity, Game.deltaTime),
                        radius: cj.globalRadius
                    });
                    if (col.penetrationDepth > 0 || col.willIntersect) {
                        collideBodies(ci, cj, col);
                    }
                    continue;
                }
                else if ((ci instanceof CircleCollider && cj instanceof LineCollider) ||
                    ci instanceof LineCollider && cj instanceof CircleCollider) {
                    // Circle-line
                    const ccircle = (ci instanceof CircleCollider ? ci : cj);
                    const cline = (ci instanceof LineCollider ? ci : cj);
                    const bcircle = (ccircle == ci) ? bi : bj;
                    const bline = (cline == ci) ? bi : bj;
                    const col = Physics.circleLineSegmentIntersection({
                        position: ccircle.globalPosition,
                        velocity: Vec2.multiply(bcircle.velocity, Game.deltaTime),
                        radius: ccircle.globalRadius
                    }, {
                        position: cline.globalPosition,
                        velocity: Vec2.multiply(bline.velocity, Game.deltaTime),
                        direction: cline.globalDirection
                    });
                    if (col.penetrationDepth > 0 || col.willIntersect) {
                        collideBodies(ccircle, cline, col);
                    }
                    continue;
                }
                else if (ci instanceof ConvexCollider && cj instanceof ConvexCollider) {
                    // Polygon-polygon
                    // TODO
                    continue;
                }
                else if ((ci instanceof CircleCollider && cj instanceof ConvexCollider) ||
                    (ci instanceof ConvexCollider && cj instanceof CircleCollider)) {
                    // Circle-polygon
                    // TODO
                    continue;
                }
            }
        }
        // Clear uncalled pairs
        for (const pair of Physics.pairsCollided.values()) {
            const [b1id, b2id] = breakSnowflakePair(pair);
            if (bodyPairsCalled.has(pair)) {
                continue;
            }
            Physics.pairsCollided.delete(pair);
            if (!Physics.bodies.has(b1id) || !Physics.bodies.get(b2id)) {
                continue;
            }
            const [b1, b2] = [Physics.bodies.get(b1id), Physics.bodies.get(b2id)];
            b1.onCollisionExit?.call(b1, b2);
            b2.onCollisionExit?.call(b2, b1);
        }
        let cached = new Map();
        for (const b of Physics.bodies.values()) {
            cached.set(b, {
                pos: b.globalPosition,
                vel: b.velocity
            });
        }
        // Solve collisions
        for (const collision of collisions) {
            const [c1, c2, col] = collision;
            const b1 = Physics.bodies.get(Physics.colliderBodies.get(c1.id));
            const b2 = Physics.bodies.get(Physics.colliderBodies.get(c2.id));
            let b1cache = cached.get(b1);
            let b2cache = cached.get(b2);
            // Only respond if both are RBs
            if (b1 instanceof RigidBody && b2 instanceof RigidBody) {
                // Mass splitting
                let [m1, m2] = [b1.mass / (bodyCollisionCount.get(b1) ?? 1), b2.mass / (bodyCollisionCount.get(b2) ?? 1)];
                // Infinite mass case
                if (b1.mass === Infinity && b2.mass === Infinity)
                    continue;
                const w = Physics.massToWeights(m1, m2);
                // Impulse response
                if (col.willIntersect) {
                    const restitution = (c1.restitution + c2.restitution) / 2;
                    // Magnitude of velocity in direction of normal
                    const [a1, a2] = [
                        Vec2.dot(Vec2.multiply(b1.velocity, Game.deltaTime), col.contactNormal),
                        Vec2.dot(Vec2.multiply(b2.velocity, Game.deltaTime), col.contactNormal)
                    ];
                    // Get calculated reflected velocities and position
                    const reflVel1 = Vec2.multiply(Vec2.add(Vec2.multiply(b1.velocity, Game.deltaTime), Vec2.multiply(col.contactNormal, 2 * (a2 - a1) * w[0])), restitution);
                    const reflVel2 = Vec2.multiply(Vec2.add(Vec2.multiply(b2.velocity, Game.deltaTime), Vec2.multiply(col.contactNormal, 2 * (a1 - a2) * w[1])), restitution);
                    const reflPos1 = Vec2.add(col.intersectPos1, Vec2.multiply(reflVel1, (1 - col.intersectTime)));
                    const reflPos2 = Vec2.add(col.intersectPos2, Vec2.multiply(reflVel2, (1 - col.intersectTime)));
                    // Offset of collider from body
                    const c1Off = Vec2.subtract(c1.globalPosition, b1.globalPosition);
                    const c2Off = Vec2.subtract(c2.globalPosition, b2.globalPosition);
                    // Accumulate deltas
                    let dp1 = Vec2.subtract(Vec2.subtract(reflPos1, c1Off), b1cache.pos);
                    let dp2 = Vec2.subtract(Vec2.subtract(reflPos2, c2Off), b2cache.pos);
                    let dv1 = Vec2.subtract(Vec2.divide(reflVel1, Game.deltaTime), b1cache.vel);
                    let dv2 = Vec2.subtract(Vec2.divide(reflVel2, Game.deltaTime), b2cache.vel);
                    b1cache.pos = Vec2.add(b1cache.pos, dp1);
                    b2cache.pos = Vec2.add(b2cache.pos, dp2);
                    b1cache.vel = Vec2.add(b1cache.vel, dv1);
                    b2cache.vel = Vec2.add(b2cache.vel, dv2);
                }
                // Penetration response
                if (col.penetrationDepth > 0) {
                    b1cache.vel = Vec2.add(b1cache.vel, Vec2.multiply(col.contactNormal, Physics.PENETRATION_IMPULSE_STRENGTH * col.penetrationDepth * w[0]));
                    b2cache.vel = Vec2.add(b2cache.vel, Vec2.multiply(col.contactNormal, -Physics.PENETRATION_IMPULSE_STRENGTH * col.penetrationDepth * w[1]));
                }
                // Normal response
                b1cache.pos = Vec2.add(b1cache.pos, Vec2.multiply(col.contactNormal, (1 + col.penetrationDepth) * w[0] * Game.deltaTime));
                b2cache.pos = Vec2.add(b2cache.pos, Vec2.multiply(col.contactNormal, -(1 + col.penetrationDepth) * w[1] * Game.deltaTime));
            }
        }
        // --- PHYSICS RESOLUTION ---
        for (const [body, next] of cached) {
            body.velocity = next.vel;
            body.globalPosition = Vec2.add(next.pos, Vec2.multiply(next.vel, Game.deltaTime));
        }
    }
    static registerBody(body) {
        if (Physics.bodies.has(body.id) || Physics.bodyColliders.has(body.id)) {
            console.error(`Body #${body.id} already registered in physics system`);
            return;
        }
        Physics.bodies.set(body.id, body);
        Physics.bodyColliders.set(body.id, new Set);
    }
    static deregisterBody(body) {
        for (const col of Physics.bodyColliders.get(body.id) ?? []) {
            Physics.colliderBodies.delete(col);
        }
        Physics.bodies.delete(body.id);
        Physics.bodyColliders.delete(body.id);
    }
    static registerCollider(collider, owner) {
        if (Physics.colliders.has(collider.id) || Physics.colliderBodies.has(collider.id)) {
            console.error(`Collider #${owner.id} already registered in physics system`);
            return;
        }
        if (!Physics.bodies.has(owner.id)) {
            console.error(`Body #${owner.id} not registered in physics system`);
            return;
        }
        if (Physics.bodyColliders.get(owner.id)?.has(collider.id) || Physics.colliderBodies.has(collider.id)) {
            console.warn(`Collider #${collider.id} already registered with body #${Physics.colliderBodies.get(collider.id)} in physics system`);
            return;
        }
        Physics.colliders.set(collider.id, collider);
        Physics.colliderBodies.set(collider.id, owner.id);
        Physics.bodyColliders.get(owner.id)?.add(collider.id);
    }
    static deregisterCollider(collider) {
        Physics.bodyColliders.get(Physics.colliderBodies.get(collider.id) ?? "")?.delete(collider.id);
        Physics.colliders.delete(collider.id);
        Physics.colliderBodies.delete(collider.id);
    }
    static circleLineSegmentIntersection(c1, c2) {
        let output = {
            penetrationDepth: 0,
            willIntersect: false,
            intersectTime: 0,
            intersectPos1: Vec2.zero,
            intersectPos2: Vec2.zero,
            contactPos: Vec2.zero,
            contactNormal: Vec2.zero,
        };
        // Line properties
        const lineStart = Vec2.subtract(c2.position, c2.direction);
        const lineMid = c2.position.copy();
        const lineEnd = Vec2.add(c2.position, c2.direction);
        const lineDirNorm = c2.direction.normalized;
        const lineNormal = c2.direction.normal.normalized;
        // Relative vel of 1 from 2
        const relVel = Vec2.subtract(c1.velocity, c2.velocity);
        // Parallel distance along line
        const d = Vec2.dot(Vec2.subtract(c1.position, c2.position), lineDirNorm);
        // Closest point on line
        const cpline = Vec2.add(c2.position, Vec2.multiply(lineDirNorm, Math.clamp(d, -c2.direction.length, c2.direction.length)));
        output.contactNormal = Vec2.subtract(c1.position, cpline).normalized;
        output.penetrationDepth = Math.max(c1.radius - Vec2.subtract(c1.position, cpline).length, 0);
        // Zero relative velocity
        if (relVel.sqrLength === 0) {
            return output;
        }
        function lineEdgeCase(withinBothLines) {
            // Relative vel normal
            const relVelN = relVel.normal.normalized;
            let closer = lineEnd;
            let dist = 0;
            if (withinBothLines) {
                // Closer to start
                if (Vec2.dot(Vec2.subtract(c1.position, lineMid), c2.direction) < 0) {
                    closer = lineStart;
                }
                // Closer to end
                else {
                    closer = lineEnd;
                }
                dist = Vec2.dot(Vec2.subtract(closer, c1.position), relVelN);
            }
            else {
                // Perpendicular distance to start, end
                const dStart = Vec2.dot(Vec2.subtract(lineStart, c1.position), relVelN);
                const dEnd = Vec2.dot(Vec2.subtract(lineEnd, c1.position), relVelN);
                const dStartAbs = Math.abs(dStart);
                const dEndAbs = Math.abs(dEnd);
                dist = dEnd;
                // No collision
                if (dStartAbs > c1.radius && dEndAbs > c1.radius) {
                    return output;
                }
                // Two possible collisions
                else if (dStartAbs <= c1.radius && dEndAbs <= c1.radius) {
                    // V distance to start, end
                    const m0 = Vec2.dot(Vec2.subtract(lineStart, c1.position), relVel);
                    const m1 = Vec2.dot(Vec2.subtract(lineEnd, c1.position), relVel);
                    const m0Abs = Math.abs(m0);
                    const m1Abs = Math.abs(m1);
                    // Closer to start
                    if (m0Abs < m1Abs) {
                        closer = lineStart;
                        dist = dStart;
                    }
                }
                // Start possible collision only
                else if (dStartAbs <= c1.radius) {
                    closer = lineStart;
                    dist = dStart;
                }
                // Else end possible collision only
            }
            // Delta from start to CPA
            const m = Vec2.dot(Vec2.subtract(closer, c1.position), relVel.normalized);
            if (m <= 0)
                return;
            // Delta from collision pt to CPA
            const s = Math.sqrt(c1.radius * c1.radius - dist * dist);
            if (Math.abs(dist) > c1.radius)
                return;
            // Time to intersect
            const it = (m - s) / relVel.length;
            if (it >= 0 && it <= 1) {
                output.willIntersect = true;
                output.intersectTime = it;
                output.intersectPos1 = Vec2.add(c1.position, Vec2.multiply(c1.velocity, output.intersectTime));
                output.intersectPos2 = Vec2.add(c2.position, Vec2.multiply(c2.velocity, output.intersectTime));
                output.contactPos = closer.copy();
            }
        }
        // Signed distance of circle from line segment
        const sd = Vec2.dot(lineNormal, Vec2.subtract(c1.position, c2.position));
        if (sd > -c1.radius && sd < c1.radius) {
            // Circle between distant lines
            lineEdgeCase(true);
        }
        else {
            let extrudeFn = (pos) => pos.copy();
            let itFn = () => -1;
            let contactFn = (ipos1) => ipos1.copy();
            // Circle in inner half plane opposite direction of normal
            if (sd <= -c1.radius) {
                extrudeFn = (pos) => Vec2.subtract(pos, Vec2.multiply(lineNormal, c1.radius));
                itFn = () => -(sd + c1.radius) / Vec2.dot(lineNormal, relVel);
                contactFn = (ipos1) => Vec2.add(ipos1, Vec2.multiply(lineNormal, c1.radius));
            }
            // Circle in outer half plane in direction of normal
            else if (sd >= c1.radius) {
                extrudeFn = (pos) => Vec2.add(pos, Vec2.multiply(lineNormal, c1.radius));
                itFn = () => -(sd - c1.radius) / Vec2.dot(lineNormal, relVel);
                contactFn = (ipos1) => Vec2.subtract(ipos1, Vec2.multiply(lineNormal, c1.radius));
            }
            // Extrude points
            const pStart = extrudeFn(lineStart);
            const pEnd = extrudeFn(lineEnd);
            // Moving into segment
            if (Vec2.dot(relVel.normal, Vec2.subtract(pStart, c1.position))
                * Vec2.dot(relVel.normal, Vec2.subtract(pEnd, c1.position)) < 0) {
                // Perpendicular distance / perpendicular velocity
                // = Time to intersect
                const it = itFn();
                if (it >= 0 && it <= 1) {
                    output.willIntersect = true;
                    output.intersectTime = it;
                    output.intersectPos1 = Vec2.add(c1.position, Vec2.multiply(c1.velocity, output.intersectTime));
                    output.intersectPos2 = Vec2.add(c2.position, Vec2.multiply(c2.velocity, output.intersectTime));
                    output.contactPos = contactFn(output.intersectPos1);
                }
            }
            // Moving out of segment
            else {
                lineEdgeCase(false);
            }
        }
        return output;
    }
    static circleCircleIntersection(c1, c2) {
        let output = {
            penetrationDepth: 0,
            willIntersect: false,
            intersectTime: 0,
            intersectPos1: Vec2.zero,
            intersectPos2: Vec2.zero,
            contactPos: Vec2.zero,
            contactNormal: Vec2.subtract(c1.position, c2.position).normalized,
        };
        // Relative circle radius
        const relCircleRadius = c1.radius + c2.radius;
        // Relative position of 1 from 2
        const relPos = Vec2.subtract(c1.position, c2.position);
        output.penetrationDepth = Math.max(relCircleRadius - relPos.length, 0);
        // Relative vel of 1 from 2
        const relVel = Vec2.subtract(c1.velocity, c2.velocity);
        // Zero relative velocity
        if (relVel.sqrLength === 0) {
            return output;
        }
        // Convert to ray-circle problem
        const relRayPos = c1.position.copy();
        const relRayVel = relVel.copy();
        const relCirclePos = c2.position.copy();
        // Distance squared
        const distSqr = Vec2.subtract(relRayPos, relCirclePos).sqrLength;
        // Ray length
        const rl = relRayVel.length;
        // Delta from start to CPA
        const m = Vec2.dot(Vec2.subtract(relCirclePos, relRayPos), relRayVel.normalized);
        // CPA
        const nSqr = distSqr - m * m;
        if (nSqr > relCircleRadius * relCircleRadius)
            return output;
        // Delta from collision point to CPA
        const s = Math.sqrt(relCircleRadius * relCircleRadius - nSqr);
        // Time to intersect
        const it = (m - s) / rl;
        if (it >= 0 && it <= 1) {
            output.willIntersect = true;
            output.intersectTime = it;
            output.intersectPos1 = Vec2.add(c1.position, Vec2.multiply(c1.velocity, output.intersectTime));
            output.intersectPos2 = Vec2.add(c2.position, Vec2.multiply(c2.velocity, output.intersectTime));
            output.contactPos = Vec2.lerp(output.intersectPos1, output.intersectPos2, c1.radius / (c1.radius + c2.radius));
            output.contactNormal = Vec2.subtract(output.intersectPos1, output.intersectPos2).normalized;
        }
        return output;
    }
    static massToWeights(m1, m2) {
        return [
            m2 < Infinity ? (m2 / (m1 + m2)) : 1,
            m1 < Infinity ? (m1 / (m1 + m2)) : 1
        ];
    }
}

/**
 * @author Petraller <me@petraller.com>
 */
/**
 * Static class for Petrallengine.
 *
 * Call `Petrallengine.create(MY_CANVAS_ELEMENT)` to start building your 2D browser application.
 */
class Game {
    /** The build number. */
    static BUILD = 3;
    /** The version. */
    static VERSION = "0.0.3";
    /** The number of scheduled frame updates per second. */
    static FRAME_RATE = 60;
    /** The scheduled interval between frame updates in seconds. */
    static FRAME_TIME = 1 / Game.FRAME_RATE;
    /** Debug draw flags. */
    static debugDraw = {
        general: false,
        physics: false,
    };
    static _deltaTime = Game.FRAME_TIME;
    static _time = 0;
    static rootNode = new Node(Game, "_ROOT_");
    /** The root node of the whole game. */
    static get root() {
        return Game.rootNode;
    }
    /**
     * Initialises the engine.
     * @param target The target canvas element to render onto.
     */
    static create(target) {
        console.debug(`%cPetrallengine v${Game.VERSION}\nby Petraller`, 'color: #0799ce');
        console.debug(`https://petraller.com/`);
        // Fallback target
        if (!target) {
            const targetDefaultID = 'app';
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
        const input = new Input(target);
        const physics = new Physics();
        // Get context
        const canvas = target;
        const context = canvas.getContext('2d');
        // Create game loop
        const ft = 1000 / Game.FRAME_RATE;
        const gameLoop = () => {
            const tStart = Date.now();
            // Update all
            function update(node) {
                if (!node.isEnabled || node.isDestroyed)
                    return;
                if (!node.isStarted) {
                    node.onStart?.call(node);
                    node.isStarted = true;
                    // Register in physics system
                    if (node instanceof Body) {
                        Physics.registerBody(node);
                    }
                    if (node instanceof Collider) {
                        let curr = node.parent;
                        while (curr !== null) {
                            if (curr instanceof Body) {
                                Physics.registerCollider(node, curr);
                                break;
                            }
                            curr = curr.parent;
                        }
                        if (curr === null) {
                            console.error(`Collider does not have a parent Body, it will not be registered by the Physics system`);
                        }
                    }
                }
                node.onUpdate?.call(node);
                node.globalTransform;
                // Iterate children
                for (let child of node.children) {
                    update(child);
                }
            }
            update(Game.rootNode);
            // Deferred destroy
            function destroy(node) {
                if (node.isDestroyed) {
                    // Callback
                    node.onDestroy?.call(node);
                    // Deregister from physics system
                    if (node instanceof Body) {
                        Physics.deregisterBody(node);
                    }
                    if (node instanceof Collider) {
                        Physics.deregisterCollider(node);
                    }
                    // Mark children
                    for (let child of node.children) {
                        child.destroy();
                    }
                    // Unlink from parent
                    if (node.parent) {
                        node.parent.children.splice(node.parent.children.indexOf(node), 1);
                        node.parent = null;
                    }
                }
                // Iterate children
                const children = node.children.slice();
                for (let child of children) {
                    destroy(child);
                }
            }
            destroy(Game.rootNode);
            // Physics step
            physics.tick();
            // Reset
            context.reset();
            // Clear
            context.clearRect(0, 0, canvas.width, canvas.height);
            // Apply camera transforms
            context.translate(canvas.width / 2, canvas.height / 2);
            context.translate(-Camera.position.x, -Camera.position.y);
            context.rotate(-Camera.rotation * Math.PI / 180);
            context.scale(Camera.scale.x, Camera.scale.y);
            // Draw all
            function draw(node) {
                if (!node.isEnabled)
                    return;
                // Draw drawables
                if (isDrawable(node)) {
                    context.save();
                    // Apply node transforms
                    context.transform(node.globalTransform.get(0, 0), node.globalTransform.get(1, 0), node.globalTransform.get(0, 1), node.globalTransform.get(1, 1), node.globalTransform.get(0, 2), node.globalTransform.get(1, 2));
                    node.onDraw.call(node, context);
                    context.restore();
                }
                // Iterate children
                for (let child of node.children) {
                    draw(child);
                }
            }
            draw(Game.rootNode);
            // Debug draw
            function debugDraw(node) {
                if (!node.isEnabled)
                    return;
                // // Draw colliders
                // if (isCollider(node)) {
                //     // Draw debug
                //     node.debugDraw(context);
                // }
                // Draw drawables
                if (isDebugDrawable(node)) {
                    context.save();
                    node.onDebugDraw.call(node, context);
                    context.restore();
                }
                // Iterate children
                for (let child of node.children) {
                    debugDraw(child);
                }
            }
            if (Game.debugDraw.general) {
                debugDraw(Game.rootNode);
            }
            // Physics debug draw
            if (Game.debugDraw.physics) {
                for (let contact of physics.debugContacts) {
                    context.strokeStyle = "#ff0000";
                    context.beginPath();
                    context.arc(contact[0].x, contact[0].y, 4, 0, 360);
                    context.stroke();
                    physics.debugContacts.set(contact[0], contact[1] - this.deltaTime);
                    if (contact[1] < 0)
                        physics.debugContacts.delete(contact[0]);
                }
            }
            // Clear transition flags
            input.endFrame();
            const tEnd = Date.now();
            const dt = tEnd - tStart;
            const wait = Math.max(ft - dt, 1);
            Game._time += (Game._deltaTime = dt + wait);
            setTimeout(gameLoop, wait);
        };
        gameLoop();
    }
    /**
     * Returns the total elapsed game time in seconds.
     */
    static get time() {
        return Game._time / 1000;
    }
    /**
     * Returns the actual elapsed time for the frame in seconds.
     */
    static get deltaTime() {
        return Game._deltaTime / 1000;
    }
}

/**
 * @author Petraller <me@petraller.com>
 */
/**
 * Representation of a RGBA color.
 */
class Color {
    /** The red component. */
    r = 0;
    /** The green component. */
    g = 0;
    /** The blue component. */
    b = 0;
    /** The alpha component. */
    a = 1;
    constructor(r, g, b, a) {
        this.r = Math.clamp(r, 0, 1);
        this.g = Math.clamp(g, 0, 1);
        this.b = Math.clamp(b, 0, 1);
        this.a = Math.clamp(a ?? 1, 0, 1);
    }
    copy = () => new Color(this.r, this.g, this.b, this.a);
    equals = (other) => this.r == other.r && this.g == other.g && this.b == other.b && this.a == other.a;
    /**
     * Converts the color to its #RRGGBBAA hexadecimal string representation.
     * @param hasAlpha Whether to include the alpha channel (default: false).
     * @returns The hexadecimal string representation.
     */
    toHexString = (hasAlpha = false) => {
        let str = "#";
        str += ((this.r * 255) & 0xFF).toString(16).padStart(2, '0');
        str += ((this.g * 255) & 0xFF).toString(16).padStart(2, '0');
        str += ((this.b * 255) & 0xFF).toString(16).padStart(2, '0');
        if (hasAlpha)
            str += ((this.a * 255) & 0xFF).toString(16).padStart(2, '0');
        return str;
    };
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
    };
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
    static lerp(c1, c2, t) {
        return new Color(c1.r * (1 - t) + c2.r * t, c1.g * (1 - t) + c2.g * t, c1.b * (1 - t) + c2.b * t, c1.a * (1 - t) + c2.a * t);
    }
    /**
     * Spherically linearly interpolates from one color to another.
     * @param c1 The first color.
     * @param c2 The second color.
     * @param t The amount to interpolate by.
     * @returns The interpolated color.
     */
    static slerp(c1, c2, t) {
        const func = (t) => Math.sin(t * Math.PI / 2);
        const [u, v] = [func(1 - t), func(t)];
        return new Color(c1.r * u + c2.r * v, c1.g * u + c2.g * v, c1.b * u + c2.b * v, c1.a * u + c2.a * v);
    }
    /**
     * Creates a color from its hexadecimal string representation.
     * @param str The hexadecimal string representation.
     * @returns The color.
     */
    static fromHexString = (str) => {
        str = str.trim();
        const r = parseInt(str.substring(1, 3), 16);
        const g = parseInt(str.substring(3, 5), 16);
        const b = parseInt(str.substring(5, 7), 16);
        const a = str.length >= 7 ? parseInt(str.substring(7, 9), 16) : 255;
        return new Color(r / 255, g / 255, b / 255, a / 255);
    };
    /**
     * Creates a color from its HSV representation.
     * @param h The hue.
     * @param s The saturation.
     * @param v The value.
     * @returns The color.
     */
    static fromHSV = (h, s, v) => {
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
    };
}

/**
 * @author Petraller <me@petraller.com>
 */
/**
 * A node that draws an image on the canvas.
*/
class Sprite extends Node {
    static bitmapStore = new Map();
    _image = null;
    _color = Color.white;
    bitmap = null;
    workingCanvas = [new OffscreenCanvas(1, 1), new OffscreenCanvas(1, 1)];
    /** The normalized pivot. */
    pivot = Vec2.multiply(Vec2.one, 0.5);
    onDraw(context) {
        if (this.bitmap) {
            context.save();
            context.translate(-this.pivot.x * this.bitmap.width, -this.pivot.y * this.bitmap.height);
            const workingContext = this.workingCanvas.map(e => e.getContext('2d'));
            workingContext[0].globalCompositeOperation = "copy";
            workingContext[0].fillStyle = this.color.toHexString();
            workingContext[0].fillRect(0, 0, this.workingCanvas[0].width, this.workingCanvas[0].height);
            workingContext[0].globalCompositeOperation = "destination-in";
            workingContext[0].drawImage(this.bitmap, 0, 0);
            workingContext[1].globalCompositeOperation = "copy";
            workingContext[1].drawImage(this.bitmap, 0, 0);
            workingContext[1].globalCompositeOperation = "multiply";
            workingContext[1].drawImage(this.workingCanvas[0], 0, 0);
            workingContext[1].globalCompositeOperation = "destination-atop";
            workingContext[1].drawImage(this.bitmap, 0, 0);
            context.globalAlpha = this.color.a;
            context.drawImage(this.workingCanvas[1], 0, 0);
            context.restore();
        }
    }
    /** The image path. */
    get image() { return this._image; }
    set image(value) {
        const changed = this._image !== value;
        this._image = value;
        if (changed) {
            this.updateBitmap();
        }
    }
    /** The color. */
    get color() { return this._color.copy(); }
    set color(value) { this._color = value.copy(); }
    async updateBitmap() {
        if (this._image === null) {
            this.bitmap = null;
            return;
        }
        const bmp = await Sprite.load(this._image);
        for (const cnv of this.workingCanvas) {
            cnv.width = bmp.width;
            cnv.height = bmp.height;
        }
        this.bitmap = bmp;
    }
    static load(path) {
        if (Sprite.bitmapStore.has(path)) {
            return new Promise((resolve) => { resolve(Sprite.bitmapStore.get(path)); });
        }
        return new Promise((resolve) => {
            let image = new Image();
            image.onload = async () => {
                let bmp = await createImageBitmap(image, 0, 0, image.width, image.height);
                Sprite.bitmapStore.set(path, bmp);
                image.remove();
                resolve(bmp);
            };
            image.src = path;
        });
    }
    static unload(path) {
        Sprite.bitmapStore.get(path)?.close();
        Sprite.bitmapStore.delete(path);
    }
}

export { Body, Bounds, Camera, CircleCollider, Collider, Color, EForceType, Game, Input, LineCollider, Mat3, Node, Physics, RigidBody, Sprite, Vec2, makeSnowflake };
