# 09 — Admin CMS Panel

## Purpose

Internal tool for managing regulatory data: permits, rules, dependencies, costs, update logs.

## Access Control

- [ ] Admin routes require `requireAuth` + admin role check
- [ ] Ownership model: admin role stored in Supabase user metadata or DB role field
- [ ] Non-admins get `403` on all `/admin/*` routes

## Admin Route Prefix

```
backend: /admin/permits
         /admin/rules
         /admin/dependencies
         /admin/update-logs
```

## Audit Log Rule (Non-Negotiable)

Every admin write (create/update/delete) must insert a `RegulatoryUpdateLogs` record:

```ts
await prisma.regulatoryUpdateLog.create({
  data: {
    permitId,
    changeSummary: 'Updated cost from $195 to $220',
    updatedBy: req.user.id,
    updatedAt: new Date(),
  },
})
```

## Permit Edit Checklist

- [ ] Update `lastVerifiedAt` on every permit edit
- [ ] Write `RegulatoryUpdateLogs` entry
- [ ] Validate request body with Zod
- [ ] Return updated permit in response

## Admin List Endpoints

- [ ] Paginate results: `?page=1&limit=20` → `take` / `skip` in Prisma
- [ ] Return `{ data: [], total, page, limit }`

## Frontend Admin Checklist

- [ ] Admin pages under `/admin/*` route group
- [ ] Redirect non-admins to dashboard
- [ ] Show `lastVerifiedAt` on all permit rows
- [ ] Show `RegulatoryUpdateLogs` history per permit
- [ ] Loading + error states on all data tables

## Definition of Done

- [ ] All admin routes protected with auth + role check
- [ ] Every write creates a `RegulatoryUpdateLogs` entry
- [ ] `lastVerifiedAt` updated on permit edits
- [ ] List endpoints paginated
- [ ] Zod validation on all admin request bodies
- [ ] `403` returned for non-admin access attempts
