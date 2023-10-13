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
if (false) {
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
if (false) {
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
if (false) {
    class MyBody extends P.RigidBody {
        startingPos: P.Vec2 = P.Vec2.multiply(P.Vec2.left, 100);
        force = 100;
        keys: [string, string, string, string] = ["KeyD", "KeyS", "KeyA", "KeyW"];
        reset(): void {
            this.position = this.startingPos.copy();
            this.velocity = P.Vec2.zero;
        }
        onStart(): void {
            this.reset();
        }
        onUpdate(): void {
            for (let k = 0; k < this.keys.length; ++k) {
                if (P.Input.isKey(this.keys[k])) {
                    this.addForce(P.Vec2.multiply(P.Vec2.rotate(P.Vec2.right, k * 90), this.force));
                }
            }
            if (P.Input.isKey("KeyQ")) {
                this.rotation--;
            }
            if (P.Input.isKey("KeyE")) {
                this.rotation++;
            }
            if (P.Input.isKeyPressed("Space"))
                this.reset();
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
    const b1 = P.Game.root.createChild(MyBody);
    b1.startingPos = P.Vec2.multiply(P.Vec2.left, 100);
    b1.keys = ["KeyD", "KeyS", "KeyA", "KeyW"];
    b1.name = "WASDCircle";
    b1.scale = new P.Vec2(1, 0.5);
    b1.gravity = new P.Vec2(0, 980);
    const n = 4;
    for (let i = 0; i < n; ++i) {
        const c = b1.createChild(MyCollider);
        c.position = P.Vec2.multiply(P.Vec2.rotate(P.Vec2.right, 360 * i / n), 50);
    }

    const b2 = P.Game.root.createChild(MyBody).createChild(MyCollider).parent as MyBody;
    b2.startingPos = P.Vec2.multiply(P.Vec2.right, 100);
    b2.keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"];
    b2.name = "ArrowCircle";

    const wall1 = P.Game.root.createChild(P.RigidBody).createChild(P.LineCollider);
    wall1.parent!.name = "WallL";
    wall1.globalStart = P.Input.normalizedToWorld(new P.Vec2(0.1, 0.1));
    wall1.globalEnd = P.Input.normalizedToWorld(new P.Vec2(0.1, 0.9));
    wall1.restitution = 0;
    (wall1.parent as P.RigidBody).mass = Infinity;

    const wall2 = P.Game.root.createChild(P.RigidBody).createChild(P.LineCollider);
    wall2.parent!.name = "WallD";
    wall2.globalStart = P.Input.normalizedToWorld(new P.Vec2(0.1, 0.9));
    wall2.globalEnd = P.Input.normalizedToWorld(new P.Vec2(0.9, 0.9));
    wall2.restitution = 0;
    (wall2.parent as P.RigidBody).mass = Infinity;

    const wall3 = P.Game.root.createChild(P.RigidBody).createChild(P.LineCollider);
    wall3.parent!.name = "WallR";
    wall3.globalStart = P.Input.normalizedToWorld(new P.Vec2(0.9, 0.9));
    wall3.globalEnd = P.Input.normalizedToWorld(new P.Vec2(0.9, 0.1));
    wall3.restitution = 0;
    (wall3.parent as P.RigidBody).mass = Infinity;

    const wall4 = P.Game.root.createChild(P.RigidBody).createChild(P.LineCollider);
    wall4.parent!.name = "WallU";
    wall4.globalStart = P.Input.normalizedToWorld(new P.Vec2(0.9, 0.1));
    wall4.globalEnd = P.Input.normalizedToWorld(new P.Vec2(0.1, 0.1));
    wall4.restitution = 0;
    (wall4.parent as P.RigidBody).mass = Infinity;
}

// --- POOL DEMO ---
if (false) {
    class MyBall extends P.RigidBody {
        acceleration = 1000;
        onUpdate(): void {
            if (P.Input.isKeyPressed("Space")) {
                this.velocity = P.Vec2.rotate(new P.Vec2(800, 0), Math.random() * 10 - 5);
            }
        }
    }

    const firstBallPosition = P.Input.normalizedToWorld(new P.Vec2(0.65, 0.5))
    const ballRadius = 20;
    const ballSpacing = ballRadius * 2 + 100 * Number.EPSILON;

    {
        const cue = P.Game.root.createChild(MyBall);
        cue.globalPosition = P.Input.normalizedToWorld(new P.Vec2(0.25, 0.5));
        cue.mass = 2;
        const collider = cue.createChild(P.CircleCollider);
        collider.restitution = 0.9;
        collider.radius = ballRadius * 0.9;
    }

    for (let i = 1; i <= 5; ++i) {
        const ballHOffset = P.Vec2.multiply(P.Vec2.rotate(P.Vec2.right, 30), (i - 1) * ballSpacing);
        for (let j = 0; j < i; ++j) {
            const ballVOffset = P.Vec2.multiply(P.Vec2.up, j * ballSpacing);
            const ball = P.Game.root.createChild(P.RigidBody);
            ball.name = "Ball";
            ball.globalPosition = P.Vec2.add(firstBallPosition, P.Vec2.add(ballHOffset, ballVOffset));
            const collider = ball.createChild(P.CircleCollider);
            collider.restitution = 0.9;
            collider.radius = ballRadius;
        }
    }

    for (const v of [
        [[0, 0], [0, 1]], [[0, 1], [1, 1]], [[1, 1], [1, 0]], [[1, 0], [0, 0]],
    ]) {
        const wall = P.Game.root.createChild(P.RigidBody);
        wall.mass = Infinity;
        const collider = wall.createChild(P.LineCollider);
        collider.restitution = 0.9;
        collider.globalStart = P.Input.normalizedToWorld(new P.Vec2(v[0][0], v[0][1]));
        collider.globalEnd = P.Input.normalizedToWorld(new P.Vec2(v[1][0], v[1][1]));
    }
}

// --- SPRITE DEMO ---
if (true) {
    class MySprite extends P.Sprite {
        onUpdate(): void {
            let color = this.color;
            if (P.Input.isKey("KeyQ")) {
                color.r += 1 / 255;
            }
            if (P.Input.isKey("KeyA")) {
                color.r -= 1 / 255;
            }
            if (P.Input.isKey("KeyW")) {
                color.g += 1 / 255;
            }
            if (P.Input.isKey("KeyS")) {
                color.g -= 1 / 255;
            }
            if (P.Input.isKey("KeyE")) {
                color.b += 1 / 255;
            }
            if (P.Input.isKey("KeyD")) {
                color.b -= 1 / 255;
            }
            if (P.Input.isKey("KeyR")) {
                color.a += 1 / 255;
            }
            if (P.Input.isKey("KeyF")) {
                color.a -= 1 / 255;
            }
            this.color = color.copy();
        }
    }

    for (let i = 0; i < 64; ++i) {
        const mySprite = P.Game.root.createChild(MySprite);
        mySprite.image = Math.random() > 0.5 ? "assets/sprites/effect_purple.png" : "assets/sprites/ship_J.png";
        mySprite.position = new P.Vec2(Math.lerp(-200, 200, Math.random()), Math.lerp(-150, 150, Math.random()));
    }
}
