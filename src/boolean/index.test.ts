import { describe, expect, it } from 'vitest'
import { and, not, or, toBoolean, xor } from './index'

describe('toBoolean', () => {
	it('converts various values to boolean', () => {
		expect(toBoolean(true)).toBe(true)
		expect(toBoolean(false)).toBe(false)
		expect(toBoolean('true')).toBe(true)
		expect(toBoolean('1')).toBe(true)
		expect(toBoolean('false')).toBe(false)
		expect(toBoolean('0')).toBe(false)
		expect(toBoolean(1)).toBe(true)
		expect(toBoolean(0)).toBe(false)
		expect(toBoolean('yes')).toBe(true)
		expect(toBoolean('')).toBe(false)
		expect(toBoolean(null)).toBe(false)
		expect(toBoolean(undefined)).toBe(false)
	})
})

describe('xor', () => {
	it('returns true if exactly one is true', () => {
		expect(xor(true, false)).toBe(true)
		expect(xor(false, true)).toBe(true)
		expect(xor(true, true)).toBe(false)
		expect(xor(false, false)).toBe(false)
	})
})

describe('and', () => {
	it('returns true if both are true', () => {
		expect(and(true, true)).toBe(true)
		expect(and(true, false)).toBe(false)
		expect(and(false, true)).toBe(false)
		expect(and(false, false)).toBe(false)
	})
})

describe('or', () => {
	it('returns true if either is true', () => {
		expect(or(true, true)).toBe(true)
		expect(or(true, false)).toBe(true)
		expect(or(false, true)).toBe(true)
		expect(or(false, false)).toBe(false)
	})
})

describe('not', () => {
	it('returns the negation', () => {
		expect(not(true)).toBe(false)
		expect(not(false)).toBe(true)
	})
})
