---
title: Boolean
description: Utilities exported from @rtorcato/js-common/boolean.
---

Named logical operators (`and`, `or`, `not`, `xor`) plus a boolean type guard and a coercion helper. The operators exist so boolean logic can be passed around as a value — into `reduce`, `map` or a `pipe` — not to replace `&&` and `||` in ordinary conditions. `toBoolean` understands the string forms `'true'`, `'false'`, `'1'` and `'0'` that `Boolean()` gets wrong for env vars and query params.

```ts
import { and, isBoolean, not } from '@rtorcato/js-common/boolean'
```

## Exports

| Name | Summary |
| --- | --- |
| `and` | Logical AND for two booleans. |
| `isBoolean` | Checks if a value is a boolean. |
| `not` | Logical NOT for a boolean. |
| `or` | Logical OR for two booleans. |
| `toBoolean` | Converts a value to a boolean. |
| `xor` | Returns the logical exclusive OR (XOR) of two booleans. |

## See also

- [validation](./validation.md) — type guards — `isString`, `isNumber`, `isUrl`
- [numbers](./numbers.md) — sum, average, clamp, roundTo
- [math](./math.md) — add, subtract, multiply, divide
