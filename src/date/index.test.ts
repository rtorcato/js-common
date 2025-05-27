import { describe, expect, it } from 'vitest'
import {
	addDays,
	daysBetween,
	formatDate,
	getDayOfWeek,
	isLeapYear,
	parseDate,
	today,
} from './index'

describe('date module', () => {
	it('today returns today as YYYY-MM-DD', () => {
		const t = today()
		const now = new Date()
		expect(t).toBe(now.toISOString().slice(0, 10))
	})

	it('parseDate returns a Date from YYYY-MM-DD', () => {
		const d = parseDate('2023-05-26')
		expect(d).toBeInstanceOf(Date)
		expect(d.getFullYear()).toBe(2023)
		expect(d.getMonth()).toBe(4)
		expect(d.getDate()).toBe(26)
	})

	it('formatDate formats a Date as YYYY-MM-DD', () => {
		const d = new Date('2022-01-02T12:34:56Z')
		expect(formatDate(d)).toBe('2022-01-02')
	})

	it('daysBetween returns correct difference in days', () => {
		expect(daysBetween('2023-01-01', '2023-01-02')).toBe(1)
		expect(daysBetween('2023-01-01', '2023-01-10')).toBe(9)
		expect(daysBetween('2023-01-10', '2023-01-01')).toBe(-9)
		expect(daysBetween('2023-01-01', '2023-01-01')).toBe(0)
	})

	it('isLeapYear detects leap years', () => {
		expect(isLeapYear(2020)).toBe(true)
		expect(isLeapYear(2000)).toBe(true)
		expect(isLeapYear(1900)).toBe(false)
		expect(isLeapYear(2021)).toBe(false)
		// Use UTC to avoid timezone issues
		expect(isLeapYear(new Date('2020-01-01T00:00:00Z'))).toBe(true)
	})

	it('addDays adds days to a date', () => {
		expect(formatDate(addDays('2023-01-01', 5))).toBe('2023-01-06')
		expect(formatDate(addDays(new Date('2023-01-01'), -1))).toBe('2022-12-31')
	})

	it('getDayOfWeek returns correct day index', () => {
		// 2023-05-28 is a Sunday (0)
		expect(getDayOfWeek('2023-05-28')).toBe(0)
		// 2023-05-29 is a Monday (1)
		expect(getDayOfWeek('2023-05-29')).toBe(1)
		// 2023-06-03 is a Saturday (6)
		expect(getDayOfWeek('2023-06-03')).toBe(6)
	})
})
