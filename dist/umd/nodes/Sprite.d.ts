/**
 * @author Petraller <me@petraller.com>
 */
import Color from '../structures/Color';
import IDrawable from './IDrawable';
import Node from './Node';
import Vec2 from '../structures/Vec2';
/**
 * A node that draws an image on the canvas.
*/
export default class Sprite extends Node implements IDrawable {
    private static bitmapStore;
    private _image;
    private _color;
    private bitmap;
    private workingCanvas;
    /** The normalized pivot. */
    pivot: Vec2;
    onDraw(context: CanvasRenderingContext2D): void;
    /** The image path. */
    get image(): string | null;
    set image(value: string | null);
    /** The color. */
    get color(): Color;
    set color(value: Color);
    private updateBitmap;
    private static load;
    private static unload;
}
