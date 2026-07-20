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
