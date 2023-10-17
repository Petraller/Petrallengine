/**
 * @author Petraller <me@petraller.com>
 */
import { Snowflake } from '../Snowflake';
import Vec2 from '../structures/Vec2';
import Mat3 from '../structures/Mat3';
export type Constructor<T> = {
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
export default class Node {
    private _isEnabled;
    private _position;
    private _rotation;
    private _scale;
    private _parent;
    private _transform;
    private _globalTransform;
    private _isDirty;
    /** The unique Snowflake ID of this node. */
    readonly id: Snowflake;
    /** The name of this node. */
    name: string;
    /** The children nodes of this node. */
    children: Node[];
    /** Whether this node has started. */
    isStarted: boolean;
    /** Whether this node is marked for destruction. */
    isDestroyed: boolean;
    /**
     * Avoid calling `new Node`, call `Petrallengine.root.createChild` instead.
     */
    constructor(flag?: any, name?: string);
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
     * Recalculates the transformation matrices and unsets the dirty flag.
     */
    private recalculateTransformMatrix;
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
