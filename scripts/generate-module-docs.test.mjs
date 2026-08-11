import { describe, expect, it } from 'vitest'
import { MARKER_END, MARKER_START, spliceGeneratedBlock } from './generate-module-docs.mjs'

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
