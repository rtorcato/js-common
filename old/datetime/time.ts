/**
 * Formats a given Date object into a string with the format "HH:mm".
 *
 * @param date - The Date object to format.
 * @returns A string representing the time in 24-hour "HH:mm" format.
 */
export function formatTime(date: Date): string {
	const hours = date.getHours().toString().padStart(2, '0')
	const minutes = date.getMinutes().toString().padStart(2, '0')
	return `${hours}:${minutes}`
}
