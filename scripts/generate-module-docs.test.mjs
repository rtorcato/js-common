import { describe, expect, it } from 'vitest'
import {
	escapeForMarkdownTable,
	MARKER_END,
	MARKER_START,
	spliceGeneratedBlock,
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

describe('escapeForMarkdownTable', () => {
	it('escapes angle brackets outside code spans and leaves them inside', () => {
		// Escaping beats stripping: a one-pass `/<[^>]*>/` strip leaves `<b>`
		// behind here, and deletes the `<T>` from an unbackticked `Success<T>`.
		expect(escapeForMarkdownTable('a <<b>> c')).toBe('a &lt;&lt;b>> c')
		expect(escapeForMarkdownTable('returns Success<T>')).toBe('returns Success&lt;T>')
		expect(escapeForMarkdownTable('use `Success<T>` here')).toBe('use `Success<T>` here')
		expect(escapeForMarkdownTable('a | b')).toBe('a \\| b')
	})
})
