/**
 * @author Petraller <me@petraller.com>
 */

import Camera from './systems/Camera';
import Drawable from './nodes/Drawable';
import Input from './systems/Input';
import Node from './nodes/Node';

/**
 * Static class for Petrallengine.
 * 
 * Call `Petrallengine.create(MY_CANVAS_ELEMENT)` to start building your 2D browser application.
 */
export default class Game {
    static readonly BUILD = 1;
    static readonly VERSION = "0.0.1";
    static readonly FRAME_RATE = 60;
    static readonly FRAME_TIME = 1 / Game.FRAME_RATE;

    private static gameTime = 0;
    private static rootNode: Node = new Node(Game);

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

                context.save();

                // Apply node transforms
                context.translate(node.position.x, node.position.y);
                context.rotate(node.rotation * Math.PI / 180);
                context.scale(node.scale.x, node.scale.y);

                // Draw drawables
                if (node instanceof Drawable) {
                    node.onDraw?.call(node, context);
                }

                // Iterate children
                for (let child of node.children) {
                    draw(child);
                }

                context.restore();
            }
            draw(Game.rootNode);

            // Clear transition flags
            input._endFrame();

            const tEnd = Date.now();
            const dt = tEnd - tStart;
            const wait = Math.max(ft - dt, 0);
            Game.gameTime += dt + wait;
            setTimeout(gameLoop, wait);
        };
        gameLoop();
    }

    /**
     * Returns the total elapsed game time.
     */
    static get time() {
        return Game.gameTime;
    }
};
