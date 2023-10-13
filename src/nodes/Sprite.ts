/**
 * @author Petraller <me@petraller.com>
 */

import Color from '../structures/Color';
import IDrawable from './IDrawable';
import Node from './Node'
import Vec2 from '../structures/Vec2';

/**
 * A node that draws an image on the canvas.
*/
export default class Sprite extends Node implements IDrawable {
    private static bitmapStore: Map<string, ImageBitmap> = new Map<string, ImageBitmap>();

    private _image: string | null = null;
    private _color: Color = Color.white;
    private bitmap: ImageBitmap | null = null;
    private workingCanvas = new OffscreenCanvas(256, 256);
    private workingContext: OffscreenCanvasRenderingContext2D | null = null;

    /** The normalized pivot. */
    pivot: Vec2 = Vec2.multiply(Vec2.one, 0.5);

    onDraw(context: CanvasRenderingContext2D): void {
        if (this.bitmap) {
            context.save();
            context.translate(-this.pivot.x * this.bitmap.width, -this.pivot.y * this.bitmap.height);
            if (this.workingContext) {
                this.workingContext.globalCompositeOperation = "copy";
                this.workingContext.drawImage(this.bitmap, 0, 0);
                this.workingContext.globalCompositeOperation = "multiply";
                this.workingContext.fillStyle = this.color.toHexString();
                this.workingContext.fillRect(0, 0, this.workingCanvas.width, this.workingCanvas.height);
                this.workingContext.globalCompositeOperation = "destination-atop";
                this.workingContext.drawImage(this.bitmap, 0, 0);
            }
            context.globalAlpha = this.color.a;
            context.drawImage(this.workingCanvas, 0, 0);
            context.restore();
        }
    }

    /** The image path. */
    get image() { return this._image; }
    set image(value: string | null) {
        const changed = this._image !== value;
        this._image = value;
        if (changed) {
            this.updateBitmap();
        }
    }

    /** The color. */
    get color() { return this._color.copy(); }
    set color(value: Color) { this._color = value.copy(); }

    private async updateBitmap() {
        if (this._image === null) {
            this.bitmap = null;
            return;
        }
        const bmp = await Sprite.load(this._image);
        this.workingCanvas = new OffscreenCanvas(bmp.width, bmp.height);
        this.workingContext = this.workingCanvas.getContext('2d');
        this.bitmap = bmp;
    }

    private static load(path: string) {
        if (Sprite.bitmapStore.has(path)) {
            return new Promise<ImageBitmap>((resolve) => { resolve(Sprite.bitmapStore.get(path)!) });
        }
        return new Promise<ImageBitmap>((resolve) => {
            let image = new Image();
            image.onload = async () => {
                let bmp = await createImageBitmap(image, 0, 0, image.width, image.height);
                Sprite.bitmapStore.set(path, bmp);
                image.remove();
                resolve(bmp);
            };
            image.src = path;
        });
    }

    private static unload(path: string) {
        Sprite.bitmapStore.get(path)?.close();
        Sprite.bitmapStore.delete(path);
    }
}