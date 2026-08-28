import { describe, expect, it } from 'vitest'
import {
	buildBlock,
	escapeForMarkdownTable,
	MARKER_END,
	MARKER_START,
	spliceGeneratedBlock,
	summarize,
} from './generate-module-docs.mjs'

const page = `---
title: Colors
---

Hand-written intro.

## Example

\`\`\`ts
lighten('#2f6feb', 0.2)
\`\`\`

${MARKER_START}
old reference
${MARKER_END}

## See also

- [random](./random.md)
`

describe('spliceGeneratedBlock', () => {
	it('replaces only the marked block, leaving the guide alone', () => {
		const next = spliceGeneratedBlock(page, `${MARKER_START}\nnew reference\n${MARKER_END}`)

		expect(next).toContain('Hand-written intro.')
		expect(next).toContain("lighten('#2f6feb', 0.2)")
		expect(next).toContain('- [random](./random.md)')
		expect(next).toContain('new reference')
		expect(next).not.toContain('old reference')
	})

	it('returns null for a page with no markers, so it is left untouched', () => {
		expect(spliceGeneratedBlock('# Fully hand-written\n', 'anything')).toBeNull()
	})
})

describe('summarize', () => {
	it('is just the first sentence when nothing is deprecated', () => {
		expect(summarize(' * Checks if a value is an array.\n * @param value The value.')).toBe(
			'Checks if a value is an array.'
		)
	})

	it('leads with the deprecation and carries the replacement from the tag', () => {
		const jsdoc = [
			' * Checks if a string is a valid URL.',
			' *',
			' * @deprecated Use `isValidUrl` from `@rtorcato/js-common/url` — `./url` owns',
			' * this. Kept as a delegating alias; see #239.',
			' * @param str The string to check.',
		].join('\n')

		// The tag wraps across lines, so a lazy `[\s\S]*?` under /m would truncate
		// it at "owns" and swallow the rationale split.
		expect(summarize(jsdoc)).toBe(
			'**Deprecated.** Use `isValidUrl` from `@rtorcato/js-common/url`. Checks if a string is a valid URL.'
		)
	})
})

describe('buildBlock', () => {
	it('keeps deprecated names out of the import example', () => {
		const block = buildBlock(
			'validation',
			new Map([
				['isArray', 'Checks if a value is an array.'],
				['isUrl', '**Deprecated.** Use `isValidUrl` from `@rtorcato/js-common/url`.'],
				['isString', 'Check if a value is a string.'],
			])
		)

		expect(block).toContain("import { isArray, isString } from '@rtorcato/js-common/validation'")
		expect(block).toContain('| `isUrl` |')
	})
})

describe('escapeForMarkdownTable', () => {
	it('escapes angle brackets outside code spans and leaves them inside', () => {
		// Escaping beats stripping: a one-pass `/<[^>]*>/` strip leaves `<b>`
		// behind here, and deletes the `<T>` from an unbackticked `Success<T>`.
		expect(escapeForMarkdownTable('a <<b>> c')).toBe('a &lt;&lt;b>> c')
		expect(escapeForMarkdownTable('returns Success<T>')).toBe('returns Success&lt;T>')
		expect(escapeForMarkdownTable('use `Success<T>` here')).toBe('use `Success<T>` here')
		expect(escapeForMarkdownTable('a | b')).toBe('a \\| b')
	})

	it('escapes a backslash so it cannot re-expose the pipe it precedes', () => {
		// Escaping only `|` would yield `a\\|b` — an escaped backslash plus a
		// live pipe, which still breaks the row.
		expect(escapeForMarkdownTable('a\\|b')).toBe('a\\\\\\|b')
	})
})
