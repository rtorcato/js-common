---
title: Generate a slug and keep it unique
description: Turn a title into a URL-safe slug, then make sure it does not collide with one you already published.
---

`slugify` turns "Café & Résumé" into `cafe-resume`. What it cannot know is that
you already have a `cafe-resume`. This recipe pairs
[`slugify`](../modules/strings.md) with [`unique`](../modules/arrays.md) to
produce a slug that is safe for a URL *and* free.

## The code

```ts
import { unique } from '@rtorcato/js-common/arrays'
import { slugify } from '@rtorcato/js-common/strings'

const MAX_SLUG_LENGTH = 60

/**
 * Slugifies a title and appends `-2`, `-3`, … until the result is not taken.
 * `taken` may contain duplicates — they are collapsed before the lookup.
 */
export function uniqueSlug(title: string, taken: string[] = []): string {
  const base = trimSlug(slugify(title)) || 'untitled'
  const used = new Set(unique(taken))

  if (!used.has(base)) return base

  let suffix = 2
  while (used.has(`${base}-${suffix}`)) suffix++
  return `${base}-${suffix}`
}

/** Cuts a slug to length without leaving a trailing or half-eaten hyphen. */
function trimSlug(slug: string): string {
  if (slug.length <= MAX_SLUG_LENGTH) return slug
  return slug.slice(0, MAX_SLUG_LENGTH).replace(/-[^-]*$/, '')
}
```

```ts
uniqueSlug('Café & Résumé') // "cafe-resume"
uniqueSlug('Hello World!', ['hello-world']) // "hello-world-2"
uniqueSlug('Hello World!', ['hello-world', 'hello-world-2']) // "hello-world-3"
uniqueSlug('🎉🎉🎉') // "untitled" — nothing slug-safe survives
```

The `|| 'untitled'` matters: `slugify` strips everything that is not
`[a-z0-9-]`, so a title made entirely of emoji, CJK characters, or punctuation
comes back as an empty string.

## Slugging a whole batch

Importing a list of posts hits a second kind of collision — two titles in the
same batch. Feed each result back into the taken list:

```ts
export function slugifyAll(titles: string[], taken: string[] = []): string[] {
  const seen = [...taken]
  return titles.map((title) => {
    const slug = uniqueSlug(title, seen)
    seen.push(slug)
    return slug
  })
}

slugifyAll(['Hello World', 'Hello, world!', 'Hello World'])
// ["hello-world", "hello-world-2", "hello-world-3"]
```

## Where `taken` comes from

Reading every existing slug into memory works up to a few thousand rows. Beyond
that, query the ones that could collide:

```sql
SELECT slug FROM posts WHERE slug = $1 OR slug LIKE $1 || '-%';
```

:::caution Uniqueness is the database's job
Two requests can generate `hello-world-2` at the same time and both pass the
check. Keep a `UNIQUE` constraint on the column, and retry with the next suffix
when the insert fails. The helper avoids collisions; the constraint prevents
them.
:::

If suffixes are not worth the round trip, append a short random token instead —
collisions become improbable rather than impossible, and no lookup is needed:

```ts
import { randomString } from '@rtorcato/js-common/random'

// Pass a lowercase alphabet — the default charset includes A–Z.
const token = randomString(6, 'abcdefghijklmnopqrstuvwxyz0123456789')
const slug = `${slugify(title)}-${token}` // "hello-world-a7f3k2"
```

## See also

- [strings](../modules/strings.md) — slugify, truncate, casing, emoji stripping
- [arrays](../modules/arrays.md) — chunk, unique, groupBy and other array helpers
- [random](../modules/random.md) — random ints, floats, strings and array picks
- [url](../modules/url.md) — parse, validate and edit URLs and query params
