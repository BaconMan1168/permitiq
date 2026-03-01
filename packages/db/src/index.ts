import 'dotenv/config'
import { PrismaClient } from './generated/client/client.js'
import { PrismaPg } from '@prisma/adapter-pg'

function createClient() {
  const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  })
  return new PrismaClient({ adapter })
}

// Singleton: reuse across hot-reloads in development
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined }

export const prisma = globalForPrisma.prisma ?? createClient()

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

// Re-export types, enums, and input types from the generated client
export * from './generated/client/client.js'
