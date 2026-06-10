---
title: Date
description: Date utilities — today, formatting, day math.
sidebar_position: 2
---

```ts
import { today, formatDate, daysBetween, isLeapYear } from '@rtorcato/js-common/date'

today()                                  // "2026-05-28"
formatDate(new Date(), 'yyyy-MM-dd')     // "2026-05-28"
daysBetween('2026-01-01', '2026-05-28')  // 147
isLeapYear(2024)                         // true
```
