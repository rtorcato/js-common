---
title: System
description: Utilities exported from @rtorcato/js-common/system.
---

**Runtime:** Node.js; degrades in browsers — probes for `process` / `window` / `navigator` and falls back instead of throwing

Operating-system detection. In Node every helper reads `process.platform` and is the supported path.

:::warning Browser detection is deprecated
The `navigator.userAgent` branches — and `isIOS`, `isAndroid` and `isTouchDevice`, which only ever return `true` in a browser — are deprecated and go in the next major. Browser code belongs to [`@rtorcato/browser-common`](https://github.com/rtorcato/browser-common); the two packages do not overlap.
:::

## Example

```ts
import { getPlatform, isMacOs } from '@rtorcato/js-common/system'

// Label a shortcut the way this platform writes it.
const shortcut = isMacOs() ? '⌘K' : 'Ctrl+K'

getPlatform() // 'macos' | 'windows' | 'linux' | ... from process.platform
```

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

```ts
import { getPlatform, isLinux, isMacOs } from '@rtorcato/js-common/system'
```

## Exports

| Name | Summary |
| --- | --- |
| `getPlatform` | Returns a string representing the detected platform. |
| `isAndroid` | **Deprecated.** Browser detection belongs to `@rtorcato/browser-common`; removed in the next major. Checks if the device is running Android. |
| `isIOS` | **Deprecated.** Browser detection belongs to `@rtorcato/browser-common`; removed in the next major. Checks if the device is running iOS. |
| `isLinux` | Checks if the current OS is Linux. |
| `isMacOs` | Checks if the current OS is macOS. |
| `isTouchDevice` | **Deprecated.** Browser detection belongs to `@rtorcato/browser-common`; removed in the next major. Checks if the device supports touch events. |
| `isWindows` | Checks if the current OS is Windows. |

<!-- /generated:exports -->

## See also

- [os](./os.md) — platform, arch, home and temp directories
- [node](./node.md) — Node version checks and optional requires
- [env](./env.md) — read env vars and branch on `NODE_ENV`
- [process](./process.md) — cwd, pid, uptime, exit, CI detection
