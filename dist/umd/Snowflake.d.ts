/**
 * @author Petraller <me@petraller.com>
 */
/**
 * A Snowflake ID.
 */
export type Snowflake = string;
/**
 * Creates a unique Snowflake ID.
 * @returns A unique Snowflake ID.
 */
export declare const makeSnowflake: () => Snowflake;
