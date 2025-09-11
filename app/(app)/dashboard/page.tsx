import { createSupabaseServerClient } from '@/lib/supabase/server'

export default async function Page() {
  const supabase = createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <section className="space-y-4">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-muted-foreground">Welcome{user?.email ? `, ${user.email}` : ''}.</p>
    </section>
  )
}

