/**
 * @author Petraller <me@petraller.com>
 */

import Collider from './Collider';
import Vec2 from '../structures/Vec2';

/**
 * Base class for convex polygon colliders
 */
export default abstract class ConvexCollider extends Collider {
    protected _vertices: Vec2[] = [];
    protected _axes: Vec2[] = [];

    /** The globally positioned vertices of the collider. */
    get vertices() { return this._vertices.slice(); }

    /** The axes of this collider for SAT. */
    get axes() { return this._axes.slice(); }

    onDebugDraw(context: CanvasRenderingContext2D): void {
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
        context.strokeRect(
            this._bounds.min.x,
            this._bounds.min.y,
            this._bounds.size.x,
            this._bounds.size.y);

        super.onDebugDraw(context);
    }
}
