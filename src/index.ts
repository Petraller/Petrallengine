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

// --- COLOR LERP DEMO ---
if (true) {
    function color(c1: P.Color, c2: P.Color, interpolationMethod: (c1: P.Color, c2: P.Color, t: number) => P.Color) {
        const container = document.createElement("div");
        container.style.display = "flex";
        const n = 100;
        for (let i = 0; i <= n; ++i) {
            const div = document.createElement("div");
            div.style.flex = "1 0 0";
            div.style.height = "50px";
            div.style.backgroundColor = interpolationMethod(c1, c2, i / n).toHexString();
            container.appendChild(div);
        }
        document.body.appendChild(container);
    }
    color(P.Color.red, P.Color.blue, P.Color.lerp);
    color(P.Color.red, P.Color.blue, P.Color.slerp);
    color(P.Color.green, P.Color.yellow, P.Color.lerp);
    color(P.Color.green, P.Color.yellow, P.Color.slerp);
    color(P.Color.magenta, P.Color.cyan, P.Color.lerp);
    color(P.Color.magenta, P.Color.cyan, P.Color.slerp);
    color(P.Color.black, P.Color.white, P.Color.lerp);
    color(P.Color.black, P.Color.white, P.Color.slerp);
    color(P.Color.fromHexString("#0799ce"), P.Color.fromHexString("#FFAB51"), P.Color.lerp);
    color(P.Color.fromHexString("#0799ce"), P.Color.fromHexString("#FFAB51"), P.Color.slerp);
    for (let i = 0; i < 3; ++i) {
        const c1 = new P.Color(Math.random(), Math.random(), Math.random());
        const c2 = new P.Color(Math.random(), Math.random(), Math.random());
        color(c1, c2, P.Color.lerp);
        color(c1, c2, P.Color.slerp);
    }
}

// --- BASIC DEMO ---
if (true) {
    class MyParent extends P.Sprite {
        readonly SPEED = 100;

        onUpdate(): void {
            if (P.Input.isKey("KeyW")) {
                this.position = P.Vec2.add(this.position, P.Vec2.multiply(P.Vec2.up, (this.SPEED * P.Game.deltaTime)));
            }
            if (P.Input.isKey("KeyS")) {
                this.position = P.Vec2.add(this.position, P.Vec2.multiply(P.Vec2.down, (this.SPEED * P.Game.deltaTime)));
            }
            if (P.Input.isKey("KeyA")) {
                this.position = P.Vec2.add(this.position, P.Vec2.multiply(P.Vec2.left, (this.SPEED * P.Game.deltaTime)));
            }
            if (P.Input.isKey("KeyD")) {
                this.position = P.Vec2.add(this.position, P.Vec2.multiply(P.Vec2.right, (this.SPEED * P.Game.deltaTime)));
            }
            if (P.Input.isKey("KeyQ")) {
                this.rotation--;
            }
            if (P.Input.isKey("KeyE")) {
                this.rotation++;
            }
            if (P.Input.isKey("KeyZ")) {
                this.scale = P.Vec2.add(this.scale, P.Vec2.multiply(P.Vec2.left, P.Game.deltaTime));
            }
            if (P.Input.isKey("KeyX")) {
                this.scale = P.Vec2.add(this.scale, P.Vec2.multiply(P.Vec2.right, P.Game.deltaTime));
            }
            if (P.Input.isKey("KeyC")) {
                this.scale = P.Vec2.add(this.scale, P.Vec2.multiply(P.Vec2.up, P.Game.deltaTime));
            }
            if (P.Input.isKey("KeyV")) {
                this.scale = P.Vec2.add(this.scale, P.Vec2.multiply(P.Vec2.down, P.Game.deltaTime));
            }
        };
    }
    class MyChild extends P.Sprite {
        readonly SPEED = 150;

        t: number = 0;

        onCreate(): void {
            this.color = P.Color.red;
        }

        onUpdate(): void {
            if (P.Input.isKey("ArrowUp")) {
                this.globalPosition = P.Vec2.add(this.globalPosition, P.Vec2.multiply(P.Vec2.up, (this.SPEED * P.Game.deltaTime)));
            }
            if (P.Input.isKey("ArrowDown")) {
                this.globalPosition = P.Vec2.add(this.globalPosition, P.Vec2.multiply(P.Vec2.down, (this.SPEED * P.Game.deltaTime)));
            }
            if (P.Input.isKey("ArrowLeft")) {
                this.globalPosition = P.Vec2.add(this.globalPosition, P.Vec2.multiply(P.Vec2.left, (this.SPEED * P.Game.deltaTime)));
            }
            if (P.Input.isKey("ArrowRight")) {
                this.globalPosition = P.Vec2.add(this.globalPosition, P.Vec2.multiply(P.Vec2.right, (this.SPEED * P.Game.deltaTime)));
            }
            if (P.Input.isKey("Comma")) {
                this.rotation--;
            }
            if (P.Input.isKey("Period")) {
                this.rotation++;
            }
            if (P.Input.isKey("KeyI")) {
                this.scale = P.Vec2.add(this.scale, P.Vec2.multiply(P.Vec2.left, P.Game.deltaTime));
            }
            if (P.Input.isKey("KeyO")) {
                this.scale = P.Vec2.add(this.scale, P.Vec2.multiply(P.Vec2.right, P.Game.deltaTime));
            }
            if (P.Input.isKey("KeyK")) {
                this.scale = P.Vec2.add(this.scale, P.Vec2.multiply(P.Vec2.up, P.Game.deltaTime));
            }
            if (P.Input.isKey("KeyL")) {
                this.scale = P.Vec2.add(this.scale, P.Vec2.multiply(P.Vec2.down, P.Game.deltaTime));
            }

            this.t += P.Game.deltaTime;
            if (this.t > 1) {
                this.t -= 1;
            }
            this.color = P.Color.fromHSV(this.t, 1, 1);
        }
    }
    const myParent = P.Game.root.createChild(MyParent);
    myParent.name = "MyParent";
    myParent.image = "assets/sprites/ship_K.png";
    myParent.color = P.Color.red;
    const myChild1 = myParent.createChild(MyChild);
    myChild1.name = "MyChild";
    myChild1.position = P.Vec2.multiply(P.Vec2.left, 48);
    myChild1.image = "assets/sprites/ship_B.png";
    const myChild2 = myParent.createChild(MyChild);
    myChild2.name = "MyChild";
    myChild2.position = P.Vec2.multiply(P.Vec2.right, 48);
    myChild2.image = "assets/sprites/ship_B.png";
}

