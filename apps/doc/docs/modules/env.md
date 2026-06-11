---
title: Env
description: Utilities exported from @rtorcato/js-common/env.
---

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
