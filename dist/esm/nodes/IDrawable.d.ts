/**
 * @author Petraller <me@petraller.com>
 */
/**
 * Checks if an object implements a drawable.
 * @param obj The object.
 * @returns Whether the object implements a drawable.
 */
export declare function isDrawable(obj: Object): obj is IDrawable;
/**
 * Interface for all drawables.
 */
export default interface IDrawable {
    /**
     * Called when drawn.
     * @param context The canvas rendering context.
     */
    onDraw(context: CanvasRenderingContext2D): void;
}
