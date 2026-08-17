import { describe, expect, it } from 'vitest'
import { toBoolean } from './index'

describe('toBoolean', () => {
	it('converts various values to boolean', () => {
		expect(toBoolean(true)).toBe(true)
		expect(toBoolean(false)).toBe(false)
		expect(toBoolean('true')).toBe(true)
		expect(toBoolean('1')).toBe(true)
		expect(toBoolean('false')).toBe(false)
		expect(toBoolean('0')).toBe(false)
		expect(toBoolean(1)).toBe(true)
		expect(toBoolean(0)).toBe(false)
		expect(toBoolean('yes')).toBe(true)
		expect(toBoolean('')).toBe(false)
		expect(toBoolean(null)).toBe(false)
		expect(toBoolean(undefined)).toBe(false)
	})
})
