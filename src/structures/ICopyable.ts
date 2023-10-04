/**
 * @author Petraller <me@petraller.com>
 */

/**
 * Interface for copy-constructable objects
 */
export default interface ICopyable {
    /**
     * Constructs a copy of the object.
     * @returns The copy of the object.
     */
    copy(): ICopyable;

    /**
     * Copies the value of another object.
     * @param other The other object.
     * @returns This object after copying.
     */
    copyFrom(other: ICopyable): ICopyable;
}
