import { describe, expect, it } from 'vitest'
import { containsHtml, escapeHtml, stripHtmlTags, textToHtml, unescapeHtml } from './index'

describe('html module', () => {
	it('escapeHtml escapes special HTML characters', () => {
		expect(escapeHtml('<div>"&\'')).toBe('&lt;div&gt;&quot;&amp;&#39;')
		expect(escapeHtml('plain')).toBe('plain')
	})

	it('unescapeHtml unescapes HTML entities', () => {
		expect(unescapeHtml('&lt;div&gt;&quot;&amp;&#39;')).toBe('<div>"&\'')
		expect(unescapeHtml('plain')).toBe('plain')
	})

	it('unescapeHtml decodes the entities the strings copy used to own', () => {
		expect(unescapeHtml('&#x27;&#x2F;&nbsp;')).toBe("'/ ")
	})

	it('stripHtmlTags removes all HTML tags', () => {
		expect(stripHtmlTags('<div>Hello <b>world</b>!</div>')).toBe('Hello world!')
		expect(stripHtmlTags('no tags')).toBe('no tags')
	})

	it('stripHtmlTags matches what /<[^>]*>/g did on ragged input', () => {
		const cases = ['<<a>script>', '<scr<x>ipt>', 'a<b', '<<<', '<>', 'a>b<c>d', '']
		for (const input of cases) {
			expect(stripHtmlTags(input)).toBe(input.replace(/<[^>]*>/g, ''))
		}
	})

	it('stripHtmlTags leaves nothing a second pass would strip', () => {
		for (const input of ['<<a>script>', '<scr<x>ipt>', '<a<b>c>']) {
			const once = stripHtmlTags(input)
			expect(stripHtmlTags(once)).toBe(once)
		}
	})

	it('textToHtml converts newlines to <br>', () => {
		expect(textToHtml('a\nb\nc')).toBe('a<br>b<br>c')
		expect(textToHtml('no newlines')).toBe('no newlines')
	})

	it('containsHtml detects HTML tags', () => {
		expect(containsHtml('<div>')).toBe(true)
		expect(containsHtml('plain')).toBe(false)
		expect(containsHtml('a <b>bold</b> word')).toBe(true)
	})

	it('containsHtml matches what /<[^>]+>/ did on ragged input', () => {
		const cases = ['<>', '<><a>', '<<>', '<a<b>', 'a<b', '<<<', '']
		for (const input of cases) {
			expect(containsHtml(input)).toBe(/<[^>]+>/.test(input))
		}
	})
})
