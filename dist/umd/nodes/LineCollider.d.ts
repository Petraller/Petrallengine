/**
 * @author Petraller <me@petraller.com>
 */
import Collider from './Collider';
import Vec2 from '../structures/Vec2';
/**
 * A node that has a single line segment collider shape.
 */
export default class LineCollider extends Collider {
    private _direction;
    /** The offset of the end from the middle of the line segment. */
    get direction(): Vec2;
    set direction(value: Vec2);
    /** The start of the line segment. */
    get start(): Vec2;
    set start(value: Vec2);
    /** The end of the line segment. */
    get end(): Vec2;
    set end(value: Vec2);
    /** The global start of the line segment. */
    get globalStart(): Vec2;
    set globalStart(value: Vec2);
    /** The global end of the line segment. */
    get globalEnd(): Vec2;
    set globalEnd(value: Vec2);
    /** The offset of the global end from the global middle of the line segment. */
    get globalDirection(): Vec2;
    regenerate(): void;
    onDebugDraw(context: CanvasRenderingContext2D): void;
}
