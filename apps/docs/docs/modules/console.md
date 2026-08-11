---
title: Console
description: Utilities exported from @rtorcato/js-common/console.
---

Two blunt instruments for the console: clear it, or silence it. `disableConsole` replaces `console.log` with a no-op and only does so when `NODE_ENV` is `production`, so a stray debug log cannot leak into a shipped build while your local output stays intact. When you need the output back afterwards use `logging`'s `captureConsole`, and for anything structured use `logger`.

```ts
import { clearConsole, disableConsole } from '@rtorcato/js-common/console'
```

## Exports

| Name | Summary |
| --- | --- |
| `clearConsole` | Clears the console. |
| `disableConsole` | @fileoverview Console utility functions for logging and disabling console output in production. |

## See also

- [logging](./logging.md) — leveled logging and console capture
- [logger](./logger.md) — pre-configured Pino logger
- [env](./env.md) — read env vars and branch on `NODE_ENV`
