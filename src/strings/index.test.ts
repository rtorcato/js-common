import { describe, expect, it } from 'vitest'
import {
	camelCase,
	capitalize,
	escapeHtml,
	isBlank,
	kebabCase,
	mask,
	ordinalize,
	padEnd,
	padStart,
	pluralize,
	randomString,
	replaceString,
	reverse,
	sanitizeString,
	slugify,
	snakeCase,
	stripHtml,
	template,
	titleCase,
	truncate,
	unescapeHtml,
	wordCount,
	words,
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

describe('reverse', () => {
	it('reverses a string', () => {
		expect(reverse('hello')).toBe('olleh')
		expect(reverse('abc123')).toBe('321cba')
		expect(reverse('')).toBe('')
	})
})

describe('slugify', () => {
	it('converts to URL-friendly slug', () => {
		expect(slugify('Hello World!')).toBe('hello-world')
		expect(slugify('Café & Résumé')).toBe('cafe-resume')
		expect(slugify('  Multiple   Spaces  ')).toBe('multiple-spaces')
		expect(slugify('Test--String')).toBe('test-string')
	})
})

describe('words', () => {
	it('splits string into words', () => {
		expect(words('hello world')).toEqual(['hello', 'world'])
		expect(words('camelCaseString')).toEqual(['camel', 'Case', 'String'])
		expect(words('hello-world_test')).toEqual(['hello', 'world', 'test'])
		expect(words('')).toEqual([])
	})
})

describe('wordCount', () => {
	it('counts words in a string', () => {
		expect(wordCount('hello world')).toBe(2)
		expect(wordCount('  one  two  three  ')).toBe(3)
		expect(wordCount('')).toBe(0)
		expect(wordCount('   ')).toBe(0)
	})
})

describe('escapeHtml', () => {
	it('escapes HTML special characters', () => {
		expect(escapeHtml('<div>')).toBe('&lt;div&gt;')
		expect(escapeHtml('a & b')).toBe('a &amp; b')
		expect(escapeHtml('"quoted"')).toBe('&quot;quoted&quot;')
		expect(escapeHtml("it's")).toBe('it&#39;s')
	})
})

describe('unescapeHtml', () => {
	it('unescapes HTML entities', () => {
		expect(unescapeHtml('&lt;div&gt;')).toBe('<div>')
		expect(unescapeHtml('&amp;&quot;&#39;')).toBe('&"\'')
		expect(unescapeHtml('&nbsp;')).toBe(' ')
	})
})

describe('stripHtml', () => {
	it('removes all HTML tags', () => {
		expect(stripHtml('<p>Hello <b>World</b></p>')).toBe('Hello World')
		expect(stripHtml('<script>alert(1)</script>Text')).toBe('alert(1)Text')
		expect(stripHtml('No tags')).toBe('No tags')
	})
})

describe('pluralize', () => {
	it('returns singular for count of 1', () => {
		expect(pluralize('item', 1)).toBe('item')
	})
	it('returns plural for other counts', () => {
		expect(pluralize('item', 0)).toBe('items')
		expect(pluralize('item', 5)).toBe('items')
	})
	it('uses custom plural form', () => {
		expect(pluralize('box', 2, 'boxes')).toBe('boxes')
		expect(pluralize('child', 3, 'children')).toBe('children')
	})
})

describe('ordinalize', () => {
	it('converts numbers to ordinals', () => {
		expect(ordinalize(1)).toBe('1st')
		expect(ordinalize(2)).toBe('2nd')
		expect(ordinalize(3)).toBe('3rd')
		expect(ordinalize(4)).toBe('4th')
		expect(ordinalize(11)).toBe('11th')
		expect(ordinalize(12)).toBe('12th')
		expect(ordinalize(13)).toBe('13th')
		expect(ordinalize(21)).toBe('21st')
		expect(ordinalize(22)).toBe('22nd')
		expect(ordinalize(23)).toBe('23rd')
		expect(ordinalize(100)).toBe('100th')
		expect(ordinalize(101)).toBe('101st')
	})
})

describe('isBlank', () => {
	it('returns true for empty or whitespace strings', () => {
		expect(isBlank('')).toBe(true)
		expect(isBlank('   ')).toBe(true)
		expect(isBlank('\t\n')).toBe(true)
	})
	it('returns false for non-blank strings', () => {
		expect(isBlank('hello')).toBe(false)
		expect(isBlank(' a ')).toBe(false)
	})
})

describe('mask', () => {
	it('masks part of a string', () => {
		expect(mask('1234567890', 0, 6)).toBe('******7890')
		expect(mask('1234567890', 6, 10)).toBe('123456****')
		expect(mask('secret', 0, 3, 'X')).toBe('XXXret')
		expect(mask('4111111111111111', 0, 12)).toBe('************1111')
	})
	it('handles edge cases', () => {
		expect(mask('hello', 5, 10)).toBe('hello') // end beyond string length, clamped
		expect(mask('hello', -5, 2)).toBe('**llo')
		expect(mask('hello', 3, 3)).toBe('hello') // start === end, no masking
	})
})

describe('template', () => {
	it('interpolates values from data object', () => {
		expect(template('Hello, ${name}!', { name: 'World' })).toBe('Hello, World!')
		expect(template('${a} + ${b} = ${c}', { a: 1, b: 2, c: 3 })).toBe('1 + 2 = 3')
	})
	it('keeps placeholders for missing keys', () => {
		expect(template('Missing ${key}', {})).toBe('Missing ${key}')
	})
	it('handles empty template', () => {
		expect(template('', { name: 'test' })).toBe('')
	})
})
