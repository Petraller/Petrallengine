/**
 * @author Petraller <me@petraller.com>
 */

import Body from './Body';
import Vec2 from '../structures/Vec2';

export enum EForceType {
    Impulse,
    Constant,
}

/**
 * A node that responds to physics and collisions.
*/
export default class RigidBody extends Body {
    mass: number = 1;

    _force: Vec2 = Vec2.zero;
    _gravity: Vec2 = Vec2.down;

    addForce(force: Vec2) {
    }
}
