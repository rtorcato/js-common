---
title: Geometry
description: Utilities exported from @rtorcato/js-common/geometry.
---

2D maths for points, rectangles and polygons — distance, angle, midpoint, area, and hit-testing. Coordinates are passed as plain numbers rather than `Point` or `Rect` objects, so nothing here needs a class, a canvas or an allocation per call, and it works equally for layout code, games and charts. Angles are radians to match `Math.atan2` and the Canvas API, and `distance2D` uses `Math.hypot`, which avoids overflow on large coordinates.

## Example

```ts
import { distance2D, pointInRect, polygonArea } from '@rtorcato/js-common/geometry'

// Hit-test a click against a box, in plain numbers — no Point/Rect classes.
const box = el.getBoundingClientRect()
pointInRect(event.clientX, event.clientY, box.left, box.top, box.width, box.height)

distance2D(0, 0, 3, 4)                // 5 — via Math.hypot, no overflow
polygonArea([[0, 0], [4, 0], [4, 3]]) // 6
```

<!-- generated:exports — do not edit; `pnpm docs:generate` rewrites this block -->

## Import

```ts
import { angle2D, distance2D, midpoint2D } from '@rtorcato/js-common/geometry'
```

## Exports

| Name | Summary |
| --- | --- |
| `angle2D` | Calculates the angle (in radians) between two points in 2D space. |
| `distance2D` | Calculates the distance between two points in 2D space. |
| `midpoint2D` | Calculates the midpoint between two points in 2D space. |
| `pointInRect` | Checks if a point is inside a rectangle. |
| `polygonArea` | Calculates the area of a polygon given its vertices (Shoelace formula). |
| `rectsOverlap` | Checks if two rectangles overlap. |

<!-- /generated:exports -->

## See also

- [math](./math.md) — add, subtract, multiply, divide
- [numbers](./numbers.md) — sum, average, clamp, roundTo
- [colors](./colors.md) — hex/RGB conversion, lighten, darken
