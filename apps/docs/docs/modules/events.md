---
title: Events
description: Utilities exported from @rtorcato/js-common/events.
---

```ts
import { emit, on, once } from '@rtorcato/js-common/events'
```

## Exports

| Name | Summary |
| --- | --- |
| `emit` | Dispatches a custom event on the target. |
| `on` | Adds an event listener and returns a function to remove it. |
| `once` | Waits for a single event to occur and resolves a promise. |
| `preventDefault` | Prevents the default action for an event. |
| `stopPropagation` | Stops propagation for an event. |

## See also

- [abortController](./abortController.md) — cancel in-flight work with an `AbortSignal`
- [functions](./functions.md) — debounce, throttle, once, compose
- [promises](./promises.md) — delay, timeout and settle helpers
