import { Router } from 'express'
import { prisma } from '@permitiq/db'
import { requireAuth } from '../middleware/auth.js'
import type { AuthedRequest } from '../middleware/auth.js'
import type { Request, Response } from 'express'

const router = Router()

// GET /me — upserts and returns the calling user's UserProfile
router.get('/me', requireAuth, async (req: Request, res: Response) => {
  const { id } = (req as AuthedRequest).user

  try {
    const profile = await prisma.userProfile.upsert({
      where: { id },
      update: {}, // nothing to update yet — id is immutable
      create: { id },
    })

    res.json({ data: profile })
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error'
    res.status(500).json({ error: { code: 'INTERNAL_ERROR', message } })
  }
})

export default router
