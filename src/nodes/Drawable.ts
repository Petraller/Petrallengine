/**
 * @author Petraller <me@petraller.com>
 */

import Node from './Node';

/**
 * Base class for all drawable nodes.
 * 
 * Overrideable callbacks:
 * - onDraw
 */
export default class Drawable extends Node {
    /**
     * Called when the node is drawn.
     * @param context The canvas rendering context.
     */
    onDraw?(context: CanvasRenderingContext2D): void;
}