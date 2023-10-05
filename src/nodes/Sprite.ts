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
    private static workingCanvas = new OffscreenCanvas(256, 256);

    private _image: string | null = null;
    private _color: Color = Color.white;
    private bitmap: ImageBitmap | null = null;

    /** The normalized pivot. */
    pivot: Vec2 = Vec2.multiply(Vec2.one, 0.5);

    onDraw(context: CanvasRenderingContext2D): void {
        if (this.bitmap) {
            context.save();
            context.translate(-this.pivot.x * this.bitmap.width, -this.pivot.y * this.bitmap.height);
            context.drawImage(this.bitmap, 0, 0);
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
    get color() { return this._color; }
    set color(value: Color) {
        const changed = this._color !== value;
        this._color = value;
        if (changed) {
            this.updateBitmap();
        }
    }

    private async updateBitmap() {
        if (this._image === null) {
            this.bitmap = null;
            return;
        }
        const bmp = await Sprite.load(this._image);
        if (this.color.r == 1 && this.color.g == 1 && this.color.b == 1 && this.color.a == 1) {
            this.bitmap = bmp;
        }
        else {
            let data = Sprite.bitmapToData(bmp);
            Sprite.colorise(data, this.color);
            this.bitmap = Sprite.dataToBitmap(data);
        }
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

    private static bitmapToData(bmp: ImageBitmap) {
        if (Sprite.workingCanvas.width < bmp.width) {
            Sprite.workingCanvas.width = bmp.width;
        }
        if (Sprite.workingCanvas.height < bmp.height) {
            Sprite.workingCanvas.height = bmp.height;
        }
        let ctx = Sprite.workingCanvas.getContext('2d', { willReadFrequently: true })!;
        ctx.clearRect(0, 0, bmp.width, bmp.height);
        ctx.drawImage(bmp, 0, 0);
        return ctx.getImageData(0, 0, bmp.width, bmp.height);
    }

    private static dataToBitmap(dat: ImageData) {
        if (Sprite.workingCanvas.width != dat.width) {
            Sprite.workingCanvas.width = dat.width;
        }
        if (Sprite.workingCanvas.height != dat.height) {
            Sprite.workingCanvas.height = dat.height;
        }
        let ctx = Sprite.workingCanvas.getContext('2d', { willReadFrequently: true })!;
        ctx.clearRect(0, 0, dat.width, dat.height);
        ctx.putImageData(dat, 0, 0);
        return Sprite.workingCanvas.transferToImageBitmap();
    }

    private static colorise(img: ImageData, color: Color) {
        for (let p = 0; p < img.data.length; p += 4) {
            const [r, g, b] = [p, p + 1, p + 2];
            img.data[r] *= color.r;
            img.data[g] *= color.g;
            img.data[b] *= color.b;
        }
    }
}