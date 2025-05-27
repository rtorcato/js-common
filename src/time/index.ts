/**
 * Returns the current time as HH:MM:SS string.
 * @returns {string}
 */
export function nowTime(): string {
	const d = new Date()
	return d.toTimeString().slice(0, 8)
}

/**
 * Parses a time string (HH:MM or HH:MM:SS) into a Date object (today's date).
 * @param timeStr The time string.
 * @returns {Date}
 */
export function parseTime(timeStr: string): Date {
	const [h, m, s = '0'] = timeStr.split(':')
	const d = new Date()
	d.setHours(Number(h), Number(m), Number(s), 0)
	return d
}

/**
 * Formats a Date object as HH:MM:SS.
 * @param date The Date object.
 * @returns {string}
 */
export function formatTime(date: Date): string {
	return date.toTimeString().slice(0, 8)
}

/**
 * Returns the difference in seconds between two times (as Date or string).
 * @param t1 First time (Date or string).
 * @param t2 Second time (Date or string).
 * @returns {number}
 */
export function secondsBetween(t1: string | Date, t2: string | Date): number {
	const d1 = typeof t1 === 'string' ? parseTime(t1) : t1
	const d2 = typeof t2 === 'string' ? parseTime(t2) : t2
	return Math.floor((d2.getTime() - d1.getTime()) / 1000)
}

/**
 * Pads a number to two digits (e.g., 5 -> '05').
 * @param n The number.
 * @returns {string}
 */
export function pad2(n: number): string {
	return n < 10 ? `0${n}` : String(n)
}

/**
 * Returns the current time as HH:MM string.
 * @returns {string}
 */
export function nowTimeShort(): string {
	const d = new Date()
	return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`
}
