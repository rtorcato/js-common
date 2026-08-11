---
title: Interval
description: Utilities exported from @rtorcato/js-common/interval.
---

Two functions: start a repeating timer, cancel it by id. They exist mainly to paper over the Node/browser split in what `setInterval` returns (`NodeJS.Timeout` versus `number`), so the same code type-checks in both. There is no drift correction and no awaiting of async callbacks — for a self-scheduling loop, `await sleep()` inside a `while` is clearer and gives you cancellation for free.

## Example

```ts
import { clearIntervalById, runInterval } from '@rtorcato/js-common/interval'

// Poll a job until it finishes. The id type is right in Node and the browser.
const id = runInterval(async () => {
  if ((await getStatus()).done) clearIntervalById(id)
}, 5_000)
```

The callback is not awaited, so a slow poll can overlap the next tick. For anything that must not
overlap, `await sleep(ms)` inside a `while` loop is clearer.

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

```ts
import { clearIntervalById, runInterval } from '@rtorcato/js-common/interval'
```

## Exports

| Name | Summary |
| --- | --- |
| `clearIntervalById` | Cancels an interval by its ID (cross-platform). |
| `runInterval` | Runs a function repeatedly at a specified interval (cross-platform). |

<!-- /generated:exports -->

## See also

- [sleep](./sleep.md) — await a fixed or random delay
- [promises](./promises.md) — delay, timeout and settle helpers
- [time](./time.md) — time-of-day parsing and `HH:MM:SS` formatting
- [date](./date.md) — calendar-day helpers — add, diff, compare, format
