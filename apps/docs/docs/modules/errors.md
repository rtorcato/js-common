---
title: Errors
description: Utilities exported from @rtorcato/js-common/errors.
---

Helpers for the error paths `try`/`catch` leaves awkward — asserting invariants, creating named errors, and pulling a message out of an `unknown` catch binding. TypeScript types a catch clause as `unknown`, so `getErrorMessage` exists to keep that narrowing out of every call site. When failure is an expected outcome rather than an exception, `try`'s `Result` tuples are usually the better shape.

```ts
import { assert, createCustomError, getErrorMessage } from '@rtorcato/js-common/errors'
```

## Exports

| Name | Summary |
| --- | --- |
| `assert` | Throws an error if the condition is false. |
| `createCustomError` | Creates a new Error with a custom name and message. |
| `getErrorMessage` | Gets the error message from an unknown error value. |
| `isErrorName` | Checks if an error is an instance of a specific error name. |
| `tryWithFallback` | Wraps a function and catches errors, returning a fallback value if an error occurs. |

## See also

- [try](./try.md) — `Result` tuples instead of thrown exceptions
- [promises](./promises.md) — delay, timeout and settle helpers
- [validation](./validation.md) — type guards — `isString`, `isNumber`, `isUrl`
- [logging](./logging.md) — leveled logging and console capture
