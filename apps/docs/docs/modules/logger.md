---
title: Logger
description: Utilities exported from @rtorcato/js-common/logger.
---

A single pre-configured Pino logger: pretty-printed and colourised in development, plain JSON at `info` level in production. It is an opinionated default so applications stop rewriting the same transport wiring, and JSON in production is what log aggregators want to ingest. `pino-pretty` is an optional dependency and the logger probes for it, falling back to JSON rather than throwing; if you need custom levels, redaction or child loggers, construct your own Pino instance — this export is intentionally not configurable.

```ts
import { logger } from '@rtorcato/js-common/logger'
```

## Exports

| Name | Summary |
| --- | --- |
| `logger` | Pre-configured Pino logger — pretty-printed with colors in development, plain JSON at `info` level in production. |

## See also

- [logging](./logging.md) — leveled logging and console capture
- [console](./console.md) — clear or silence console output
- [env](./env.md) — read env vars and branch on `NODE_ENV`
