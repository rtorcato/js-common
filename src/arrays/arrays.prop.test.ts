import * as fc from 'fast-check'
import { describe, expect, it } from 'vitest'
import { chunk, unique } from './index'

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

	it('every chunk except possibly the last has exactly `size` elements', () => {
		fc.assert(
			fc.property(fc.array(fc.integer()), fc.integer({ min: 1, max: 50 }), (arr, size) => {
				const chunks = chunk(arr, size)
				// All but the last must be exactly `size`.
				for (const c of chunks.slice(0, -1)) {
					expect(c.length).toBe(size)
				}
				// The last (if any) is non-empty and <= size.
				const tail = chunks.at(-1)
				if (tail !== undefined) {
					expect(tail.length).toBeGreaterThan(0)
					expect(tail.length).toBeLessThanOrEqual(size)
				}
			})
		)
	})
})
