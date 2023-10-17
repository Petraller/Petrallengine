/**
 * @author Petraller <me@petraller.com>
 */
import Vec2 from '../structures/Vec2';
/**
 * Static class for input handling.
 */
export default class Input {
    private static singleton;
    private static canvas;
    private static keyStates;
    private static keyTransits;
    private static mouseStates;
    private static mouseTransits;
    private static mousePos;
    constructor(canvas: HTMLCanvasElement);
    /**
     * Clears all internal flags at the end of the frame.
     *
     * Called by `Petrallengine.create`.
     */
    endFrame(): void;
    /**
     * Returns whether a keyboard key is down.
     * @param keyCode The code of the key.
     * @returns Whether the key is down.
     */
    static isKey(keyCode: string): boolean;
    /**
     * Returns whether a keyboard key was pressed this frame.
     * @param keyCode The code of the key.
     * @returns Whether the key was pressed this frame.
     */
    static isKeyPressed(keyCode: string): boolean;
    /**
     * Returns whether a keyboard key was released this frame.
     * @param keyCode The code of the key.
     * @returns Whether the key was released this frame.
     */
    static isKeyReleased(keyCode: string): boolean;
    /**
     * Returns whether a mouse button is down.
     * @param button The mouse button.
     * @returns Whether the mouse button is down.
     */
    static isMouse(button?: number): boolean;
    /**
     * Returns whether a mouse button was pressed this frame.
     * @param button The mouse button.
     * @returns Whether the mouse button was pressed this frame.
     */
    static isMousePressed(button?: number): boolean;
    /**
     * Returns whether a mouse button was released this frame.
     * @param button The mouse button.
     * @returns Whether the mouse button was released this frame.
     */
    static isMouseReleased(button?: number): boolean;
    /**
     * Returns the position of the mouse in the canvas.
     * @returns The position of the mouse in the canvas.
     */
    static get mousePosition(): Vec2;
    /**
     * Returns the normalized position of the mouse in the canvas.
     * @returns The normalized position of the mouse in the canvas.
     */
    static get mousePositionNormalized(): Vec2;
    /**
     * Returns the position on the canvas of a normalized canvas position.
     * @returns The position on the canvas of a normalized canvas position.
     */
    static normalizedToCanvas(normalizedPos: Vec2): Vec2;
    /**
     * Returns the normalized position of a canvas position.
     * @returns The normalized position of a canvas position.
     */
    static canvasToNormalized(canvasPos: Vec2): Vec2;
    /**
     * Returns the position on the canvas of a world position.
     * @returns The position on the canvas of a world position.
     */
    static worldToCanvas(worldPos: Vec2): Vec2;
    /**
     * Returns the position in the world of a canvas position.
     * @returns The position in the world of a canvas position.
     */
    static canvasToWorld(canvasPos: Vec2): Vec2;
    /**
     * Returns the normalized position on the canvas of a world position.
     * @returns The normalized position on the canvas of a world position.
     */
    static worldToNormalized(worldPos: Vec2): Vec2;
    /**
     * Returns position in the world of a normalized canvas position.
     * @returns The position in the world of a normalized canvas position.
     */
    static normalizedToWorld(normalizedPos: Vec2): Vec2;
}
