---
title: Errors
description: Utilities exported from @rtorcato/js-common/errors.
---

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
