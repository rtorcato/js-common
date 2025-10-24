import { describe, expect, it } from 'vitest'
import { deepCloneJson, isValidJson, safeJsonParse, safeJsonStringify } from './index'

describe('json module', () => {
	it('safeJsonParse parses valid JSON', () => {
		expect(safeJsonParse('{"a":1}')).toEqual({ a: 1 })
	})

	it('safeJsonParse returns fallback on invalid JSON', () => {
		expect(safeJsonParse('not json', { fallback: true })).toEqual({ fallback: true })
		expect(safeJsonParse('not json')).toBeNull()
	})

	it('safeJsonStringify stringifies objects', () => {
		expect(safeJsonStringify({ a: 1 })).toBe('{"a":1}')
	})

	it('safeJsonStringify returns fallback on error', () => {
		const circular: any = {}
		circular.self = circular
		expect(safeJsonStringify(circular, 'oops')).toBe('oops')
		expect(safeJsonStringify(circular)).toBeNull()
	})

	it('isValidJson returns true for valid JSON', () => {
		expect(isValidJson('{"a":1}')).toBe(true)
		expect(isValidJson('123')).toBe(true)
		expect(isValidJson('null')).toBe(true)
	})

	it('isValidJson returns false for invalid JSON', () => {
		expect(isValidJson('{a:1}')).toBe(false)
		expect(isValidJson('not json')).toBe(false)
	})

	it('deepCloneJson clones objects deeply', () => {
		const obj = { a: 1, b: { c: 2 } }
		const clone = deepCloneJson(obj)
		expect(clone).toEqual(obj)
		expect(clone).not.toBe(obj)
		expect(clone.b).not.toBe(obj.b)
	})
})
