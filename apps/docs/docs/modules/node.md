---
title: Node
description: Utilities exported from @rtorcato/js-common/node.
---

Runtime questions about Node itself — is this Node, which major version, how long has the process been up — plus `requireOptional` for modules that may not be installed. The version helpers are for guarding features that need a floor and failing with a clear message instead of a cryptic crash deeper in. `requireOptional` returns `undefined` rather than throwing, which is the behaviour you want around optional peer dependencies.

## Example

```ts
import { getNodeMajorVersion, isNode, requireOptional } from '@rtorcato/js-common/node'

// Optional peer dependency: degrade instead of crashing on a missing module.
const pretty = requireOptional('pino-pretty')
if (!pretty) console.warn('pino-pretty not installed — logging as JSON')

// Fail at boot with a clear message rather than deep inside a request.
if (isNode() && getNodeMajorVersion() < 20) throw new Error('Node 20+ required')
```

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

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

<!-- /generated:exports -->

## See also

- [process](./process.md) — cwd, pid, uptime, exit, CI detection
- [os](./os.md) — platform, arch, home and temp directories
- [env](./env.md) — read env vars and branch on `NODE_ENV`
- [system](./system.md) — detect OS, mobile platform and touch support
