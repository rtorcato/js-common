import * as shortid from 'short-uuid'
import {
	NIL as NIL_UUID,
	parse as uuidParse,
	stringify as uuidStringify,
	validate as uuidValidate,
	version as uuidVersion,
	v4 as uuidv4,
} from 'uuid'

/**
 * Generates a UUID v4 string.
 * @returns {string} A new UUID v4 string.
 */
export const getUUID = (): string => {
	return uuidv4()
}

/**
 * Generates a short UUID string using short-uuid.
 * @returns {string} A new short UUID string.
 */
export const getShortUUID = (): string => {
	return shortid.generate()
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
