import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/header'

export const metadata: Metadata = {
  title: 'Freight Radar',
  description: 'Minimal SaaS starter with Next.js, Supabase, Tailwind, shadcn/ui',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-dvh antialiased bg-gray-200" style={{ backgroundColor: '#e5e7eb' }}>
        <Header />
        <main className="pt-24">{children}</main>
      </body>
    </html>
  )
}

