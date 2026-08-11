---
title: Functions
description: Utilities exported from @rtorcato/js-common/functions.
---

Function decorators — `debounce`, `throttle`, `once` — plus `compose` and `pipe` for wiring functions together. The rate limiters wrap and return a new function rather than taking a config object, so they drop into an event handler in a single line. They are trailing-edge and timer-based with no `cancel` or `flush` handle; if you need to abandon work already in flight, pair them with `abortController`.

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
