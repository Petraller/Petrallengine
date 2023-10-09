/**
 * @author Petraller <me@petraller.com>
 */

import Collider from './Collider';
import Bounds from '../structures/Bounds';
import Vec2 from '../structures/Vec2';

/**
 * A node that has a single line segment collider shape.
 */
export default class LineCollider extends Collider {
    private _start: Vec2 = Vec2.zero;
    private _end: Vec2 = Vec2.right;

    /** The starting position of the line segment. */
    get start() { return this._start; }
    set start(value: Vec2) { this._start = value.copy(); }

    /** The ending position of the line segment. */
    get end() { return this._end; }
    set end(value: Vec2) { this._end = value.copy(); }

    /** The offset of the end from the start of the line segment. */
    get offset() { return Vec2.subtract(this._end, this._start); }
    set offset(value: Vec2) {
        this._end = Vec2.add(this._start, value);
    }

    /** The center of the line segment. */
    get center() { return Vec2.divide(Vec2.add(this._start, this._end), 2); }
    set center(value: Vec2) {
        const offset = Vec2.subtract(value, this.center);
        this._start = Vec2.add(this._start, offset);
        this._end = Vec2.add(this._end, offset);
    }

    /** The length of the line segment. */
    get length() { return this.offset.length; }
    set length(value: number) {
        const offset = this.offset.normalized;
        this._end = Vec2.add(this._start, Vec2.multiply(offset, value));
    }

    regenerate() {
        this._bounds = Bounds.fromVertices([
            Vec2.transform(this.globalTransform, this.start),
            Vec2.transform(this.globalTransform, this.end)
        ]);
        this._bounds = Bounds.extend(this._bounds, Vec2.up);
    }

    onDebugDraw(context: CanvasRenderingContext2D): void {
        // Draw vertices
        const sGlobal = Vec2.transform(this.globalTransform, this.start);
        const eGlobal = Vec2.transform(this.globalTransform, this.end);
        context.strokeStyle = "#ff00ff";
        context.beginPath();
        context.moveTo(sGlobal.x, sGlobal.y);
        context.lineTo(eGlobal.x, eGlobal.y);
        context.stroke();

        super.onDebugDraw(context);
    }
}
