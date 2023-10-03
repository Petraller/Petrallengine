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
 * @author Petraller <me@petraller.com>
 */ /**
 * @author Petraller <me@petraller.com>
 */ /** */ Math.lerp = (x, y, t)=>x * (1 - t) + y * t;
Math.clamp = (x, min, max)=>Math.min(Math.max(x, min), max);
Math.mod = (x, y)=>x >= 0 ? x % Math.abs(y) : Math.abs(y) - -x % Math.abs(y) % Math.abs(y);


class $8ec4c8ffa911853c$export$2e2bcd8739ae039 {
    constructor(x, y){
        /** The x-component. */ this.x = 0;
        /** The y-component. */ this.y = 0;
        this.copy = ()=>new $8ec4c8ffa911853c$export$2e2bcd8739ae039(this.x, this.y);
        /**
     * Returns the squared length of this vector.
     * @returns The squared length of this vector.
     */ this.sqrLength = ()=>this.x * this.x + this.y * this.y;
        /**
     * Returns the length of this vector.
     * @returns The length of this vector.
     */ this.length = ()=>Math.sqrt(this.sqrLength());
        /**
     * Returns the normalized form of this vector.
     * 
     * Does not modify the original vector.
     * @returns The normalized form of this vector.
     */ this.normalized = ()=>{
            const l = this.length();
            return l == 0 ? $8ec4c8ffa911853c$export$2e2bcd8739ae039.zero : $8ec4c8ffa911853c$export$2e2bcd8739ae039.divide(this, l);
        };
        /**
     * Returns the value of the minimum component of this vector.
     * @returns The value of the minimum component of this vector.
     */ this.minComponent = ()=>this.x < this.y ? this.x : this.y;
        /**
     * Returns the value of the maximum component of this vector.
     * @returns The value of the maximum component of this vector.
     */ this.maxComponent = ()=>this.x > this.y ? this.x : this.y;
        /**
     * Normalizes this vector.
     * @returns This vector after normalizing.
     */ this.normalize = ()=>{
            const l = this.length();
            return this.scale(l == 0 ? 0 : 1 / l);
        };
        /**
     * Copies the value of another vector.
     * @param v The other vector.
     * @returns This vector after copying.
     */ this.copyFrom = (v)=>{
            this.x = v.x;
            this.y = v.y;
            return this;
        };
        /**
     * Translates this vector by another vector.
     * @param v The other vector.
     * @returns This vector after translating.
     */ this.translate = (v)=>{
            this.x += v.x;
            this.y += v.y;
            return this;
        };
        /**
     * Rotates this vector by an angle.
     * @param deg The angle in degrees.
     * @returns This vector after rotating.
     */ this.rotate = (deg)=>{
            const r = deg * Math.PI / 180;
            const x = Math.cos(r) * this.x - Math.sin(r) * this.y;
            const y = Math.sin(r) * this.x + Math.cos(r) * this.y;
            this.x = x;
            this.y = y;
            return this;
        };
        /**
     * Scales this vector by a factor.
     * @param n The scaling factor.
     * @returns This vector after scaling.
     */ this.scale = (n)=>{
            this.x *= n;
            this.y *= n;
            return this;
        };
        /**
     * Scales this vector by another vector component-wise.
     * @param v The other vector.
     * @returns This vector after scaling.
     */ this.scaleComponents = (v)=>{
            this.x *= v.x;
            this.y *= v.y;
            return this;
        };
        /**
     * Inverts this vector component-wise.
     * @returns This vector after inverting.
     */ this.invert = ()=>{
            this.x = 1 / this.x;
            this.y = 1 / this.y;
            return this;
        };
        this.x = x;
        this.y = y;
    }
    /** @returns The zero vector. */ static get zero() {
        return new $8ec4c8ffa911853c$export$2e2bcd8739ae039(0, 0);
    }
    /** @returns The unit vector. */ static get one() {
        return new $8ec4c8ffa911853c$export$2e2bcd8739ae039(1, 1);
    }
    /** @returns The right vector. */ static get right() {
        return new $8ec4c8ffa911853c$export$2e2bcd8739ae039(1, 0);
    }
    /** @returns The left vector. */ static get left() {
        return new $8ec4c8ffa911853c$export$2e2bcd8739ae039(-1, 0);
    }
    /** @returns The down vector. */ static get down() {
        return new $8ec4c8ffa911853c$export$2e2bcd8739ae039(0, 1);
    }
    /** @returns The up vector. */ static get up() {
        return new $8ec4c8ffa911853c$export$2e2bcd8739ae039(0, -1);
    }
    static #_ = (()=>{
        /**
     * Adds two vectors component-wise.
     * 
     * Does not modify the original vectors.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The sum vector.
     */ this.add = (v1, v2)=>new $8ec4c8ffa911853c$export$2e2bcd8739ae039(v1.x + v2.x, v1.y + v2.y);
    })();
    static #_1 = (()=>{
        /**
     * Multiplies a vector by a constant.
     * 
     * Does not modify the original vector.
     * @param v The vector.
     * @param n The constant
     * @returns The scaled vector.
     */ this.multiply = (v, n)=>new $8ec4c8ffa911853c$export$2e2bcd8739ae039(v.x * n, v.y * n);
    })();
    static #_2 = (()=>{
        /**
     * Multiplies two vectors component-wise.
     * 
     * Does not modify the original vectors.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The scaled vector.
     */ this.multiplyComponents = (v1, v2)=>new $8ec4c8ffa911853c$export$2e2bcd8739ae039(v1.x * v2.x, v1.y * v2.y);
    })();
    static #_3 = (()=>{
        /**
     * Subtracts one vector from another.
     * 
     * Does not modify the original vectors.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The difference vector.
     */ this.subtract = (v1, v2)=>$8ec4c8ffa911853c$export$2e2bcd8739ae039.add(v1, $8ec4c8ffa911853c$export$2e2bcd8739ae039.multiply(v2, -1));
    })();
    static #_4 = (()=>{
        /**
     * Divides a vector by a constant.
     * 
     * Does not modify the original vector.
     * @param v The vector.
     * @param n The constant.
     * @returns The scaled vector.
     */ this.divide = (v, n)=>$8ec4c8ffa911853c$export$2e2bcd8739ae039.multiply(v, 1 / n);
    })();
    static #_5 = (()=>{
        /**
     * Inverts a vector component-wise.
     * 
     * Does not modify the original vector.
     * @param v The vector.
     * @returns The inverted vector.
     */ this.inverse = (v)=>new $8ec4c8ffa911853c$export$2e2bcd8739ae039(1 / v.x, 1 / v.y);
    })();
    static #_6 = (()=>{
        /**
     * Dot multiplies two vectors.
     * 
     * Does not modify the original vectors.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The dot product.
     */ this.dot = (v1, v2)=>v1.x * v2.x + v1.y * v2.y;
    })();
    static #_7 = (()=>{
        /**
     * Cross multiplies two vectors.
     * 
     * Does not modify the original vectors.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @returns The magnitude of the cross product.
     */ this.cross = (v1, v2)=>v1.x * v2.y - v1.y * v2.x;
    })();
    static #_8 = (()=>{
        /**
     * Converts an angle in degrees to a unit vector.
     * @param deg The angle in degrees.
     * @returns The vector.
     */ this.fromAngle = (deg)=>{
            const r = deg * Math.PI / 180;
            return new $8ec4c8ffa911853c$export$2e2bcd8739ae039(Math.cos(r), Math.sin(r));
        };
    })();
    static #_9 = (()=>{
        /**
     * Converts a vector to its angle from the x-axis.
     * @param v The vector.
     * @returns The angle in degrees.
     */ this.toAngle = (v)=>{
            if (v.x == 0) return v.y >= 0 ? 90 : -90;
            return (v.x > 0 ? 0 : v.y > 0 ? 180 : -180) + Math.atan(v.y / v.x) * 180 / Math.PI;
        };
    })();
    static #_10 = (()=>{
        /**
     * Converts an arbitrary object with x and y properties to a vector.
     * @param obj The object.
     * @returns The vector.
     */ this.fromObjXY = (obj)=>new $8ec4c8ffa911853c$export$2e2bcd8739ae039(obj.x, obj.y);
    })();
    static #_11 = (()=>{
        /**
     * Converts an arbitrary object with width and height properties to a vector.
     * @param obj The object.
     * @returns The vector.
     */ this.fromObjWH = (obj)=>new $8ec4c8ffa911853c$export$2e2bcd8739ae039(obj.width, obj.height);
    })();
    static #_12 = (()=>{
        /**
     * Linearly interpolates from one vector to another.
     * @param v1 The first vector.
     * @param v2 The second vector.
     * @param t The amount to interpolate by.
     * @returns The interpolated vector.
     */ this.lerp = (v1, v2, t)=>new $8ec4c8ffa911853c$export$2e2bcd8739ae039(Math.lerp(v1.x, v2.x, t), Math.lerp(v1.y, v2.y, t));
    })();
}


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
 */ /**
 * @author Petraller <me@petraller.com>
 */ 

