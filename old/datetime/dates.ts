import { format } from 'date-fns'
import { toZonedTime } from 'date-fns-tz'
import { parseISO } from 'date-fns/parseISO'
import { formatTime } from './time.js'

/**
 * Converts a date input (string or number) to a formatted date string in 'Month Day, Year' format (e.g., "January 1, 2024").
 *
 * @param input - The date value to format, as a string or number. This can be any value accepted by the JavaScript `Date` constructor.
 * @returns The formatted date string in US English locale.
 */
export const formatStringToDate = (input: string | number): string => {
	const date = new Date(input)
	return date.toLocaleDateString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	})
}

/**
 * Converts a number of seconds since the Unix epoch to a JavaScript `Date` object.
 *
 * @param secs - The number of seconds since the Unix epoch (January 1, 1970, 00:00:00 UTC).
 * @returns A `Date` object representing the specified time.
 */
export const toDateTime = (secs: number) => {
	const t = new Date('1970-01-01T00:30:00Z') // Unix epoch start.
	t.setSeconds(secs)
	return t
}

/**
 * Formats an ISO date string into a human-readable string suitable for database display.
 *
 * @param dateStr - The ISO date string to format.
 * @returns The formatted date string in the format 'eee, LLL dd, yyyy' (e.g., 'Mon, Jan 01, 2024').
 */
export const formatDatabaseDate = (dateStr: string): string => {
	const date = parseIsoDateString(dateStr)
	return format(date, 'eee, LLL dd, yyyy')
}

/**
 * Formats a given ISO date string into a human-readable time string suitable for database display.
 *
 * @param dateStr - The ISO date string to format.
 * @returns The formatted time string in the format 'h:mm bbb'.
 */
export const formatDatabaseTime = (dateStr: string): string => {
	const date = parseIsoDateString(dateStr)
	return format(date, 'h:mm bbb')
}

/**
 * Parses an ISO 8601 date string and returns a Date object.
 *
 * @param dateStr - The ISO 8601 formatted date string to parse.
 * @returns A Date object representing the parsed date and time.
 * @throws Will throw an error if the input string is not a valid ISO 8601 date.
 */
export const parseIsoDateString = (dateStr: string): Date => {
	return parseISO(dateStr)
}

/**
 * Returns the IANA time zone string of the user's browser.
 *
 * @returns {string} The current time zone as detected by the browser, e.g., "America/New_York".
 *
 * @example
 * ```typescript
 * const timeZone = getBrowserTimeZone();
 * console.log(timeZone); // "Europe/London"
 * ```
 */
export const getBrowserTimeZone = (): string => {
	return Intl.DateTimeFormat().resolvedOptions().timeZone
}

/**
 * Formats a given date into a human-readable string.
 *
 * - If the date is today, returns "Today, HH:mm".
 * - If the date is yesterday, returns "Yesterday, HH:mm".
 * - Otherwise, returns "MMM DD, YYYY, HH:mm".
 *
 * @param inputDate - The date to format.
 * @returns A formatted string representing the date and time.
 */
export function formatDate(inputDate: Date): string {
	const today = new Date()
	const yesterday = new Date(today)
	yesterday.setDate(today.getDate() - 1)

	if (isSameDay(inputDate, today)) {
		return `Today, ${formatTime(inputDate)}`
	}
	if (isSameDay(inputDate, yesterday)) {
		return `Yesterday, ${formatTime(inputDate)}`
	}
	return `${formatFullDate(inputDate)}, ${formatTime(inputDate)}`
}

/**
 * Determines whether two Date objects represent the same calendar day.
 *
 * @param date1 - The first date to compare.
 * @param date2 - The second date to compare.
 * @returns `true` if both dates fall on the same day, month, and year; otherwise, `false`.
 */
function isSameDay(date1: Date, date2: Date): boolean {
	return (
		date1.getDate() === date2.getDate() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getFullYear() === date2.getFullYear()
	)
}

function formatFullDate(date: Date): string {
	const day = date.getDate().toString().padStart(2, '0')
	const month = (date.getMonth() + 1).toString().padStart(2, '0')
	const year = date.getFullYear()
	return `${day}/${month}/${year}`
}

// const date1 = new Date('August 19, 1975 23:15:30 GMT+07:00');
// const date2 = new Date('August 19, 1975 23:15:30 GMT-02:00');

// console.log(date1.getTimezoneOffset());
// // expected output: your local timezone offset in minutes
// // (eg -120). NOT the timezone offset of the date object.

// console.log(date1.getTimezoneOffset() === date2.getTimezoneOffset());
// // expected output: true

// export const pgFormTimeWithTimeZone = (theDate: number = Date.now()): string => {
//   const time = new Date(Date.now() + 1000 * 60 * -new Date().getTimezoneOffset()).toISOString().replace('T', ' ').replace('Z', '')
//   return time
// }

// export const getTodayDate = (): string => new Date().toJSON().slice(0, 10).replace(/-/g, '/')
// /*
//  * Convert Javascript date to Postgres YYYY MM DD HH MI SS
//  */
// export const pgFormatDate = (date: string): string => {
//   function zeroPad(d) {
//     return ('0' + d).slice(-2)
//   }
//   const parsed = new Date(date)
//   return [parsed.getUTCFullYear(), zeroPad(parsed.getMonth() + 1), zeroPad(parsed.getDate()), zeroPad(parsed.getHours()), zeroPad(parsed.getMinutes()), zeroPad(parsed.getSeconds())].join(' ')
// }

/*
 * Convert Javascript time to Postgres YYYY MM DD HH MI SS
 */
// export const pgFormatTime = (theDate: number = Date.now()): string => {
//   return new Date(theDate).toISOString().replace('T', ' ').replace('Z', '')
// }

export const formatDatabaseDateTest = (): {
	utcDate: Date
	databaseDate: Date
	dateFormat: string
	timeFormat: string
	getBrowserTimeZone: string
	isoDate: Date
} => {
	// return parseISO('2014-02-11T11:30:30')
	// Set the date to "2018-09-01T16:01:36.386Z"
	const utcDate = toZonedTime('2018-09-01 18:01:36.386', 'Europe/Berlin')

	// const pattern = "d.M.yyyy HH:mm:ss.SSS 'GMT' XXX (z)"
	// // Obtain a Date instance that will render the equivalent Berlin time for the UTC date
	// const date = new Date('2020-09-01T16:01:36.386Z')
	// const timeZone = 'Europe/Berlin'
	// const zonedDate = utcToZonedTime(date, timeZone)
	// zonedDate could be used to initialize a date picker or display the formatted local date/time
	// const formatExample = 'Mon, Dec 12, 2020 - 1PM - 2PM'
	const databaseDate = parseISO('2021-01-26T00:00:00.000Z')
	// const output = format(zonedDate, pattern, { timeZone: 'Europe/Berlin' })
	const dateFormat = format(databaseDate, 'eee, LLL dd, yyyy') //(new Date(), '[Today is a] dddd')
	const timeFormat = format(databaseDate, 'h:mm bbb')
	return {
		utcDate,
		// output,
		databaseDate,
		dateFormat,
		timeFormat,
		// formatExample: format(new Date(), '[Today is a] dddd'),
		getBrowserTimeZone: getBrowserTimeZone(),
		isoDate: parseISO('2021-01-26T00:00:00.000Z'),
	}
}
