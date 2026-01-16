import { describe, expect, it } from 'vitest'
import * as uuid from './index'

// Helper: valid v4 UUID regex
const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

// Helper: valid v7 UUID regex (version digit is 7)
const UUID_V7_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

// Helper: nil UUID
const NIL_UUID = '00000000-0000-0000-0000-000000000000'

describe('uuid module', () => {
	it('getUUID() returns a valid v4 UUID', () => {
		const id = uuid.getUUID()
		expect(typeof id).toBe('string')
		expect(UUID_V4_REGEX.test(id)).toBe(true)
		expect(uuid.isUUID(id)).toBe(true)
		expect(uuid.isUUIDv4(id)).toBe(true)
	})

	it('getUUIDv7() returns a valid v7 UUID', () => {
		const id = uuid.getUUIDv7()
		expect(typeof id).toBe('string')
		expect(UUID_V7_REGEX.test(id)).toBe(true)
		expect(uuid.isUUID(id)).toBe(true)
		expect(uuid.getUUIDVersion(id)).toBe(7)
	})

	it('getUUIDv7() generates time-ordered UUIDs', () => {
		const id1 = uuid.getUUIDv7()
		const id2 = uuid.getUUIDv7()
		// v7 UUIDs should be sortable - later UUID should be >= earlier
		expect(id2 >= id1).toBe(true)
	})

	it('getShortUUID() returns a non-empty string', () => {
		const short = uuid.getShortUUID()
		expect(typeof short).toBe('string')
		expect(short.length).toBeGreaterThan(0)
	})

	it('toShortUUID() and fromShortUUID() are inverses', () => {
		const original = uuid.getUUID()
		const short = uuid.toShortUUID(original)
		const restored = uuid.fromShortUUID(short)
		expect(restored).toBe(original)
	})

	it('toShortUUID() produces shorter strings', () => {
		const original = uuid.getUUID()
		const short = uuid.toShortUUID(original)
		expect(short.length).toBeLessThan(original.length)
	})

	it('isUUID() validates correct and incorrect UUIDs', () => {
		const valid = uuid.getUUID()
		const invalid = 'not-a-uuid'
		expect(uuid.isUUID(valid)).toBe(true)
		expect(uuid.isUUID(invalid)).toBe(false)
	})

	it('isUUIDv4() only returns true for v4 UUIDs', () => {
		const v4 = uuid.getUUID()
		const v7 = uuid.getUUIDv7()
		const nil = NIL_UUID
		expect(uuid.isUUIDv4(v4)).toBe(true)
		expect(uuid.isUUIDv4(v7)).toBe(false)
		expect(uuid.isUUIDv4(nil)).toBe(false)
	})

	it('isNilUUID() correctly identifies nil UUIDs', () => {
		expect(uuid.isNilUUID(NIL_UUID)).toBe(true)
		expect(uuid.isNilUUID(uuid.getNilUUID())).toBe(true)
		expect(uuid.isNilUUID(uuid.getUUID())).toBe(false)
	})

	it('getUUIDVersion() returns correct version numbers', () => {
		expect(uuid.getUUIDVersion(uuid.getUUID())).toBe(4)
		expect(uuid.getUUIDVersion(uuid.getUUIDv7())).toBe(7)
		expect(uuid.getUUIDVersion(NIL_UUID)).toBe(0)
	})

	it('getUUIDVersion() throws on invalid UUID', () => {
		expect(() => uuid.getUUIDVersion('not-a-uuid')).toThrow('Invalid UUID')
	})

	it('getNilUUID() returns the nil UUID', () => {
		expect(uuid.getNilUUID()).toBe(NIL_UUID)
	})

	it('uuidToBytes() and bytesToUUID() are inverses', () => {
		const id = uuid.getUUID()
		const bytes = uuid.uuidToBytes(id)
		expect(bytes).toBeInstanceOf(Uint8Array)
		const id2 = uuid.bytesToUUID(bytes)
		expect(id2).toBe(id)
	})

	it('uuidToBytes() throws on invalid UUID', () => {
		expect(() => uuid.uuidToBytes('not-a-uuid')).toThrow()
	})

	it('bytesToUUID() throws on invalid bytes', () => {
		// Too short
		expect(() => uuid.bytesToUUID(new Uint8Array([1, 2, 3]))).toThrow()
	})
})
