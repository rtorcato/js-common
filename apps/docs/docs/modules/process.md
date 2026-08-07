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
