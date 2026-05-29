# TODO

Living checklist of issues, gaps, and improvements for `@rtorcato/js-common`. Items are ordered by severity — start at the top.

## Code organization

- [ ] **`src/types/` ships `.d.ts` only** (the `./types` export omits `import`, which is correct).
  - Fix: document the convention in `CLAUDE.md` so it isn't "fixed" by mistake.
- [ ] **Mixed arrow vs function declarations** across modules. Cosmetic; deferrable.
- [ ] **`any` usage** in CLI and a few generic wrappers (`flatten<T>(arr: any[])`, `toBoolean(value: any)`, `captureConsole(callback: (type: string, ...args: any[]) => void)`). `noExplicitAny` is intentionally off, but tighten where free.

## Documentation

- [ ] **No API reference site.** Optional, larger lift.
  - Fix (if pursued): TypeDoc → `docs/` published to GitHub Pages.
