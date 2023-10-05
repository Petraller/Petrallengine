/**
 * @author Petraller <me@petraller.com>
 */

import Bounds from '../structures/Bounds';
import ConvexCollider from './ConvexCollider';
import Vec2 from '../structures/Vec2';

/**
 * A node that has a regular n-gon collider shape.
 */
export default class NgonCollider extends ConvexCollider {
    private _sides: number = 3;
    private _radius: number = 1;

    /** The number of sides of the polygon. */
    get sides() { return this._sides; }
    set sides(value: number) { this._sides = Math.max(value, 3); }

    /** The radius of the polygon. */
    get radius() { return this._radius; }
    set radius(value: number) { this._radius = Math.max(value, 0); }

    regenerate() {
        this._vertices = [];
        this._axes = [];
        for (let i = 0; i < this._sides; ++i) {
            const j = (i + 1) % this._sides;
            this._vertices.push(Vec2.transform(this.globalTransform, Vec2.multiply(Vec2.fromAngle(360 * i / this._sides), this._radius)));
        }
        for (let i = 0; i < this._sides; ++i) {
            const j = (i + 1) % this._sides;
            this._axes.push(Vec2.rotate(Vec2.subtract(this._vertices[i], this._vertices[j]), 90));
        }
        this._bounds = Bounds.fromVertices(this._vertices);
    }
}
