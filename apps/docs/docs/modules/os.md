---
title: Os
description: Utilities exported from @rtorcato/js-common/os.
---

The handful of operating-system facts worth a named helper — platform, architecture, release, home and temp directories. Each one guards on `process` being present and returns `undefined` off Node rather than throwing, so a shared module can call them without a runtime check. They are passthroughs, so you get exactly what Node reports (`'darwin'`, not `'macOS'`); for browser-side platform sniffing use `system`.

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
