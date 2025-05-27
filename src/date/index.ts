/**
 * Returns today's date as a YYYY-MM-DD string.
 * @returns {string}
 */
export function today(): string {
	const d = new Date()
	return d.toISOString().slice(0, 10)
}

/**
 * Returns a Date object from a YYYY-MM-DD string.
 * @param dateStr The date string.
 * @returns {Date}
 */
export function parseDate(dateStr: string): Date {
	return new Date(`${dateStr}T00:00:00`)
}

/**
 * Formats a Date object as YYYY-MM-DD.
 * @param date The Date object.
 * @returns {string}
 */
export function formatDate(date: Date): string {
	return date.toISOString().slice(0, 10)
}

/**
 * Returns the difference in days between two dates (date2 - date1).
 * @param date1 The first date (string or Date).
 * @param date2 The second date (string or Date).
 * @returns {number}
 */
export function daysBetween(date1: string | Date, date2: string | Date): number {
	const d1 = typeof date1 === 'string' ? parseDate(date1) : date1
	const d2 = typeof date2 === 'string' ? parseDate(date2) : date2
	return Math.floor((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24))
}

/**
 * Checks if a year is a leap year.
 * @param year The year (number or Date).
 * @returns {boolean}
 */
export function isLeapYear(year: number | Date): boolean {
	const y = year instanceof Date ? year.getUTCFullYear() : year
	return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0
}

/**
 * Adds days to a date and returns a new Date object.
 * @param date The date (string or Date).
 * @param days Number of days to add.
 * @returns {Date}
 */
export function addDays(date: string | Date, days: number): Date {
	const d = typeof date === 'string' ? parseDate(date) : new Date(date)
	d.setDate(d.getDate() + days)
	return d
}

/**
 * Returns the day of the week for a date (0=Sunday, 6=Saturday).
 * @param date The date (string or Date).
 * @returns {number}
 */
export function getDayOfWeek(date: string | Date): number {
	const d = typeof date === 'string' ? parseDate(date) : date
	return d.getDay()
}
