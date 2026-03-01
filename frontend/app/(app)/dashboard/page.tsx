import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { SignOutButton } from './sign-out-button'

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--bg-0)' }}>
      <div className="max-w-[1200px] mx-auto">
        <header className="flex items-center justify-between mb-16">
          <h1
            className="text-[25px] font-semibold"
            style={{ color: 'var(--text-primary)' }}
          >
            PermitIQ
          </h1>
          <SignOutButton />
        </header>

        <div
          className="p-6 rounded-[20px]"
          style={{
            backgroundColor: 'var(--surface-0)',
            boxShadow: '0 8px 24px hsla(220,20%,2%,0.35)',
          }}
        >
          <h2
            className="text-[20px] font-semibold mb-2"
            style={{ color: 'var(--text-primary)' }}
          >
            Dashboard
          </h2>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
            Logged in as {user.email}
          </p>
        </div>
      </div>
    </div>
  )
}
