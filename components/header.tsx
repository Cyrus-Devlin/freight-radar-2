import { createSupabaseServerClient } from '@/lib/supabase/server'
import { HeaderClient } from './header-client'

export async function Header() {
  const supabase = createSupabaseServerClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return <HeaderClient user={user} />
}

