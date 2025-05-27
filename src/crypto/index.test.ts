import { describe, expect, it } from 'vitest'
import { base64Decode, base64Encode, hashString, hmacHash, randomHex } from './index'

describe('crypto module', () => {
	it('hashString hashes a string with sha256 by default', () => {
		const hash = hashString('hello')
		expect(typeof hash).toBe('string')
		expect(hash.length).toBe(64) // sha256 hex length
		expect(hash).toMatch(/^[a-f0-9]+$/i)
	})

	it('hashString supports other algorithms', () => {
		const hash = hashString('hello', 'md5')
		expect(hash.length).toBe(32) // md5 hex length
	})

	it('randomHex returns a hex string of correct length', () => {
		const hex = randomHex(8)
		expect(typeof hex).toBe('string')
		expect(hex.length).toBe(16) // 8 bytes = 16 hex chars
		expect(hex).toMatch(/^[a-f0-9]+$/i)
	})

	it('hmacHash creates a valid HMAC', () => {
		const hmac = hmacHash('data', 'secret')
		expect(typeof hmac).toBe('string')
		expect(hmac.length).toBe(64) // sha256 hex length
	})

	it('base64Encode/base64Decode roundtrip', () => {
		const str = 'hello world!'
		const b64 = base64Encode(str)
		expect(typeof b64).toBe('string')
		const decoded = base64Decode(b64)
		expect(decoded).toBe(str)
	})

	it('base64Decode decodes known base64', () => {
		expect(base64Decode('aGVsbG8=')).toBe('hello')
	})
})
