---
title: Functions
description: Utilities exported from @rtorcato/js-common/functions.
---

```ts
import { compose, debounce, once } from '@rtorcato/js-common/functions'
```

## Exports

| Name | Summary |
| --- | --- |
| `compose` | Composes functions from right to left. |
| `debounce` | Returns a debounced version of a function. |
| `once` | Returns a function that only calls the original function once. |
| `pipe` | Pipes functions from left to right. |
| `throttle` | Returns a throttled version of a function. |

## See also

- [promises](./promises.md) — delay, timeout and settle helpers
- [sleep](./sleep.md) — await a fixed or random delay
- [events](./events.md) — add, remove and await events
- [abortController](./abortController.md) — cancel in-flight work with an `AbortSignal`
