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
    private static keyStates: Map<string, boolean> = new Map<string, boolean>();
    private static keyTransits: Map<string, boolean> = new Map<string, boolean>();
    private static mouseStates: Map<number, boolean> = new Map<number, boolean>();
    private static mouseTransits: Map<number, boolean> = new Map<number, boolean>();
    private static mousePos: Vec2 = Vec2.zero;

    constructor(canvas: HTMLCanvasElement) {
        if (Input.singleton) {
            console.warn("Input is used as a static class, do not create additional objects of Input");
            return;
        }

        // Register canvas events
        Input.canvas = canvas;
        canvas.onmousedown = (ev) => {
            const b = ev.button;
            Input.mouseStates.set(b, true);
            Input.mouseTransits.set(b, true);
        };
        canvas.onmouseup = canvas.onmouseleave = (ev) => {
            const b = ev.button;
            Input.mouseStates.set(b, false);
            Input.mouseTransits.set(b, true);
        };
        canvas.onmousemove = (ev) => {
            Input.mousePos = new Vec2(ev.offsetX, ev.offsetY);
        };

        // Register window events
        window.onkeydown = (ev) => {
            const c = ev.code;
            if (!ev.repeat) {
                Input.keyStates.set(c, true);
                Input.keyTransits.set(c, true);
            }
        };
        window.onkeyup = (ev) => {
            const c = ev.code;
            Input.keyStates.set(c, false);
            Input.keyTransits.set(c, true);
        };
    }

    /**
     * Clears all internal flags at the end of the frame.
     * 
     * Called by `Petrallengine.create`.
     */
    _endFrame() {
        for (let i of Input.keyTransits.keys()) {
            Input.keyTransits.set(i, false);
        }
        for (let i of Input.mouseTransits.keys()) {
            Input.mouseTransits.set(i, false);
        }
    }

    /**
     * Returns whether a keyboard key is down.
     * @param keyCode The code of the key.
     * @returns Whether the key is down.
     */
    static isKey(keyCode: string) {
        return Input.keyStates.get(keyCode) ?? false;
    }

    /**
     * Returns whether a keyboard key was pressed this frame.
     * @param keyCode The code of the key.
     * @returns Whether the key was pressed this frame.
     */
    static isKeyPressed(keyCode: string) {
        return (Input.keyTransits.get(keyCode) ?? false) && Input.isKey(keyCode);
    }

    /**
     * Returns whether a keyboard key was released this frame.
     * @param keyCode The code of the key.
     * @returns Whether the key was released this frame.
     */
    static isKeyReleased(keyCode: string) {
        return (Input.keyTransits.get(keyCode) ?? false) && !Input.isKey(keyCode);
    }

    /**
     * Returns whether a mouse button is down.
     * @param button The mouse button.
     * @returns Whether the mouse button is down.
     */
    static isMouse(button: number = 0) {
        return Input.mouseStates.get(button) ?? false;
    }

    /**
     * Returns whether a mouse button was pressed this frame.
     * @param button The mouse button.
     * @returns Whether the mouse button was pressed this frame.
     */
    static isMousePressed(button: number = 0) {
        return (Input.mouseTransits.get(button) ?? false) && Input.isMouse(button);
    }

    /**
     * Returns whether a mouse button was released this frame.
     * @param button The mouse button.
     * @returns Whether the mouse button was released this frame.
     */
    static isMouseReleased(button: number = 0) {
        return (Input.mouseTransits.get(button) ?? false) && !Input.isMouse(button);
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
}
