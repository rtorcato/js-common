import { describe, expect, it } from 'vitest'
import {
	addDays,
	addMonths,
	daysBetween,
	diffInHours,
	diffInMinutes,
	endOfDay,
	formatDate,
	formatRelative,
	getDayOfWeek,
	isLeapYear,
	isSameDay,
	isToday,
	isWeekend,
	parseDate,
	startOfDay,
	subDays,
	today,
} from './index'

describe('date module', () => {
	it('today returns today as YYYY-MM-DD', () => {
		expect(today()).toBe(new Date().toISOString().slice(0, 10))
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

	it('diffInHours returns hour difference', () => {
		const a = new Date('2024-01-01T00:00:00Z')
		const b = new Date('2024-01-01T05:30:00Z')
		expect(diffInHours(a, b)).toBe(5)
		expect(diffInHours(b, a)).toBe(-6)
	})

	it('diffInMinutes returns minute difference', () => {
		const a = new Date('2024-01-01T00:00:00Z')
		const b = new Date('2024-01-01T00:45:30Z')
		expect(diffInMinutes(a, b)).toBe(45)
	})

	it('isLeapYear detects leap years', () => {
		expect(isLeapYear(2020)).toBe(true)
		expect(isLeapYear(2000)).toBe(true)
		expect(isLeapYear(1900)).toBe(false)
		expect(isLeapYear(2021)).toBe(false)
		expect(isLeapYear(new Date('2020-01-01T00:00:00Z'))).toBe(true)
	})

	it('addDays adds days to a date', () => {
		expect(formatDate(addDays('2023-01-01', 5))).toBe('2023-01-06')
		expect(formatDate(addDays(new Date('2023-01-01'), -1))).toBe('2022-12-31')
	})

	it('subDays subtracts days from a date', () => {
		expect(formatDate(subDays('2023-01-10', 5))).toBe('2023-01-05')
	})

	it('addMonths adds months to a date', () => {
		const d = addMonths('2024-01-15', 2)
		expect(d.getMonth()).toBe(2)
		expect(d.getDate()).toBe(15)
		const wrapped = addMonths('2024-11-15', 3)
		expect(wrapped.getFullYear()).toBe(2025)
		expect(wrapped.getMonth()).toBe(1)
	})

	it('getDayOfWeek returns correct day index', () => {
		expect(getDayOfWeek('2023-05-28')).toBe(0)
		expect(getDayOfWeek('2023-05-29')).toBe(1)
		expect(getDayOfWeek('2023-06-03')).toBe(6)
	})

	it('startOfDay zeros the time', () => {
		const d = startOfDay(new Date('2024-06-15T14:30:00'))
		expect(d.getHours()).toBe(0)
		expect(d.getMinutes()).toBe(0)
		expect(d.getSeconds()).toBe(0)
		expect(d.getMilliseconds()).toBe(0)
	})

	it('endOfDay sets time to 23:59:59.999', () => {
		const d = endOfDay(new Date('2024-06-15T14:30:00'))
		expect(d.getHours()).toBe(23)
		expect(d.getMinutes()).toBe(59)
		expect(d.getSeconds()).toBe(59)
		expect(d.getMilliseconds()).toBe(999)
	})

	it('isWeekend detects Saturday and Sunday', () => {
		expect(isWeekend('2023-06-03')).toBe(true)
		expect(isWeekend('2023-05-28')).toBe(true)
		expect(isWeekend('2023-05-29')).toBe(false)
	})

	it('isSameDay compares calendar day', () => {
		expect(isSameDay('2024-06-15', new Date('2024-06-15T22:00:00'))).toBe(true)
		expect(isSameDay('2024-06-15', '2024-06-16')).toBe(false)
	})

	it('isToday returns true for today', () => {
		expect(isToday(new Date())).toBe(true)
		expect(isToday(addDays(new Date(), -1))).toBe(false)
	})

	it('formatRelative produces human-friendly strings', () => {
		const now = new Date('2026-06-12T12:00:00')
		expect(formatRelative('2026-06-12', now)).toBe('today')
		expect(formatRelative('2026-06-13', now)).toBe('tomorrow')
		expect(formatRelative('2026-06-11', now)).toBe('yesterday')
		expect(formatRelative('2026-06-15', now)).toBe('in 3 days')
		expect(formatRelative('2026-06-07', now)).toBe('5 days ago')
	})
})
