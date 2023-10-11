/**
 * @author Petraller <me@petraller.com>
 */

import Body from './Body';
import Vec2 from '../structures/Vec2';
import Game from '../Game';

export enum EForceType {
    Impulse,
    Force,
}

/**
 * A node that responds to physics and collisions.
*/
export default class RigidBody extends Body {
    private _mass: number = 1;

    /** The linear drag. */
    drag: number = 0;

    /** The force of gravity. */
    gravity: Vec2 = Vec2.zero;

    /** The mass. */
    get mass() { return this._mass; }
    set mass(value: number) { this._mass = Math.max(value, Number.EPSILON); }

    addForce(force: Vec2, type: EForceType = EForceType.Impulse) {
        let a: Vec2;
        switch (type) {
            case EForceType.Impulse:
                a = Vec2.multiply(force, 1 / this.mass);
                break;
            case EForceType.Force:
                a = Vec2.multiply(force, Game.deltaTime / this.mass);
                break;
        }
        this.velocity = Vec2.add(this.velocity, a);
    }
}
