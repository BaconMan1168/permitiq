import 'dotenv/config'
import { defineConfig } from 'prisma/config'

// DATABASE_URL is required for migrate/db commands.
// prisma generate only reads the schema file and does not connect to the DB,
// so a fallback placeholder is safe for generate-only environments (CI without DB).
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    url: process.env.DATABASE_URL ?? 'postgresql://not-configured:5432/db',
  },
})
