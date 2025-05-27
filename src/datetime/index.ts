/**
 * Returns the current date and time as an ISO string (YYYY-MM-DDTHH:mm:ss.sssZ).
 */
export function nowIso(): string {
	return new Date().toISOString()
}

/**
 * Parses an ISO date-time string to a Date object. Returns null if invalid.
 * @param iso The ISO string.
 */
export function parseIsoDateTime(iso: string): Date | null {
	const d = new Date(iso)
	return Number.isNaN(d.getTime()) ? null : d
}

/**
 * Formats a Date as YYYY-MM-DD HH:mm:ss (local time).
 * @param date The Date object.
 */
export function formatDateTimeLocal(date: Date): string {
	const pad = (n: number) => n.toString().padStart(2, '0')
	return (
		`${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
		`${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
	)
}

/**
 * Returns the timezone offset in minutes for a given date (local - UTC).
 * @param date The Date object.
 */
export function getTimezoneOffset(date: Date = new Date()): number {
	return date.getTimezoneOffset()
}

/**
 * Returns the UTC equivalent of a local Date.
 * @param date The local Date object.
 */
export function toUtcDate(date: Date): Date {
	return new Date(
		Date.UTC(
			date.getFullYear(),
			date.getMonth(),
			date.getDate(),
			date.getHours(),
			date.getMinutes(),
			date.getSeconds(),
			date.getMilliseconds()
		)
	)
}

/**
 * Returns the number of seconds since the Unix epoch (UTC).
 */
export function unixTimestamp(): number {
	return Math.floor(Date.now() / 1000)
}

/**
 * Returns the number of milliseconds since the Unix epoch.
 */
export function unixMillis(): number {
	return Date.now()
}

/**
 * Returns the difference in seconds between two Date objects.
 * @param a First date.
 * @param b Second date.
 */
export function secondsBetween(a: Date, b: Date): number {
	return Math.floor((b.getTime() - a.getTime()) / 1000)
}

/**
 * Returns the ISO week number (1–53) of a given date using UTC.
 * @param date A JavaScript Date object.
 */
export function getIsoWeek(date: Date): number {
	// Copy and normalize input date to UTC midnight
	const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))

	// Set to the Thursday of the current ISO week
	const day = utcDate.getUTCDay()
	const isoWeekDay = day === 0 ? 7 : day // Sunday is 7
	utcDate.setUTCDate(utcDate.getUTCDate() + 4 - isoWeekDay)

	// First day of ISO year
	const yearStart = new Date(Date.UTC(utcDate.getUTCFullYear(), 0, 1))
	const yearStartDay = yearStart.getUTCDay()
	const yearStartIsoDay = yearStartDay === 0 ? 7 : yearStartDay
	const firstThursday = new Date(Date.UTC(utcDate.getUTCFullYear(), 0, 1 + (4 - yearStartIsoDay)))

	// Calculate ISO week number
	const diff = utcDate.getTime() - firstThursday.getTime()
	const weekNo = 1 + Math.round(diff / (7 * 24 * 60 * 60 * 1000))

	return weekNo
}

/**
 * Returns ISO week number and ISO week year (which may differ from calendar year).
 * @param date Date object (UTC-safe)
 */
export function getIsoWeekInfo(date: Date): { week: number; year: number } {
	const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))

	// Set to nearest Thursday (ISO week is based on the week containing Thursday)
	d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))

	// ISO year is the year of that Thursday
	const isoYear = d.getUTCFullYear()

	// Get the Monday of the first ISO week of that year
	const jan1 = new Date(Date.UTC(isoYear, 0, 1))
	const jan1Day = jan1.getUTCDay() || 7
	const isoWeekStart = new Date(Date.UTC(isoYear, 0, 1 - jan1Day + 1 + (jan1Day > 4 ? 7 : 0)))

	// Calculate full weeks between that Monday and our date
	const diffInMs = d.getTime() - isoWeekStart.getTime()
	const week = Math.floor(diffInMs / (7 * 24 * 60 * 60 * 1000)) + 1

	return { week, year: isoYear }
}
