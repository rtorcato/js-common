import { describe, expect, it } from 'vitest'
import { invertMap, mapToObject, mapValues, mergeMaps, objectToMap } from '.'

describe('invertMap', () => {
	it('inverts a map', () => {
		const m = new Map([
			['a', 1],
			['b', 2],
		])
		const inv = invertMap(m)
		expect(inv.get(1)).toBe('a')
		expect(inv.get(2)).toBe('b')
	})
})

describe('mapValues', () => {
	it('maps values of a map', () => {
		const m = new Map([
			['a', 1],
			['b', 2],
		])
		const mapped = mapValues(m, (v) => v * 2)
		expect(mapped.get('a')).toBe(2)
		expect(mapped.get('b')).toBe(4)
	})
})

describe('mergeMaps', () => {
	it('merges multiple maps', () => {
		const m1 = new Map([['a', 1]])
		const m2 = new Map([['b', 2]])
		const m3 = new Map([['a', 3]])
		const merged = mergeMaps(m1, m2, m3)
		expect(merged.get('a')).toBe(3)
		expect(merged.get('b')).toBe(2)
	})
})

describe('objectToMap', () => {
	it('converts an object to a map', () => {
		const obj = { a: 1, b: 2 }
		const m = objectToMap(obj)
		expect(m.get('a')).toBe(1)
		expect(m.get('b')).toBe(2)
	})
})

describe('mapToObject', () => {
	it('converts a map to an object', () => {
		const m = new Map([
			['a', 1],
			['b', 2],
		])
		const obj = mapToObject(m)
		expect(obj).toEqual({ a: 1, b: 2 })
	})
})
