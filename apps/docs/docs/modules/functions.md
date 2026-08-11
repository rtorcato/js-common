---
title: Functions
description: Utilities exported from @rtorcato/js-common/functions.
---

Function decorators — `debounce`, `throttle`, `once` — plus `compose` and `pipe` for wiring functions together. The rate limiters wrap and return a new function rather than taking a config object, so they drop into an event handler in a single line. They are trailing-edge and timer-based with no `cancel` or `flush` handle; if you need to abandon work already in flight, pair them with `abortController`.

## Example

```ts
import { debounce, once, throttle } from '@rtorcato/js-common/functions'

// Search box: one request, 300ms after typing stops.
input.addEventListener('input', debounce(() => search(input.value), 300))

// Scroll handler: at most one call every 100ms.
window.addEventListener('scroll', throttle(() => updateProgress(), 100))

const connect = once(() => openSocket()) // later calls return the first result
```

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

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

<!-- /generated:exports -->

## See also

- [promises](./promises.md) — delay, timeout and settle helpers
- [sleep](./sleep.md) — await a fixed or random delay
- [events](./events.md) — add, remove and await events
- [abortController](./abortController.md) — cancel in-flight work with an `AbortSignal`
