/**
 * Calculates the distance between two points in 2D space.
 * @param x1 X coordinate of first point.
 * @param y1 Y coordinate of first point.
 * @param x2 X coordinate of second point.
 * @param y2 Y coordinate of second point.
 * @returns {number} The distance.
 */
export function distance2D(x1: number, y1: number, x2: number, y2: number): number {
	return Math.hypot(x2 - x1, y2 - y1)
}

/**
 * Calculates the midpoint between two points in 2D space.
 * @param x1 X coordinate of first point.
 * @param y1 Y coordinate of first point.
 * @param x2 X coordinate of second point.
 * @param y2 Y coordinate of second point.
 * @returns {[number, number]} The midpoint as [x, y].
 */
export function midpoint2D(x1: number, y1: number, x2: number, y2: number): [number, number] {
	return [(x1 + x2) / 2, (y1 + y2) / 2]
}

/**
 * Calculates the angle (in radians) between two points in 2D space.
 * @param x1 X coordinate of first point.
 * @param y1 Y coordinate of first point.
 * @param x2 X coordinate of second point.
 * @param y2 Y coordinate of second point.
 * @returns {number} The angle in radians.
 */
export function angle2D(x1: number, y1: number, x2: number, y2: number): number {
	return Math.atan2(y2 - y1, x2 - x1)
}

/**
 * Checks if a point is inside a rectangle.
 * @param px X coordinate of the point.
 * @param py Y coordinate of the point.
 * @param rx X coordinate of the rectangle's top-left corner.
 * @param ry Y coordinate of the rectangle's top-left corner.
 * @param rw Rectangle width.
 * @param rh Rectangle height.
 * @returns {boolean} True if inside, false otherwise.
 */
export function pointInRect(
	px: number,
	py: number,
	rx: number,
	ry: number,
	rw: number,
	rh: number
): boolean {
	return px >= rx && px <= rx + rw && py >= ry && py <= ry + rh
}

/**
 * Checks if two rectangles overlap.
 * @param ax X of rect A.
 * @param ay Y of rect A.
 * @param aw Width of rect A.
 * @param ah Height of rect A.
 * @param bx X of rect B.
 * @param by Y of rect B.
 * @param bw Width of rect B.
 * @param bh Height of rect B.
 * @returns {boolean} True if rectangles overlap.
 */
export function rectsOverlap(
	ax: number,
	ay: number,
	aw: number,
	ah: number,
	bx: number,
	by: number,
	bw: number,
	bh: number
): boolean {
	return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by
}

/**
 * Calculates the area of a polygon given its vertices (Shoelace formula).
 * @param points Array of [x, y] pairs.
 * @returns {number} The area (positive value).
 */
export function polygonArea(points: [number, number][]): number {
	let area = 0
	const n = points.length
	for (let i = 0; i < n; i++) {
		const point1 = points[i]
		const point2 = points[(i + 1) % n]
		if (!point1 || !point2) continue
		const [x1, y1] = point1
		const [x2, y2] = point2
		area += x1 * y2 - x2 * y1
	}
	return Math.abs(area / 2)
}
