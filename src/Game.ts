/**
 * @author Petraller <me@petraller.com>
 */

import { isDrawable } from './nodes/IDrawable';
import { isDebugDrawable } from './nodes/IDebugDrawable';
import Body from './nodes/Body';
import Collider from './nodes/Collider';
import Node from './nodes/Node';
import Camera from './systems/Camera';
import Input from './systems/Input';
import Physics from './systems/Physics';

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
    static debugDraw = {
        general: false,
        physics: false,
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
        const physics = new Physics();

        // Get context
        const canvas = target;
        const context = canvas.getContext('2d')!;

        // Create game loop
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

                    // Register in physics system
                    if (node instanceof Body) {
                        Physics.registerBody(node);
                    }
                    if (node instanceof Collider) {
                        let curr: Node | null = node.parent;
                        while (curr !== null) {
                            if (curr instanceof Body) {
                                Physics.registerCollider(node, curr);
                                break;
                            }
                            curr = curr.parent;
                        }
                        if (curr === null) {
                            console.error(`Collider does not have a parent Body, it will not be registered by the Physics system`);
                        }
                    }
                }
                node.onUpdate?.call(node);
                node.globalTransform;

                // Iterate children
                for (let child of node.children) {
                    update(child);
                }
            }
            update(Game.rootNode);

            // Deferred destroy
            function destroy(node: Node) {
                if (node.isDestroyed) {
                    // Callback
                    node.onDestroy?.call(node);

                    // Deregister from physics system
                    if (node instanceof Body) {
                        Physics.deregisterBody(node);
                    }
                    if (node instanceof Collider) {
                        Physics.deregisterCollider(node);
                    }

                    // Mark children
                    for (let child of node.children) {
                        child.isDestroyed = true;
                    }

                    // Unlink from parent
                    if (node.parent) {
                        node.parent.children.splice(node.parent.children.indexOf(node), 1);
                        node.parent = null;
                    }
                }

                // Iterate children
                for (let child of node.children) {
                    destroy(child);
                }
            }
            destroy(Game.rootNode);

            // Physics step
            physics.tick();

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

                // Draw drawables
                if (isDebugDrawable(node)) {
                    context.save();

                    node.onDebugDraw.call(node, context);

                    context.restore();
                }

                // Iterate children
                for (let child of node.children) {
                    debugDraw(child);
                }
            }
            if (Game.debugDraw.general) {
                debugDraw(Game.rootNode);
            }

            // Physics debug draw
            if (Game.debugDraw.physics) {
                for (let contact of physics.debugContacts) {
                    context.strokeStyle = "#ff0000";
                    context.beginPath();
                    context.arc(contact[0].x, contact[0].y, 4, 0, 360);
                    context.stroke();

                    physics.debugContacts.set(contact[0], contact[1] - this.deltaTime);
                    if (contact[1] < 0)
                        physics.debugContacts.delete(contact[0]);
                }
            }

            // Clear transition flags
            input.endFrame();

            const tEnd = Date.now();
            const dt = tEnd - tStart;
            const wait = Math.max(ft - dt, 1);
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