// --- COLLIDERS DEMO ---
if (true) {
    class MyBody extends P.Body {
        onCreate(): void {
            this.position = P.Vec2.multiply(P.Vec2.left, 100);
        }
        onUpdate(): void {
            if (P.Input.isKey("KeyW")) {
                this.position = P.Vec2.add(this.position, P.Vec2.multiply(P.Vec2.up, 100 * P.Game.deltaTime));
            }
            if (P.Input.isKey("KeyS")) {
                this.position = P.Vec2.add(this.position, P.Vec2.multiply(P.Vec2.down, 100 * P.Game.deltaTime));
            }
            if (P.Input.isKey("KeyA")) {
                this.position = P.Vec2.add(this.position, P.Vec2.multiply(P.Vec2.left, 100 * P.Game.deltaTime));
            }
            if (P.Input.isKey("KeyD")) {
                this.position = P.Vec2.add(this.position, P.Vec2.multiply(P.Vec2.right, 100 * P.Game.deltaTime));
            }
        }
    }
    class MyBody2 extends P.Body {
        onCreate(): void {
            this.position = P.Vec2.multiply(P.Vec2.right, 100);
        }
        onUpdate(): void {
            if (P.Input.isKey("ArrowUp")) {
                this.position = P.Vec2.add(this.position, P.Vec2.multiply(P.Vec2.up, 100 * P.Game.deltaTime));
            }
            if (P.Input.isKey("ArrowDown")) {
                this.position = P.Vec2.add(this.position, P.Vec2.multiply(P.Vec2.down, 100 * P.Game.deltaTime));
            }
            if (P.Input.isKey("ArrowLeft")) {
                this.position = P.Vec2.add(this.position, P.Vec2.multiply(P.Vec2.left, 100 * P.Game.deltaTime));
            }
            if (P.Input.isKey("ArrowRight")) {
                this.position = P.Vec2.add(this.position, P.Vec2.multiply(P.Vec2.right, 100 * P.Game.deltaTime));
            }
        }
        onCollisionEnter(other: P.Body): void {
            console.log('enter');
        }
        onCollisionUpdate(other: P.Body): void {
            console.log('update');
        }
        onCollisionExit(other: P.Body): void {
            console.log('exit');
        }
    }
    class MyCollider extends P.CircleCollider {
        onCreate(): void {
            this.radius = 50;
        }
        onUpdate(): void {
            if (P.Input.isKey("Digit1"))
                this.radius--;
            if (P.Input.isKey("Digit2"))
                this.radius++;
        }
    }
    P.Game.root.createChild(MyBody).createChild(MyCollider);
    P.Game.root.createChild(MyBody2).createChild(MyCollider);
}
