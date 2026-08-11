---
title: Colors
description: Utilities exported from @rtorcato/js-common/colors.
---

Hex-string colour maths — conversion to and from RGB, lightening and darkening by a percentage, a contrast-aware text colour, and random colours. Hex is the only input format because it is what CSS, design tokens and config files already carry; there is no colour-space interpolation and no perceptual (OKLCH/LAB) maths. `randomColor` draws from `Math.random`, so treat its output as decoration, never as an identifier.

```ts
import { darken, hexToRgb, isValidHex } from '@rtorcato/js-common/colors'
```

## Exports

| Name | Summary |
| --- | --- |
| `darken` | Darkens a hex color by a given percentage. |
| `hexToRgb` | Converts a hex color string to an RGB object. |
| `isValidHex` | Converts a hex color string to an HSL object. |
| `lighten` | Lightens a hex color by a given percentage. |
| `matchingTextColor` | Generates a random color with a given alpha value. |
| `randomColor` | Generates a random hex color string. |
| `rgbToHex` | Converts RGB values to a hex color string. |

## See also

- [random](./random.md) — random ints, floats, strings and array picks
- [geometry](./geometry.md) — 2D distance, angle, midpoint, hit-testing
- [formatting](./formatting.md) — padding, thousands separators, percentages
