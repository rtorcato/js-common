import { describe, expect, it } from 'vitest'
import { chunk, compact, partition, shuffle, sortBy, unique, zip } from './index'

describe('unique', () => {
	it('removes duplicates', () => {
		expect(unique([1, 2, 2, 3, 1])).toEqual([1, 2, 3])
		expect(unique([])).toEqual([])
	})
})

describe('chunk', () => {
	it('chunks array into smaller arrays', () => {
		expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
		expect(chunk([1, 2, 3], 1)).toEqual([[1], [2], [3]])
	})
})

describe('compact', () => {
	it('removes falsy values', () => {
		expect(compact([0, 1, false, 2, '', 3, null, undefined])).toEqual([1, 2, 3])
	})
})

describe('shuffle', () => {
	it('returns an array with same elements in any order', () => {
		const arr = [1, 2, 3, 4, 5]
		const shuffled = shuffle(arr)
		expect(shuffled.sort()).toEqual(arr)
		expect(shuffle([])).toEqual([])
	})
})

describe('partition', () => {
	it('splits into pass and fail, preserving order', () => {
		expect(partition([1, 2, 3, 4], (n) => n % 2 === 0)).toEqual([
			[2, 4],
			[1, 3],
		])
		expect(partition([], () => true)).toEqual([[], []])
	})

	it('passes the index to the predicate', () => {
		expect(partition(['a', 'b', 'c'], (_, i) => i > 0)).toEqual([['b', 'c'], ['a']])
	})
})

describe('sortBy', () => {
	it('sorts numerically, not lexicographically', () => {
		expect(sortBy([10, 9, 100], (n) => n)).toEqual([9, 10, 100])
	})

	it('sorts descending and does not mutate the input', () => {
		const arr = [1, 3, 2]
		expect(sortBy(arr, (n) => n, 'desc')).toEqual([3, 2, 1])
		expect(arr).toEqual([1, 3, 2])
	})

	it('is stable for equal keys', () => {
		const items = [
			{ k: 1, id: 'a' },
			{ k: 0, id: 'b' },
			{ k: 1, id: 'c' },
			{ k: 0, id: 'd' },
		]
		expect(sortBy(items, (o) => o.k).map((o) => o.id)).toEqual(['b', 'd', 'a', 'c'])
	})

	it('sorts by Date keys', () => {
		const dates = [new Date('2024-03-01'), new Date('2024-01-01')]
		expect(sortBy(dates, (d) => d)).toEqual([new Date('2024-01-01'), new Date('2024-03-01')])
	})
})

describe('zip', () => {
	it('pairs elements and truncates to the shorter array', () => {
		expect(zip([1, 2, 3], ['a', 'b', 'c'])).toEqual([
			[1, 'a'],
			[2, 'b'],
			[3, 'c'],
		])
		expect(zip([1, 2, 3], ['a'])).toEqual([[1, 'a']])
		expect(zip([], [1])).toEqual([])
	})
})
