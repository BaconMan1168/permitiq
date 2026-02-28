# 03 — Frontend Patterns

## Stack

- Next.js App Router + TypeScript strict
- Tailwind CSS (token-driven)
- `@tanstack/react-query` — server state
- `zod` — validation
- `react-hook-form` — forms (optional, only when needed)

## File Structure

```
frontend/
  app/             — Next.js App Router pages
  components/      — PascalCase.tsx shared components
  hooks/           — camelCase custom hooks
  lib/             — kebab-case utilities
  types/           — shared TS types (import from packages/core first)
```

## Data Fetching Checklist

- [ ] Use `useQuery` / `useMutation` from React Query
- [ ] Define query keys as constants
- [ ] Handle `isLoading`, `isError`, `data` states in every component
- [ ] No direct Postgres/Supabase DB calls from frontend
- [ ] All API calls go through `backend/` REST endpoints

## Form Pattern

```ts
// Zod schema first
const schema = z.object({ field: z.string().min(1) })
// react-hook-form + zodResolver
const { register, handleSubmit } = useForm({ resolver: zodResolver(schema) })
```

## Auth Pattern

- [ ] Obtain JWT from Supabase Auth client
- [ ] Pass as `Authorization: Bearer <token>` header
- [ ] Never store raw credentials in state or localStorage manually

## Component Checklist

- [ ] Loading state
- [ ] Error state with user-readable message
- [ ] Empty state
- [ ] Accessible (role, aria-label, keyboard nav)
- [ ] No business logic — delegate to `packages/core`

## Layout Rules

- Max width: 1200px centered
- 8px vertical rhythm
- Section spacing ≥ 64px
- Hero spacing ≥ 96px
- Component padding ≥ 16px

## Definition of Done

- [ ] Query keys defined as constants
- [ ] Loading / error / empty states handled
- [ ] No direct DB queries from UI
- [ ] Forms validated with Zod schema
- [ ] TypeScript strict — no unresolved `any`
- [ ] Token-compliant styles (see `02-frontend-design.md`)
