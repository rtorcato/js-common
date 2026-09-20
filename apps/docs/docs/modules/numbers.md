---
title: Numbers
description: Numeric utilities — sum, average, median, standard deviation, clamp.
sidebar_position: 3
---

Aggregates and range maths over plain numbers — sum, average, rounding to a fixed precision, clamping, percentage formatting, and dispersion (`variance`, `stdDev`, `median`, `percentile`). `roundTo` is the usual `Math.round(n * 10 ** d) / 10 ** d`, which is right for display but still bound by float representation, so keep money in integer minor units or a decimal library. Randomness lives in [random](./random.md), not here — and for anything an attacker should not be able to predict, use `crypto` or `security` instead.

```ts
import { sum, average, roundTo, clamp, formatPercent } from '@rtorcato/js-common/numbers'
import { variance, stdDev, median, percentile } from '@rtorcato/js-common/numbers'

sum([1, 2, 3, 4, 5])      // 15
average([10, 20, 30])     // 20
roundTo(3.14159, 2)       // 3.14
clamp(42, 0, 10)          // 10
formatPercent(0.1234, 1)  // "12.3%"
formatPercent(0.0214, { fractionDigits: 2, signed: true })  // "+2.14%"
formatPercent(0, { signed: true })                          // "0%" — zero is never signed

median([4, 1, 3, 2])      // 2.5
percentile([1, 2, 3, 4], 25) // 1.75
stdDev([2, 4, 4, 4, 5, 5, 7, 9])                  // 2 — population, divides by n
stdDev([2, 4, 4, 4, 5, 5, 7, 9], { sample: true }) // 2.138… — divides by n - 1
```

`variance` and `stdDev` default to the **population** form (divide by `n`), which is what a
rolling-window indicator wants. Pass `{ sample: true }` for Bessel's correction (`n - 1`) when the
values are a sample of a larger population, such as a volatility estimate — picking the wrong one is
a silent few-percent error, not a crash. `percentile(values, p)` takes `p` as 0–100 (clamped) and
interpolates linearly between closest ranks (the R-7 method, matching Excel's `PERCENTILE.INC` and
NumPy's default); `median` is `percentile(values, 50)`. Empty inputs return `0`, like `average`.

## See also

- [currency](./currency.md) — price formatting, parsing and currency codes
- [random](./random.md) — random ints, floats, strings and array picks
