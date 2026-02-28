# 07 — Data Seeding

## Seed Location

```
packages/db/seed.ts   (or prisma/seed.ts)
```

## MVP Seed Scope

Verticals to seed (Singapore only):
- [ ] Restaurant / Café
- [ ] Retail shop
- [ ] Tuition center
- [ ] Beauty salon
- [ ] Home-based food business

Per permit, seed:
- [ ] `name` — official permit name
- [ ] `authorityId` — issuing authority
- [ ] `jurisdictionId` — Singapore
- [ ] `cost` — fee in SGD
- [ ] `processingTime` — estimated days
- [ ] `renewalFrequency` — yearly / 2yr / none
- [ ] `description`
- [ ] `applicationUrl`
- [ ] `lastVerifiedAt` — date of research

## Seed Run Command

```bash
cd packages/db
pnpm prisma db seed
```

## Idempotency Rules

- [ ] Use `upsert` not `create` — safe to re-run
- [ ] Stable IDs (cuid or slug-based) for upsert keys
- [ ] Seed must not fail if records already exist

## Seed Template

```ts
await prisma.permit.upsert({
  where: { id: 'sg-food-license' },
  update: {},
  create: {
    id: 'sg-food-license',
    name: 'Food Shop Licence',
    cost: 195,
    processingTime: 14,
    lastVerifiedAt: new Date('2025-01-01'),
    // ...
  },
})
```

## Regulatory Data Rules

- [ ] Only data from official government sources
- [ ] Never seed unverified or estimated data as factual
- [ ] Include `lastVerifiedAt` on every permit
- [ ] Add `changeSummary` to `RegulatoryUpdateLogs` when updating

## Definition of Done

- [ ] Seed runs idempotently (`pnpm prisma db seed` twice = no error)
- [ ] All 5 verticals have at least 1 permit seeded
- [ ] Every permit has `lastVerifiedAt` set
- [ ] Sources documented in seed file comments
- [ ] `packages/db/README.md` includes seed instructions
