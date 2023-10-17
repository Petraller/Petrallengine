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
}
