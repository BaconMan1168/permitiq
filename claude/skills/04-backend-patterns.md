# 04 — Backend Patterns

## Stack

- Express.js + TypeScript strict
- Prisma ORM (`packages/db`)
- Zod — request validation
- Supabase JWT — auth
- Stripe — payments

## Route Template

```ts
// backend/src/routes/<resource>.ts
router.get('/:id', requireAuth, async (req, res) => {
  const { id } = req.params
  // 1. ownership check
  // 2. db query with select/include (no N+1)
  // 3. return data
})
```

## Error Response Shape

```ts
res.status(4xx).json({
  error: { code: 'RESOURCE_NOT_FOUND', message: '...', details?: unknown }
})
```

## Middleware Checklist (per protected route)

- [ ] `requireAuth` — verifies Supabase JWT
- [ ] Ownership check — business belongs to `req.user.id`
- [ ] Zod parse on `req.body` / `req.query`
- [ ] Return standard error shape on failure

## Request Validation Pattern

```ts
const schema = z.object({ name: z.string().min(1) })
const parsed = schema.safeParse(req.body)
if (!parsed.success) return res.status(400).json({ error: { code: 'VALIDATION', ... } })
```

## Prisma Query Rules

- [ ] Use `select` or `include` — never fetch full objects blindly
- [ ] Avoid N+1: use nested `include` in one query
- [ ] Paginate admin lists (`take` / `skip`)
- [ ] Target response time < 500ms

## Health Endpoint

```ts
// Required
GET /health → 200 { status: 'ok' }
```

## Upload Path Convention

```
user/{userId}/business/{businessId}/permit/{businessPermitId}/
```

## Definition of Done

- [ ] Route uses `requireAuth` middleware
- [ ] Ownership enforced on all business resources
- [ ] Zod validation on request body/params
- [ ] Standard error shape returned
- [ ] No N+1 queries (use Prisma includes)
- [ ] `GET /health` exists and returns 200
