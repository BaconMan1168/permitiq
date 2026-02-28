# 01 — Repo Conventions

## Folder Boundaries

| Layer | Folder | Owns |
|---|---|---|
| UI | `frontend/` | Next.js pages, components |
| API | `backend/` | Express routes, middleware |
| Logic | `packages/core/` | Rules engine, sequencing, shared types |
| DB | `packages/db/` | Prisma schema, migrations, seed |

## Naming Checklist

- [ ] React components → `PascalCase.tsx`
- [ ] Utility files → `kebab-case.ts`
- [ ] Variables / functions → `camelCase`
- [ ] REST endpoints → nouns: `/businesses`, `/permits`

## API Error Shape

```ts
{ error: { code: string; message: string; details?: unknown } }
```

## Dependency Rules

Allowed:
- `zod` — validation
- `@tanstack/react-query` — data fetching
- `date-fns` — dates (no second date lib)
- `stripe` — payments
- `json-logic-js` — rule evaluation
- `vitest` + `supertest` — testing

Disallowed without explicit approval:
- `redux`
- Direct DB access from frontend
- Multiple competing validation libs
- Background job platforms

## Adding a New Dependency

- [ ] State justification
- [ ] List alternatives considered
- [ ] Confirm no existing lib covers the need

## TypeScript Rules

- [ ] Strict mode on
- [ ] No `any` unless justified in comment
- [ ] Prefer small explicit functions over clever abstractions

## Definition of Done

- [ ] Code lives in the correct folder
- [ ] Naming conventions followed
- [ ] No new deps added without justification
- [ ] Error shape matches standard
- [ ] TypeScript strict — no unresolved `any`
