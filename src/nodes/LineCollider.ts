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

    private _direction: Vec2 = Vec2.multiply(Vec2.right, 100);

    /** The offset of the end from the middle of the line segment. */
    get direction() { return this._direction.copy(); }
    set direction(value: Vec2) {
        this._direction = value.copy();
    }

    /** The start of the line segment. */
    get start() { return Vec2.subtract(this.position, this._direction); }
    set start(value: Vec2) {
        const end = this.end;
        this.position = Vec2.divide(Vec2.add(value, end), 2);
        this._direction = Vec2.subtract(end, this.position);
    }

    /** The end of the line segment. */
    get end() { return Vec2.add(this.position, this._direction); }
    set end(value: Vec2) {
        const start = this.start;
        this.position = Vec2.divide(Vec2.add(start, value), 2);
        this._direction = Vec2.subtract(this.position, start);
    }

    /** The global start of the line segment. */
    get globalStart() { return Vec2.transform(this.globalTransform, Vec2.multiply(this._direction, -1)); }
    set globalStart(value: Vec2) {
        const end = this.globalEnd;
        this.globalPosition = Vec2.divide(Vec2.add(value, end), 2);
        this._direction = Vec2.multiply(Vec2.transform(Mat3.inverse(this.globalTransform), value), -1);
    }

    /** The global end of the line segment. */
    get globalEnd() { return Vec2.transform(this.globalTransform, this._direction); }
    set globalEnd(value: Vec2) {
        const start = this.globalStart;
        this.globalPosition = Vec2.divide(Vec2.add(start, value), 2);
        this._direction = Vec2.transform(Mat3.inverse(this.globalTransform), value);
    }

    /** The offset of the global end from the global middle of the line segment. */
    get globalDirection() { return Vec2.divide(Vec2.subtract(this.globalEnd, this.globalStart), 2); }

    regenerate() {
        this._bounds = Bounds.fromVertices([
            Vec2.subtract(this.globalStart, new Vec2(LineCollider.BOUNDS_PADDING, LineCollider.BOUNDS_PADDING)),
            Vec2.subtract(this.globalEnd, new Vec2(LineCollider.BOUNDS_PADDING, LineCollider.BOUNDS_PADDING)),
            Vec2.add(this.globalStart, new Vec2(LineCollider.BOUNDS_PADDING, LineCollider.BOUNDS_PADDING)),
            Vec2.add(this.globalEnd, new Vec2(LineCollider.BOUNDS_PADDING, LineCollider.BOUNDS_PADDING))
        ]);
    }

    onDebugDraw(context: CanvasRenderingContext2D): void {
        // Draw vertices
        const sGlobal = this.globalStart;
        const eGlobal = this.globalEnd;
        context.strokeStyle = "#ff00ff";
        context.beginPath();
        context.moveTo(sGlobal.x, sGlobal.y);
        context.lineTo(eGlobal.x, eGlobal.y);
        context.stroke();

        super.onDebugDraw(context);
    }
}
