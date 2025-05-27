/**
 * Returns the current process ID (Node.js only).
 * @returns {number | undefined}
 */
export function getProcessId(): number | undefined {
	if (typeof process !== 'undefined' && process.pid) return process.pid
	return undefined
}

/**
 * Returns the current process uptime in seconds (Node.js only).
 * @returns {number | undefined}
 */
export function getProcessUptime(): number | undefined {
	if (typeof process !== 'undefined' && typeof process.uptime === 'function')
		return process.uptime()
	return undefined
}

/**
 * Returns the current working directory (Node.js only).
 * @returns {string | undefined}
 */
export function getCwd(): string | undefined {
	if (typeof process !== 'undefined' && typeof process.cwd === 'function') return process.cwd()
	return undefined
}

/**
 * Returns the current process platform (Node.js only).
 * @returns {string | undefined}
 */
export function getProcessPlatform(): string | undefined {
	if (typeof process !== 'undefined' && process.platform) return process.platform
	return undefined
}

/**
 * Exits the process with the given code (Node.js only).
 * @param code Exit code (default 0).
 */
export function exitProcess(code: number = 0): void {
	if (typeof process !== 'undefined' && typeof process.exit === 'function') process.exit(code)
}

/**
 * Returns true if the process is running in a CI environment (Node.js only).
 * @returns {boolean}
 */
export function isCI(): boolean {
	return (
		typeof process !== 'undefined' &&
		!!process.env &&
		(!!process.env['CI'] ||
			!!process.env['CONTINUOUS_INTEGRATION'] ||
			!!process.env['BUILD_NUMBER'] ||
			!!process.env['RUN_ID'])
	)
}
