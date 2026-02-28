# 00 — Mandatory Task Workflow

## Per-Task Checklist

- [ ] Restate task in 1–3 lines
- [ ] List files to create / modify
- [ ] Create feature branch: `git checkout -b feat/<short-name>`
- [ ] Make the smallest complete change
- [ ] Run checks (see §CI) before commit
- [ ] ONE commit per task (migrations may be separate)
- [ ] Summarize: routes changed, migrations needed, follow-ups

## Branch Naming

```
feat/<name>
fix/<name>
chore/<name>
docs/<name>
```

## Commit Template

```
<type>(<scope>): <short description>

- bullet of what changed
- bullet of why
```

Types: `feat` `fix` `chore` `docs` `test` `refactor`

## Scope Control Rules

- [ ] No refactors outside task scope
- [ ] No formatting sweeps
- [ ] No new top-level folders (allowed: `frontend/` `backend/` `packages/` `docs/` `claude/` `.github/`)
- [ ] PR target ≤ 30 files changed

## Required Checks Before Commit

```bash
pnpm -r lint
pnpm -r typecheck
pnpm -r test
```

## Output Format After Task

```
Task: <one line>
Files changed: <list>
Routes added/changed: <list or N/A>
Migrations: <yes/no + steps>
Run locally: <command>
Follow-ups: <list or none>
```

## Definition of Done

- [ ] Feature branch created
- [ ] Smallest complete change implemented
- [ ] `pnpm -r lint` passes
- [ ] `pnpm -r typecheck` passes
- [ ] `pnpm -r test` passes
- [ ] Conventional commit made
- [ ] Output summary provided
