/**
 * @author Petraller <me@petraller.com>
 */

import Vec2 from '../structures/Vec2';
import { Snowflake, makeSnowflake } from '../Snowflake';

type Constructor<T> = { new(...args: any[]): T };

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
export default class Node {
    private _isEnabled: boolean = true;
    private _rotation: number = 0;
    private _parent: Node | null = null;

    /** The unique Snowflake ID of this node. */
    readonly id: Snowflake = makeSnowflake();

    /** The name of this node. */
    name: string = "New Node";
    /** The position of this node. */
    position: Vec2 = Vec2.zero;
    /** The scale of this node. */
    scale: Vec2 = Vec2.one;
    /** The children nodes of this node. */
    children: Node[] = [];
    /** Whether this node has started. */
    isStarted: boolean = false;

    /**
     * Avoid calling `new Node`, call `Petrallengine.root.createChild` instead.
     */
    constructor(flag?: any) {
        if (!flag) {
            console.warn(`Avoid calling \`new Node\`, call \`Petrallengine.root.createChild\` instead`);
            console.trace(`\`new Node\` call occured here:`);
        }
    }

    toString() { return `${this.name}#${this.id}`; }

    /** The enabled state of this node. */
    get isEnabled() { return this._isEnabled; }
    set isEnabled(value: boolean) {
        this._isEnabled = value;
        if (value) {
            this.onEnable?.call(this);
        }
        else {
            this.onDisable?.call(this);
        }
    }
    
    /** The rotation in degrees of this node. */
    get rotation() { return this._rotation; }
    set rotation(value: number) { this._rotation = (value + 180) % 360 - 180; }

    /** The parent node of this node. */
    get parent() { return this._parent; }
    set parent(value: Node | null) {
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
    set siblingIndex(value: number) {
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
    createChild<T extends Node>(type: Constructor<T>) {
        const node = new type(this.createChild);
        node.parent = this;
        node.onCreate?.call(node);
        return node;
    }

    /**
     * Destroys this node and all children nodes.
     */
    destroy() {
        for (let child of this.children) {
            child.destroy();
        }
        this.onDestroy?.call(this);
        this.parent = null;
    }

    /**
     * Finds a descendant node by its name.
     * @param name The name of the node.
     * @returns The node, or null if not found.
     */
    findDescendantByName(name: string): Node | null {
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
    findDescendantByType<T>(type: Constructor<T>): T | null {
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
    isDescendantOf(node: Node) {
        let curr = this.parent;
        while (curr !== null) {
            if (curr === node)
                return true;
            curr = curr.parent;
        }
        return false;
    }

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
