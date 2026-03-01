# CLAUDE.md — PermitIQ (Repo Operating Guide)

**Purpose**
This file defines the operating rules for Claude Code in this repository to produce:
- small, safe, consistent changes
- minimal token usage
- deterministic behavior (especially the sequencing engine)
- no secrets committed to git

**Non-negotiables**
- Never commit secrets.
- Keep PRs small.
- Do not refactor unrelated code.
- Follow folder boundaries strictly.
- Run checks before every commit.
- Never say "co authored by claude" in any commit messages

---

## 1) Project Overview

**PermitIQ** helps SMB founders (MVP: **Singapore**) discover required permits, generate a **deterministic permit sequence**, and track permit progress + renewals. The long-term goal is compliance infrastructure, but the MVP is permit discovery + workflow tracking.

Core value = **structured regulatory database + rules evaluation + dependency graph sequencing + tracking dashboard**.

---

## 2) Product Requirements (PRD Summary)

MVP scope:
- Singapore only
- 5 verticals:
  - Restaurant / Café
  - Retail shop
  - Tuition center
  - Beauty salon
  - Home-based food business

Core deliverables:
- Business setup wizard (profile + conditional questions)
- Permit stack generator (permit metadata: authority, cost, processing time, docs, URL, renewal, last verified)
- Smart sequence engine (dependency graph + deterministic topological sort + cycle detection)
- Dashboard tracking (status + dates + uploads + cost summary + renewal deadlines)
- Basic renewal reminders (idempotent job endpoint)
- Admin panel (internal CMS for permits/rules/deps + update logs)
- Stripe payments + feature gating

---

## 3) Tech Stack

### Frontend (`frontend/`)
- Next.js (App Router) + TypeScript
- Tailwind CSS
- React Query
- Zod for validation
- Optional: react-hook-form for forms

### Backend (`backend/`)
- Express.js + TypeScript
- REST API
- Prisma ORM
- Zod request validation
- Stripe (Checkout + Webhooks)

### Shared
- `packages/core`: rules evaluation + sequencing engine + shared types
- `packages/db`: Prisma schema, migrations, seed scripts

### Data / Auth / Storage
- Supabase Postgres
- Supabase Auth (JWT)
- Supabase Storage (uploads)

---

## 4) Architecture Decisions (ADR-lite)

1) **Strict boundaries**
- UI lives in `frontend/`
- API lives in `backend/`
- Sequencing + rules logic lives in `packages/core/` (no business logic in UI)
- Prisma schema/migrations/seed live in `packages/db/`

2) **Backend is source of truth**
- Frontend does not directly query Postgres.
- Frontend uses Supabase Auth to obtain a JWT.
- Backend verifies JWT and enforces ownership for all resources.

3) **Deterministic sequencing**
- Same business input + same regulatory dataset => same output order.
- Stable tie-breaking in topological sort.
- Detect cycles and return a human-readable cycle explanation.
- No LLM-based interpretation for rules evaluation.

4) **Regulatory updates are auditable**
- Admin edits must write to `RegulatoryUpdateLogs`.
- Permit entries must show `last_verified_at`.

---

## 5) Folder Structure

Top-level allowed directories:
- `frontend/`
- `backend/`
- `packages/`
- `docs/`
- `claude/`
- `.github/`

Claude must NOT invent new top-level folders without explicit instruction.

---

## 6) Design System & UI Guidelines

### Canonical design spec
The design system is defined in:
- `docs/DESIGN_SYSTEM.md`

### Enforcement rules (critical)
Claude must:
- Use ONLY the tokens/constraints in `docs/DESIGN_SYSTEM.md`.
- Never invent new colors, spacing, radii, shadows, typography values, or animation timings.
- Never modify design tokens without explicit approval.
- If a requested UI conflicts with the system, ask before proceeding.

Implementation expectations:
- Tailwind-based implementation is acceptable, but must remain token-driven.
- Prefer central tokens (CSS variables / Tailwind theme extensions) rather than scattered arbitrary values.
- Always include loading/error states and accessible defaults.

---

## 7) Code Style & Naming Conventions

