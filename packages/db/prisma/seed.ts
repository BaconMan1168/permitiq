import { PrismaClient } from '../src/generated/client'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

const prisma = new PrismaClient()

async function main() {
  const seedPath = join(__dirname, '../../../docs/data/seed_sg_permits.json')

  if (!existsSync(seedPath)) {
    console.log(`Seed file not found at ${seedPath} — skipping.`)
    return
  }

  const raw = readFileSync(seedPath, 'utf-8')
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
