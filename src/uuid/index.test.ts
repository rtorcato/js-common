import { describe, expect, it } from 'vitest'
import * as uuid from './index'

// Helper: valid v4 UUID regex
const UUID_V4_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

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

	it('getShortUUID() returns a non-empty string', () => {
		const short = uuid.getShortUUID()
		expect(typeof short).toBe('string')
		expect(short.length).toBeGreaterThan(0)
	})

	it('isUUID() validates correct and incorrect UUIDs', () => {
		const valid = uuid.getUUID()
		const invalid = 'not-a-uuid'
		expect(uuid.isUUID(valid)).toBe(true)
		expect(uuid.isUUID(invalid)).toBe(false)
	})

	it('isUUIDv4() only returns true for v4 UUIDs', () => {
		const v4 = uuid.getUUID()
		const nil = NIL_UUID
		expect(uuid.isUUIDv4(v4)).toBe(true)
		expect(uuid.isUUIDv4(nil)).toBe(false)
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
