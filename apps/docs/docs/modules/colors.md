---
title: Colors
description: Utilities exported from @rtorcato/js-common/colors.
---

Hex-string colour maths — conversion to and from RGB, lightening and darkening by a percentage, a contrast-aware text colour, and random colours. Hex is the only input format because it is what CSS, design tokens and config files already carry; there is no colour-space interpolation and no perceptual (OKLCH/LAB) maths. `randomColor` draws from `Math.random`, so treat its output as decoration, never as an identifier.

## Example

```ts
import { darken, isValidHex, lighten, matchingTextColor } from '@rtorcato/js-common/colors'

// One brand hex from a config file, a whole button state set out of it.
const brand = '#2f6feb'

isValidHex(brand)        // true
lighten(brand, 0.2)      // '#588bef' — 20% of the way to white (hover)
darken(brand, 0.2)       // '#2558bc' — 20% of the way to black (active)
matchingTextColor(brand) // '#fff' — whichever of black/white reads on it
```

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

```ts
import { darken, hexToRgb, isValidHex } from '@rtorcato/js-common/colors'
```

## Exports

| Name | Summary |
| --- | --- |
| `darken` | Darkens a hex color by a given percentage. |
| `hexToRgb` | Converts a hex color string to an RGB object. |
| `isValidHex` | Checks whether a string is a valid 3- or 6-digit hex colour. |
| `lighten` | Lightens a hex color by a given percentage. |
| `matchingTextColor` | Picks the readable text colour (`#000` or `#fff`) for a hex background. |
| `randomColor` | Generates a random hex color string. |
| `rgbToHex` | Converts RGB values to a hex color string. |

<!-- /generated:exports -->

## See also

- [random](./random.md) — random ints, floats, strings and array picks
- [geometry](./geometry.md) — 2D distance, angle, midpoint, hit-testing
- [numbers](./numbers.md) — sum, average, clamp, roundTo
