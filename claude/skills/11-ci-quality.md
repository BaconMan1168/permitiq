# 11 — CI & Quality Gates

## Required Local Checks (Before Every Commit)

```bash
pnpm -r lint        # ESLint across all packages
pnpm -r typecheck   # tsc --noEmit across all packages
pnpm -r test        # vitest across packages/core + backend
```

All three must pass. Do not commit on failure.

## Testing Requirements by Package

### `packages/core`

- [ ] Rule evaluation — applies / does-not-apply per vertical
- [ ] Deterministic ordering — identical output on repeated runs
- [ ] Cycle detection — returns structured error with cycle path
- [ ] Edge cases: empty graph, single node, no matching rules

### `backend`

- [ ] `requireAuth` middleware — valid token, missing token, invalid token
- [ ] Zod validation — happy path, missing field, wrong type
- [ ] Permit plan generation endpoint — integration test
- [ ] Ownership checks — user cannot access another user's business

### `frontend`

- [ ] Optional at MVP; focus on typed props and runtime stability
- [ ] E2E added later (Playwright or similar)

## Test Tool Stack

```
vitest      — packages/core, backend unit/integration
supertest   — backend HTTP integration tests
```

## GitHub Actions (`.github/workflows/`)

Minimum CI job:
```yaml
- pnpm install
- pnpm -r lint
- pnpm -r typecheck
- pnpm -r test
```

## Performance Gate

- [ ] API responses target < 500ms
- [ ] Sequencing runs in-memory — no external calls during sort

## Security Checks

- [ ] No secrets in committed files
- [ ] `.env` in `.gitignore`
- [ ] `.env.example` committed with placeholders only

## Definition of Done

- [ ] `pnpm -r lint` exits 0
- [ ] `pnpm -r typecheck` exits 0
- [ ] `pnpm -r test` exits 0 (all suites pass)
- [ ] CI workflow passes on PR branch
- [ ] No `.env` or secret files staged
