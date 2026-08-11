---
title: Try
description: Utilities exported from @rtorcato/js-common/try.
---

Go-style `Result` values for async code: `tryCatch` runs a function and hands back a success or failure branch instead of throwing. The point is the type system — a `Result` cannot be read without acknowledging the error branch, whereas a `try`/`catch` binding is `unknown` and easy to ignore. Use it where failure is an expected outcome, and keep throwing for genuinely exceptional states that no caller can sensibly handle.

```ts
import { Failure, Result, Success } from '@rtorcato/js-common/try'
```

## Exports

| Name | Summary |
| --- | --- |
| `Failure` | Error branch of a `Result` — carries a `null` value and an error of type `E`. |
| `Result` | Go-style discriminated union representing either a `Success<T>` or a `Failure<E>`, for async code that prefers explicit error returns over thrown exceptions. |
| `Success` | Successful branch of a `Result` — carries the value and a `null` error. |
| `isSuccess` | Type guard that narrows a `Result` to its `Success` branch when the error is `null`. |
| `tryCatch` | Run an async function and capture any thrown error into a `Result`, eliminating try/catch at the call site. |

## See also

- [errors](./errors.md) — assert, custom errors, message extraction
- [promises](./promises.md) — delay, timeout and settle helpers
- [abortController](./abortController.md) — cancel in-flight work with an `AbortSignal`
