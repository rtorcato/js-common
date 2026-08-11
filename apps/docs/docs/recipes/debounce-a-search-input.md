---
title: Debounce a search input
description: One request per pause in typing, stale responses discarded — debounce plus an AbortController.
---

A search box that fires a request per keystroke sends eight requests for
"debounce" and renders whichever one happens to land last. Two problems, two
fixes: [`debounce`](../modules/functions.md) collapses the keystrokes,
and an [`AbortController`](../modules/abortController.md) cancels the request
that a newer keystroke has made irrelevant.

## The code

```ts
import { createAbortController } from '@rtorcato/js-common/abortController'
import { debounce } from '@rtorcato/js-common/functions'
import { getErrorMessage } from '@rtorcato/js-common/errors'
import { tryCatch } from '@rtorcato/js-common/try'

export type SearchHit = { id: string; title: string }

export type SearchHandlers = {
  onResults: (hits: SearchHit[]) => void
  onError?: (message: string) => void
}

/**
 * Returns a function to call on every keystroke. It fires at most one request
 * per `wait` ms of quiet, and aborts any request still in flight.
 */
export function createSearch({ onResults, onError }: SearchHandlers, wait = 300) {
  let inFlight: AbortController | null = null

  async function run(query: string) {
    inFlight?.abort() // a newer query supersedes the old one
    const { controller, signal } = createAbortController()
    inFlight = controller

    const { data, error } = await tryCatch<SearchHit[]>(async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, { signal })
      if (!res.ok) throw new Error(`Search failed with ${res.status}`)
      return res.json()
    })

    // Aborted requests reject; that is expected, not an error worth surfacing.
    if (signal.aborted) return

    if (error) onError?.(getErrorMessage(error))
    else onResults(data)
  }

  return debounce((query: string) => {
    void run(query)
  }, wait)
}
```

Wire it to an input — the debounced function is created once, not per render:

```ts
const search = createSearch({
  onResults: (hits) => renderResults(hits),
  onError: (message) => renderError(message),
})

input.addEventListener('input', (event) => {
  search((event.target as HTMLInputElement).value)
})
```

In React, keep it in a `useMemo`/`useRef` so a re-render does not create a
fresh timer:

```tsx
const search = useMemo(() => createSearch({ onResults: setHits }), [])
```

## Why both

`debounce` alone still races. Type `ab`, pause 300 ms, type `c`: two requests
go out, and if the first is slower you render results for `ab` over results for
`abc`. The `signal.aborted` check is what makes the last keystroke win.

## Empty queries

Debouncing does not stop a request for `""` after the user clears the box. Guard
before calling:

```ts
input.addEventListener('input', (event) => {
  const query = (event.target as HTMLInputElement).value.trim()
  if (!query) {
    renderResults([])
    return
  }
  search(query)
})
```

## Throttle instead?

`debounce` waits for a pause — right for search, where only the final query
matters. [`throttle`](../modules/functions.md) fires at a steady maximum rate —
right for scroll, resize, and drag handlers, where you want continuous
(but bounded) updates rather than one at the end.

:::note No `.cancel()`
`debounce` returns a plain function with no `cancel` or `flush` method. To stop a
pending call, abort the work it would do — as above — or hold a flag the
callback checks after it fires. If you unmount mid-flight, call
`controller.abort()` in your cleanup.
:::

## See also

- [functions](../modules/functions.md) — debounce, throttle, once, compose
- [abortController](../modules/abortController.md) — cancel in-flight work with an `AbortSignal`
- [try](../modules/try.md) — `Result` values instead of thrown exceptions
- [fetch](../modules/fetch.md) — JSON helpers and fetch with a timeout
- [Retry an async operation with exponential backoff](./retry-with-exponential-backoff.md)
