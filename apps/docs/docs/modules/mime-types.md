---
title: Mime Types
description: Utilities exported from @rtorcato/js-common/mime-types.
---

MIME-type lookup by file extension, plus the database behind it and its string-literal types. It is a vendored, TypeScript-ported subset of the `mime-types` package with `path.extname` removed, so it runs on edge runtimes where `node:path` is unavailable. `MimeType` and `FileExtension` are unions of every value in the database, which turns a typo into a compile error rather than a silent `false` at runtime.

## Example

```ts
import { lookup, type MimeType } from '@rtorcato/js-common/mime-types'

// Set Content-Type from an uploaded filename.
res.setHeader('Content-Type', lookup(upload.name) || 'application/octet-stream')

lookup('report.pdf') // 'application/pdf'
lookup('.png')       // 'image/png' — bare extensions work too
lookup('README')     // false

// A typo in a MimeType is a compile error, not a silent runtime `false`.
const accepted: MimeType[] = ['image/png', 'image/webp']
```

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

```ts
import { FileExtension, MimeType, MimeValue } from '@rtorcato/js-common/mime-types'
```

## Exports

| Name | Summary |
| --- | --- |
| `FileExtension` | Union of every file extension string (e.g. `'pdf'`, `'png'`) present in the MIME-type database. |
| `MimeType` | Union of every MIME type string (e.g. `'application/json'`) present in the database. |
| `MimeValue` | Metadata record for a given `MimeType` — its `source` and associated `extensions`. |
| `extensions` | Map from `MimeType` to its associated file extensions, populated from the database. |
| `lookup` | Lookup the MIME type for a file path/extension. |
| `mimeTypes` | Full MIME-type database keyed by `MimeType`, with `source` and `extensions` metadata per entry. |
| `types` | Map from `FileExtension` to its canonical `MimeType`, populated from the database. |

<!-- /generated:exports -->

## See also

- [file](./file.md) — read, write and delete files
- [fetch](./fetch.md) — JSON helpers and fetch with a timeout
- [url](./url.md) — parse, validate and edit URLs and query params
- [node](./node.md) — Node version checks and optional requires
