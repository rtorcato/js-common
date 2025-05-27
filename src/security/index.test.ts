import { describe, expect, it } from 'vitest'
import { generateSecureToken, isStrongPassword, sanitizeString } from './index'

describe('security module', () => {
	it('sanitizeString removes script tags and event handlers', () => {
		expect(sanitizeString('<script>alert(1)</script>hello')).toBe('hello')
		expect(sanitizeString('<div onclick="evil()">hi</div>')).toBe('<div >hi</div>')
		expect(sanitizeString('<a href="#" onmouseover="bad()">link</a>')).toBe('<a href="#" >link</a>')
		expect(sanitizeString('plain')).toBe('plain')
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
