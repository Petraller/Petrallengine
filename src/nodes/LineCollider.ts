/**
 * @author Petraller <me@petraller.com>
 */

import Collider from './Collider';
import Bounds from '../structures/Bounds';
import Mat3 from '../structures/Mat3';
import Vec2 from '../structures/Vec2';

/**
 * A node that has a single line segment collider shape.
 */
export default class LineCollider extends Collider {
    private static readonly BOUNDS_PADDING = 10;

    private _direction: Vec2 = Vec2.right;

    /** The offset of the end from the start of the line segment. */
    get direction() { return this._direction.copy(); }
    set direction(value: Vec2) {
        this._direction = value.copy();
    }

    /** The offset of the global end from the global start of the line segment. */
    get globalDirection() { return Vec2.transform(this.globalTransform, this._direction); }
    set globalDirection(value: Vec2) {
        this._direction = Vec2.transform(Mat3.inverse(this.globalTransform), value);
    }

    /** The global start of the line segment. Effectively the Node's position. */
    get globalStart() { return this.globalPosition; }
    set globalStart(value: Vec2) {
        this.globalPosition = value.copy();
    }

    /** The global end of the line segment. */
    get globalEnd() { return this.globalDirection; }
    set globalEnd(value: Vec2) {
        this.globalDirection = Vec2.subtract(value, this.globalPosition);
    }

    regenerate() {
        this._bounds = Bounds.fromVertices([
            Vec2.subtract(this.globalPosition, new Vec2(LineCollider.BOUNDS_PADDING, LineCollider.BOUNDS_PADDING)),
            Vec2.add(Vec2.add(this.globalPosition, this.globalDirection), new Vec2(LineCollider.BOUNDS_PADDING, LineCollider.BOUNDS_PADDING))
        ]);
    }

    onDebugDraw(context: CanvasRenderingContext2D): void {
        // Draw vertices
        const sGlobal = this.globalPosition;
        const eGlobal = Vec2.add(this.globalPosition, this.globalDirection);
        context.strokeStyle = "#ff00ff";
        context.beginPath();
        context.moveTo(sGlobal.x, sGlobal.y);
        context.lineTo(eGlobal.x, eGlobal.y);
        context.stroke();

        super.onDebugDraw(context);
    }
}
