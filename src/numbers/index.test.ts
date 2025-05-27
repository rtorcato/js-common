import { describe, expect, it } from 'vitest'
import {
	average,
	between,
	clamp,
	getRandomFloat,
	getRandomInt,
	isFiniteNumber,
	isInteger,
	mod,
	roundTo,
	sum,
} from './index'

describe('getRandomInt', () => {
	it('returns an int in the range [min, max]', () => {
		for (let i = 0; i < 100; i++) {
			const n = getRandomInt(1, 3)
			expect(n).toBeGreaterThanOrEqual(1)
			expect(n).toBeLessThanOrEqual(3)
			expect(Number.isInteger(n)).toBe(true)
		}
	})
})

describe('clamp', () => {
	it('clamps a value between min and max', () => {
		expect(clamp(5, 1, 10)).toBe(5)
		expect(clamp(0, 1, 10)).toBe(1)
		expect(clamp(20, 1, 10)).toBe(10)
	})
})

describe('roundTo', () => {
	it('rounds to the specified number of decimals', () => {
		expect(roundTo(1.2345, 2)).toBe(1.23)
		expect(roundTo(1.2355, 2)).toBe(1.24)
		expect(roundTo(1.2, 0)).toBe(1)
	})
})

describe('isFiniteNumber', () => {
	it('returns true for finite numbers', () => {
		expect(isFiniteNumber(1)).toBe(true)
		expect(isFiniteNumber(-1)).toBe(true)
		expect(isFiniteNumber(0)).toBe(true)
		expect(isFiniteNumber(Number.POSITIVE_INFINITY)).toBe(false)
		expect(isFiniteNumber(Number.NaN)).toBe(false)
		expect(isFiniteNumber('1')).toBe(false)
	})
})

describe('getRandomFloat', () => {
	it('returns a float in the range [min, max)', () => {
		for (let i = 0; i < 100; i++) {
			const n = getRandomFloat(1, 2)
			expect(n).toBeGreaterThanOrEqual(1)
			expect(n).toBeLessThan(2)
		}
	})
})

describe('isInteger', () => {
	it('returns true for integers', () => {
		expect(isInteger(1)).toBe(true)
		expect(isInteger(0)).toBe(true)
		expect(isInteger(-1)).toBe(true)
		expect(isInteger(1.1)).toBe(false)
		expect(isInteger('1')).toBe(false)
	})
})

describe('between', () => {
	it('checks if a value is between min and max', () => {
		expect(between(5, 1, 10)).toBe(true)
		expect(between(1, 1, 10)).toBe(true)
		expect(between(10, 1, 10)).toBe(true)
		expect(between(0, 1, 10)).toBe(false)
		expect(between(11, 1, 10)).toBe(false)
		expect(between(5, 1, 10, false)).toBe(true)
		expect(between(1, 1, 10, false)).toBe(false)
		expect(between(10, 1, 10, false)).toBe(false)
	})
})

describe('sum', () => {
	it('returns the sum of an array', () => {
		expect(sum([1, 2, 3])).toBe(6)
		expect(sum([])).toBe(0)
	})
})

describe('average', () => {
	it('returns the average of an array', () => {
		expect(average([1, 2, 3])).toBe(2)
		expect(average([])).toBe(0)
	})
})

describe('mod', () => {
	it('returns the true mathematical modulus', () => {
		expect(mod(5, 3)).toBe(2)
		expect(mod(-5, 3)).toBe(1)
		expect(mod(5, -3)).toBe(-1)
		expect(mod(-5, -3)).toBe(-2)
	})
})
