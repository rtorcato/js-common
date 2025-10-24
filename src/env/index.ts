import { z } from 'zod'

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

/**
 *
 * Validates the environment variables against a Zod schema.
 * Throws an error if any required variables are missing or invalid.
 * @param {z.ZodObject<T>} EnvSchema - The Zod schema to validate against.
 * @param {Record<string, string | undefined>} buildEnv - The environment variables to validate, defaults to `process.env`.
 * @throws {Error} If validation fails, an error with a message listing missing variables is thrown.
 */
export function checkEnv<T extends z.ZodRawShape>(
	EnvSchema: z.ZodObject<T>,
	buildEnv: Record<string, string | undefined> = process.env
) {
	try {
		return EnvSchema.parse(buildEnv)
	} catch (error) {
		if (error instanceof z.ZodError) {
			let message = 'Missing required values in .env:\n'
			message += Object.keys(error.flatten().fieldErrors).join('\n')
			const e = new Error(message)
			e.stack = ''
			throw e
		}
		throw error
	}
}

/**
 * Schema for validating the root environment variables.
 * It includes NODE_ENV, LOG_LEVEL, and PORT with their respective types and defaults.
 */
export const RootApiEnvSchema = z.object({
	NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
	LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('info'),
	PORT: z.coerce.number().default(3000),
})

export type RootApiEnvSchema = z.infer<typeof RootApiEnvSchema>
