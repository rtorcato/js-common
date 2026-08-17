---
title: Boolean
description: Utilities exported from @rtorcato/js-common/boolean.
---

One coercion helper. `toBoolean` understands the string forms `'true'`, `'false'`, `'1'` and `'0'` that `Boolean()` gets wrong for env vars and query params — `Boolean('false')` is `true`, which is almost never what a config parser wants.

The named logical operators (`and`, `or`, `not`, `xor`) were removed in 4.0; use `&&`, `||`, `!` and `!==` directly.

## Example

```ts
import { toBoolean } from '@rtorcato/js-common/boolean'

// Env vars and query params arrive as strings, where `Boolean('false')` is `true`.
toBoolean(process.env.FEATURE_FLAG) // 'false' -> false, '1' -> true
toBoolean('')                       // false
```

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

```ts
import { toBoolean } from '@rtorcato/js-common/boolean'
```

## Exports

| Name | Summary |
| --- | --- |
| `toBoolean` | Converts a value to a boolean. |

<!-- /generated:exports -->

## See also

- [validation](./validation.md) — type guards, including `isBoolean`
- [numbers](./numbers.md) — sum, average, clamp, roundTo
- [strings](./strings.md) — slugify, truncate, casing, emoji stripping
