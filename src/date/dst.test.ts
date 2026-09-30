import { afterAll, describe, expect, it } from 'vitest'
import { daysBetween } from './index'

// Pin a DST-observing zone; 2026-03-08 is spring-forward in America/New_York.
const originalTZ = process.env.TZ
process.env.TZ = 'America/New_York'
afterAll(() => {
	process.env.TZ = originalTZ
})

describe('daysBetween across DST', () => {
	it('counts calendar days across spring-forward', () => {
		expect(new Date(2026, 2, 7).getTimezoneOffset()).not.toBe(
			new Date(2026, 2, 9).getTimezoneOffset()
		)
		expect(daysBetween('2026-03-07', '2026-03-09')).toBe(2)
		expect(daysBetween('2026-03-09', '2026-03-07')).toBe(-2)
	})

	it('counts calendar days across fall-back', () => {
		expect(daysBetween('2026-10-31', '2026-11-02')).toBe(2)
		expect(daysBetween('2026-11-02', '2026-10-31')).toBe(-2)
	})
})
