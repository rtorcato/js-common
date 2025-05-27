import { describe, expect, it } from 'vitest'
import { escapeRegExp, matchAll, replaceAllRegex, splitByRegex, testRegex } from './index'

describe('escapeRegExp', () => {
	it('escapes special regex characters', () => {
		expect(escapeRegExp('a.b*c?')).toBe('a\\.b\\*c\\?')
		expect(escapeRegExp('[test]')).toBe('\\[test\\]')
	})
})

describe('testRegex', () => {
	it('returns true if string matches pattern', () => {
		expect(testRegex('hello123', '\\d+')).toBe(true)
		expect(testRegex('hello', /\d+/)).toBe(false)
	})
})

describe('matchAll', () => {
	it('returns all matches of a pattern', () => {
		const matches = matchAll('a1b2c3', /\d/g)
		expect(matches.map((m) => m[0])).toEqual(['1', '2', '3'])
	})
	it('returns empty array if no matches', () => {
		expect(matchAll('abc', /\d/g)).toEqual([])
	})
})

describe('replaceAllRegex', () => {
	it('replaces all matches with a string', () => {
		expect(replaceAllRegex('foo1bar2', '\\d', 'X')).toBe('fooXbarX')
	})
	it('replaces all matches with a function', () => {
		expect(replaceAllRegex('a1b2', /\d/g, (m) => String(Number(m) * 2))).toBe('a2b4')
	})
})

describe('splitByRegex', () => {
	it('splits a string by a regex pattern', () => {
		expect(splitByRegex('a1b2c3', '\\d')).toEqual(['a', 'b', 'c', ''])
		expect(splitByRegex('foo,bar,baz', /,/)).toEqual(['foo', 'bar', 'baz'])
	})
})
