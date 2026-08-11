---
title: Regex
description: Utilities exported from @rtorcato/js-common/regex.
---

Regex conveniences — escape a string for literal use in a pattern, test, match all, split, replace all. `escapeRegExp` is the one that earns its place: interpolating user input into a `RegExp` without it gives you a broken pattern at best and catastrophic backtracking at worst. The rest are thin wrappers that add the `g` flag where it is needed and return plain arrays rather than iterators, so results are easy to destructure and inspect.

## Example

```ts
import { escapeRegExp, matchAll } from '@rtorcato/js-common/regex'

// Highlight the user's search term. Without escaping, 'c++' is an invalid pattern
// and '(.*)' quietly matches everything.
const pattern = new RegExp(escapeRegExp(userInput), 'gi')
text.replace(pattern, (hit) => `<mark>${hit}</mark>`)

matchAll('a1b22c', /\d+/) // [['1'], ['22']] — a plain array, not an iterator
```

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

```ts
import { escapeRegExp, matchAll, replaceAllRegex } from '@rtorcato/js-common/regex'
```

## Exports

| Name | Summary |
| --- | --- |
| `escapeRegExp` | Escapes special regex characters in a string so it can be used in a RegExp. |
| `matchAll` | Returns all matches of a regex pattern in a string. |
| `replaceAllRegex` | Replaces all matches of a regex pattern in a string with a replacement. |
| `splitByRegex` | Splits a string by a regex pattern. |
| `testRegex` | Tests if a string matches a given regex pattern. |

<!-- /generated:exports -->

## See also

- [strings](./strings.md) — slugify, truncate, casing, emoji stripping
- [html](./html.md) — escape, unescape and strip HTML
- [validation](./validation.md) — type guards — `isString`, `isNumber`, `isUrl`
- [formatting](./formatting.md) — padding, thousands separators, percentages
