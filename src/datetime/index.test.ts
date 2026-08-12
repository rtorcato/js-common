import { describe, expect, it } from 'vitest'
import {
	formatDateTimeLocal,
	getIsoWeek,
	getIsoWeekInfo,
	getTimezoneOffset,
	nowIso,
	parseIsoDateTime,
	toUtcDate,
	unixMillis,
	unixTimestamp,
} from './index'

describe('datetime module', () => {
	it('nowIso returns a valid ISO string', () => {
		const iso = nowIso()
		expect(typeof iso).toBe('string')
		expect(iso).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)
		expect(() => new Date(iso)).not.toThrow()
	})

	it('parseIsoDateTime parses valid ISO and returns null for invalid', () => {
		const d = parseIsoDateTime('2025-05-26T12:34:56Z')
		expect(d).toBeInstanceOf(Date)
		expect(d?.getUTCFullYear()).toBe(2025)
		expect(parseIsoDateTime('not-a-date')).toBeNull()
	})

	it('formatDateTimeLocal formats as YYYY-MM-DD HH:mm:ss', () => {
		const d = new Date('2025-05-26T09:08:07')
		const str = formatDateTimeLocal(d)
		expect(str).toMatch(/^2025-05-26 09:08:07$/)
	})

	it('getTimezoneOffset returns a number', () => {
		const offset = getTimezoneOffset(new Date())
		expect(typeof offset).toBe('number')
	})

	it('toUtcDate returns a UTC date with same fields as local', () => {
		const local = new Date('2025-05-26T12:34:56.789')
		const utc = toUtcDate(local)
		expect(utc.getUTCFullYear()).toBe(local.getFullYear())
		expect(utc.getUTCMonth()).toBe(local.getMonth())
		expect(utc.getUTCDate()).toBe(local.getDate())
		expect(utc.getUTCHours()).toBe(local.getHours())
		expect(utc.getUTCMinutes()).toBe(local.getMinutes())
		expect(utc.getUTCSeconds()).toBe(local.getSeconds())
		expect(utc.getUTCMilliseconds()).toBe(local.getMilliseconds())
	})

	it('unixTimestamp returns seconds since epoch', () => {
		const ts = unixTimestamp()
		expect(typeof ts).toBe('number')
		expect(ts).toBeGreaterThan(1000000000)
		expect(ts).toBeLessThan(9999999999)
	})

	it('unixMillis returns ms since epoch', () => {
		const ms = unixMillis()
		expect(typeof ms).toBe('number')
		expect(ms).toBeGreaterThan(1000000000000)
	})
})

// `getIsoWeek` and `getIsoWeekInfo` read the *local* calendar fields of their input
// (getFullYear/getMonth/getDate) before re-projecting onto UTC. Feeding them a
// UTC-constructed date (`new Date('2025-01-01')` or `new Date(Date.UTC(...))`) therefore
// shifts the day by one in any zone behind UTC — which is why the earlier attempts at
// these tests were commented out rather than fixed. Constructing with local components
// makes them timezone-independent.
describe('getIsoWeek', () => {
	it('returns the ISO week number', () => {
		expect(getIsoWeek(new Date(2025, 0, 1))).toBe(1) // Wed 2025-01-01
		expect(getIsoWeek(new Date(2025, 4, 26))).toBe(22) // Mon 2025-05-26
		expect(getIsoWeek(new Date(2025, 11, 31))).toBe(1) // rolls into ISO week 1 of 2026
	})

	it('counts week 53 in a long ISO year', () => {
		expect(getIsoWeek(new Date(2020, 11, 31))).toBe(53)
	})
})

describe('getIsoWeekInfo', () => {
	it('returns the ISO week and the ISO week year', () => {
		expect(getIsoWeekInfo(new Date(2025, 0, 1))).toEqual({ week: 1, year: 2025 })
		expect(getIsoWeekInfo(new Date(2025, 4, 26))).toEqual({ week: 22, year: 2025 })
	})

	it('reports the next ISO year for a late-December date', () => {
		expect(getIsoWeekInfo(new Date(2025, 11, 31))).toEqual({ week: 1, year: 2026 })
	})

	it('reports the previous ISO year for an early-January date', () => {
		// Fri 2021-01-01 belongs to ISO week 53 of 2020.
		expect(getIsoWeekInfo(new Date(2021, 0, 1))).toEqual({ week: 53, year: 2020 })
	})

	it('agrees with getIsoWeek on the week number', () => {
		for (const d of [new Date(2025, 0, 1), new Date(2025, 4, 26), new Date(2025, 11, 31)]) {
			expect(getIsoWeekInfo(d).week).toBe(getIsoWeek(d))
		}
	})
})
