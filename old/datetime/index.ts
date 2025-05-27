export const padNumberToString = (val: number): string => {
	if (val < 10) {
		return `0${val}`
	}
	return val.toString()
}

export const getDateISO = (date: string | number | Date): string => {
	return new Date(date).toISOString()
}

export const getDateAndTime = (): string => {
	const today = new Date()
	const dd: number = today.getDate()
	const mm: number = today.getMonth() + 1
	const yyyy: number = today.getFullYear()
	const hh: number = today.getHours()
	const min: number = today.getMinutes()
	return `${padNumberToString(mm)}/${padNumberToString(dd)}/${yyyy} ${hh}:${min}`
}
