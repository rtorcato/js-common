---
title: Try
description: Utilities exported from @rtorcato/js-common/try.
---

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
