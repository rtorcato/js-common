---
title: Mime Types
description: Utilities exported from @rtorcato/js-common/mime-types.
---

```ts
import { FileExtension, MimeType, MimeValue } from '@rtorcato/js-common/mime-types'
```

## Exports

| Name | Summary |
| --- | --- |
| `FileExtension` | Union of every file extension string (e.g. `'pdf'`, `'png'`) present in the MIME-type database. |
| `MimeType` | Union of every MIME type string (e.g. `'application/json'`) present in the database. |
| `MimeValue` | Metadata record for a given `MimeType` — its `source`, associated `extensions`, and `compressible` flag. |
| `extensions` | Map from `MimeType` to its associated file extensions, populated from the database. |
| `lookup` | Lookup the MIME type for a file path/extension. |
| `mimeTypes` | Full MIME-type database keyed by `MimeType`, with `source`, `extensions`, and `compressible` metadata per entry. |
| `types` | Map from `FileExtension` to its canonical `MimeType`, populated from the database. |