class $3f8760cc7c29435c$export$2e2bcd8739ae039 {
    /**
     * Avoid calling `new Node`, call `Petrallengine.root.createChild` instead.
     */ constructor(flag){
        this._isEnabled = true;
        this._parent = null;
        /** The unique Snowflake ID of this node. */ this.id = (0, $24207f53032a3f4e$export$389de06130c9495c)();
        /** The name of this node. */ this.name = "New Node";
        /** The position of this node. */ this.position = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).zero;
        /** The rotation in degrees of this node. */ this.rotation = 0;
        /** The scale of this node. */ this.scale = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).one;
        /** The children nodes of this node. */ this.children = [];
        /** Whether this node has started. */ this.isStarted = false;
        if (!flag) {
            console.warn(`Avoid calling \`new Node\`, call \`Petrallengine.root.createChild\` instead`);
            console.trace(`\`new Node\` call occured here:`);
        }
        this.onCreate?.call(this);
    }
    /** The enabled state of this node. */ get isEnabled() {
        return this._isEnabled;
    }
    set isEnabled(value) {
        this._isEnabled = value;
        if (value) this.onEnable?.call(this);
        else this.onDisable?.call(this);
    }
    /** The parent node of this node. */ get parent() {
        return this._parent;
    }
    set parent(value) {
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
}


