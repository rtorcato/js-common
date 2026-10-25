/**
 * Returns the current time as an `HH:MM:SS` string.
 *
 * @example
 * ```typescript
 * nowTime() // '14:03:27'
 * ```
 *
 * @returns {string}
 */
export function nowTime(): string {
	const d = new Date()
	return d.toTimeString().slice(0, 8)
}

/**
 * Parses a time string (`HH:MM` or `HH:MM:SS`) into a Date object (today's date).
 *
 * @example
 * ```typescript
 * parseTime('09:30').getHours() // 9
 * parseTime('09:30:15').getSeconds() // 15
 * ```
 *
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
 * Formats a Date object as `HH:MM:SS`.
 *
 * @example
 * ```typescript
 * formatTime(new Date(2026, 7, 11, 9, 5, 3)) // '09:05:03'
 * ```
 *
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
 * Pads a number to two digits (e.g. `5` → `'05'`).
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

/**
 * Formats an elapsed time in milliseconds as a compact label: `45s`, `12m`, `3h 5m`, `2h`, `2d`.
 * Negative input counts as 0. Days drop the leftover hours, so `2d 5h` reads `2d`.
 *
 * @example
 * ```typescript
 * formatElapsed(45_000) // '45s'
 * formatElapsed((3 * 60 + 5) * 60_000) // '3h 5m'
 * ```
 *
 * @param ms Elapsed time in milliseconds.
 * @returns {string}
 */
export function formatElapsed(ms: number): string {
	const s = Math.max(0, Math.floor(ms / 1000))
	if (s < 60) return `${s}s`
	const m = Math.floor(s / 60)
	if (m < 60) return `${m}m`
	const h = Math.floor(m / 60)
	if (h < 24) return m % 60 ? `${h}h ${m % 60}m` : `${h}h`
	return `${Math.floor(h / 24)}d`
}
