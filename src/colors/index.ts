/**
 * Generates a random hex color string.
 *
 * @returns {string} A string representing a random color in hexadecimal format (e.g., `#a1b2c3`).
 */
export function randomColor(): string {
	const color = Math.floor(Math.random() * 0xffffff)
		.toString(16)
		.padStart(6, '0') // ensures it's 6 characters
	return `#${color}`
}

/**
 * Generates a random color with a given alpha value.
 *
 * @export
 * @param {string} color
 * @return {*}
 */
export function matchingTextColor(color: string) {
	const r = Number.parseInt(color.slice(1, 3), 16)
	const g = Number.parseInt(color.slice(3, 5), 16)
	const b = Number.parseInt(color.slice(5, 7), 16)
	const yiq = (r * 299 + g * 587 + b * 114) / 1000

	return yiq >= 128 ? '#000' : '#fff'
}

/**
 * Converts a hex color string to an RGB object.
 *
 * @export
 * @param {string} hex
 * @return {*}  {({ r: number; g: number; b: number } | null)}
 */
export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
	const match = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i)
	if (!match) return null
	return {
		r: Number.parseInt(match[1] || '', 16),
		g: Number.parseInt(match[2] || '', 16),
		b: Number.parseInt(match[3] || '', 16),
	}
}

/**
 * Converts RGB values to a hex color string.
 *
 * @export
 * @param {number} r
 * @param {number} g
 * @param {number} b
 * @return {*}  {string}
 */

export function rgbToHex(r: number, g: number, b: number): string {
	return `#${[r, g, b]
		.map((x) => {
			const hex = x.toString(16)
			return hex.length === 1 ? `0${hex}` : hex
		})
		.join('')}`
}

/**
 * Converts a hex color string to an HSL object.
 *
 * @export
 * @param {string} hex
 * @return {*}  {({ h: number; s: number; l: number } | null)}
 */
export function isValidHex(hex: string): boolean {
	return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex)
}

/**
 * Darkens a hex color by a given percentage.
 *
 * @export
 * @param {string} hex
 * @param {number} percent
 * @return {*}  {string}
 */
export function darken(hex: string, percent: number): string {
	const rgb = hexToRgb(hex)
	if (!rgb) return hex
	const r = Math.max(0, Math.floor(rgb.r * (1 - percent)))
	const g = Math.max(0, Math.floor(rgb.g * (1 - percent)))
	const b = Math.max(0, Math.floor(rgb.b * (1 - percent)))
	return rgbToHex(r, g, b)
}

/**
 * Lightens a hex color by a given percentage.
 *
 * @export
 * @param {string} hex
 * @param {number} percent
 * @return {*}  {string}
 */
export function lighten(hex: string, percent: number): string {
	const rgb = hexToRgb(hex)
	if (!rgb) return hex
	const r = Math.min(255, Math.floor(rgb.r + (255 - rgb.r) * percent))
	const g = Math.min(255, Math.floor(rgb.g + (255 - rgb.g) * percent))
	const b = Math.min(255, Math.floor(rgb.b + (255 - rgb.b) * percent))
	return rgbToHex(r, g, b)
}
