---
title: System
description: Utilities exported from @rtorcato/js-common/system.
---

Platform detection for client-side code — operating system, mobile platform, touch support. It reads `navigator.userAgent`, which is a heuristic and not a fact: browsers misreport, and iPadOS presents itself as macOS. Prefer feature detection where one exists, keep these for the cases where behaviour genuinely differs by platform (shortcut labels, store links), and use `os` or `process` on the server.

## Example

```ts
import { isMacOs, isTouchDevice } from '@rtorcato/js-common/system'

// Label a shortcut the way this platform writes it.
const shortcut = isMacOs() ? '⌘K' : 'Ctrl+K'

if (isTouchDevice()) enableSwipeGestures()
```

Both read `navigator`, so they are heuristics: iPadOS reports itself as macOS, and a laptop with a
touchscreen answers yes to `isTouchDevice`. Feature-detect where you can.

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

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

<!-- /generated:exports -->

## See also

- [os](./os.md) — platform, arch, home and temp directories
- [node](./node.md) — Node version checks and optional requires
- [env](./env.md) — read env vars and branch on `NODE_ENV`
- [process](./process.md) — cwd, pid, uptime, exit, CI detection
