import { describe, expect, it } from 'vitest'
import {
	arrayToSet,
	difference,
	intersection,
	isSubset,
	isSuperset,
	setToArray,
	union,
} from './index'

describe('sets module', () => {
	it('union returns the union of two sets', () => {
		const a = new Set([1, 2, 3])
		const b = new Set([3, 4, 5])
		expect(union(a, b)).toEqual(new Set([1, 2, 3, 4, 5]))
	})

	it('intersection returns the intersection of two sets', () => {
		const a = new Set([1, 2, 3])
		const b = new Set([2, 3, 4])
		expect(intersection(a, b)).toEqual(new Set([2, 3]))
	})

	it('difference returns the difference of two sets', () => {
		const a = new Set([1, 2, 3])
		const b = new Set([2, 4])
		expect(difference(a, b)).toEqual(new Set([1, 3]))
	})

	it('isSubset returns true if a is a subset of b', () => {
		const a = new Set([1, 2])
		const b = new Set([1, 2, 3])
		expect(isSubset(a, b)).toBe(true)
		expect(isSubset(b, a)).toBe(false)
	})

	it('isSuperset returns true if a is a superset of b', () => {
		const a = new Set([1, 2, 3])
		const b = new Set([2, 3])
		expect(isSuperset(a, b)).toBe(true)
		expect(isSuperset(b, a)).toBe(false)
	})

	it('setToArray converts a set to an array', () => {
		const s = new Set([1, 2, 3])
		expect(setToArray(s)).toEqual([1, 2, 3])
	})

	it('arrayToSet converts an array to a set', () => {
		const arr = [1, 2, 2, 3]
		expect(arrayToSet(arr)).toEqual(new Set([1, 2, 3]))
	})
})
