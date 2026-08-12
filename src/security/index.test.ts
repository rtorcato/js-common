import { describe, expect, it } from 'vitest'
import { generateSecureToken, isStrongPassword, stripScriptish } from './index'

describe('security module', () => {
	it('stripScriptish removes script tags and event handlers', () => {
		expect(stripScriptish('<script>alert(1)</script>hello')).toBe('hello')
		expect(stripScriptish('<div onclick="evil()">hi</div>')).toBe('<div>hi</div>')
		expect(stripScriptish('<a href="#" onmouseover="bad()">link</a>')).toBe('<a href="#">link</a>')
		expect(stripScriptish('plain')).toBe('plain')
	})

	it('stripScriptish handles what the old regexes missed', () => {
		// js/bad-tag-filter: `</script >` is a valid end tag.
		expect(stripScriptish('<script>bad()</script >tail')).toBe('tail')
		// Attributes on the opening tag.
		expect(stripScriptish('<script type="text/javascript">bad()</script>')).toBe('')
		// An unquoted handler value needs no quotes to fire.
		expect(stripScriptish('<img src=x onerror=alert(1)>')).toBe('<img src=x>')
		// Single quotes.
		expect(stripScriptish("<div onclick='evil()'>hi</div>")).toBe('<div>hi</div>')
		// `<scriptural>` is not a script tag — `\b` keeps it.
		expect(stripScriptish('<scriptural>text</scriptural>')).toBe('<scriptural>text</scriptural>')
	})

	it('stripScriptish is bypassable, as documented', () => {
		// The executable record of the ceiling. A blocklist over two shapes leaves
		// everything it does not name, so this is XSS that survives the function
		// untouched. Asserted here so the weakness stays visible in the repo even
		// though CodeQL no longer reports it against an index scan.
		expect(stripScriptish('<a href="javascript:alert(1)">x</a>')).toBe(
			'<a href="javascript:alert(1)">x</a>'
		)
		// Nesting the pattern inside itself also defeats the single pass.
		expect(stripScriptish('<scr<script>ipt>alert(1)</scr</script>ipt>')).toBe('<script>')
	})

	it('stripScriptish stays linear on the CodeQL blowup inputs', () => {
		// js/polynomial-redos alert #11: '<script' repeated, and '<script>' then
		// many '>'. Quadratic backtracking made the first of these take 9.8s; the
		// index scan does both in ~2ms. Generous bound — this catches a return to
		// quadratic, not a slowdown.
		const start = performance.now()
		stripScriptish('<script'.repeat(40_000))
		stripScriptish(`<script>${'>'.repeat(40_000)}`)
		expect(performance.now() - start).toBeLessThan(1_000)
	})

	it('isStrongPassword validates strong passwords', () => {
		expect(isStrongPassword('Abcdef1!')).toBe(true)
		expect(isStrongPassword('A1!bcdef')).toBe(true)
		expect(isStrongPassword('abcdefg')).toBe(false)
		expect(isStrongPassword('ABCDEFGH')).toBe(false)
		expect(isStrongPassword('12345678')).toBe(false)
		expect(isStrongPassword('Abcdefgh')).toBe(false)
		expect(isStrongPassword('Abcdef1')).toBe(false)
		expect(isStrongPassword('Abcdef!')).toBe(false)
		expect(isStrongPassword('')).toBe(false)
	})

	it('generateSecureToken returns a hex string of correct length', () => {
		const token = generateSecureToken(8)
		expect(typeof token).toBe('string')
		expect(token.length).toBe(16) // 8 bytes = 16 hex chars
		expect(token).toMatch(/^[a-f0-9]+$/i)
	})
})
