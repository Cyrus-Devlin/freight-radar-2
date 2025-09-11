"use client"

import { useState } from 'react'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'

interface AuthFormProps {
  mode: 'signin' | 'signup'
}

export function AuthForm({ mode }: AuthFormProps) {
  const supabase = createSupabaseBrowserClient()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setIsLoading(true)
    setHasError(null)
    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
      }
      window.location.assign('/dashboard')
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      setHasError(message)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleGoogle() {
    setIsLoading(true)
    setHasError(null)
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/dashboard` } })
      if (error) throw error
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      setHasError(message)
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto w-full max-w-sm space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
        />
      </div>
      {hasError && <p className="text-sm text-red-600">{hasError}</p>}
      <Button type="submit" disabled={isLoading} className="w-full">
        {mode === 'signup' ? 'Create account' : 'Sign in'}
      </Button>
      <Button type="button" variant="outline" onClick={handleGoogle} disabled={isLoading} className="w-full">
        Continue with Google
      </Button>
    </form>
  )
}

