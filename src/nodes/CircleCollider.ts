/**
 * @author Petraller <me@petraller.com>
 */

import Bounds from '../structures/Bounds';
import Collider from './Collider';
import Vec2 from '../structures/Vec2';

/**
 * A node that has a circle collider shape.
 */
export default class CircleCollider extends Collider {
    private _radius: number = 1;

    /** The radius of the circle. */
    get radius() { return this._radius; }
    set radius(value: number) { this._radius = Math.max(value, 0); }

    regenerate() {
        this._bounds = new Bounds(
            Vec2.subtract(this.globalPosition, new Vec2(this._radius, this._radius)),
            Vec2.add(this.globalPosition, new Vec2(this._radius, this._radius)));
    }

    onDebugDraw(context: CanvasRenderingContext2D): void {
        this.regenerate();

        // Draw vertices
        context.strokeStyle = "#ff00ff";
        context.beginPath();
        context.arc(this.globalPosition.x, this.globalPosition.y, this.radius, 0, 360);
        context.stroke();

        super.onDebugDraw(context);
    }
}
