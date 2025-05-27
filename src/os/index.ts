/**
 * Returns the current operating system platform (Node.js only).
 * @returns {string | undefined} The platform (e.g., 'darwin', 'win32', 'linux').
 */
export function getOsPlatform(): string | undefined {
	if (typeof process !== 'undefined' && process.platform) return process.platform
	return undefined
}

/**
 * Returns the OS release/version (Node.js only).
 * @returns {string | undefined}
 */
export function getOsRelease(): string | undefined {
	if (typeof process !== 'undefined' && process.release && process.release.name)
		return process.release.name
	return undefined
}

/**
 * Returns the OS architecture (Node.js only).
 * @returns {string | undefined}
 */
export function getOsArch(): string | undefined {
	if (typeof process !== 'undefined' && process.arch) return process.arch
	return undefined
}

/**
 * Returns the user's home directory (Node.js only).
 * @returns {string | undefined}
 */
export function getHomeDir(): string | undefined {
	if (typeof process !== 'undefined' && process.env && process.env['HOME'])
		return process.env['HOME']
	if (typeof process !== 'undefined' && process.env && process.env['USERPROFILE'])
		return process.env['USERPROFILE']
	return undefined
}

/**
 * Returns the system's temporary directory (Node.js only).
 * @returns {string | undefined}
 */
export function getTmpDir(): string | undefined {
	if (typeof process !== 'undefined' && process.env && process.env['TMPDIR'])
		return process.env['TMPDIR']
	if (typeof process !== 'undefined' && process.env && process.env['TEMP'])
		return process.env['TEMP']
	if (typeof process !== 'undefined' && process.env && process.env['TMP']) return process.env['TMP']
	return undefined
}
