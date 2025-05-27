/**
 * Logs a message with a timestamp.
 * @param message The message to log.
 * @param level The log level (default: 'info').
 */
export function logWithTimestamp(message: string, level: 'info' | 'warn' | 'error' = 'info'): void {
	const ts = new Date().toISOString()
	// eslint-disable-next-line no-console
	console[level](`[${ts}] ${message}`)
}

/**
 * Logs a warning message.
 * @param message The warning message.
 */
export function warn(message: string): void {
	// eslint-disable-next-line no-console
	console.warn(`[WARN] ${message}`)
}

/**
 * Logs an error message.
 * @param message The error message.
 */
export function error(message: string): void {
	// eslint-disable-next-line no-console
	console.error(`[ERROR] ${message}`)
}

/**
 * Logs an info message.
 * @param message The info message.
 */
export function info(message: string): void {
	// eslint-disable-next-line no-console
	console.info(`[INFO] ${message}`)
}

/**
 * Captures all console output and returns a function to restore it.
 * @param callback Function to call with each log message.
 * @returns {() => void} Restore function.
 */

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function captureConsole(callback: (type: string, ...args: any[]) => void): () => void {
	const orig = {
		log: console.log,
		info: console.info,
		warn: console.warn,
		error: console.error,
	}
	// biome-ignore lint/complexity/noForEach: <explanation>
	;(['log', 'info', 'warn', 'error'] as const).forEach((type) => {
		// @ts-ignore
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		console[type] = (...args: any[]) => {
			callback(type, ...args)
			orig[type](...args)
		}
	})
	return () => {
		Object.assign(console, orig)
	}
}
