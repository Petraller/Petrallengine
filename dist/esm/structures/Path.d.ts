/**
 * @author Petraller <me@petraller.com>
 */
import '../Math';
import ICopyable from './ICopyable';
import Vec2 from './Vec2';
/**
 * Representation of an ordered set of points.
 *
 * Points are ordered in clockwise direction.
 */
export default class Path implements ICopyable {
    /** The list of vectors */
    points: Vec2[];
    constructor(points: Vec2[]);
    copy: () => Path;
    /** The mean of all points. */
    get mean(): Vec2;
    /** The signed area inside the path. */
    get signedArea(): number;
    /** The area inside the path. */
    get area(): number;
    /** The centroid of the area. */
    get centroid(): Vec2;
    /**
     * Determines if a point exists inside this path.
     * @param point The point.
     * @returns Whether the point exists inside this path.
     */
    contains: (point: Vec2) => boolean;
    /**
     * Translates a path.
     * @param p The path.
     * @param v The translation vector.
     * @returns The translated path.
     */
    static translate: (p: Path, v: Vec2) => Path;
    /**
     * Rotates a path around the centroid.
     * @param p The path.
     * @param deg The angle in degrees.
     * @returns The rotated path.
     */
    static rotate: (p: Path, deg: number) => Path;
    /**
     * Scales a path from the centroid.
     * @param p The path.
     * @param v The scale vector.
     * @returns The scaled path.
     */
    static scale: (p: Path, v: Vec2) => Path;
    /**
     * Sorts vertices in a path such that they are in clockwise order around the mean.
     * @returns The sorted path.
     */
    static sort: (p: Path) => Path;
}
