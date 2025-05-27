import { describe, expect, it } from 'vitest'
import { angle2D, distance2D, midpoint2D, pointInRect, polygonArea, rectsOverlap } from './index'

describe('distance2D', () => {
	it('calculates the distance between two points', () => {
		expect(distance2D(0, 0, 3, 4)).toBe(5)
		expect(distance2D(1, 1, 1, 1)).toBe(0)
	})
})

describe('midpoint2D', () => {
	it('calculates the midpoint between two points', () => {
		expect(midpoint2D(0, 0, 2, 2)).toEqual([1, 1])
		expect(midpoint2D(-1, -1, 1, 1)).toEqual([0, 0])
	})
})

describe('angle2D', () => {
	it('calculates the angle in radians between two points', () => {
		expect(angle2D(0, 0, 1, 0)).toBeCloseTo(0)
		expect(angle2D(0, 0, 0, 1)).toBeCloseTo(Math.PI / 2)
		expect(angle2D(0, 0, -1, 0)).toBeCloseTo(Math.PI)
		expect(angle2D(0, 0, 0, -1)).toBeCloseTo(-Math.PI / 2)
	})
})

describe('pointInRect', () => {
	it('returns true if point is inside rectangle', () => {
		expect(pointInRect(1, 1, 0, 0, 2, 2)).toBe(true)
		expect(pointInRect(0, 0, 0, 0, 2, 2)).toBe(true)
		expect(pointInRect(2, 2, 0, 0, 2, 2)).toBe(true)
	})
	it('returns false if point is outside rectangle', () => {
		expect(pointInRect(3, 3, 0, 0, 2, 2)).toBe(false)
		expect(pointInRect(-1, -1, 0, 0, 2, 2)).toBe(false)
	})
})

describe('rectsOverlap', () => {
	it('returns true if rectangles overlap', () => {
		expect(rectsOverlap(0, 0, 2, 2, 1, 1, 2, 2)).toBe(true)
		expect(rectsOverlap(0, 0, 2, 2, 2, 2, 2, 2)).toBe(false) // touching at corner
		expect(rectsOverlap(0, 0, 2, 2, 3, 3, 2, 2)).toBe(false)
	})
})

describe('polygonArea', () => {
	it('calculates the area of a triangle', () => {
		expect(
			polygonArea([
				[0, 0],
				[4, 0],
				[0, 3],
			])
		).toBe(6)
	})
	it('calculates the area of a square', () => {
		expect(
			polygonArea([
				[0, 0],
				[2, 0],
				[2, 2],
				[0, 2],
			])
		).toBe(4)
	})
	it('returns 0 for less than 3 points', () => {
		expect(
			polygonArea([
				[0, 0],
				[1, 1],
			])
		).toBe(0)
	})
})
