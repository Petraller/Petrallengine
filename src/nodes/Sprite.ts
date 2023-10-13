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
    private workingCanvas: [OffscreenCanvas, OffscreenCanvas] = [new OffscreenCanvas(1, 1), new OffscreenCanvas(1, 1)];

    /** The normalized pivot. */
    pivot: Vec2 = Vec2.multiply(Vec2.one, 0.5);

    onDraw(context: CanvasRenderingContext2D): void {
        if (this.bitmap) {
            context.save();
            context.translate(-this.pivot.x * this.bitmap.width, -this.pivot.y * this.bitmap.height);

            const workingContext = this.workingCanvas.map(e => e.getContext('2d')!);
            workingContext[0].globalCompositeOperation = "copy";
            workingContext[0].fillStyle = this.color.toHexString();
            workingContext[0].fillRect(0, 0, this.workingCanvas[0].width, this.workingCanvas[0].height);
            workingContext[0].globalCompositeOperation = "destination-in";
            workingContext[0].drawImage(this.bitmap, 0, 0);
            workingContext[1].globalCompositeOperation = "copy";
            workingContext[1].drawImage(this.bitmap, 0, 0);
            workingContext[1].globalCompositeOperation = "multiply";
            workingContext[1].drawImage(this.workingCanvas[0], 0, 0);
            workingContext[1].globalCompositeOperation = "destination-atop";
            workingContext[1].drawImage(this.bitmap, 0, 0);

            context.globalAlpha = this.color.a;
            context.drawImage(this.workingCanvas[1], 0, 0);
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
        for (const cnv of this.workingCanvas) {
            cnv.width = bmp.width;
            cnv.height = bmp.height;
        }
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