class $d2cec58d40f83ce6$export$2e2bcd8739ae039 extends (0, $3f8760cc7c29435c$export$2e2bcd8739ae039) {
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
        this.keyStates = new Map();
    })();
    static #_3 = (()=>{
        this.keyTransits = new Map();
    })();
    static #_4 = (()=>{
        this.mouseStates = new Map();
    })();
    static #_5 = (()=>{
        this.mouseTransits = new Map();
    })();
    static #_6 = (()=>{
        this.mousePos = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).zero;
    })();
    constructor(canvas){
        if ($35fd48d1ddd84d0f$export$2e2bcd8739ae039.singleton) {
            console.warn("Input is used as a static class, do not create additional objects of Input");
            return;
        }
        // Register canvas events
        $35fd48d1ddd84d0f$export$2e2bcd8739ae039.canvas = canvas;
        canvas.onmousedown = (ev)=>{
            const b = ev.button;
            $35fd48d1ddd84d0f$export$2e2bcd8739ae039.mouseStates.set(b, true);
            $35fd48d1ddd84d0f$export$2e2bcd8739ae039.mouseTransits.set(b, true);
        };
        canvas.onmouseup = (ev)=>{
            const b = ev.button;
            $35fd48d1ddd84d0f$export$2e2bcd8739ae039.mouseStates.set(b, false);
            $35fd48d1ddd84d0f$export$2e2bcd8739ae039.mouseTransits.set(b, true);
        };
        canvas.onmousemove = (ev)=>{
            $35fd48d1ddd84d0f$export$2e2bcd8739ae039.mousePos = new (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039)(ev.offsetX, ev.offsetY);
        };
        // Register window events
        window.onkeydown = (ev)=>{
            const c = ev.code;
            if (!ev.repeat) {
                $35fd48d1ddd84d0f$export$2e2bcd8739ae039.keyStates.set(c, true);
                $35fd48d1ddd84d0f$export$2e2bcd8739ae039.keyTransits.set(c, true);
            }
        };
        window.onkeyup = (ev)=>{
            const c = ev.code;
            $35fd48d1ddd84d0f$export$2e2bcd8739ae039.keyStates.set(c, false);
            $35fd48d1ddd84d0f$export$2e2bcd8739ae039.keyTransits.set(c, true);
        };
    }
    /**
     * Clears all internal flags at the end of the frame.
     * 
     * Called by `Petrallengine.create`.
     */ _endFrame() {
        for (let i of $35fd48d1ddd84d0f$export$2e2bcd8739ae039.keyTransits.keys())$35fd48d1ddd84d0f$export$2e2bcd8739ae039.keyTransits.set(i, false);
        for (let i of $35fd48d1ddd84d0f$export$2e2bcd8739ae039.mouseTransits.keys())$35fd48d1ddd84d0f$export$2e2bcd8739ae039.mouseTransits.set(i, false);
    }
    /**
     * Returns whether a keyboard key is down.
     * @param keyCode The code of the key.
     * @returns Whether the key is down.
     */ static isKey(keyCode) {
        return $35fd48d1ddd84d0f$export$2e2bcd8739ae039.keyStates.get(keyCode) ?? false;
    }
    /**
     * Returns whether a keyboard key was pressed this frame.
     * @param keyCode The code of the key.
     * @returns Whether the key was pressed this frame.
     */ static isKeyPressed(keyCode) {
        return ($35fd48d1ddd84d0f$export$2e2bcd8739ae039.keyTransits.get(keyCode) ?? false) && $35fd48d1ddd84d0f$export$2e2bcd8739ae039.isKey(keyCode);
    }
    /**
     * Returns whether a keyboard key was released this frame.
     * @param keyCode The code of the key.
     * @returns Whether the key was released this frame.
     */ static isKeyReleased(keyCode) {
        return ($35fd48d1ddd84d0f$export$2e2bcd8739ae039.keyTransits.get(keyCode) ?? false) && !$35fd48d1ddd84d0f$export$2e2bcd8739ae039.isKey(keyCode);
    }
    /**
     * Returns whether a mouse button is down.
     * @param button The mouse button.
     * @returns Whether the mouse button is down.
     */ static isMouse(button = 0) {
        return $35fd48d1ddd84d0f$export$2e2bcd8739ae039.mouseStates.get(button) ?? false;
    }
    /**
     * Returns whether a mouse button was pressed this frame.
     * @param button The mouse button.
     * @returns Whether the mouse button was pressed this frame.
     */ static isMousePressed(button = 0) {
        return ($35fd48d1ddd84d0f$export$2e2bcd8739ae039.mouseTransits.get(button) ?? false) && $35fd48d1ddd84d0f$export$2e2bcd8739ae039.isMouse(button);
    }
    /**
     * Returns whether a mouse button was released this frame.
     * @param button The mouse button.
     * @returns Whether the mouse button was released this frame.
     */ static isMouseReleased(button = 0) {
        return ($35fd48d1ddd84d0f$export$2e2bcd8739ae039.mouseTransits.get(button) ?? false) && !$35fd48d1ddd84d0f$export$2e2bcd8739ae039.isMouse(button);
    }
    /**
     * Returns the position of the mouse in the canvas.
     * @returns The position of the mouse in the canvas.
     */ static getMousePosition() {
        return $35fd48d1ddd84d0f$export$2e2bcd8739ae039.mousePos;
    }
    /**
     * Returns the normalized position of the mouse in the canvas.
     * @returns The normalized position of the mouse in the canvas.
     */ static getMousePositionNormalized() {
        return (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiplyComponents($35fd48d1ddd84d0f$export$2e2bcd8739ae039.mousePos, new (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039)(1 / $35fd48d1ddd84d0f$export$2e2bcd8739ae039.canvas.width, 1 / $35fd48d1ddd84d0f$export$2e2bcd8739ae039.canvas.height));
    }
    /**
     * Returns the position on the canvas of a world position.
     * @returns The position on the canvas of a world position.
     */ static worldToCanvas(worldPos) {
        return worldPos.copy().scaleComponents((0, $511d31ae5212a454$export$2e2bcd8739ae039).scale).rotate(-(0, $511d31ae5212a454$export$2e2bcd8739ae039).rotation).translate((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).multiply((0, $511d31ae5212a454$export$2e2bcd8739ae039).position, -1)).translate((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).fromObjWH($35fd48d1ddd84d0f$export$2e2bcd8739ae039.canvas).scale(0.5));
    }
    /**
     * Returns the position in the world of a canvas position.
     * @returns The position in the world of a canvas position.
     */ static canvasToWorld(canvasPos) {
        return canvasPos.copy().translate((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).fromObjWH($35fd48d1ddd84d0f$export$2e2bcd8739ae039.canvas).scale(-0.5)).translate((0, $511d31ae5212a454$export$2e2bcd8739ae039).position).rotate((0, $511d31ae5212a454$export$2e2bcd8739ae039).rotation).scaleComponents((0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).inverse((0, $511d31ae5212a454$export$2e2bcd8739ae039).scale));
    }
}



