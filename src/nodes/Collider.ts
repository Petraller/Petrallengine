/**
 * @author Petraller <me@petraller.com>
 */

import Bounds from '../structures/Bounds';
import IDebugDrawable from './IDebugDrawable';
import Node from './Node';

/**
 * 32-bit bitmask used for collisions.
 */
export type Mask = number;

/**
 * Base class for all collider nodes.
 * 
 * A collider must have a parent PhysicsBody to detect collisions.
 */
export default abstract class Collider extends Node implements IDebugDrawable {
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

    onDebugDraw(context: CanvasRenderingContext2D): void {
        // Draw bb
        context.strokeStyle = "#00ffff";
        context.strokeRect(
            this._bounds.min.x,
            this._bounds.min.y,
            this._bounds.size.x,
            this._bounds.size.y);
    }
}
