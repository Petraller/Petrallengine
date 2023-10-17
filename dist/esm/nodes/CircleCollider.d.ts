/**
 * @author Petraller <me@petraller.com>
 */
import Collider from './Collider';
/**
 * A node that has a circle collider shape.
 */
export default class CircleCollider extends Collider {
    private _radius;
    /** The radius of the circle. */
    get radius(): number;
    set radius(value: number);
    /** The global radius of the circle. */
    get globalRadius(): number;
    regenerate(): void;
    onDebugDraw(context: CanvasRenderingContext2D): void;
}
