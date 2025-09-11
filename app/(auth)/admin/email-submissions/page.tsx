'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface EmailSubmission {
  email: string
  timestamp: string
  userAgent?: string
  referer?: string
}

export default function AdminPage() {
  const [emails, setEmails] = useState<EmailSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [accessKey, setAccessKey] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  
  const fetchEmails = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch(`/api/send-email?key=${accessKey}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to fetch emails')
      }
      
      // Handle the submissions from Supabase
      if (data.submissions && Array.isArray(data.submissions)) {
        setEmails(data.submissions)
      } else {
        setEmails([])
        console.warn('No emails found or invalid format returned')
      }
      
      setIsAuthenticated(true)
      // Store in session storage so refresh doesn't lose authentication
      sessionStorage.setItem('emailAdminKey', accessKey)
    } catch (err: any) {
      setError(err.message)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }
  
  useEffect(() => {
    // Check if we have a stored key in session storage
    const storedKey = sessionStorage.getItem('emailAdminKey')
    if (storedKey) {
      setAccessKey(storedKey)
      // Fetch emails with the stored key
      const doFetch = async () => {
        try {
          const response = await fetch(`/api/send-email?key=${storedKey}`)
          const data = await response.json()
          
          if (response.ok) {
            setEmails(data.submissions || [])
            setIsAuthenticated(true)
          } else {
            // Invalid stored key, remove it
            sessionStorage.removeItem('emailAdminKey')
          }
        } catch (err) {
          // Error using stored key, remove it
          sessionStorage.removeItem('emailAdminKey')
        } finally {
          setLoading(false)
        }
      }
      doFetch()
    } else {
      setLoading(false)
    }
  }, [])
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    fetchEmails()
  }
  
  const handleLogout = () => {
    setIsAuthenticated(false)
    setEmails([])
    setAccessKey('')
    sessionStorage.removeItem('emailAdminKey')
  }
  
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleString()
    } catch {
      return dateString
    }
  }
  
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Email Submissions Admin
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label htmlFor="accessKey" className="block text-sm font-medium text-gray-700">
                  Access Key
                </label>
                <div className="mt-1">
                  <input
                    id="accessKey"
                    name="accessKey"
                    type="password"
                    value={accessKey}
                    onChange={(e) => setAccessKey(e.target.value)}
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              
              {error && (
                <div className="rounded-md bg-red-50 p-4">
                  <div className="flex">
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-red-800">Error</h3>
                      <div className="mt-2 text-sm text-red-700">{error}</div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {loading ? 'Loading...' : 'Access Dashboard'}
                </button>
              </div>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Default key: fr2_admin_access</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Email Submissions</h1>
          <button
            onClick={handleLogout}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">Loading...</p>
          </div>
        ) : emails.length === 0 ? (
          <div className="text-center py-12 bg-white shadow overflow-hidden sm:rounded-lg px-4">
            <p className="text-lg text-gray-600">No email submissions found.</p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                {emails.length} Email{emails.length !== 1 ? 's' : ''} Submitted
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Most recent submissions shown first
              </p>
            </div>
            <div className="border-t border-gray-200">
              <ul role="list" className="divide-y divide-gray-200">
                {emails.map((submission, index) => (
                  <li key={index} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-blue-600 truncate">{submission.email}</p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {formatDate(submission.timestamp)}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          {submission.referer ? (
                            <span className="truncate">From: {submission.referer}</span>
                          ) : (
                            <span className="italic">No referrer</span>
                          )}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
        
        <div className="mt-6 flex justify-center">
          <button
            onClick={fetchEmails}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Refresh Data
          </button>
        </div>
      </main>
    </div>
  )
}
