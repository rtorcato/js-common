---
title: Numbers
description: Numeric utilities — sum, average, clamp, random.
sidebar_position: 3
---

Aggregates and range maths over plain numbers — sum, average, rounding to a fixed precision, clamping, percentage formatting. `roundTo` is the usual `Math.round(n * 10 ** d) / 10 ** d`, which is right for display but still bound by float representation, so keep money in integer minor units or a decimal library. Randomness lives in [random](./random.md), not here — and for anything an attacker should not be able to predict, use `crypto` or `security` instead.

```ts
import { sum, average, roundTo, clamp, formatPercent } from '@rtorcato/js-common/numbers'

sum([1, 2, 3, 4, 5])      // 15
average([10, 20, 30])     // 20
roundTo(3.14159, 2)       // 3.14
clamp(42, 0, 10)          // 10
formatPercent(0.1234, 1)  // "12.3%"
```

## See also

- [currency](./currency.md) — price formatting, parsing and currency codes
- [random](./random.md) — random ints, floats, strings and array picks
