import * as fc from 'fast-check'
import { describe, expect, it } from 'vitest'
import { chunk, partition, sortBy, unique } from './index'

describe('arrays — properties', () => {
	it('unique is idempotent', () => {
		fc.assert(
			fc.property(fc.array(fc.integer()), (arr) => {
				expect(unique(unique(arr))).toEqual(unique(arr))
			})
		)
	})

	it('unique preserves the first occurrence of every element', () => {
		fc.assert(
			fc.property(fc.array(fc.integer()), (arr) => {
				const set = new Set(arr)
				expect(unique(arr).length).toBe(set.size)
				for (const v of unique(arr)) expect(set.has(v)).toBe(true)
			})
		)
	})

	it('chunk flattens back to the original (when size > 0)', () => {
		fc.assert(
			fc.property(fc.array(fc.integer()), fc.integer({ min: 1, max: 50 }), (arr, size) => {
				expect(chunk(arr, size).flat()).toEqual(arr)
			})
		)
	})

	it('partition halves recombine to the original length', () => {
		fc.assert(
			fc.property(fc.array(fc.integer()), (arr) => {
				const [pass, fail] = partition(arr, (n) => n % 2 === 0)
				expect(pass.length + fail.length).toBe(arr.length)
				expect(pass.every((n) => n % 2 === 0)).toBe(true)
				expect(fail.every((n) => n % 2 !== 0)).toBe(true)
			})
		)
	})

	it('sortBy is a permutation in non-decreasing key order', () => {
		fc.assert(
			fc.property(fc.array(fc.integer()), (arr) => {
				const sorted = sortBy(arr, (n) => n)
				expect(sorted.length).toBe(arr.length)
				expect([...sorted].sort((a, b) => a - b)).toEqual(sorted)
				expect(unique(sorted).sort((a, b) => a - b)).toEqual(unique(arr).sort((a, b) => a - b))
			})
		)
	})
})
