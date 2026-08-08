---
title: Os
description: Utilities exported from @rtorcato/js-common/os.
---

```ts
import { getHomeDir, getOsArch, getOsPlatform } from '@rtorcato/js-common/os'
```

## Exports

| Name | Summary |
| --- | --- |
| `getHomeDir` | Returns the user's home directory (Node.js only). |
| `getOsArch` | Returns the OS architecture (Node.js only). |
| `getOsPlatform` | Returns the current operating system platform (Node.js only). |
| `getOsRelease` | Returns the OS release/version (Node.js only). |
| `getTmpDir` | Returns the system's temporary directory (Node.js only). |

## See also

- [node](./node.md) — Node version checks and optional requires
- [process](./process.md) — cwd, pid, uptime, exit, CI detection
- [system](./system.md) — detect OS, mobile platform and touch support
- [env](./env.md) — read env vars and branch on `NODE_ENV`
