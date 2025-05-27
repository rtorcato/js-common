import { describe, expect, it } from 'vitest'
import {
	darken,
	hexToRgb,
	isValidHex,
	lighten,
	matchingTextColor,
	randomColor,
	rgbToHex,
} from './index'

describe('colors module', () => {
	it('randomColor returns a valid hex color', () => {
		const color = randomColor()
		expect(color).toMatch(/^#[a-f0-9]{6}$/i)
	})

	it('matchingTextColor returns #000 for light backgrounds and #fff for dark', () => {
		expect(matchingTextColor('#ffffff')).toBe('#000') // white bg
		expect(matchingTextColor('#000000')).toBe('#fff') // black bg
		expect(matchingTextColor('#ff0000')).toBe('#fff') // red (dark)
		expect(matchingTextColor('#cccccc')).toBe('#000') // light gray
	})

	it('hexToRgb converts hex to rgb object', () => {
		expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 })
		expect(hexToRgb('#00ff00')).toEqual({ r: 0, g: 255, b: 0 })
		expect(hexToRgb('#0000ff')).toEqual({ r: 0, g: 0, b: 255 })
		expect(hexToRgb('not-a-color')).toBeNull()
	})

	it('rgbToHex converts rgb to hex string', () => {
		expect(rgbToHex(255, 0, 0)).toBe('#ff0000')
		expect(rgbToHex(0, 255, 0)).toBe('#00ff00')
		expect(rgbToHex(0, 0, 255)).toBe('#0000ff')
		expect(rgbToHex(1, 2, 3)).toBe('#010203')
	})

	it('isValidHex validates hex color strings', () => {
		expect(isValidHex('#fff')).toBe(true)
		expect(isValidHex('#ffffff')).toBe(true)
		expect(isValidHex('#123abc')).toBe(true)
		expect(isValidHex('123abc')).toBe(false)
		expect(isValidHex('#abcd')).toBe(false)
	})

	it('darken darkens a color by percent', () => {
		expect(darken('#ff0000', 0.5)).toBe('#7f0000')
		expect(darken('#00ff00', 0.5)).toBe('#007f00')
		expect(darken('#0000ff', 0.5)).toBe('#00007f')
		expect(darken('not-a-color', 0.5)).toBe('not-a-color')
	})

	it('lighten lightens a color by percent', () => {
		expect(lighten('#000000', 0.5)).toBe('#7f7f7f')
		expect(lighten('#ff0000', 0.5)).toBe('#ff7f7f')
		expect(lighten('#00ff00', 0.5)).toBe('#7fff7f')
		expect(lighten('not-a-color', 0.5)).toBe('not-a-color')
	})
})
