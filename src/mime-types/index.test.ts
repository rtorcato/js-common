import { describe, expect, it } from 'vitest'
import { extensions, lookup, types } from './index'

describe('mime-types module', () => {
	it('lookup returns correct MIME type for extension', () => {
		expect(lookup('file.txt')).toBe('text/plain')
		expect(lookup('file.html')).toBe('text/html')
		expect(lookup('file.json')).toBe('application/json')
		expect(lookup('file.unknownext')).toBe(false)
		expect(lookup('')).toBe(false)
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		expect(lookup(undefined as any)).toBe(false)
	})

	it('lookup works with just extension', () => {
		expect(lookup('txt')).toBe('text/plain')
		expect(lookup('.html')).toBe('text/html')
	})

	it('types and extensions maps are populated', () => {
		expect(types['txt']).toBe('text/plain')
		expect(Array.isArray(extensions['text/plain'])).toBe(true)
		expect(extensions['text/plain']).toContain('txt')
	})
})
