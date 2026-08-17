import { describe, expect, it } from 'vitest'
import { deepMerge, isPlainObject, omit, pick } from './index'

describe('isPlainObject', () => {
	it('returns true for plain objects', () => {
		expect(isPlainObject({})).toBe(true)
		expect(isPlainObject({ a: 1 })).toBe(true)
	})
	it('returns false for arrays, null, functions, and primitives', () => {
		expect(isPlainObject([])).toBe(false)
		expect(isPlainObject(null)).toBe(false)
		expect(isPlainObject(() => {})).toBe(false)
		expect(isPlainObject(123)).toBe(false)
		expect(isPlainObject('str')).toBe(false)
	})
})

describe('deepMerge', () => {
	it('merges two objects deeply', () => {
		const a = { a: 1, b: { c: 2 } }
		const b = { b: { d: 3 }, e: 4 }
		expect(deepMerge(a, b)).toEqual({ a: 1, b: { c: 2, d: 3 }, e: 4 })
	})
	it('does not mutate inputs', () => {
		const a = { a: 1, b: { c: 2 } }
		const b = { b: { d: 3 } }
		const merged = deepMerge(a, b)
		expect(a).toEqual({ a: 1, b: { c: 2 } })
		expect(b).toEqual({ b: { d: 3 } })
		expect(merged).not.toBe(a)
		expect(merged).not.toBe(b)
	})
})

describe('omit', () => {
	it('omits specified keys', () => {
		expect(omit({ a: 1, b: 2, c: 3 }, ['b', 'c'])).toEqual({ a: 1 })
	})
})

describe('pick', () => {
	it('picks only specified keys', () => {
		expect(pick({ a: 1, b: 2, c: 3 }, ['b', 'c'])).toEqual({ b: 2, c: 3 })
	})
})
