/**
 * @author Petraller <me@petraller.com>
 */

import Camera from './systems/Camera';
import Input from './systems/Input';
import Node from './nodes/Node';
import { isDrawable } from './nodes/IDrawable';

/**
 * Static class for Petrallengine.
 * 
 * Call `Petrallengine.create(MY_CANVAS_ELEMENT)` to start building your 2D browser application.
 */
export default class Game {
    /** The build number. */
    static readonly BUILD = 1;
    /** The version. */
    static readonly VERSION = "0.0.1";
    /** The number of scheduled frame updates per second. */
    static readonly FRAME_RATE = 60;
    /** The scheduled interval between frame updates in seconds. */
    static readonly FRAME_TIME = 1 / Game.FRAME_RATE;
    /** Debug draw flags. */
    static readonly DEBUG_DRAWS = {
        colliders: true,
        boundingBoxes: true,
    };

    private static _deltaTime = Game.FRAME_TIME;
    private static _time = 0;
    private static rootNode: Node = new Node(Game, "_ROOT_");

    /** The root node of the whole game. */
    static get root() {
        return Game.rootNode;
    }

    /**
     * Initialises the engine.
     * @param target The target canvas element to render onto.
     */
    static create(target?: HTMLCanvasElement) {
        console.debug(`%cPetrallengine v${Game.VERSION}\nby Petraller`, 'color: #0799ce');
        console.debug(`https://petraller.com/`);

        // Fallback target
        if (!target) {
            const targetDefaultID = 'app';
            console.debug(`No canvas provided, using default target canvas #${targetDefaultID}`);

            const ele = document.getElementById(targetDefaultID);
            if (!ele || !(ele instanceof HTMLCanvasElement)) {
                console.error(`Unable to find a canvas with ID #${targetDefaultID}`);
                console.error(`Please create a canvas element with ID #${targetDefaultID}, or provide your own canvas to Petrallengine.create`);
                return;
            }

            target = ele as HTMLCanvasElement;
        }

        console.debug(`Using ${target.outerHTML} as render canvas`);

        // Initialise systems
        const input = new Input(target);

        // Create game loop
        const canvas = target;
        const context = canvas.getContext('2d')!;
        const ft = 1000 / Game.FRAME_RATE;
        const gameLoop = () => {
            const tStart = Date.now();

            // Update all
            function update(node: Node) {
                if (!node.isEnabled)
                    return;

                if (!node.isStarted) {
                    node.onStart?.call(node);
                    node.isStarted = true;
                }
                node.onUpdate?.call(node);
                node.globalTransform;

                // Iterate children
                for (let child of node.children) {
                    update(child);
                }
            }
            update(Game.rootNode);

            // Reset
            context.reset();

            // Clear
            context.clearRect(0, 0, canvas.width, canvas.height);

            // Apply camera transforms
            context.translate(canvas.width / 2, canvas.height / 2);
            context.translate(-Camera.position.x, -Camera.position.y);
            context.rotate(-Camera.rotation * Math.PI / 180);
            context.scale(Camera.scale.x, Camera.scale.y);

            // Draw all
            function draw(node: Node) {
                if (!node.isEnabled)
                    return;

                // Draw drawables
                if (isDrawable(node)) {
                    context.save();

                    // Apply node transforms
                    context.transform(
                        node.globalTransform.get(0, 0), node.globalTransform.get(1, 0),
                        node.globalTransform.get(0, 1), node.globalTransform.get(1, 1),
                        node.globalTransform.get(0, 2), node.globalTransform.get(1, 2)
                    );

                    node.onDraw.call(node, context);

                    context.restore();
                }

                // Iterate children
                for (let child of node.children) {
                    draw(child);
                }
            }
            draw(Game.rootNode);

            // Debug draw
            function debugDraw(node: Node) {
                if (!node.isEnabled)
                    return;

                // // Draw colliders
                // if (isCollider(node)) {
                //     // Draw debug
                //     node.debugDraw(context);
                // }

                // Iterate children
                for (let child of node.children) {
                    debugDraw(child);
                }
            }
            debugDraw(Game.rootNode);

            // Clear transition flags
            input.endFrame();

            const tEnd = Date.now();
            const dt = tEnd - tStart;
            const wait = Math.max(ft - dt, 0);
            Game._time += (Game._deltaTime = dt + wait);
            setTimeout(gameLoop, wait);
        };
        gameLoop();
    }

    /**
     * Returns the total elapsed game time in seconds.
     */
    static get time() {
        return Game._time / 1000;
    }

    /**
     * Returns the actual elapsed time for the frame in seconds.
     */
    static get deltaTime() {
        return Game._deltaTime / 1000;
    }
};
