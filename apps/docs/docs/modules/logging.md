---
title: Logging
description: Utilities exported from @rtorcato/js-common/logging.
---

Dependency-free logging — leveled `info` / `warn` / `error` helpers, a timestamped log, and `captureConsole` for recording console output. It writes through the global `console`, so it adds nothing to a bundle and runs anywhere; `logger` is the structured, Pino-backed alternative for services. `captureConsole` returns a restore function, which makes it useful in tests and for buffering output around a noisy operation.

## Example

```ts
import { captureConsole, logWithTimestamp } from '@rtorcato/js-common/logging'

logWithTimestamp('cache warm', 'info') // '[2026-06-12T09:04:07.123Z] cache warm'

// Assert on what a noisy operation logged, then put the console back.
const lines: string[] = []
const restore = captureConsole((level, ...args) => lines.push(`${level}: ${args.join(' ')}`))
runImport()
restore()

expect(lines).toContain('warn: 3 rows skipped')
```

`captureConsole` still forwards to the real console, so output is recorded rather than swallowed.

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

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

<!-- /generated:exports -->

## See also

- [logger](./logger.md) — pre-configured Pino logger
- [console](./console.md) — clear or silence console output
- [errors](./errors.md) — assert, custom errors, message extraction
- [env](./env.md) — read env vars and branch on `NODE_ENV`
