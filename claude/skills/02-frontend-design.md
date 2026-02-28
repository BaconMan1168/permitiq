# 02 — Frontend Design System

## Hard Constraints (Never Violate)

- [ ] Only defined colors — no hex, no arbitrary HSL
- [ ] Only 8px spacing increments (8 16 24 32 40 48 56 64 80 96 120)
- [ ] Only defined radii (xs=8 sm=12 md=16 lg=20 xl=24 pill=999)
- [ ] Only modular type scale (xs=12 sm=14 base=16 md=20 lg=25 xl=31 2xl=39 3xl=49 4xl=61)
- [ ] Only defined shadows (shadow-1 shadow-2 shadow-3)
- [ ] Accent color ≤ 10% viewport usage
- [ ] No new tokens without explicit approval

## Color Quick Reference

```
bg-0  hsl(220,18%,8%)   — page bg
bg-1  hsl(220,16%,11%)  — elevated bg
surface-0 hsl(220,12%,16%) — cards
accent-primary hsl(40,85%,58%) — CTA only
success hsl(150,45%,48%)
warning hsl(40,85%,58%)
error   hsl(0,65%,55%)
```

## Component Templates

### Button — Primary
```
bg: accent-primary | text: bg-0 | radius: pill
padding: 16px 24px | shadow: shadow-1
```

### Button — Secondary
```
bg: surface-1 | border: border-subtle | text: text-primary
```

### Card
```
bg: surface-0 | radius: radius-lg | padding: 24px | shadow: shadow-2
hover → surface-1
```

### Glass Surface
```
bg: surface-0 | backdrop-blur: 20px
border: 1px solid border-subtle | shadow: shadow-2
```

## Animation Rules

| Token | Value |
|---|---|
| fast | 120ms |
| normal | 180ms |
| slow | 280ms |
| page | 420ms |

- Scale max on hover: 1.02
- translateY max: -2px
- On press: scale 0.97–0.99
- Forbidden: bounce, spring, rotation, flashing

## Definition of Done

- [ ] No arbitrary color / spacing / radius / shadow values
- [ ] Loading + error states present
- [ ] Accessible defaults (aria, focus states)
- [ ] Token-driven via CSS vars or Tailwind theme extensions
- [ ] No design tokens modified without approval
