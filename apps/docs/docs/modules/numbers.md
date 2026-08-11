---
title: Numbers
description: Numeric utilities — sum, average, clamp, random.
sidebar_position: 3
---

Aggregates and range maths over plain numbers — sum, average, rounding to a fixed precision, clamping, random integers. `roundTo` is the usual `Math.round(n * 10 ** d) / 10 ** d`, which is right for display but still bound by float representation, so keep money in integer minor units or a decimal library. `getRandomInt` is `Math.random`-based and inclusive at both ends — see `crypto` or `security` for anything an attacker should not be able to predict.

```ts
import { sum, average, roundTo, clamp, getRandomInt } from '@rtorcato/js-common/numbers'

sum([1, 2, 3, 4, 5])      // 15
average([10, 20, 30])     // 20
roundTo(3.14159, 2)       // 3.14
clamp(42, 0, 10)          // 10
getRandomInt(1, 6)        // e.g. 4
```

## See also

- [math](./math.md) — add, subtract, multiply, divide
- [random](./random.md) — random ints, floats, strings and array picks
- [formatting](./formatting.md) — padding, thousands separators, percentages
- [currency](./currency.md) — price formatting, parsing and currency codes
