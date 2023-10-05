/**
 * @author Petraller <me@petraller.com>
 */

/**
 * Checks if an object implements a drawable.
 * @param obj The object.
 * @returns Whether the object implements a drawable.
 */
export function isDrawable(obj: Object): obj is IDrawable {
    return 'onDraw' in obj && obj.onDraw instanceof Function;
}

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
