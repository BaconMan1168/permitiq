import { createClient } from '@supabase/supabase-js'
import type { Request, Response, NextFunction } from 'express'
import type { User } from '@supabase/supabase-js'

// Singleton — initialised once at startup; does not hold connection state
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY! // service-role key — server-only, never exposed to browser
)

export interface AuthedRequest extends Request {
  user: User
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Missing token' } })
    return
  }

  try {
    const { data, error } = await supabase.auth.getUser(token)

    if (error || !data.user) {
      res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Invalid token' } })
      return
    }

    ;(req as AuthedRequest).user = data.user
    next()
  } catch {
    res.status(401).json({ error: { code: 'UNAUTHORIZED', message: 'Token verification failed' } })
  }
}
