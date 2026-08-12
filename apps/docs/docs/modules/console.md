---
title: Console
description: Utilities exported from @rtorcato/js-common/console.
---

Two blunt instruments for the console: clear it, or silence it. `disableConsole` replaces `console.log` with a no-op and only does so when `NODE_ENV` is `production`, so a stray debug log cannot leak into a shipped build while your local output stays intact. When you need the output back afterwards use `logging`'s `captureConsole`, and for anything structured use `logger`.

## Example

```ts
import { disableConsole } from '@rtorcato/js-common/console'

// At the entry point of a shipped bundle.
disableConsole() // no-ops console.log, but only when NODE_ENV === 'production'

console.log('debug noise') // silent in prod, still printed locally
```

Only `console.log` is replaced — `warn` and `error` keep working, because silencing those in
production is how incidents go unnoticed.

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

```ts
import { clearConsole, disableConsole } from '@rtorcato/js-common/console'
```

## Exports

| Name | Summary |
| --- | --- |
| `clearConsole` | Clears the console. |
| `disableConsole` | Disables console output in production environment. |

<!-- /generated:exports -->

## See also

- [logging](./logging.md) — leveled logging and console capture
- [logger](./logger.md) — pre-configured Pino logger
- [env](./env.md) — read env vars and branch on `NODE_ENV`
