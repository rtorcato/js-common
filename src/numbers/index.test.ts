import { describe, expect, it } from 'vitest'
import {
	average,
	between,
	clamp,
	formatPercent,
	median,
	mod,
	percentile,
	roundTo,
	stdDev,
	sum,
	variance,
} from './index'

describe('formatPercent', () => {
	it('formats a decimal as percent', () => {
		expect(formatPercent(0.25)).toBe('25%')
		expect(formatPercent(1)).toBe('100%')
	})
	it('respects fractionDigits', () => {
		expect(formatPercent(0.1234, 2)).toBe('12.34%')
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

describe('variance', () => {
	it('returns the population variance by default', () => {
		expect(variance([2, 4, 4, 4, 5, 5, 7, 9])).toBe(4)
	})
	it('divides by n - 1 with sample: true', () => {
		expect(variance([2, 4, 4, 4, 5, 5, 7, 9], { sample: true })).toBeCloseTo(32 / 7, 10)
	})
	it('returns 0 when there are too few values', () => {
		expect(variance([])).toBe(0)
		expect(variance([5])).toBe(0)
		expect(variance([5], { sample: true })).toBe(0)
	})
})

describe('stdDev', () => {
	it('is the square root of the variance', () => {
		expect(stdDev([2, 4, 4, 4, 5, 5, 7, 9])).toBe(2)
		expect(stdDev([2, 4, 4, 4, 5, 5, 7, 9], { sample: true })).toBeCloseTo(Math.sqrt(32 / 7), 10)
	})
	it('returns 0 for an empty array', () => {
		expect(stdDev([])).toBe(0)
	})
})

describe('median', () => {
	it('returns the middle value of an odd-length array', () => {
		expect(median([3, 1, 2])).toBe(2)
	})
	it('averages the two middle values of an even-length array', () => {
		expect(median([4, 1, 3, 2])).toBe(2.5)
	})
	it('does not mutate the input', () => {
		const input = [3, 1, 2]
		median(input)
		expect(input).toEqual([3, 1, 2])
	})
	it('returns 0 for an empty array', () => {
		expect(median([])).toBe(0)
	})
})

describe('percentile', () => {
	it('interpolates linearly between closest ranks', () => {
		expect(percentile([1, 2, 3, 4], 25)).toBe(1.75)
		expect(percentile([1, 2, 3, 4], 50)).toBe(2.5)
		expect(percentile([1, 2, 3, 4], 75)).toBe(3.25)
	})
	it('returns the bounds at 0 and 100', () => {
		expect(percentile([4, 1, 3, 2], 0)).toBe(1)
		expect(percentile([4, 1, 3, 2], 100)).toBe(4)
	})
	it('clamps p to 0-100', () => {
		expect(percentile([1, 2, 3, 4], -10)).toBe(1)
		expect(percentile([1, 2, 3, 4], 150)).toBe(4)
	})
	it('returns 0 for an empty array', () => {
		expect(percentile([], 50)).toBe(0)
	})
})
