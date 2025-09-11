import Link from 'next/link'
import { AuthForm } from '@/components/auth/auth-form'

export default function Page() {
  return (
    <section className="space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-semibold">Create your account</h1>
        <p className="text-sm text-muted-foreground">
          Already have an account? <Link href="/signin" className="underline">Sign in</Link>
        </p>
      </div>
      <AuthForm mode="signup" />
    </section>
  )
}

