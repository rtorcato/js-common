---
title: Html
description: Utilities exported from @rtorcato/js-common/html.
---

Escaping, unescaping, stripping and detecting HTML in strings. `escapeHtml` is the one to reach for on any untrusted value you are about to interpolate into markup — it replaces the five significant characters and is safe by construction. `stripHtmlTags` and `containsHtml` are regex-based conveniences for input you already trust; when you must keep markup intact, use a real sanitizer such as DOMPurify instead.

```ts
import { containsHtml, escapeHtml, stripHtmlTags } from '@rtorcato/js-common/html'
```

## Exports

| Name | Summary |
| --- | --- |
| `containsHtml` | Checks if a string contains any HTML tags. |
| `escapeHtml` | Escapes special HTML characters in a string to prevent XSS attacks. |
| `stripHtmlTags` | Strips all HTML tags from a string. |
| `textToHtml` | Converts a plain text string to a simple HTML paragraph (\n to ). |
| `unescapeHtml` | Unescapes HTML entities in a string. |

## See also

- [strings](./strings.md) — slugify, truncate, casing, emoji stripping
- [security](./security.md) — password strength, secure tokens, sanitizing
- [regex](./regex.md) — escape patterns, match-all, split by regex
- [formatting](./formatting.md) — padding, thousands separators, percentages
