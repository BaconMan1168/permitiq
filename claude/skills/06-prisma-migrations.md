# 06 — Prisma Migrations

## Workspace Location

```
packages/db/
  prisma/
    schema.prisma
    migrations/
  seed.ts
```

## Migration Workflow

```bash
# 1. Edit schema.prisma
# 2. Generate migration
cd packages/db
pnpm prisma migrate dev --name <descriptive-name>

# 3. Apply to production
pnpm prisma migrate deploy

# 4. Generate client (auto on migrate dev)
pnpm prisma generate
```

## Schema Checklist (per new model)

- [ ] `id` field as `@id @default(cuid())`
- [ ] `createdAt DateTime @default(now())`
- [ ] `updatedAt DateTime @updatedAt`
- [ ] Foreign keys with `@relation`
- [ ] Indexes on fields used in `where` filters
- [ ] `lastVerifiedAt` on Permit model

## Key Models Reference

```
Users → Businesses → BusinessPermits
Permits → PermitRules → Dependencies
Authorities, Jurisdictions
RegulatoryUpdateLogs (every admin change)
```

## Migration Rules

- [ ] Descriptive name: `--name add-business-permit-status`
- [ ] Never edit existing migration files
- [ ] Run `prisma migrate deploy` as part of release
- [ ] Document migration steps in `packages/db/README.md`
- [ ] Separate commit for schema changes if needed

## Commit Convention for Migrations

```
chore(db): add <model-name> migration
```

## Definition of Done

- [ ] `prisma migrate dev` runs without error
- [ ] `prisma generate` completes
- [ ] Migration file committed (not hand-edited)
- [ ] `packages/db/README.md` updated with migration step
- [ ] No secrets in schema or migration files
