---
title: Events
description: Utilities exported from @rtorcato/js-common/events.
---

Thin wrappers over the DOM `EventTarget` API — add a listener, dispatch a `CustomEvent`, await a single event as a promise. `on` returns its own removal function, so cleanup is a value you can store and call rather than a `removeEventListener` you must remember to mirror argument for argument. These are browser-side helpers; Node's `EventEmitter` is a different API and is not covered here.

## Example

```ts
import { emit, on, once } from '@rtorcato/js-common/events'

// `on` returns its own teardown, so cleanup is a value rather than a listener
// signature you have to mirror argument for argument.
const off = on(window, 'resize', () => relayout())
onUnmount(off)

await once(panel, 'transitionend')      // await a single event
emit(window, 'app:ready', { at: Date.now() }) // dispatch a CustomEvent
```

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

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

<!-- /generated:exports -->

## See also

- [abortController](./abortController.md) — cancel in-flight work with an `AbortSignal`
- [functions](./functions.md) — debounce, throttle, once, compose
- [promises](./promises.md) — delay, timeout and settle helpers
