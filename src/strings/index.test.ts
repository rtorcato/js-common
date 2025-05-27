import { describe, expect, it } from 'vitest'
import {
	camelCase,
	capitalize,
	kebabCase,
	padEnd,
	padStart,
	randomString,
	replaceString,
	sanitizeString,
	snakeCase,
	titleCase,
	truncate,
} from './index'

describe('titleCase', () => {
	it('converts to title case', () => {
		expect(titleCase('hello world')).toBe('Hello World')
		expect(titleCase('foo BAR')).toBe('Foo Bar')
	})
})

describe('capitalize', () => {
	it('capitalizes the first letter', () => {
		expect(capitalize('hello')).toBe('Hello')
		expect(capitalize('')).toBe('')
	})
})

describe('camelCase', () => {
	it('converts to camelCase', () => {
		expect(camelCase('hello world')).toBe('helloWorld')
		expect(camelCase('foo-bar_baz')).toBe('fooBarBaz')
	})
})

describe('kebabCase', () => {
	it('converts to kebab-case', () => {
		expect(kebabCase('helloWorld')).toBe('hello-world')
		expect(kebabCase('foo_bar baz')).toBe('foo-bar-baz')
	})
})

describe('snakeCase', () => {
	it('converts to snake_case', () => {
		expect(snakeCase('helloWorld')).toBe('hello_world')
		expect(snakeCase('foo-bar baz')).toBe('foo_bar_baz')
	})
})

describe('truncate', () => {
	it('truncates and adds ellipsis if needed', () => {
		expect(truncate('hello world', 5)).toBe('hell…')
		expect(truncate('hi', 5)).toBe('hi')
	})
})

describe('padStart', () => {
	it('pads the start of a string', () => {
		expect(padStart('42', 5, '0')).toBe('00042')
	})
})

describe('padEnd', () => {
	it('pads the end of a string', () => {
		expect(padEnd('42', 5, '0')).toBe('42000')
	})
})

describe('randomString', () => {
	it('returns a string of the correct length', () => {
		const str = randomString(10, 'abc')
		expect(str.length).toBe(10)
		expect(/^[abc]+$/.test(str)).toBe(true)
	})
})

describe('replaceString', () => {
	it('replaces all occurrences', () => {
		expect(replaceString('foo bar foo', 'foo', 'baz')).toBe('baz bar baz')
	})
})

describe('sanitizeString', () => {
	it('removes script tags and event handlers', () => {
		expect(sanitizeString('<script>alert(1)</script><div onclick="foo()">x</div>')).toBe(
			'<div >x</div>'
		)
	})
})
