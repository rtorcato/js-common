/**
 *
 * Get times as option-list.
 *
 * @return string List of times
 */

export const getHours = (): string[] => {
	const items: string[] = []
	const hours = 24
	let x = 1
	while (x <= hours) {
		const ampm = 'AM'
		items.push(`${x}00 ${ampm}`)
		items.push(`${x}30 ${ampm}`)
		x++
	}
	return items
}

export const getHoursList = (): string[] => {
	const arr: string[] = []
	//   const date = new Date()
	for (let hours = 0; hours < 24; hours++) {
		const ampm = hours > 12 ? 'PM' : 'AM'
		const hoursNormalStr = hours > 12 ? hours - 12 : hours
		const hourStr = hoursNormalStr === 0 ? '12' : hoursNormalStr
		arr.push(`${hourStr}:00 ${ampm}`)
		arr.push(`${hourStr}:30 ${ampm}`)
		// date.setMinutes(date.getMinutes() + 30)
	}
	// Here we will find the closest time
	// If it's 13:09 we'll iterate to 13:15 and stop
	//
	// We'll iterate fifteen times in the worst case scenario
	//   while (date.getMinutes() % 30 !== 0) {
	//     date.setMinutes(date.getMinutes() + 1)
	//   }
	// A whole day has 24 * 4 quarters of an hour
	// Let's iterate using for loop
	//   for (let i = 0; i < 12; i++) {
	//     const armyHours = date.getHours()
	//     const ampm = armyHours > 12 ? 'AM' : 'PM'
	//     const min = date.getMinutes()
	//     const hours = armyHours > 12 ? armyHours - 12 : armyHours
	//     const hoursStr = `${hours}${hours < 10 ? '0' : ''}`
	//     const minStr = `${min}${min < 10 ? '0' : ''}`
	//     array.push(hoursStr + ':' + minStr + ' ' + ampm)
	//     // date.setMinutes(date.getMinutes() + 30)
	//   }
	return arr
}
// export const getTimes = () => {
//   const output = []
//   const current = new Date('00:00')
//   const end = new Date('23:59')

//   while (current <= end) {
//     const time = new Date(current)
//     output.push()
//   }

//   return output
// }

//https://date-fns.org/docs/parseISO

//https://github.com/marnusw/date-fns-tz#time-zone-helpers

// import { zonedTimeToUtc } from 'date-fns-tz'

// const date = getDatePickerValue()     // e.g. 2014-06-25 10:00:00 (picked in any time zone)
// const timeZone = getTimeZoneValue()   // e.g. America/Los_Angeles

// const utcDate = zonedTimeToUtc(date, timeZone)  // In June 10am in Los Angeles is 5pm UTC

// postToServer(utcDate.toISOString(), timeZone) // post 2014-06-25T17:00:00.000Z, America/Los_Angeles
