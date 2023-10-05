/**
 * @author Petraller <me@petraller.com>
 */

import * as P from './Petrallengine';

P.Game.create();

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

class MyMover extends P.Node {
    onUpdate(): void {
        if (P.Input.isKey("KeyW")) {
            P.Camera.position = P.Vec2.add(P.Camera.position, P.Vec2.multiply(P.Vec2.up, (100 * P.Game.deltaTime)));
        }
        if (P.Input.isKey("KeyS")) {
            P.Camera.position = P.Vec2.add(P.Camera.position, P.Vec2.multiply(P.Vec2.down, (100 * P.Game.deltaTime)));
        }
        if (P.Input.isKey("KeyA")) {
            P.Camera.position = P.Vec2.add(P.Camera.position, P.Vec2.multiply(P.Vec2.left, (100 * P.Game.deltaTime)));
        }
        if (P.Input.isKey("KeyD")) {
            P.Camera.position = P.Vec2.add(P.Camera.position, P.Vec2.multiply(P.Vec2.right, (100 * P.Game.deltaTime)));
        }
        if (P.Input.isKey("KeyQ")) {
            P.Camera.rotation--;
        }
        if (P.Input.isKey("KeyE")) {
            P.Camera.rotation++;
        }
        if (P.Input.isMouse()) {
            console.log(P.Input.canvasToWorld(P.Input.mousePosition));
        }
    };
}
class MyRainbow extends P.Sprite {
    t: number = 0;

    onCreate(): void {
        this.color = P.Color.red;
    }

    onUpdate(): void {
        this.t += P.Game.deltaTime;
        if (this.t > 1) {
            this.t -= 1;
        }
        this.color = P.Color.fromHSV(this.t, 1, 1);
    }
}
const myMover = P.Game.root.createChild(MyMover);
myMover.name = "MyMover";
const myRainbow = myMover.createChild(MyRainbow);
myRainbow.name = "MyRainbow";
myRainbow.image = "assets/sprites/enemy_A.png";
const myChild = myMover.createChild(P.Sprite);
myChild.name = "MyChild";
myChild.position = P.Vec2.multiply(P.Vec2.right, 32);
myChild.image = "assets/sprites/ship_B.png";
myChild.color = P.Color.red;

// class dragon extends Petrallengine.Node implements Petrallengine.IDrawable {
//     myGon: ngon | null = null;

//     onStart(): void {
//         this.myGon = this.findDescendantByType(ngon);
//     }

//     onDraw(context: CanvasRenderingContext2D): void {
//         if (!this.myGon)
//             return;

//         context.strokeStyle = "#ff00ff";
//         context.beginPath();
//         for (let i = 0; i <= this.myGon.vertices.length; ++i) {
//             const v = this.myGon.vertices[i % this.myGon.vertices.length];
//             if (i == 0)
//                 context.moveTo(v.x, v.y);
//             else
//                 context.lineTo(v.x, v.y);
//         }
//         context.stroke();

//         context.strokeStyle = "#00ffff";
//         context.strokeRect(this.myGon.bounds.min.x,
//             this.myGon.bounds.min.y,
//             this.myGon.bounds.size.x,
//             this.myGon.bounds.size.y);
//     }
// }
// class ngon extends Petrallengine.NgonCollider {
//     myProp: number = 1;

//     onCreate(): void {
//         this.sides = 5;
//         this.radius = 100;
//         this.position = Petrallengine.Vec2.right.scale(100);
//     }

//     onUpdate(): void {
//         if (Petrallengine.Input.isKey("KeyW")) {
//             this.position.translate(Petrallengine.Vec2.up.scale(100 * Petrallengine.Game.deltaTime));
//         }
//         if (Petrallengine.Input.isKey("KeyS")) {
//             this.position.translate(Petrallengine.Vec2.down.scale(100 * Petrallengine.Game.deltaTime));
//         }
//         if (Petrallengine.Input.isKey("KeyA")) {
//             this.position.translate(Petrallengine.Vec2.left.scale(100 * Petrallengine.Game.deltaTime));
//         }
//         if (Petrallengine.Input.isKey("KeyD")) {
//             this.position.translate(Petrallengine.Vec2.right.scale(100 * Petrallengine.Game.deltaTime));
//         }
//         if (Petrallengine.Input.isKeyPressed("ArrowUp"))
//             this.sides++;
//         if (Petrallengine.Input.isKeyPressed("ArrowDown"))
//             this.sides--;
//         if (Petrallengine.Input.isKey("ArrowRight"))
//             this.radius++;
//         if (Petrallengine.Input.isKey("ArrowLeft"))
//             this.radius--;

//         this.rotation++;

//         // let mat = Petrallengine.Mat3.inverse(Petrallengine.Mat3.makeScaling(Petrallengine.Vec2.one.scale(1.01)));
//         // this.position.transform(mat);

//         this.regenerate();
//     }
// }
// Petrallengine.Game.root.createChild(dragon).createChild(ngon);

// let mat: Petrallengine.Mat3;
// mat = Petrallengine.Mat3.identity;
// mat = Petrallengine.Mat3.makeTranslation(Petrallengine.Vec2.one.scale(-1));
// console.log(mat.m);
// console.log(Petrallengine.Mat3.inverse(mat).m);
// mat = Petrallengine.Mat3.makeRotation(90);
// console.log(mat.m);
// console.log(Petrallengine.Mat3.inverse(mat).m);
// console.log(Petrallengine.Vec2.one.transform(mat));
// mat = Petrallengine.Mat3.identity.set(0, 0, 4).set(0, 1, 2).set(1, 0, 2).set(1, 1, 1);
// console.log(mat.m);
// console.log(Petrallengine.Mat3.inverse(mat).m);
