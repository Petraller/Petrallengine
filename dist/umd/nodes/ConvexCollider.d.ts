/**
 * @author Petraller <me@petraller.com>
 */
import Collider from './Collider';
import Vec2 from '../structures/Vec2';
/**
 * Base class for convex polygon colliders.
 */
export default abstract class ConvexCollider extends Collider {
    protected _vertices: Vec2[];
    protected _axes: Vec2[];
    /** The globally positioned vertices of the collider. */
    get vertices(): Vec2[];
    /** The axes of this collider for SAT. */
    get axes(): Vec2[];
    onDebugDraw(context: CanvasRenderingContext2D): void;
}
