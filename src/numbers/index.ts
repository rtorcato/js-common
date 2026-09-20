/**
 * Clamps a number between a minimum and maximum value.
 *
 * @example
 * ```typescript
 * clamp(15, 0, 10) // 10
 * clamp(-5, 0, 10) // 0
 * clamp(5, 0, 10) // 5
 * ```
 *
 * @param value The number to clamp.
 * @param min The minimum value.
 * @param max The maximum value.
 * @returns The clamped value.
 */
export function clamp(value: number, min: number, max: number): number {
	return Math.max(min, Math.min(max, value))
}

/**
 * Rounds a number to a specified number of decimal places.
 *
 * @example
 * ```typescript
 * roundTo(3.14159) // 3.14
 * roundTo(3.14159, 3) // 3.142
 * roundTo(1234.5, 0) // 1235
 * ```
 *
 * @param value The number to round.
 * @param decimals The number of decimal places. Defaults to 2.
 * @returns The rounded number.
 */
export function roundTo(value: number, decimals = 2): number {
	const factor = 10 ** decimals
	return Math.round(value * factor) / factor
}

/**
 * Formats a number as a percentage string.
 *
 * @example
 * ```typescript
 * formatPercent(0.25) // '25%'
 * formatPercent(0.1234, 1) // '12.3%'
 * ```
 *
 * @param value The value to format (e.g. 0.25 for 25%).
 * @param fractionDigits Number of decimal places (default: 0).
 * @returns The formatted percentage string.
 */
export function formatPercent(value: number, fractionDigits = 0): string {
	return `${(value * 100).toFixed(fractionDigits)}%`
}

/**
 * Checks if a number is between two values.
 * @param value The number to check.
 * @param min The minimum value.
 * @param max The maximum value.
 * @param inclusive Whether the range is inclusive (default: true).
 * @returns True if the number is between min and max, false otherwise.
 */
export function between(value: number, min: number, max: number, inclusive = true): boolean {
	return inclusive ? value >= min && value <= max : value > min && value < max
}

/**
 * Returns the sum of an array of numbers.
 * @param numbers The array of numbers to sum.
 * @returns The sum of the numbers.
 */
export function sum(numbers: number[]): number {
	return numbers.reduce((acc, n) => acc + n, 0)
}

/**
 * Returns the average of an array of numbers.
 * @param numbers The array of numbers.
 * @returns The average value, or 0 if the array is empty.
 */
export function average(numbers: number[]): number {
	return numbers.length === 0 ? 0 : sum(numbers) / numbers.length
}

/**
 * Returns the true mathematical modulus, handling negative numbers correctly.
 * @param n The dividend.
 * @param m The divisor.
 * @returns The modulus result.
 */
export function mod(n: number, m: number): number {
	return ((n % m) + m) % m
}

/**
 * Returns the variance of an array of numbers.
 *
 * Defaults to the **population** variance (divide by `n`). Pass
 * `{ sample: true }` for the sample variance (Bessel's correction, `n - 1`) —
 * the right choice when the values are a sample drawn from a larger population,
 * such as a volatility estimate.
 *
 * @example
 * ```typescript
 * variance([2, 4, 4, 4, 5, 5, 7, 9]) // 4
 * variance([2, 4, 4, 4, 5, 5, 7, 9], { sample: true }) // 4.571428...
 * ```
 *
 * @param numbers The array of numbers.
 * @param options `sample` divides by `n - 1` instead of `n`.
 * @returns The variance, or 0 when there are too few values (empty array, or a
 * single value with `sample: true`).
 */
export function variance(numbers: number[], options: { sample?: boolean } = {}): number {
	const divisor = options.sample ? numbers.length - 1 : numbers.length
	if (divisor <= 0) return 0
	const mean = average(numbers)
	return sum(numbers.map((n) => (n - mean) ** 2)) / divisor
}

/**
 * Returns the standard deviation of an array of numbers — the square root of
 * {@link variance}, with the same population/sample choice.
 *
 * @example
 * ```typescript
 * stdDev([2, 4, 4, 4, 5, 5, 7, 9]) // 2
 * stdDev([2, 4, 4, 4, 5, 5, 7, 9], { sample: true }) // 2.13808...
 * ```
 *
 * @param numbers The array of numbers.
 * @param options `sample` divides by `n - 1` instead of `n`.
 * @returns The standard deviation, or 0 when there are too few values.
 */
export function stdDev(numbers: number[], options: { sample?: boolean } = {}): number {
	return Math.sqrt(variance(numbers, options))
}

/**
 * Returns the median of an array of numbers. Even-length inputs return the mean
 * of the two middle values. The input array is not mutated.
 *
 * @example
 * ```typescript
 * median([3, 1, 2]) // 2
 * median([4, 1, 3, 2]) // 2.5
 * ```
 *
 * @param numbers The array of numbers.
 * @returns The median, or 0 if the array is empty.
 */
export function median(numbers: number[]): number {
	return percentile(numbers, 50)
}

/**
 * Returns the `p`th percentile of an array of numbers using **linear
 * interpolation between closest ranks** (the R-7 method, matching Excel's
 * `PERCENTILE.INC` and NumPy's default): the value at position
 * `(n - 1) * p / 100` in the sorted values, interpolated between neighbours.
 * The input array is not mutated.
 *
 * @example
 * ```typescript
 * percentile([1, 2, 3, 4], 50) // 2.5
 * percentile([1, 2, 3, 4], 25) // 1.75
 * percentile([1, 2, 3, 4], 100) // 4
 * ```
 *
 * @param numbers The array of numbers.
 * @param p The percentile to compute, 0–100 (clamped).
 * @returns The percentile value, or 0 if the array is empty.
 */
export function percentile(numbers: number[], p: number): number {
	if (numbers.length === 0) return 0
	const sorted = [...numbers].sort((a, b) => a - b)
	const rank = ((sorted.length - 1) * clamp(p, 0, 100)) / 100
	const low = Math.floor(rank)
	// rank is within [0, length - 1], so both lookups are in bounds
	const lower = sorted[low] as number
	const upper = sorted[Math.ceil(rank)] as number
	return lower + (upper - lower) * (rank - low)
}
