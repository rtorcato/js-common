import * as fc from 'fast-check'
import { describe, expect, it } from 'vitest'
import { between, clamp, max, min, sum } from './index'

describe('numbers — properties', () => {
	it('clamp result is always inside [min, max]', () => {
		fc.assert(
			fc.property(fc.integer(), fc.integer(), fc.integer(), (value, a, b) => {
				const lo = Math.min(a, b)
				const hi = Math.max(a, b)
				const out = clamp(value, lo, hi)
				expect(out).toBeGreaterThanOrEqual(lo)
				expect(out).toBeLessThanOrEqual(hi)
			})
		)
	})

	it('clamp is the identity when the value is already in range', () => {
		fc.assert(
			fc.property(
				fc.integer({ min: -1_000, max: 1_000 }),
				fc.integer({ min: -1_000, max: 1_000 }),
				(a, b) => {
					const lo = Math.min(a, b)
					const hi = Math.max(a, b)
					const inside = lo + (hi - lo) / 2
					expect(clamp(inside, lo, hi)).toBe(inside)
				}
			)
		)
	})

	it('sum equals the native reducer', () => {
		fc.assert(
			fc.property(fc.array(fc.integer({ min: -1_000_000, max: 1_000_000 })), (arr) => {
				expect(sum(arr)).toBe(arr.reduce((a, b) => a + b, 0))
			})
		)
	})

	it('min/max bound every element of a non-empty array', () => {
		fc.assert(
			fc.property(fc.array(fc.integer(), { minLength: 1 }), (arr) => {
				const lo = min(arr)
				const hi = max(arr)
				for (const v of arr) {
					expect(v).toBeGreaterThanOrEqual(lo)
					expect(v).toBeLessThanOrEqual(hi)
				}
			})
		)
	})

	it('between(value, lo, hi) — clamp result is always inside the inclusive range', () => {
		fc.assert(
			fc.property(fc.integer(), fc.integer(), fc.integer(), (value, a, b) => {
				const lo = Math.min(a, b)
				const hi = Math.max(a, b)
				const inside = clamp(value, lo, hi)
				expect(between(inside, lo, hi)).toBe(true)
			})
		)
	})

	it('between is false at the endpoints when inclusive=false', () => {
		fc.assert(
			fc.property(
				fc.integer({ min: -1000, max: 1000 }),
				fc.integer({ min: 1, max: 1000 }),
				(lo, span) => {
					const hi = lo + span
					expect(between(lo, lo, hi, false)).toBe(false)
					expect(between(hi, lo, hi, false)).toBe(false)
				}
			)
		)
	})
})
