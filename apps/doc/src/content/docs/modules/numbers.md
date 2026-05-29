---
title: Numbers
description: Numeric utilities — sum, average, clamp, random.
sidebar:
  order: 3
---

```ts
import { sum, average, roundTo, clamp, getRandomInt } from '@rtorcato/js-common/numbers'

sum([1, 2, 3, 4, 5])      // 15
average([10, 20, 30])     // 20
roundTo(3.14159, 2)       // 3.14
clamp(42, 0, 10)          // 10
getRandomInt(1, 6)        // e.g. 4
```
