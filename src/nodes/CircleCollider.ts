/**
 * @author Petraller <me@petraller.com>
 */

import Collider from './Collider';
import Bounds from '../structures/Bounds';
import Vec2 from '../structures/Vec2';

/**
 * A node that has a circle collider shape.
 */
export default class CircleCollider extends Collider {
    private _radius: number = 1;

    /** The radius of the circle. */
    get radius() { return this._radius; }
    set radius(value: number) { this._radius = Math.max(value, 0); }

    /** The global radius of the circle. */
    get globalRadius() { return Vec2.dot(Vec2.half, this.globalScale) * this._radius; }

    regenerate() {
        this._bounds = new Bounds(
            Vec2.subtract(this.globalPosition, new Vec2(this.globalRadius, this.globalRadius)),
            Vec2.add(this.globalPosition, new Vec2(this.globalRadius, this.globalRadius)));
    }

    onDebugDraw(context: CanvasRenderingContext2D): void {
        // Draw vertices
        context.strokeStyle = "#ff00ff";
        context.beginPath();
        context.arc(this.globalPosition.x, this.globalPosition.y, this.globalRadius, 0, 360);
        context.stroke();

        super.onDebugDraw(context);
    }
}
