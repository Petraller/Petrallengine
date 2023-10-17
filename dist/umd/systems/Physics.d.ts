/**
 * @author Petraller <me@petraller.com>
 */
import Body from '../nodes/Body';
import Collider from '../nodes/Collider';
import Vec2 from '../structures/Vec2';
/**
 * Static class for physics and collisions.
 */
export default class Physics {
    private static readonly PENETRATION_IMPULSE_STRENGTH;
    private static singleton;
    private static bodies;
    private static colliders;
    private static bodyColliders;
    private static colliderBodies;
    private static pairsCollided;
    debugContacts: Map<Vec2, number>;
    constructor();
    tick(): void;
    static registerBody(body: Body): void;
    static deregisterBody(body: Body): void;
    static registerCollider(collider: Collider, owner: Body): void;
    static deregisterCollider(collider: Collider): void;
    private static circleLineSegmentIntersection;
    private static circleCircleIntersection;
    private static massToWeights;
}
