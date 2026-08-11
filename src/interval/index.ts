/**
 * Runs a function repeatedly at a specified interval (cross-platform).
 *
 * @example
 * ```typescript
 * const id = runInterval(() => console.log('tick'), 1000)
 * // logs 'tick' once a second until cleared
 * clearIntervalById(id)
 * ```
 *
 * @param fn The function to run.
 * @param ms The interval in milliseconds.
 * @returns The interval ID (NodeJS.Timeout or number).
 */
export function runInterval(fn: () => void, ms: number): ReturnType<typeof setInterval> {
	return setInterval(fn, ms)
}

/**
 * Cancels an interval by its ID (cross-platform).
 *
 * @example
 * ```typescript
 * const id = runInterval(() => console.log('tick'), 1000)
 * clearIntervalById(id) // no more ticks
 * ```
 *
 * @param id The interval ID (NodeJS.Timeout or number).
 */
export function clearIntervalById(id: ReturnType<typeof setInterval>): void {
	clearInterval(id)
}
