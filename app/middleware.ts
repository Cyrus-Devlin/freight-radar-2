import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next({ request: { headers: req.headers } })
  
  // Handle admin routes with separate cookie auth
  if (req.nextUrl.pathname.startsWith('/admin/email-submissions')) {
    // Check for admin cookie
    const adminAuth = req.cookies.get('admin-auth')?.value
    const adminPassword = process.env.ADMIN_PASSWORD
    
    if (!adminAuth || adminAuth !== adminPassword) {
      // Redirect to admin login
      const url = new URL('/admin/login', req.url)
      return NextResponse.redirect(url)
    }
    
    return res
  }
  
  // Handle dashboard routes with Supabase auth
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies: { get: (name) => req.cookies.get(name)?.value } }
    )

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      const url = new URL('/signin', req.url)
      return NextResponse.redirect(url)
    }
  }

  return res
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/email-submissions/:path*'],
}

