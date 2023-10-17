/**
 * @author Petraller <me@petraller.com>
 */
import Node from './nodes/Node';
/**
 * Static class for Petrallengine.
 *
 * Call `Petrallengine.create(MY_CANVAS_ELEMENT)` to start building your 2D browser application.
 */
export default class Game {
    /** The build number. */
    static readonly BUILD = 3;
    /** The version. */
    static readonly VERSION = "0.0.3";
    /** The number of scheduled frame updates per second. */
    static readonly FRAME_RATE = 60;
    /** The scheduled interval between frame updates in seconds. */
    static readonly FRAME_TIME: number;
    /** Debug draw flags. */
    static debugDraw: {
        general: boolean;
        physics: boolean;
    };
    private static _deltaTime;
    private static _time;
    private static rootNode;
    /** The root node of the whole game. */
    static get root(): Node;
    /**
     * Initialises the engine.
     * @param target The target canvas element to render onto.
     */
    static create(target?: HTMLCanvasElement): void;
    /**
     * Returns the total elapsed game time in seconds.
     */
    static get time(): number;
    /**
     * Returns the actual elapsed time for the frame in seconds.
     */
    static get deltaTime(): number;
}
