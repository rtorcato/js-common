/**
 * @fileoverview Console utility functions for logging and disabling console output in production.
 * @module console
 */

/**
 * Disables console output in production environment.
 *
 * @example
 * ```typescript
 * process.env.NODE_ENV = 'production'
 * disableConsole()
 * console.log('hidden') // no output
 * ```
 */
export const disableConsole = () => {
	if (process.env.NODE_ENV === 'production') {
		// eslint-disable-next-line @typescript-eslint/no-empty-function, no-console
		console.log = () => {}
	}
}

/**
 * Clears the console.
 *
 * @example
 * ```typescript
 * clearConsole() // terminal is wiped, cursor back at the top-left
 * ```
 *
 * @export
 * @return {*}  {void}
 */
export const clearConsole = (): void => {
	process.stdout.write('\x1B[2J\x1B[0f')
}
