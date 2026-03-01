import 'dotenv/config'
import { PrismaClient } from '../src/generated/client/client.js'
import { PrismaPg } from '@prisma/adapter-pg'
import { readFileSync, existsSync } from 'node:fs'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  // Resolve seed file path relative to this script (ESM-safe)
  const seedUrl = new URL('../../../docs/data/seed_sg_permits.json', import.meta.url)

  if (!existsSync(seedUrl)) {
    console.log(`Seed file not found at ${seedUrl.pathname} — skipping.`)
    return
  }

  const raw = readFileSync(seedUrl, 'utf-8')
  const data = JSON.parse(raw) as {
    jurisdictions: unknown[]
    authorities: unknown[]
    permits: unknown[]
  }

  console.log(
    `Loaded seed file: ${data.jurisdictions?.length ?? 0} jurisdictions, ` +
      `${data.authorities?.length ?? 0} authorities, ` +
      `${data.permits?.length ?? 0} permits`
  )

  // TODO: implement upsert logic once seed_sg_permits.json is populated
  console.log('Seed upsert logic pending — populate docs/data/seed_sg_permits.json first.')
}

main()
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
