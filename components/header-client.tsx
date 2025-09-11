'use client'

import Link from 'next/link'
import Image from 'next/image'
import { createSupabaseBrowserClient } from '@/lib/supabase/client'
import { useState } from 'react'

interface HeaderClientProps {
  user?: any
}

export function HeaderClient({ user }: HeaderClientProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  async function signOutAction() {
    const supabase = createSupabaseBrowserClient()
    await supabase.auth.signOut()
    window.location.href = '/signin'
  }

  const scrollToCTA = () => {
    const ctaSection = document.getElementById('cta-section')
    if (ctaSection) {
      ctaSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-6 lg:px-8">
      {/* Floating Glass Container */}
      <div className="mx-auto max-w-6xl">
        <nav className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl shadow-black/[0.03]">
          <div className="flex h-16 items-center justify-between px-6">
            
            {/* Logo - Left */}
            <Link href="/" className="flex items-center gap-2 z-10" aria-label="Freight Radar">
              <Image 
                src="/logo.svg" 
                alt="Freight Radar" 
                width={150} 
                height={32} 
                priority 
                className="h-7 w-auto" 
              />
            </Link>

            {/* Right Side Navigation & Actions - Desktop */}
            <div className="hidden md:flex items-center space-x-2">
              {user ? (
                <>
                  {/* User Navigation Pills */}
                  <Link 
                    href="/dashboard" 
                    className="px-4 py-2 text-xs font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50/80 rounded-full transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Go to Dashboard"
                  >
                    Dashboard
                  </Link>
                  <Link 
                    href="/analytics" 
                    className="px-4 py-2 text-xs font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50/80 rounded-full transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="View Analytics"
                  >
                    Analytics
                  </Link>
                  
                  {/* Sign Out Button */}
                  <button 
                    onClick={signOutAction}
                    className="ml-2 px-4 py-2 text-xs font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50/80 rounded-full transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Sign out of your account"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  {/* Request Demo Button - Brand Blue */}
                  <button 
                    onClick={scrollToCTA}
                    className="ml-2 px-6 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-full shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-200 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Request a demo"
                  >
                    Request Demo
                  </button>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden relative z-10 p-2 rounded-xl bg-gray-100/60 hover:bg-gray-200/70 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
            >
              <div className="w-5 h-5 flex flex-col justify-center items-center">
                <span className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-0.5' : '-translate-y-1'
                }`} />
                <span className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`} />
                <span className={`block w-5 h-0.5 bg-gray-800 transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-0.5' : 'translate-y-1'
                }`} />
              </div>
            </button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className={`md:hidden mt-2 transition-all duration-300 ${
          isMenuOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}>
          <nav className="bg-white/80 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl shadow-black/[0.03]">
            <div className="p-6">
              {user ? (
                <>
                  {/* User Navigation Pills - Mobile */}
                  <div className="flex flex-col space-y-3 mb-4">
                    <Link 
                      href="/dashboard" 
                      className="w-full text-center px-4 py-3 text-xs font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50/80 active:bg-blue-100/60 rounded-full transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={() => setIsMenuOpen(false)}
                      aria-label="Go to Dashboard"
                    >
                      Dashboard
                    </Link>
                    <Link 
                      href="/analytics" 
                      className="w-full text-center px-4 py-3 text-xs font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50/80 active:bg-blue-100/60 rounded-full transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={() => setIsMenuOpen(false)}
                      aria-label="View Analytics"
                    >
                      Analytics
                    </Link>
                  </div>
                  
                  <hr className="border-gray-300/40 mb-4" />
                  
                  {/* Sign Out Button - Mobile */}
                  <button 
                    onClick={() => {
                      signOutAction()
                      setIsMenuOpen(false)
                    }}
                    className="w-full text-center px-4 py-3 text-xs font-medium text-gray-700 hover:text-blue-700 hover:bg-blue-50/80 active:bg-blue-100/60 rounded-full transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Sign out of your account"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  {/* Request Demo Button - Mobile - Brand Blue */}
                  <button 
                    onClick={() => {
                      scrollToCTA()
                      setIsMenuOpen(false)
                    }}
                    className="block w-full text-center px-4 py-3 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 rounded-full shadow-lg shadow-blue-600/25 hover:shadow-xl hover:shadow-blue-600/30 transition-all duration-200 transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Request a demo"
                  >
                    Request Demo
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}