---
title: Retry an async operation with exponential backoff
description: Use retry from promises — exponential backoff, full jitter, a cap, a rule for which errors are worth retrying, and an AbortSignal.
---

A flaky upstream deserves a second attempt; a `404` does not. Retry is easy to
get wrong in the same three ways — no way to cancel, no jitter, and retrying
errors that will never recover. [`retry`](../modules/promises.md) handles all
three.

## The code

```ts
import { retry } from '@rtorcato/js-common/promises'

const report = await retry(() => getJson<Report>('/api/report'))
```

`retry` resolves with the first success. If every attempt fails it rejects with
the last error, so wrap it in [`tryCatch`](../modules/try.md) if you would rather
branch on a `Result` than catch:

```ts
import { isSuccess, tryCatch } from '@rtorcato/js-common/try'

const result = await tryCatch(() => retry(() => getJson<Report>('/api/report')))

if (isSuccess(result)) {
  render(result.data)
} else {
  logger.error({ err: result.error }, 'report fetch failed after 4 attempts')
}
```

The defaults are `retries: 3` (four attempts in all), `minDelay: 100`,
`maxDelay: 10_000` and `jitter: true`. `fn` receives the 1-based attempt number
and the caller's signal.

## Why jitter

Without it, every client that failed at the same moment retries at the same
moment — the thundering herd that keeps a recovering service down. `retry` uses
full jitter: before retry *n* it waits a random time between 0 and
`min(maxDelay, minDelay * 2 ** (n - 1))`. With the defaults the caps are 100,
200, then 400 ms.

`maxDelay` is what stops the doubling from running away: retry 10 would
otherwise wait about 50 seconds. Pass `jitter: false` to wait the full cap —
useful in tests, rarely in production.

## Retry the right errors

Retrying a `400` just fails four times more slowly. Pass `shouldRetry` to
retry only what a retry can fix — network failures, `429`, and `5xx`. Returning
`false` rejects straight away with that error:

```ts
class HttpError extends Error {
  constructor(readonly status: number) {
    super(`HTTP ${status}`)
  }
}

const report = await retry(() => fetchReport(), {
  shouldRetry: (error) =>
    !(error instanceof HttpError) || error.status === 429 || error.status >= 500,
})
```

:::caution Only retry idempotent work
A `GET` or a `PUT` is safe to repeat. A `POST` that charges a card is not — a
timeout does not tell you whether the server processed the request. Retry those
only behind an idempotency key.
:::

## Bound each attempt

Backoff does not help if a single attempt hangs forever.
[`withTimeout`](../modules/promises.md) caps one attempt; `retries` caps the
whole operation:

```ts
import { retry, withTimeout } from '@rtorcato/js-common/promises'

const report = await retry(() => withTimeout(fetchReport(), 5_000), { retries: 2 })
```

Worst case here is 3 × 5 s of work plus the backoff waits — a number you can
put in a timeout budget.

## Let the caller cancel

Pass a `signal`. It is handed to `fn` so the in-flight request can be
cancelled, it cuts the backoff wait short, and it stops any further attempt —
`retry` then rejects with `signal.reason`:

```ts
import { createAbortController } from '@rtorcato/js-common/abortController'
import { retry } from '@rtorcato/js-common/promises'

const { controller, signal } = createAbortController()

const report = await retry((_attempt, signal) => fetch('/api/report', { signal }), { signal })

// Elsewhere — the user navigated away:
controller.abort()
```

## See also

- [promises](../modules/promises.md) — retry, timeout and error-as-value adapters
- [sleep](../modules/sleep.md) — plain, random and abortable waits
- [try](../modules/try.md) — `Result` values instead of thrown exceptions
- [abortController](../modules/abortController.md) — cancel in-flight work with an `AbortSignal`
- [Debounce a search input](./debounce-a-search-input.md)
