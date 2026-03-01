# 05 — Auth: Supabase + JWT

## Architecture

```
Frontend → Supabase Auth → JWT
JWT → Backend Authorization header → requireAuth middleware → req.user
```

## Frontend Auth Checklist

- [ ] Use Supabase JS client for sign-in / sign-up / sign-out
- [ ] Retrieve session token via `supabase.auth.getSession()`
- [ ] Attach token: `Authorization: Bearer <access_token>`
- [ ] Refresh token automatically via Supabase client
- [ ] Never store raw tokens in manually managed localStorage

## Backend `requireAuth` Middleware Template

```ts
import { createClient } from '@supabase/supabase-js'

export async function requireAuth(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Missing token' } })
  const { data, error } = await supabase.auth.getUser(token)
  if (error || !data.user) return res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Invalid token' } })
  req.user = data.user
  next()
}
```

## Ownership Check Pattern

```ts
const business = await prisma.business.findFirst({
  where: { id, userId: req.user.id }  // always scope by userId
})
if (!business) return res.status(404).json({ error: { code: 'NOT_FOUND', message: '...' } })
```

## Security Rules

- [ ] JWT verified on every protected route
- [ ] Ownership enforced — never return data for other users
- [ ] Supabase secret keys only in `.env` (gitignored)
- [ ] No secrets printed in logs

## `.env.example` Template

```
SUPABASE_URL=https://[project-ref].supabase.co

SUPABASE_PUBLISHABLE_KEY=your-publishable-key

SUPABASE_SECRET_KEY=your-secret-key
```

## Definition of Done

- [ ] All protected routes use `requireAuth`
- [ ] All business queries scope by `userId`
- [ ] No Supabase keys committed to git
- [ ] Auth error returns `401` with standard error shape
- [ ] Token refresh handled client-side by Supabase SDK
