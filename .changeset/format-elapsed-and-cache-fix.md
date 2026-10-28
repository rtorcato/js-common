---
'@rtorcato/js-common': minor
---

Add `formatElapsed` to `time` for compact elapsed labels (#410). Fix `createTtlCache`: a `load` that throws synchronously now takes the `staleOnError` path, and a NaN or negative `ttlMs` throws a `RangeError` at creation instead of silently never caching (#409). Both merged after 6.1.0 under semantic-release and had not shipped yet.