class $05bad183ec6d4f44$export$2e2bcd8739ae039 {
    static #_ = (()=>{
        this.BUILD = 1;
    })();
    static #_1 = (()=>{
        this.VERSION = "0.0.1";
    })();
    static #_2 = (()=>{
        this.FRAME_RATE = 60;
    })();
    static #_3 = (()=>{
        this.FRAME_TIME = 1 / $05bad183ec6d4f44$export$2e2bcd8739ae039.FRAME_RATE;
    })();
    static #_4 = (()=>{
        this.gameTime = 0;
    })();
    static #_5 = (()=>{
        this.rootNode = new (0, $3f8760cc7c29435c$export$2e2bcd8739ae039)($05bad183ec6d4f44$export$2e2bcd8739ae039);
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
        // Create game loop
        const canvas = target;
        const context = canvas.getContext("2d");
        const ft = 1000 / $05bad183ec6d4f44$export$2e2bcd8739ae039.FRAME_RATE;
        const gameLoop = ()=>{
            const tStart = Date.now();
            // Update all
            function update(node) {
                if (!node.isEnabled) return;
                if (!node.isStarted) {
                    node.onStart?.call(node);
                    node.isStarted = true;
                }
                node.onUpdate?.call(node);
                // Iterate children
                for (let child of node.children)update(child);
            }
            update($05bad183ec6d4f44$export$2e2bcd8739ae039.rootNode);
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
                context.save();
                // Apply node transforms
                context.translate(node.position.x, node.position.y);
                context.rotate(node.rotation * Math.PI / 180);
                context.scale(node.scale.x, node.scale.y);
                // Draw drawables
                if (node instanceof (0, $d2cec58d40f83ce6$export$2e2bcd8739ae039)) node.onDraw?.call(node, context);
                // Iterate children
                for (let child of node.children)draw(child);
                context.restore();
            }
            draw($05bad183ec6d4f44$export$2e2bcd8739ae039.rootNode);
            // Clear transition flags
            input._endFrame();
            const tEnd = Date.now();
            const dt = tEnd - tStart;
            const wait = Math.max(ft - dt, 0);
            $05bad183ec6d4f44$export$2e2bcd8739ae039.gameTime += dt + wait;
            setTimeout(gameLoop, wait);
        };
        gameLoop();
    }
    /**
     * Returns the total elapsed game time.
     */ static get time() {
        return $05bad183ec6d4f44$export$2e2bcd8739ae039.gameTime;
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
    /** Teal. */ static get teal() {
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
    /**
     * Determines if two colors are equal.
     * @param c1 The first color.
     * @param c2 The second color.
     * @returns Whether two colors are equal.
     */ static equal(c1, c2) {
        return c1.r == c2.r && c1.g == c2.g && c1.b == c2.b && c1.a == c2.a;
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




class $31caad46b2dacdff$export$2e2bcd8739ae039 extends (0, $d2cec58d40f83ce6$export$2e2bcd8739ae039) {
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
        /** The normalized pivot. */ this.pivot = (0, $8ec4c8ffa911853c$export$2e2bcd8739ae039).one.scale(0.5);
    }
}






 //export * from "./systems/Physics";


export {$05bad183ec6d4f44$export$2e2bcd8739ae039 as Game, $d2cec58d40f83ce6$export$2e2bcd8739ae039 as Drawable, $3f8760cc7c29435c$export$2e2bcd8739ae039 as Node, $31caad46b2dacdff$export$2e2bcd8739ae039 as Sprite, $65b04c82fca59f60$export$2e2bcd8739ae039 as Color, $8ec4c8ffa911853c$export$2e2bcd8739ae039 as Vec2, $511d31ae5212a454$export$2e2bcd8739ae039 as Camera, $35fd48d1ddd84d0f$export$2e2bcd8739ae039 as Input, $24207f53032a3f4e$export$389de06130c9495c as makeSnowflake};
//# sourceMappingURL=Petrallengine.mjs.map
