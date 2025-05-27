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

	it('stripHtmlTags removes all HTML tags', () => {
		expect(stripHtmlTags('<div>Hello <b>world</b>!</div>')).toBe('Hello world!')
		expect(stripHtmlTags('no tags')).toBe('no tags')
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
})
