/**
 * @author Petraller <me@petraller.com>
 */

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
