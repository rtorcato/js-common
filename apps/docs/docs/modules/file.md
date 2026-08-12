---
title: File
description: Utilities exported from @rtorcato/js-common/file.
---

Promise-based reads, writes, existence checks and deletes over `node:fs/promises`, plus a file-extension parser. Node-only, async-only and UTF-8 only — no sync variants and no encoding argument, since those are exactly the cases where you should reach for `node:fs` directly. `fileExists` answers a question about the past: the file can disappear before your next line runs, so where it matters, attempt the operation and handle the failure instead.

## Example

```ts
import {
  getFileExtension,
  readFileAsString,
  writeFileAsString,
} from '@rtorcato/js-common/file'

// Read, transform, write back — UTF-8 and promise-based, no fs boilerplate.
const raw = await readFileAsString('config.json')
await writeFileAsString('config.json', raw.replaceAll('http://', 'https://'))

getFileExtension('/tmp/report.tar.gz') // '.gz' — leading dot, like path.extname
```

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

```ts
import { deleteFile, fileExists, getFileExtension } from '@rtorcato/js-common/file'
```

## Exports

| Name | Summary |
| --- | --- |
| `deleteFile` | Deletes a file. |
| `fileExists` | Checks if a file exists. |
| `getFileExtension` | Gets the file extension from a file path. |
| `readFileAsString` | Reads a file as a string (UTF-8). |
| `writeFileAsString` | Writes a string to a file (UTF-8). |

<!-- /generated:exports -->

## See also

- [mime-types](./mime-types.md) — look up MIME types by file extension
- [node](./node.md) — Node version checks and optional requires
- [os](./os.md) — platform, arch, home and temp directories
- [process](./process.md) — cwd, pid, uptime, exit, CI detection
