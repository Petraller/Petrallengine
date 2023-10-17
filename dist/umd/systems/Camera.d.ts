/**
 * @author Petraller <me@petraller.com>
 */
import Vec2 from '../structures/Vec2';
/**
 * Static class for moving the viewport in the world space.
 */
export default class Camera {
    /**
     * The position of the camera.
     */
    static position: Vec2;
    /**
     * The rotation of the camera.
     */
    static rotation: number;
    /**
     * The scale of the camera.
     */
    static scale: Vec2;
}
