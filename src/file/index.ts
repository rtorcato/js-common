import { promises as fs } from 'node:fs'
import * as path from 'node:path'

/**
 * Reads a file as a string (UTF-8).
 * @param {string} filePath - The path to the file.
 * @returns {Promise<string>} The file contents as a string.
 */
export async function readFileAsString(filePath: string): Promise<string> {
	return await fs.readFile(filePath, 'utf-8')
}

/**
 * Writes a string to a file (UTF-8).
 * @param {string} filePath - The path to the file.
 * @param {string} data - The string data to write.
 * @returns {Promise<void>}
 */
export async function writeFileAsString(filePath: string, data: string): Promise<void> {
	await fs.writeFile(filePath, data, 'utf-8')
}

/**
 * Checks if a file exists.
 * @param {string} filePath - The path to the file.
 * @returns {Promise<boolean>} True if the file exists, false otherwise.
 */
export async function fileExists(filePath: string): Promise<boolean> {
	try {
		await fs.access(filePath)
		return true
	} catch {
		return false
	}
}

/**
 * Deletes a file.
 * @param {string} filePath - The path to the file.
 * @returns {Promise<void>}
 */
export async function deleteFile(filePath: string): Promise<void> {
	await fs.unlink(filePath)
}

/**
 * Gets the file extension from a file path.
 * @param {string} filePath - The path to the file.
 * @returns {string} The file extension (including the dot), or an empty string if none.
 */
export function getFileExtension(filePath: string): string {
	return path.extname(filePath)
}
