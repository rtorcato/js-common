import { describe, expect, it } from 'vitest'
import { base64Decode, base64Encode, hashString, hmacHash, randomHex } from './index'

describe('crypto module', () => {
	it('hashString hashes a string with sha256 by default', async () => {
		expect(await hashString('hello')).toBe(
			'2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824'
		)
	})

	it('hashString supports other SHA algorithms', async () => {
		expect(await hashString('hello', 'sha1')).toBe('aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d')
		expect(await hashString('hello', 'sha512')).toHaveLength(128)
	})

	it('hashString rejects md5, which Web Crypto does not support', async () => {
		await expect(hashString('hello', 'md5' as never)).rejects.toThrow()
	})

	it('randomHex returns a hex string of correct length', () => {
		expect(randomHex(8)).toMatch(/^[a-f0-9]{16}$/)
		expect(randomHex()).toHaveLength(32)
	})

	it('hmacHash matches the RFC 4231 test case 2 vector', async () => {
		expect(await hmacHash('what do ya want for nothing?', 'Jefe')).toBe(
			'5bdcc146bf60754e6a042426089575c75a003f089d2739839dec58b964ec3843'
		)
	})

	it('base64Encode/base64Decode roundtrip, including non-ASCII', () => {
		for (const str of ['hello world!', 'héllo — 🌍']) {
			expect(base64Decode(base64Encode(str))).toBe(str)
		}
		expect(base64Encode('héllo')).toBe('aMOpbGxv')
	})

	it('base64Decode decodes known base64', () => {
		expect(base64Decode('aGVsbG8=')).toBe('hello')
	})
})
