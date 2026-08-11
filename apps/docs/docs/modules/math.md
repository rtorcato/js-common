---
title: Math
description: Utilities exported from @rtorcato/js-common/math.
---

Four named arithmetic operations. They exist so arithmetic can be passed around as a value — into a `reduce`, a `pipe` or an operator lookup table — not as a replacement for `+` and `*`, which stay clearer in an ordinary expression. For aggregates over collections (`sum`, `average`, `clamp`, `roundTo`) use `numbers` instead.

```ts
import { add, divide, multiply } from '@rtorcato/js-common/math'
```

## Exports

| Name | Summary |
| --- | --- |
| `add` | Add two numbers. |
| `divide` | Divide two numbers. |
| `multiply` | Multiply two numbers. |
| `subtract` | Subtract two numbers. |

## See also

- [numbers](./numbers.md) — sum, average, clamp, roundTo
- [geometry](./geometry.md) — 2D distance, angle, midpoint, hit-testing
- [boolean](./boolean.md) — logical operators and boolean coercion
- [currency](./currency.md) — price formatting, parsing and currency codes
