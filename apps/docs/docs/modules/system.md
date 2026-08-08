---
title: System
description: Utilities exported from @rtorcato/js-common/system.
---

```ts
import { getPlatform, isAndroid, isIOS } from '@rtorcato/js-common/system'
```

## Exports

| Name | Summary |
| --- | --- |
| `getPlatform` | Returns a string representing the detected platform. |
| `isAndroid` | Checks if the device is running Android. |
| `isIOS` | Checks if the device is running iOS. |
| `isLinux` | Checks if the current OS is Linux. |
| `isMacOs` | Checks if the current OS is macOS. |
| `isTouchDevice` | Checks if the device supports touch events. |
| `isWindows` | Checks if the current OS is Windows. |

## See also

- [os](./os.md) — platform, arch, home and temp directories
- [node](./node.md) — Node version checks and optional requires
- [env](./env.md) — read env vars and branch on `NODE_ENV`
- [process](./process.md) — cwd, pid, uptime, exit, CI detection
