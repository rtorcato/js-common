const MS_PER_SECOND = 1000
const MS_PER_MINUTE = 60 * MS_PER_SECOND
const MS_PER_HOUR = 60 * MS_PER_MINUTE
const MS_PER_DAY = 24 * MS_PER_HOUR

function toDate(value: string | Date): Date {
	return typeof value === 'string' ? parseDate(value) : new Date(value)
}

/**
 * Returns today's date as a YYYY-MM-DD string.
 */
export function today(): string {
	return new Date().toISOString().slice(0, 10)
}

/**
 * Returns a Date object from a YYYY-MM-DD string (parsed as local time).
 */
export function parseDate(dateStr: string): Date {
	return new Date(`${dateStr}T00:00:00`)
}

/**
 * Formats a Date object as YYYY-MM-DD (UTC).
 */
export function formatDate(date: Date): string {
	return date.toISOString().slice(0, 10)
}

/**
 * Returns the difference in days between two dates (date2 - date1).
 */
export function daysBetween(date1: string | Date, date2: string | Date): number {
	return Math.floor((toDate(date2).getTime() - toDate(date1).getTime()) / MS_PER_DAY)
}

/**
 * Returns the difference in hours between two dates (date2 - date1).
 */
export function diffInHours(date1: string | Date, date2: string | Date): number {
	return Math.floor((toDate(date2).getTime() - toDate(date1).getTime()) / MS_PER_HOUR)
}

/**
 * Returns the difference in minutes between two dates (date2 - date1).
 */
export function diffInMinutes(date1: string | Date, date2: string | Date): number {
	return Math.floor((toDate(date2).getTime() - toDate(date1).getTime()) / MS_PER_MINUTE)
}

/**
 * Checks if a year is a leap year.
 */
export function isLeapYear(year: number | Date): boolean {
	const y = year instanceof Date ? year.getUTCFullYear() : year
	return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0
}

/**
 * Adds days to a date and returns a new Date object.
 */
export function addDays(date: string | Date, days: number): Date {
	const d = toDate(date)
	d.setDate(d.getDate() + days)
	return d
}

/**
 * Subtracts days from a date and returns a new Date object.
 */
export function subDays(date: string | Date, days: number): Date {
	return addDays(date, -days)
}

/**
 * Adds months to a date and returns a new Date object.
 */
export function addMonths(date: string | Date, months: number): Date {
	const d = toDate(date)
	d.setMonth(d.getMonth() + months)
	return d
}

/**
 * Returns the day of the week for a date (0=Sunday, 6=Saturday).
 */
export function getDayOfWeek(date: string | Date): number {
	return toDate(date).getDay()
}

/**
 * Returns a new Date set to the start of the day (00:00:00.000) in local time.
 */
export function startOfDay(date: string | Date): Date {
	const d = toDate(date)
	d.setHours(0, 0, 0, 0)
	return d
}

/**
 * Returns a new Date set to the end of the day (23:59:59.999) in local time.
 */
export function endOfDay(date: string | Date): Date {
	const d = toDate(date)
	d.setHours(23, 59, 59, 999)
	return d
}

/**
 * Returns true if the date falls on Saturday or Sunday.
 */
export function isWeekend(date: string | Date): boolean {
	const day = getDayOfWeek(date)
	return day === 0 || day === 6
}

/**
 * Returns true if the two dates fall on the same calendar day (local time).
 */
export function isSameDay(date1: string | Date, date2: string | Date): boolean {
	const a = toDate(date1)
	const b = toDate(date2)
	return (
		a.getFullYear() === b.getFullYear() &&
		a.getMonth() === b.getMonth() &&
		a.getDate() === b.getDate()
	)
}

/**
 * Returns true if the date is today (local time).
 */
export function isToday(date: string | Date): boolean {
	return isSameDay(toDate(date), new Date())
}

/**
 * Formats a date as a short relative string: "today", "yesterday", "tomorrow",
 * "N days ago", or "in N days". Compared against `now` (defaults to current time).
 */
export function formatRelative(date: string | Date, now: Date = new Date()): string {
	const target = startOfDay(toDate(date))
	const base = startOfDay(now)
	const days = Math.round((target.getTime() - base.getTime()) / MS_PER_DAY)
	if (days === 0) return 'today'
	if (days === 1) return 'tomorrow'
	if (days === -1) return 'yesterday'
	return days > 0 ? `in ${days} days` : `${-days} days ago`
}
