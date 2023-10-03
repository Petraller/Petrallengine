/**
 * @author Petraller <me@petraller.com>
 */

import Game from "./Petrallengine";
import "./Math"
import Node from "./nodes/Node";
import Color from "./structures/Color";
import Sprite from "./nodes/Sprite";
import Input from "./systems/Input";
import Vec2 from "./structures/Vec2";

Game.create();

// function _TEST<T>(actual: T, expected: T) {
//     if (expected !== actual) {
//         console.trace(`%cTest failed - Expected ${expected}, got ${actual}`, 'color: red');
//     }
// }

// function color(c1: Color, c2: Color, interpolationMethod: (c1: Color, c2: Color, t: number) => Color) {
//     const container = document.createElement("div");
//     container.style.display = "flex";
//     const n = 100;
//     for (let i = 0; i <= n; ++i) {
//         const div = document.createElement("div");
//         div.style.flex = "1 0 0";
//         div.style.height = "50px";
//         div.style.backgroundColor = interpolationMethod(c1, c2, i / n).toHexString();
//         container.appendChild(div);
//     }
//     document.body.appendChild(container);
// }
// color(Color.red, Color.blue, Color.lerp);
// color(Color.red, Color.blue, Color.slerp);
// color(Color.green, Color.grey, Color.lerp);
// color(Color.green, Color.grey, Color.slerp);
// color(Color.fromHexString("#0799ce"), Color.fromHexString("#ff9900"), Color.lerp);
// color(Color.fromHexString("#0799ce"), Color.fromHexString("#ff9900"), Color.slerp);
// color(Color.white, Color.fromHexString("#123456"), Color.lerp);
// color(Color.white, Color.fromHexString("#123456"), Color.slerp);
// for (let i = 0; i < 5; ++i) {
//     const c1 = new Color(Math.random(), Math.random(), Math.random());
//     const c2 = new Color(Math.random(), Math.random(), Math.random());
//     color(c1, c2, Color.lerp);
//     color(c1, c2, Color.slerp);
// }

class MyMover extends Node {
    onUpdate(): void {
        if (Input.isKey("KeyW")) {
            this.position.translate(Vec2.up);
        }
        if (Input.isKey("KeyS")) {
            this.position.translate(Vec2.down);
        }
        if (Input.isKey("KeyA")) {
            this.position.translate(Vec2.left);
        }
        if (Input.isKey("KeyD")) {
            this.position.translate(Vec2.right);
        }
        if (Input.isKey("KeyQ")) {
            this.rotation--;
        }
        if (Input.isKey("KeyE")) {
            this.rotation++;
        }
    };
}

class MyRainbow extends Sprite {
    t: number = 0;

    onCreate(): void {
        this.color = Color.red;
    }

    onUpdate(): void {
        this.t += Game.FRAME_TIME;
        if (this.t > 1)
            this.t -= 1;
        this.color = Color.fromHSV(this.t, 1, 1);
    }
}

const myMover = Game.root.createChild(MyMover);
const myRainbow = myMover.createChild(MyRainbow);
myRainbow.image = "assets/sprites/enemy_A.png";
const myChild = myMover.createChild(Sprite);
myChild.position = Vec2.right.scale(32);
myChild.image = "assets/sprites/ship_B.png";
myChild.color = Color.red;