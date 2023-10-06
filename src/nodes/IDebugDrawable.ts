/**
 * @author Petraller <me@petraller.com>
 */

/**
 * Checks if an object implements a debug drawable.
 * @param obj The object.
 * @returns Whether the object implements a debug drawable.
 */
export function isDebugDrawable(obj: Object): obj is IDebugDrawable {
    return 'onDebugDraw' in obj && obj.onDebugDraw instanceof Function;
}

/**
 * Interface for all drawables.
 */
export default interface IDebugDrawable {
    /**
     * Called when debug drawn.
     * @param context The canvas rendering context.
     */
    onDebugDraw(context: CanvasRenderingContext2D): void;
}
