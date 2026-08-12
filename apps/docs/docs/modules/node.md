---
title: Node
description: Utilities exported from @rtorcato/js-common/node.
---

Runtime questions about Node itself — is this Node, which major version — plus `requireOptional` for modules that may not be installed. Process-level questions such as uptime, pid and cwd live in [process](./process.md). The version helpers are for guarding features that need a floor and failing with a clear message instead of a cryptic crash deeper in. `requireOptional` returns `undefined` rather than throwing, which is the behaviour you want around optional peer dependencies.

```ts
import { getNodeMajorVersion, isNode, requireOptional } from '@rtorcato/js-common/node'
```

## Exports

| Name | Summary |
| --- | --- |
| `getNodeMajorVersion` | Returns the current Node.js major version as a number. |
| `isNode` | Checks if the current environment is Node.js. |
| `nodeVersionCheck` | Checks if the current Node.js version is less than the specified version. |
| `requireOptional` | Attempts to require a module, returning `undefined` if the module is not found. |

## See also

- [process](./process.md) — cwd, pid, uptime, exit, CI detection
- [os](./os.md) — platform, arch, home and temp directories
- [env](./env.md) — read env vars and branch on `NODE_ENV`
- [system](./system.md) — detect OS, mobile platform and touch support
