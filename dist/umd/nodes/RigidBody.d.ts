/**
 * @author Petraller <me@petraller.com>
 */
import Body from './Body';
import Vec2 from '../structures/Vec2';
export declare enum EForceType {
    Impulse = 0,
    Force = 1
}
/**
 * A node that responds to physics and collisions.
*/
export default class RigidBody extends Body {
    private _mass;
    /** The linear drag. */
    drag: number;
    /** The force of gravity. */
    gravity: Vec2;
    /** The mass. */
    get mass(): number;
    set mass(value: number);
    addForce(force: Vec2, type?: EForceType): void;
}
