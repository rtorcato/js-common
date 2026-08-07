---
title: Logging
description: Utilities exported from @rtorcato/js-common/logging.
---

```ts
import { ConsoleLevel, captureConsole, error } from '@rtorcato/js-common/logging'
```

## Exports

| Name | Summary |
| --- | --- |
| `ConsoleLevel` | One of the four standard console methods used by `captureConsole`. |
| `captureConsole` | Captures all console output and returns a function to restore it. |
| `error` | Logs an error message. |
| `info` | Logs an info message. |
| `logWithTimestamp` | Logs a message with a timestamp. |
| `warn` | Logs a warning message. |
