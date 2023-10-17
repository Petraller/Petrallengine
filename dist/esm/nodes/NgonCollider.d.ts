/**
 * @author Petraller <me@petraller.com>
 */
import ConvexCollider from './ConvexCollider';
/**
 * A node that has a regular n-gon collider shape.
 */
export default class NgonCollider extends ConvexCollider {
    private _sides;
    private _radius;
    /** The number of sides of the polygon. */
    get sides(): number;
    set sides(value: number);
    /** The radius of the polygon. */
    get radius(): number;
    set radius(value: number);
    regenerate(): void;
}
