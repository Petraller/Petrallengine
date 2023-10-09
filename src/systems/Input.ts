/**
 * @author Petraller <me@petraller.com>
 */

import Camera from './Camera';
import Mat3 from '../structures/Mat3';
import Vec2 from '../structures/Vec2';

/**
 * Static class for input handling.
 */
export default class Input {
    private static singleton: Input | null = null;
    private static canvas: HTMLCanvasElement | null = null;
    private static keyStates: Set<string> = new Set<string>();
    private static keyTransits: Set<string> = new Set<string>();
    private static mouseStates: Set<number> = new Set<number>();
    private static mouseTransits: Set<number> = new Set<number>();
    private static mousePos: Vec2 = Vec2.zero;

    constructor(canvas: HTMLCanvasElement) {
        if (Input.singleton) {
            console.warn("Input is used as a static class, do not create additional objects of Input");
            return;
        }
        Input.singleton = this;

        // Register canvas events
        Input.canvas = canvas;
        canvas.onmousedown = (ev) => {
            const b = ev.button;
            Input.mouseStates.add(b);
            Input.mouseTransits.add(b);
        };
        canvas.onmouseup = canvas.onmouseleave = (ev) => {
            const b = ev.button;
            Input.mouseStates.delete(b);
            Input.mouseTransits.add(b);
        };
        canvas.onmousemove = (ev) => {
            Input.mousePos = new Vec2(ev.offsetX, ev.offsetY);
        };

        // Register window events
        window.onkeydown = (ev) => {
            const c = ev.code;
            if (!ev.repeat) {
                Input.keyStates.add(c);
                Input.keyTransits.add(c);
            }
        };
        window.onkeyup = (ev) => {
            const c = ev.code;
            Input.keyStates.delete(c);
            Input.keyTransits.add(c);
        };
    }

    /**
     * Clears all internal flags at the end of the frame.
     * 
     * Called by `Petrallengine.create`.
     */
    endFrame() {
        for (let i of Input.keyTransits.keys()) {
            Input.keyTransits.delete(i);
        }
        for (let i of Input.mouseTransits.keys()) {
            Input.mouseTransits.delete(i);
        }
    }

    /**
     * Returns whether a keyboard key is down.
     * @param keyCode The code of the key.
     * @returns Whether the key is down.
     */
    static isKey(keyCode: string) {
        return Input.keyStates.has(keyCode);
    }

    /**
     * Returns whether a keyboard key was pressed this frame.
     * @param keyCode The code of the key.
     * @returns Whether the key was pressed this frame.
     */
    static isKeyPressed(keyCode: string) {
        return Input.keyTransits.has(keyCode) && Input.isKey(keyCode);
    }

    /**
     * Returns whether a keyboard key was released this frame.
     * @param keyCode The code of the key.
     * @returns Whether the key was released this frame.
     */
    static isKeyReleased(keyCode: string) {
        return Input.keyTransits.has(keyCode) && !Input.isKey(keyCode);
    }

    /**
     * Returns whether a mouse button is down.
     * @param button The mouse button.
     * @returns Whether the mouse button is down.
     */
    static isMouse(button: number = 0) {
        return Input.mouseStates.has(button);
    }

    /**
     * Returns whether a mouse button was pressed this frame.
     * @param button The mouse button.
     * @returns Whether the mouse button was pressed this frame.
     */
    static isMousePressed(button: number = 0) {
        return Input.mouseTransits.has(button) && Input.isMouse(button);
    }

    /**
     * Returns whether a mouse button was released this frame.
     * @param button The mouse button.
     * @returns Whether the mouse button was released this frame.
     */
    static isMouseReleased(button: number = 0) {
        return Input.mouseTransits.has(button) && !Input.isMouse(button);
    }

    /**
     * Returns the position of the mouse in the canvas.
     * @returns The position of the mouse in the canvas.
     */
    static get mousePosition() {
        return Input.mousePos;
    }

    /**
     * Returns the normalized position of the mouse in the canvas.
     * @returns The normalized position of the mouse in the canvas.
     */
    static get mousePositionNormalized() {
        return Vec2.multiplyComponents(Input.mousePos, new Vec2(1 / Input.canvas!.width, 1 / Input.canvas!.height));
    }

    /**
     * Returns the position on the canvas of a normalized canvas position.
     * @returns The position on the canvas of a normalized canvas position.
     */
    static normalizedToCanvas(normalizedPos: Vec2) {
        return Vec2.multiplyComponents(normalizedPos, new Vec2(Input.canvas!.width, Input.canvas!.height));
    }

    /**
     * Returns the normalized position of a canvas position.
     * @returns The normalized position of a canvas position.
     */
    static canvasToNormalized(canvasPos: Vec2) {
        return Vec2.multiplyComponents(canvasPos, new Vec2(1 / Input.canvas!.width, 1 / Input.canvas!.height));
    }

    /**
     * Returns the position on the canvas of a world position.
     * @returns The position on the canvas of a world position.
     */
    static worldToCanvas(worldPos: Vec2) {
        return Vec2.add(
            Vec2.transform(
                Mat3.makeTransformation(Vec2.multiply(Camera.position, -1), -Camera.rotation, Camera.scale),
                worldPos),
            Vec2.multiply(Vec2.fromObjWH(Input.canvas!), 0.5)
        );
    }

    /**
     * Returns the position in the world of a canvas position.
     * @returns The position in the world of a canvas position.
     */
    static canvasToWorld(canvasPos: Vec2) {
        return Vec2.transform(
            Mat3.inverse(Mat3.makeTransformation(Vec2.multiply(Camera.position, -1), -Camera.rotation, Camera.scale)),
            Vec2.add(canvasPos, Vec2.multiply(Vec2.fromObjWH(Input.canvas!), -0.5))
        );
    }

    /**
     * Returns the normalized position on the canvas of a world position.
     * @returns The normalized position on the canvas of a world position.
     */
    static worldToNormalized(worldPos: Vec2) {
        return Input.canvasToNormalized(Input.worldToCanvas(worldPos));
    }

    /**
     * Returns position in the world of a normalized canvas position.
     * @returns The position in the world of a normalized canvas position.
     */
    static normalizedToWorld(normalizedPos: Vec2) {
        return Input.canvasToWorld(Input.normalizedToCanvas(normalizedPos));
    }
}
