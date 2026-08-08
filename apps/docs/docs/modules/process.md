---
title: Process
description: Utilities exported from @rtorcato/js-common/process.
---

```ts
import { exitProcess, getCwd, getProcessId } from '@rtorcato/js-common/process'
```

## Exports

| Name | Summary |
| --- | --- |
| `exitProcess` | Exits the process with the given code (Node.js only). |
| `getCwd` | Returns the current working directory (Node.js only). |
| `getProcessId` | Returns the current process ID (Node.js only). |
| `getProcessPlatform` | Returns the current process platform (Node.js only). |
| `getProcessUptime` | Returns the current process uptime in seconds (Node.js only). |
| `isCI` | Returns true if the process is running in a CI environment (Node.js only). |

## See also

- [node](./node.md) — Node version checks and optional requires
- [os](./os.md) — platform, arch, home and temp directories
- [env](./env.md) — read env vars and branch on `NODE_ENV`
- [console](./console.md) — clear or silence console output
