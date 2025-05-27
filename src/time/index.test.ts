import { describe, expect, it } from 'vitest'
import { formatTime, nowTime, nowTimeShort, pad2, parseTime, secondsBetween } from './index'

describe('nowTime', () => {
	it('returns a string in HH:MM:SS format', () => {
		const t = nowTime()
		expect(t).toMatch(/^\d{2}:\d{2}:\d{2}$/)
	})
})

describe('parseTime', () => {
	it('parses HH:MM to a Date object with correct hours and minutes', () => {
		const d = parseTime('13:45')
		expect(d.getHours()).toBe(13)
		expect(d.getMinutes()).toBe(45)
		expect(d.getSeconds()).toBe(0)
	})
	it('parses HH:MM:SS to a Date object with correct time', () => {
		const d = parseTime('01:02:03')
		expect(d.getHours()).toBe(1)
		expect(d.getMinutes()).toBe(2)
		expect(d.getSeconds()).toBe(3)
	})
})

describe('formatTime', () => {
	it('formats a Date object as HH:MM:SS', () => {
		const d = new Date(2000, 0, 1, 5, 6, 7)
		expect(formatTime(d)).toBe('05:06:07')
	})
})

describe('secondsBetween', () => {
	it('returns the difference in seconds between two times (string)', () => {
		expect(secondsBetween('01:00:00', '01:00:10')).toBe(10)
		expect(secondsBetween('01:00:00', '01:01:00')).toBe(60)
	})
	it('returns the difference in seconds between two times (Date)', () => {
		const d1 = parseTime('01:00:00')
		const d2 = parseTime('01:00:30')
		expect(secondsBetween(d1, d2)).toBe(30)
	})
})

describe('pad2', () => {
	it('pads single digits with zero', () => {
		expect(pad2(5)).toBe('05')
		expect(pad2(0)).toBe('00')
		expect(pad2(12)).toBe('12')
	})
})

describe('nowTimeShort', () => {
	it('returns a string in HH:MM format', () => {
		const t = nowTimeShort()
		expect(t).toMatch(/^\d{2}:\d{2}$/)
	})
})
