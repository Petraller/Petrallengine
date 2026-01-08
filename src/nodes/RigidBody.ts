/**
 * @author Petraller <me@petraller.com>
 */

import Body from './Body';
import Vec2 from '../structures/Vec2';

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

    addImpulse(impulse: Vec2) {
        this.velocity = Vec2.add(this.velocity, Vec2.multiply(impulse, 1 / this.mass));
    }
}
