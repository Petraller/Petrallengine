/**
 * @author Petraller <me@petraller.com>
 */

import IDebugDrawable from './IDebugDrawable';
import Node from './Node';
import Bounds from '../structures/Bounds';

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
    protected static readonly BOUNDS_PADDING = 10;

    protected _bounds = Bounds.zero;
    protected _restitution = 1;

    /** The layers this body is part of. */
    layers: Mask = 0x00000001;
    /** The layers this body can interact with. */
    filter: Mask = 0x00000001;

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
    set restitution(value: number) { this._restitution = Math.max(value, 0); }

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
