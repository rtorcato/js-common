/**
 * @fileoverview Console utility functions for logging and disabling console output in production.
 * @module console
 */

// const levelIcons: Record<string, string> = {
//   fatal: '💀',
//   error: '❌',
//   warn: '⚠️',
//   info: '✨',
//   debug: '🔍',
//   trace: '🔎',
// }

/**
 * Logs a message with a timestamp.
 *
 * @export
 * @param {...any[]} args
 */

export const logWithTimestamp = (...args: any[]) => {
	const timestamp = new Date().toISOString()
	console.log(`[${timestamp}]`, ...args)
}

/**
 * Logs a warning message in yellow.
 *
 * @export
 * @param {...any[]} args
 */

export const warn = (...args: any[]) => {
	console.warn('\x1b[33m%s\x1b[0m', ...args)
}

/**
 * Logs an error message in red.
 *
 * @export
 * @param {...any[]} args
 */

export const error = (...args: any[]) => {
	console.error('\x1b[31m%s\x1b[0m', ...args)
}

/**
 * Logs an info message in blue.
 *
 * @export
 * @param {...any[]} args
 */

export const info = (...args: any[]) => {
	console.info('\x1b[34m%s\x1b[0m', ...args)
}
