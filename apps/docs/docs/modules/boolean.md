---
title: Boolean
description: Utilities exported from @rtorcato/js-common/boolean.
---

Named logical operators (`and`, `or`, `not`, `xor`) plus a coercion helper. The operators exist so boolean logic can be passed around as a value — into `reduce`, `map` or a `pipe` — not to replace `&&` and `||` in ordinary conditions. `toBoolean` understands the string forms `'true'`, `'false'`, `'1'` and `'0'` that `Boolean()` gets wrong for env vars and query params.

## Example

```ts
import { toBoolean, xor } from '@rtorcato/js-common/boolean'

// Env vars and query params arrive as strings, where `Boolean('false')` is `true`.
toBoolean(process.env.FEATURE_FLAG) // 'false' -> false, '1' -> true
toBoolean('')                       // false

// The operators earn their place when logic is passed as a value.
const flags = [true, false, false]
flags.reduce(xor) // true — an odd number of flags is set
```

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

```ts
import { and, not, or } from '@rtorcato/js-common/boolean'
```

## Exports

| Name | Summary |
| --- | --- |
| `and` | Logical AND for two booleans. |
| `not` | Logical NOT for a boolean. |
| `or` | Logical OR for two booleans. |
| `toBoolean` | Converts a value to a boolean. |
| `xor` | Returns the logical exclusive OR (XOR) of two booleans. |

<!-- /generated:exports -->

## See also

- [validation](./validation.md) — type guards, including `isBoolean`
- [numbers](./numbers.md) — sum, average, clamp, roundTo
- [strings](./strings.md) — slugify, truncate, casing, emoji stripping
