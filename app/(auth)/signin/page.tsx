import Link from 'next/link'
import { AuthForm } from '@/components/auth/auth-form'

export default function Page() {
  return (
    <section className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Sign in</h1>
        <p className="text-sm text-muted-foreground">
          Don\'t have an account? <Link href="/signup" className="underline">Sign up</Link>
        </p>
      </div>
      <AuthForm mode="signin" />
    </section>
  )
}

