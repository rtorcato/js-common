/**
 * Retrieves the value of an environment variable by its key.
 *
 * @param key - The name of the environment variable to retrieve.
 * @param defaultValue - An optional default value to return if the environment variable is not defined.
 * @returns The value of the environment variable if it exists, otherwise the default value if provided.
 * @throws {Error} If the environment variable is undefined and no default value is provided.
 */
export const getENV = (key: string, defaultValue?: string) => {
	const x = process.env[key.toString()]
	if (x === undefined && defaultValue !== undefined) {
		return defaultValue
	}
	if (x === undefined) {
		const message = `Undefined ENV variable - ${key.toString()}`
		throw new Error(message)
	}
	return x
}

/**
 * Determines if the current environment is set to development.
 *
 * @returns {boolean} `true` if `process.env.NODE_ENV` is `'development'`, otherwise `false`.
 */
export const isDev = (): boolean => {
	return process.env.NODE_ENV === 'development'
}

/**
 * Determines if the current environment is set to production.
 *
 * @returns {boolean} `true` if `process.env.NODE_ENV` is `'production'`, otherwise `false`.
 */
export const isProd = (): boolean => {
	return process.env.NODE_ENV === 'production'
}

/**
 * Determines if the current environment is set to test.
 *
 * @returns {boolean} `true` if `process.env.NODE_ENV` is `'test'`, otherwise `false`.
 */
export const isTest = (): boolean => {
	return process.env.NODE_ENV === 'test'
}

/**
 * Returns the current NODE_ENV value, or 'development' if not set.
 *
 * @returns {string}
 */
export const getNodeEnv = (): string => {
	return process.env.NODE_ENV || 'development'
}
