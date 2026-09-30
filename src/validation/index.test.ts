import { describe, expect, it } from 'vitest'
import { isArray, isBoolean, isDefined, isNumber, isObject, isString } from './index'

describe('validation utils', () => {
	it('isDefined', () => {
		expect(isDefined(0)).toBe(true)
		expect(isDefined('')).toBe(true)
		expect(isDefined(false)).toBe(true)
		expect(isDefined(null)).toBe(false)
		expect(isDefined(undefined)).toBe(false)
	})

	it('isString', () => {
		expect(isString('hello')).toBe(true)
		expect(isString(123)).toBe(false)
		expect(isString({})).toBe(false)
	})

	it('isNumber', () => {
		expect(isNumber(123)).toBe(true)
		expect(isNumber(Number.NaN)).toBe(false)
		expect(isNumber('123')).toBe(false)
	})

	it('isBoolean', () => {
		expect(isBoolean(true)).toBe(true)
		expect(isBoolean(false)).toBe(true)
		expect(isBoolean(0)).toBe(false)
	})

	it('isArray', () => {
		expect(isArray([])).toBe(true)
		expect(isArray([1, 2, 3])).toBe(true)
		expect(isArray('not array')).toBe(false)
	})

	it('isObject', () => {
		expect(isObject({})).toBe(true)
		expect(isObject({ a: 1 })).toBe(true)
		expect(isObject([])).toBe(false)
		expect(isObject(null)).toBe(false)
	})
})
