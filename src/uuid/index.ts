import { createTranslator } from 'short-uuid'
import {
	NIL as NIL_UUID,
	parse as uuidParse,
	stringify as uuidStringify,
	validate as uuidValidate,
	version as uuidVersion,
	v4 as uuidv4,
	v7 as uuidv7,
} from 'uuid'

const translator = createTranslator()

/**
 * Generates a UUID v4 string.
 * @returns {string} A new UUID v4 string.
 */
export const getUUID = (): string => {
	return uuidv4()
}

/**
 * Generates a UUID v7 string (time-ordered).
 * UUID v7 embeds a Unix timestamp, making them sortable and ideal for database primary keys.
 * @returns {string} A new UUID v7 string.
 *
 * @example
 * ```typescript
 * getUUIDv7() // '018e5e2c-7c0a-7000-8000-0e02b2c3d479'
 * ```
 */
export const getUUIDv7 = (): string => {
	return uuidv7()
}

/**
 * Generates a short UUID string using short-uuid.
 * @returns {string} A new short UUID string.
 */
export const getShortUUID = (): string => {
	return translator.generate()
}

/**
 * Converts a standard UUID to a short UUID.
 * @param uuid The standard UUID string.
 * @returns {string} The short UUID string.
 *
 * @example
 * ```typescript
 * toShortUUID('f47ac10b-58cc-4372-a567-0e02b2c3d479') // 'mhvXdrZT4jP5T8vBxuvm75'
 * ```
 */
export const toShortUUID = (uuid: string): string => {
	return translator.fromUUID(uuid)
}

/**
 * Converts a short UUID back to a standard UUID.
 * @param short The short UUID string.
 * @returns {string} The standard UUID string.
 *
 * @example
 * ```typescript
 * fromShortUUID('mhvXdrZT4jP5T8vBxuvm75') // 'f47ac10b-58cc-4372-a567-0e02b2c3d479'
 * ```
 */
export const fromShortUUID = (short: string): string => {
	return translator.toUUID(short)
}

/**
 * Checks if a string is a valid UUID (any version).
 * @param id The string to validate.
 * @returns {boolean} True if valid UUID, false otherwise.
 */
export const isUUID = (id: string): boolean => uuidValidate(id)

/**
 * Checks if a string is a valid UUID v4.
 * @param id The string to validate.
 * @returns {boolean} True if valid UUID v4, false otherwise.
 */
export const isUUIDv4 = (id: string): boolean => uuidValidate(id) && uuidVersion(id) === 4

/**
 * Checks if a UUID is the nil UUID (all zeros).
 * @param id The UUID string to check.
 * @returns {boolean} True if nil UUID, false otherwise.
 *
 * @example
 * ```typescript
 * isNilUUID('00000000-0000-0000-0000-000000000000') // true
 * isNilUUID('f47ac10b-58cc-4372-a567-0e02b2c3d479') // false
 * ```
 */
export const isNilUUID = (id: string): boolean => id === NIL_UUID

/**
 * Gets the version number of a UUID.
 * @param id The UUID string.
 * @returns {number} The UUID version (1, 4, 7, etc.), or 0 for nil UUID.
 * @throws {Error} If the UUID is invalid.
 *
 * @example
 * ```typescript
 * getUUIDVersion('f47ac10b-58cc-4372-a567-0e02b2c3d479') // 4
 * getUUIDVersion('018e5e2c-7c0a-7000-8000-0e02b2c3d479') // 7
 * getUUIDVersion('00000000-0000-0000-0000-000000000000') // 0
 * ```
 */
export const getUUIDVersion = (id: string): number => {
	if (!uuidValidate(id)) {
		throw new Error('Invalid UUID')
	}
	return uuidVersion(id)
}

/**
 * Returns the nil UUID (all zeros).
 * @returns {string} The nil UUID string.
 */
export const getNilUUID = (): string => NIL_UUID

/**
 * Converts a UUID string to a byte array (Uint8Array).
 * @param id The UUID string.
 * @returns {Uint8Array} The byte array representation of the UUID.
 */
export const uuidToBytes = (id: string): Uint8Array => uuidParse(id)

/**
 * Converts a byte array (Uint8Array) to a UUID string.
 * @param bytes The byte array.
 * @returns {string} The UUID string.
 */
export const bytesToUUID = (bytes: Uint8Array): string => uuidStringify(bytes)
