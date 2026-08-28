import { describe, expect, it } from 'vitest'
import { normaliseBody, proseClaimErrors, splitParams } from './check-readme-exports.mjs'

describe('proseClaimErrors', () => {
	const subpaths = ['arrays', 'objects']
	const exportsBySubpath = new Map([
		['arrays', new Set(['unique', 'chunk'])],
		['objects', new Set(['pick'])],
	])
	const check = (text) => proseClaimErrors(text, subpaths, exportsBySubpath)

	// #243: a removed export left in a summary table carried no import sample, so
	// nothing caught it until the reader hit a SyntaxError.
	it('flags a name the row’s subpath does not export', () => {
		expect(check('| Arrays | `@rtorcato/js-common/arrays` | `unique`, `groupBy` |')).toEqual([
			'`groupBy` is listed beside ./arrays, which do not export it',
		])
	})

	it('accepts a name from any subpath the row names', () => {
		expect(check('| Collections | `arrays`, `objects` | `chunk`, `pick` |')).toEqual([])
	})

	it('ignores prose, fenced code and generated blocks', () => {
		expect(check('See [arrays](./arrays.md) for `groupBy`.')).toEqual([])
		expect(check('```ts\n| `arrays` | `groupBy` |\n```')).toEqual([])
		expect(
			check('<!-- generated:exports -->\n| `arrays` | `groupBy` |\n<!-- /generated:exports -->')
		).toEqual([])
	})

	it('honours the per-file opt-out a migration guide needs', () => {
		expect(check('<!-- boundary-check: ignore -->\n| Was | `arrays` | `groupBy` |')).toEqual([])
	})
})

describe('splitParams', () => {
	it('splits on top-level commas only', () => {
		expect(splitParams('str: string')).toEqual(['str: string'])
		// The comma inside `Record<string, number>` is not a parameter boundary.
		expect(splitParams('a: Record<string, number>, b: number')).toEqual([
			'a: Record<string, number>',
			'b: number',
		])
		expect(splitParams('')).toEqual([])
	})
})

describe('normaliseBody', () => {
	// The pair this check exists for: identical but for the parameter name.
	it('renames parameters positionally so two honest copies compare equal', () => {
		const a = normaliseBody(': boolean {\n\treturn RE.test(email)\n}', 'email: string')
		const b = normaliseBody(': boolean {\n\treturn RE.test(str)\n}', 'str: string')

		expect(a).toBe(b)
		expect(a).toBe('return RE.test(_p0)')
	})

	it('ignores comments, so an explanation on one copy cannot hide the duplicate', () => {
		const bare = normaliseBody(': number {\n\treturn n + 1\n}', 'n: number')
		const commented = normaliseBody(
			': number {\n\t// Why this is written the way it is.\n\t/* and a block */\n\treturn n + 1\n}',
			'n: number'
		)

		expect(commented).toBe(bare)
	})

	it('reads through a default value to the parameter name', () => {
		// crypto.randomHex(length = 16) vs security.generateSecureToken(length = 32):
		// the default lives in the signature, so the bodies must still match.
		expect(normaliseBody(': string {\n\treturn hex(length)\n}', 'length = 16')).toBe(
			normaliseBody(': string {\n\treturn hex(length)\n}', 'length = 32')
		)
	})

	it('does not rename a substring of a longer identifier', () => {
		expect(normaliseBody(': string {\n\treturn strings(str)\n}', 'str: string')).toBe(
			'return strings(_p0)'
		)
	})

	it('leaves a destructured parameter alone rather than guessing a name', () => {
		expect(normaliseBody(': number {\n\treturn a + b\n}', '{ a, b }: Point')).toBe('return a + b')
	})
})
