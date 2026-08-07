---
title: Sleep
description: Utilities exported from @rtorcato/js-common/sleep.
---

```ts
import { sleep, sleepRandom, sleepSync } from '@rtorcato/js-common/sleep'
```

## Exports

| Name | Summary |
| --- | --- |
| `sleep` | Returns a promise that resolves after the specified number of milliseconds. |
| `sleepRandom` | Returns a promise that resolves after a random delay between min and max milliseconds. |
| `sleepSync` | Blocks the event loop for the specified number of milliseconds (synchronous sleep). |
| `sleepWithAbort` | Returns a promise that resolves after ms, or rejects if aborted via AbortSignal. |
