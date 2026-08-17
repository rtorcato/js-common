import { describe, expect, it } from 'vitest'
import { chunk, compact, shuffle, unique } from './index'

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
