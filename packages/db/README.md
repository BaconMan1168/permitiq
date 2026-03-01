# @permitiq/db

Prisma schema, migrations, and seed scripts for PermitIQ.

## Setup

Copy root `.env.example` to `.env` and fill in `DATABASE_URL` and `DIRECT_DATABASE_URL`
(Supabase connection strings).

## Common commands

All commands run from the **repo root** using `--filter`:

```bash
# Generate Prisma client (runs automatically on pnpm install)
pnpm --filter @permitiq/db generate

# Create a new migration (dev only)
pnpm --filter @permitiq/db migrate:dev --name <description>

# Apply pending migrations (production / CI)
pnpm --filter @permitiq/db migrate:deploy

# Run seed script
pnpm --filter @permitiq/db seed
```

Or `cd packages/db` and run `pnpm <script>` directly.

## Migration workflow

1. Edit `prisma/schema.prisma`
2. Run `migrate:dev --name <description>` → creates `prisma/migrations/<timestamp>_<name>/`
3. Commit the new migration file alongside the schema change
4. On deploy, run `migrate:deploy` (idempotent, safe to run repeatedly)

## Seed data

Populate `docs/data/seed_sg_permits.json` with Singapore regulatory data,
then run `pnpm --filter @permitiq/db seed`.

Format expected by the seed script:
```json
{
  "jurisdictions": [...],
  "authorities": [...],
  "permits": [...]
}
```

## Generated client

The Prisma client is generated into `src/generated/client/` on every `pnpm install`.
Do **not** commit `src/generated/` — it is gitignored and rebuilt automatically.
