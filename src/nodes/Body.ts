/**
 * @author Petraller <me@petraller.com>
 */

import Bounds from '../structures/Bounds';
import Collider from './Collider';
import Node from './Node';
import Vec2 from '../structures/Vec2';

/**
 * Base class for all physics-based nodes.
 * 
 * Overrideable callbacks:
 * - onCollisionEnter
 * - onCollisionUpdate
 * - onCollisionExit
 */
export default abstract class Body extends Node {
    private _velocity: Vec2 = Vec2.zero;

    constructor(flag?: any, name: string = "New Node") {
        super(flag, name);
    }

    /** The velocity of this body. */
    get velocity() { return this._velocity; }
    set velocity(value: Vec2) { this._velocity = value; }

    /**
     * Called when the node first collides with another body.
     * @param other The colliding body.
     */
    onCollisionEnter?(other: Body): void;

    /**
     * Called while the node is colliding with another body.
     * @param other The colliding body.
     */
    onCollisionUpdate?(other: Body): void;

    /**
     * Called when the node stops colliding with another body.
     * @param other The colliding body.
     */
    onCollisionExit?(other: Body): void;
}
