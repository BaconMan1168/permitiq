---

name: frontend-design
description: Create distinctive, production-grade frontend UI while STRICTLY enforcing docs/DESIGN_SYSTEM.md. Creative direction allowed only within system constraints.
------------------------------------------------------------------------------------------------------------------------------------------------------------------------

# FRONTEND DESIGN — PERMITIQ

## Authority (Highest → Lowest)

1. docs/DESIGN_SYSTEM.md (SOURCE OF TRUTH)
2. Hard Constraints below
3. Creative direction guidelines

If conflict occurs → DESIGN SYSTEM WINS.

---

## Required Workflow (ALWAYS)

### 1. Load Design System

Read `docs/DESIGN_SYSTEM.md` fully.
All tokens and rules are immutable.

### 2. Choose Design Direction

Pick ONE intentional aesthetic (calm productivity, editorial minimal, refined, industrial, etc.).
Design must feel deliberate — never generic.

### 3. Token Mapping (MANDATORY)

Translate ALL design ideas into existing tokens BEFORE coding.

Examples:

* background → `bg-0`
* card → `surface-0`
* spacing → 8px scale only
* animation → fast/normal/slow/page

If a concept cannot use existing tokens:
→ ASK for permission before changing system.

### 4. Implementation

Produce production-ready UI:

* real code (HTML/CSS/React/etc.)
* accessible defaults
* loading + error states
* reusable structure

### 5. Compliance Pass (REQUIRED)

Before responding, verify:

* no hex/RGB/arbitrary values
* only defined spacing/radii/shadows
* modular typography only
* accent ≤10% viewport
* motion rules respected

Auto-fix violations before output.

---

## Hard Constraints (Never Violate)

* Tokens only — never invent values
* 8px spacing system only
* Defined radii/shadows only
* Accent color used sparingly
* Prefer monochrome structure
* Gradients only with analogous colors
* Do NOT modify tokens silently

---

## Governance Rule

If a request conflicts with the design system:
STOP and ask:

“Approve design system change?”

Provide:

* reason
* affected tokens
* visual impact

Wait for confirmation before proceeding.

---

## Creative Guidance

Designs must feel intentional and memorable.
Avoid generic AI aesthetics, default layouts, or random styling.
Elegance comes from restraint and consistency.

END SKILL
