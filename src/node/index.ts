/**
 * Checks if the current Node.js version is less than the specified version.
 * If the version is insufficient, logs a message and exits the process.
 *
 * @param nodeVersion - The minimum required Node.js version as a number (e.g., 18).
 *
 * @remarks
 * This function compares the current Node.js version (`process.version`) to the required version.
 * If the current version is lower, it prompts the user to update Node.js and terminates the process.
 *
 * @example
 * nodeVersionCheck(18); // Ensures Node.js version is at least 18
 */
export const nodeVersionCheck = (nodeVersion: number): void => {
	if (getNodeMajorVersion() < nodeVersion) {
		// eslint-disable-next-line no-console
		console.log('Please update Node to run this app')
		process.exit(1)
	}
}

/**
 * Returns the current Node.js major version as a number.
 *
 * @returns The major version number of the running Node.js process.
 *
 * @example
 * const major = getNodeMajorVersion(); // e.g., 18
 */
export const getNodeMajorVersion = (): number => {
	return Number(process.version.match(/^v(\d+)/)?.[1] || 0)
}

/**
 * Checks if the current environment is Node.js.
 *
 * @returns `true` if running in Node.js, otherwise `false`.
 *
 * @example
 * if (isNode()) { ... }
 */
export const isNode = (): boolean => {
	return typeof process !== 'undefined' && process.release?.name === 'node'
}

/**
 * Attempts to require a module, returning `undefined` if the module is not found.
 *
 * @param moduleName - The name of the module to require.
 * @returns The required module, or `undefined` if it cannot be loaded.
 *
 * @example
 * const optionalModule = requireOptional('some-module');
 */

export function requireOptional(moduleName: string): any | undefined {
	try {
		// eslint-disable-next-line @typescript-eslint/no-var-requires
		return require(moduleName)
	} catch {
		return undefined
	}
}

/**
 * Returns the process uptime in seconds.
 *
 * @returns The number of seconds the current Node.js process has been running.
 *
 * @example
 * const uptime = getProcessUptime();
 */
export const getProcessUptime = (): number => {
	return process.uptime()
}
