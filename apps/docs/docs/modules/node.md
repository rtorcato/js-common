---
title: Node
description: Utilities exported from @rtorcato/js-common/node.
---

```ts
import { getNodeMajorVersion, getProcessUptime, isNode } from '@rtorcato/js-common/node'
```

## Exports

| Name | Summary |
| --- | --- |
| `getNodeMajorVersion` | Returns the current Node.js major version as a number. |
| `getProcessUptime` | Returns the process uptime in seconds. |
| `isNode` | Checks if the current environment is Node.js. |
| `nodeVersionCheck` | Checks if the current Node.js version is less than the specified version. |
| `requireOptional` | Attempts to require a module, returning `undefined` if the module is not found. |

## See also

- [process](./process.md) — cwd, pid, uptime, exit, CI detection
- [os](./os.md) — platform, arch, home and temp directories
- [env](./env.md) — read env vars and branch on `NODE_ENV`
- [system](./system.md) — detect OS, mobile platform and touch support
