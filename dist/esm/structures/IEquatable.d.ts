/**
 * @author Petraller <me@petraller.com>
 */
/**
 * Interface for equatable objects.
 */
export default interface IEquatable {
    /**
     * Determines if this object is equal to another.
     * @param other The other object.
     * @returns Whether the objects are equal.
     */
    equals(other: IEquatable): boolean;
}