General:
- TypeScript strict (avoid `any` unless justified)
- Prefer small functions and clear names
- Avoid clever code; prefer explicit and testable

Naming:
- React components: `PascalCase.tsx`
- Utility files: `kebab-case.ts`
- Variables/functions: `camelCase`

API conventions:
- REST endpoints use nouns: `/businesses`, `/permits`
- Consistent error shape:
  - `{ error: { code: string, message: string, details?: unknown } }`

Commits:
- Conventional commits only: `feat:`, `fix:`, `chore:`, `docs:`, `test:`, `refactor:`

---

## 8) Dependency Rules (Allowed / Disallowed)

Allowed (preferred):
- `zod`
- `@tanstack/react-query`
- `date-fns` (choose this for date handling; avoid adding a second date library)
- `stripe`
- a JSON-logic evaluator (e.g., `json-logic-js`) for deterministic rule evaluation
- testing: `vitest` + `supertest` (backend), `vitest` (core)

Disallowed unless explicitly requested:
- Redux (use React Query + local state first)
- heavy UI frameworks that bypass token system
- direct DB access from frontend
- multiple competing validation libraries
- background job platforms (use idempotent job endpoints + scheduler first)

Rule:
- Do not add new deps without a short justification and alternatives considered.

---

## 9) Environment & Workflow

### Secrets
- `.env` is gitignored.
- `.env.example` is committed with placeholders.
- Never print secrets in logs or commit history.

### Required scripts (Claude must run these before committing)
- `pnpm -r lint`
- `pnpm -r typecheck`
- `pnpm -r test`

### Mandatory workflow for every task
1) Work on a feature branch:
   - `git checkout -b feat/<short-name>`
2) Make the smallest complete change.
3) Run checks (lint/typecheck/test).
4) Create ONE commit (unless migrations require a separate commit).
5) Summarize what changed + how to run.

Scope control:
- No large refactors.
- No unrelated formatting sweeps.
- Target small PRs (roughly <= 30 files changed).

---

## 10) Testing Strategy

Minimum coverage for MVP:

`packages/core`:
- rule evaluation tests
- deterministic ordering tests
- cycle detection tests

`backend`:
- auth middleware tests
- request validation tests (happy + failure)
- integration test for permit plan generation endpoint

`frontend`:
- optional early; focus on runtime stability and typed props
- add E2E later if needed

Definition of done:
- tests updated/added where logic is non-trivial
- all checks pass locally before commit

---

## 11) Performance Constraints

- Typical API response target: <500ms
- Avoid N+1 queries; use Prisma includes/selects
- Keep payloads minimal; paginate admin lists if necessary
- Sequencing runs in-memory; must be fast and deterministic

---

## 12) Security Rules

- Backend must verify Supabase JWT for protected routes.
- Enforce ownership checks on every business resource.
- Validate all inputs with Zod.
- Stripe webhook must verify signature.
- Upload paths must be scoped by user and business:
  - `user/{userId}/business/{businessId}/permit/{businessPermitId}/...`

---

## 13) Deployment Strategy (MVP)

Recommended:
- Frontend: Vercel
- Backend: Railway (Express-friendly)
- DB/Auth/Storage: Supabase

Requirements:
- Backend must provide `GET /health`
- Migrations are run as part of release (document in `packages/db/README.md`)
- Webhook endpoints must be stable and environment-configured

---

## 14) Output Expectations for Claude

For implementation tasks, Claude must:

1) Restate the task briefly (1–3 lines).
2) Provide a short plan (bullets).
3) List files to be created/modified.
4) Implement changes.
5) Run checks (`pnpm -r lint`, `pnpm -r typecheck`, `pnpm -r test`) and report results.
6) Make a commit with the requested conventional message.
7) Provide:
   - how to run locally
   - routes added/changed
   - migrations/seed steps (if any)
   - follow-ups (if any)

Claude must avoid:
- long explanations
- unnecessary refactors
- adding dependencies without justification
- inventing new design tokens or UI styles outside `docs/DESIGN_SYSTEM.md`

## 15) Documentation Use

- Always reference latest stable documentation.
- Prefer official documentation over blogs.
- Verify package versions before implementation.
- Search documentation when unsure instead of guessing APIs.

