/**
 * Add two numbers.
 *
 * @example
 * ```typescript
 * add(1, 2) // 3
 * add(-1, 1) // 0
 * ```
 *
 * @param {number} a
 * @param {number} b
 * @returns {number} number
 */
export const add = (a: number, b: number): number => a + b

/**
 * Subtract two numbers.
 *
 * @example
 * ```typescript
 * subtract(2, 1) // 1
 * subtract(1, 2) // -1
 * ```
 *
 * @param {number} a
 * @param {number} b
 * @returns {number} number
 */
export const subtract = (a: number, b: number): number => a - b

/**
 * Multiply two numbers.
 *
 * @example
 * ```typescript
 * multiply(2, 2) // 4
 * multiply(3, 0) // 0
 * ```
 *
 * @param {number} a
 * @param {number} b
 * @returns {number} number
 */
export const multiply = (a: number, b: number): number => a * b

/**
 * Divide two numbers.
 *
 * @example
 * ```typescript
 * divide(4, 2) // 2
 * divide(1, 0) // Infinity
 * ```
 *
 * @param {number} a
 * @param {number} b
 * @returns {number} number
 */
export const divide = (a: number, b: number): number => a / b
