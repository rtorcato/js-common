---
title: Os
description: Utilities exported from @rtorcato/js-common/os.
---

The handful of operating-system facts worth a named helper — platform, architecture, release, home and temp directories. Each one guards on `process` being present and returns `undefined` off Node rather than throwing, so a shared module can call them without a runtime check. They are passthroughs, so you get exactly what Node reports (`'darwin'`, not `'macOS'`); for browser-side platform sniffing use `system`.

`getOsPlatform` is deprecated: use [`getProcessPlatform`](./process.md) instead. It stays as a delegating alias so nothing breaks today, but new code should not reach for it.

## Example

```ts
import { getHomeDir, getOsArch, getTmpDir } from '@rtorcato/js-common/os'

// Off Node these return `undefined` instead of throwing, so a module shared with
// the browser can call them without a runtime guard.
const cacheDir = `${getHomeDir() ?? getTmpDir()}/.myapp`

getOsArch() // 'arm64' | 'x64' — Node's own strings, unmapped
```

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

```ts
import { getHomeDir, getOsArch, getOsRelease } from '@rtorcato/js-common/os'
```

## Exports

| Name | Summary |
| --- | --- |
| `getHomeDir` | Returns the user's home directory (Node.js only). |
| `getOsArch` | Returns the OS architecture (Node.js only). |
| `getOsPlatform` | **Deprecated.** Use `getProcessPlatform` from `@rtorcato/js-common/process`. Returns the current operating system platform (Node.js only). |
| `getOsRelease` | Returns the OS release/version (Node.js only). |
| `getTmpDir` | Returns the system's temporary directory (Node.js only). |

<!-- /generated:exports -->

## See also

- [node](./node.md) — Node version checks and optional requires
- [process](./process.md) — cwd, pid, uptime, exit, CI detection
- [system](./system.md) — detect OS, mobile platform and touch support
- [env](./env.md) — read env vars and branch on `NODE_ENV`
