/**
 * @author Petraller <me@petraller.com>
 */

import Body from './Body';
import Bounds from '../structures/Bounds';
import Node from './Node';

/**
 * 32-bit bitmask used for collisions.
 */
export type Mask = number;

/**
 * Checks if an object implements a collider.
 * @param obj The object.
 * @returns Whether the object implements a collider.
 */
export function isCollider(obj: Object): obj is Collider {
    return 'bounds' in obj && 'axes' in obj && 'regenerate' in obj && obj.regenerate instanceof Function;
}

/**
 * Base class for all collider nodes.
 * 
 * A collider must have a parent PhysicsBody to detect collisions.
 */
export default abstract class Collider extends Node {
    protected _bounds = Bounds.zero;

    /** The layers this body is part of. */
    layers: Mask = 0x00000001;
    /** The layers this body can interact with. */
    filter: Mask = 0x00000001;

    /** The globally positioned bounds of this collider. */
    get bounds() { return this._bounds.copy(); }

    /**
     * Regenerates the cached properties of the collider.
     * 
     * Implementation defined by the collider subtype.
     */
    abstract regenerate(): void;

    /**
     * Determines if this collider can interact with another collider based on their layers.
     * @param other The other collider.
     * @returns Whether the colliders can interact.
     */
    canCollideWith(other: Collider) {
        return ((other.layers & this.filter) !== 0);
    }

    /**
     * Called when debug drawn.
     * @param context The canvas rendering context.
     */
    debugDraw(context: CanvasRenderingContext2D): void {
        // Draw bb
        context.strokeStyle = "#00ffff";
        context.strokeRect(
            this._bounds.min.x,
            this._bounds.min.y,
            this._bounds.size.x,
            this._bounds.size.y);
    }
}
