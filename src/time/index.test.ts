import { describe, expect, it } from 'vitest'
import {
	formatElapsed,
	formatTime,
	nowTime,
	nowTimeShort,
	pad2,
	parseTime,
	secondsBetween,
} from './index'

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

describe('formatElapsed', () => {
	const SEC = 1000
	const MIN = 60 * SEC
	const HOUR = 60 * MIN
	const DAY = 24 * HOUR

	it('formats seconds below a minute', () => {
		expect(formatElapsed(45 * SEC)).toBe('45s')
		expect(formatElapsed(0)).toBe('0s')
		expect(formatElapsed(59 * SEC + 999)).toBe('59s')
	})
	it('formats minutes below an hour', () => {
		expect(formatElapsed(MIN)).toBe('1m')
		expect(formatElapsed(12 * MIN)).toBe('12m')
		expect(formatElapsed(59 * MIN + 59 * SEC)).toBe('59m')
	})
	it('adds leftover minutes to hours and drops them when zero', () => {
		expect(formatElapsed(HOUR)).toBe('1h')
		expect(formatElapsed(3 * HOUR + 5 * MIN)).toBe('3h 5m')
		expect(formatElapsed(23 * HOUR + 59 * MIN)).toBe('23h 59m')
	})
	it('formats days and drops leftover hours', () => {
		expect(formatElapsed(DAY)).toBe('1d')
		expect(formatElapsed(2 * DAY)).toBe('2d')
		expect(formatElapsed(2 * DAY + 5 * HOUR)).toBe('2d')
	})
	it('floors partial seconds and treats negative input as zero', () => {
		expect(formatElapsed(1999)).toBe('1s')
		expect(formatElapsed(-5 * SEC)).toBe('0s')
	})
})
