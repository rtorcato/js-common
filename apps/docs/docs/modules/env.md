---
title: Env
description: Utilities exported from @rtorcato/js-common/env.
---

Reading environment variables and validating them, with Zod schemas doing the validating. `getENV` throws when a variable is missing and no default was given — failing loudly at startup beats an `undefined` surfacing three layers deep in a request. `isDev`, `isProd` and `isTest` are plain `NODE_ENV` string comparisons, so they are cheap enough to call anywhere.

## Example

```ts
import { checkEnv, isProd } from '@rtorcato/js-common/env'
import { z } from 'zod'

// Validate the whole environment once, at boot, and fail with a readable list
// of what is missing rather than an `undefined` three layers into a request.
const env = checkEnv(
  z.object({
    DATABASE_URL: z.string().url(),
    PORT: z.coerce.number().default(3000),
  })
)

env.PORT  // number — coerced and defaulted
isProd()  // NODE_ENV === 'production'
```

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

```ts
import { RootApiEnvSchema, checkEnv, getENV } from '@rtorcato/js-common/env'
```

## Exports

| Name | Summary |
| --- | --- |
| `RootApiEnvSchema` | Schema for validating the root environment variables. |
| `checkEnv` | Validates the environment variables against a Zod schema. |
| `getENV` | Retrieves the value of an environment variable by its key. |
| `getNodeEnv` | Returns the current NODE_ENV value, or 'development' if not set. |
| `isDev` | Determines if the current environment is set to development. |
| `isProd` | Determines if the current environment is set to production. |
| `isTest` | Determines if the current environment is set to test. |

<!-- /generated:exports -->

## See also

- [process](./process.md) — cwd, pid, uptime, exit, CI detection
- [node](./node.md) — Node version checks and optional requires
- [os](./os.md) — platform, arch, home and temp directories
- [console](./console.md) — clear or silence console output
