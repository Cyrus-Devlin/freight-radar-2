'use client'

import Image from 'next/image'
import { Footer } from '@/components/footer'
import { useState } from 'react'
import ScrollDownCue from '@/components/ui/ScrollDownCue'

export default function Page() {
  const [email, setEmail] = useState('')
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      try {
        // Send the email via our API route
        const response = await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: email.trim() }),
        });

        const data = await response.json();
        
        if (!response.ok) {
          console.error('Email sending failed:', data.error);
          // Handle error - you might want to show an error message
        }
        
        // Show confirmation regardless of API response for demo purposes
        // In production, you might want to only show on success
        setShowConfirmation(true);
        setEmail('');
        
        // Hide confirmation after 3 seconds
        setTimeout(() => setShowConfirmation(false), 3000);
      } catch (error) {
        console.error('Error submitting form:', error);
        // Handle error - you might want to show an error message
      }
    }
  }
  return (
    <>
      {/* Full-Bleed Hero Image - Scrolls with page, starts at very top */}
      {/* Breaking out of any container constraints to achieve true 100vw */}
      <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen max-w-none h-[100vh] md:h-[110vh] -mt-24">
        <Image
          src="/aerial-view-container-cargo-ship-sea.jpg?v=1"
          alt="Aerial view of container cargo ship at sea showing global freight transportation"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 1920px"
          quality={90}
          className="object-cover object-[center_top]"
        />
        <ScrollDownCue />
      </div>

      {/* White Content Section */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl md:text-5xl font-bold text-gray-900 mb-8">
            Welcome to Freight Radar
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-12">
            A digital platform giving organisations a unified view of their shipments.
          </p>
        
            {/* Test with aerial-view image that we know works in the hero section */}
            <img
              src="/FreightRadarHero2.jpg"
              alt="Unified shipment dashboard visualization"
              className="mx-auto rounded-xl shadow-lg mb-8 w-full md:w-[90%] lg:w-[85%]"
              width={1200}
              height={700}
            />

        </div>
      </section>

      {/* Services Section */}
      <section className="bg-white py-24 dark:bg-gray-900" aria-labelledby="services-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 id="services-heading" className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Everything you need to track shipments
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Streamline your logistics operations with our comprehensive tracking platform
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 hover:shadow-md hover:scale-[1.02] hover:ring-2 hover:ring-blue-500/20 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none transition-all duration-200" tabIndex={0}>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13l4-4m0 0l4 4m-4-4H4a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v2" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Real-Time Tracking</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">Track container vessels and flights with real-time updates, statuses, and ETAs.</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 hover:shadow-md hover:scale-[1.02] hover:ring-2 hover:ring-blue-500/20 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none transition-all duration-200" tabIndex={0}>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Unified Dashboard</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">No more scattered tracking links. Get every shipment status in one clean, organised view.</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 hover:shadow-md hover:scale-[1.02] hover:ring-2 hover:ring-blue-500/20 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none transition-all duration-200" tabIndex={0}>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Bulk Uploads</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">Bulk upload tracking numbers to manage all your shipments effortlessly in a single platform.</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 hover:shadow-md hover:scale-[1.02] hover:ring-2 hover:ring-blue-500/20 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none transition-all duration-200" tabIndex={0}>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Supports All Major Carriers</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">We support standard BOLs, Container, and tracking numbers from all major carriers.</p>
                </div>
              </div>
            </div>


            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 hover:shadow-md hover:scale-[1.02] hover:ring-2 hover:ring-blue-500/20 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none transition-all duration-200" tabIndex={0}>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-5 5v-5zM4 4h5c.55 0 1.021.196 1.412.587l.088.088c.391.391.587.862.587 1.412v10.826c0 .55-.196 1.021-.587 1.412l-.088.088C9.021 18.804 8.55 19 8 19H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Status Notifications & Alerts</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">Get notified of critical shipment milestones such as pickup, transit updates, customs holds, delivery, or delays. Stay informed with a clear view of ETAs and overdue arrivals.</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 hover:shadow-md hover:scale-[1.02] hover:ring-2 hover:ring-blue-500/20 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none transition-all duration-200" tabIndex={0}>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">ERP Integration</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">Integrate effortlessly with enterprise resource planning (ERP) systems, CRMs, or third-party logistics platforms via custom API solutions.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-50 pt-24 pb-8 !mb-0">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Basic Plan */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Basic</h3>
                <p className="text-gray-600 text-sm mb-4">Perfect for SME's</p>
                <div className="mb-3">
                  <span className="text-3xl font-bold text-gray-900">€99</span>
                  <span className="text-gray-600 text-sm"> monthly</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Up to 300 containers/week</p>
                <p className="text-sm font-medium text-gray-700">10,000 API calls/month</p>
              </div>
              
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">Container tracking API</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">Bill of lading API</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">Vessel tracking API</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">Port tracking API</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">Terminal finder API</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">5/7 Support</span>
                </li>
              </ul>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-blue-500 relative hover:shadow-xl transition-shadow">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                  Most Popular
                </span>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Pro</h3>
                <p className="text-gray-600 text-sm mb-4">For growing businesses</p>
                <div className="mb-3">
                  <span className="text-3xl font-bold text-gray-900">€299</span>
                  <span className="text-gray-600 text-sm"> monthly</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Up to 1,000 containers/week</p>
                <p className="text-sm font-medium text-gray-700">30,000 API calls/month</p>
              </div>
              
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">Container tracking API</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">Bill of lading API</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">Vessel tracking API</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">Port tracking API</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">Terminal finder API</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">5/7 Support</span>
                </li>
              </ul>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">Enterprise</h3>
                <p className="text-gray-600 text-sm mb-4">For large businesses</p>
                <div className="mb-3">
                  <span className="text-3xl font-bold text-gray-900">€499</span>
                  <span className="text-gray-600 text-sm"> monthly</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">Up to 2,000 containers/week</p>
                <p className="text-sm font-medium text-gray-700">60,000 API calls/month</p>
              </div>
              
              <ul className="space-y-2">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">Container tracking API</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">Bill of lading API</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">Vessel tracking API</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">Port tracking API</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">Terminal finder API</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 text-sm">Premium Enterprise Support 7 days a week</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="cta-section" className="bg-gradient-to-br from-slate-50 to-blue-50 pt-12 pb-32 !mt-0 -mt-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
              <div className="text-center">
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                 Schedule Your Demo Today
                </div>
                
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  Ready to Transform Your Freight Operations?
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
                  Experience complete visibility across your sea freight operations. Sign up below and our team will contact you to schedule a demo.
                </p>
                
                <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-8">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email address"
                      required
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="submit"
                      className="px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-all duration-200 hover:shadow-lg whitespace-nowrap"
                    >
                      Request Demo
                    </button>
                  </div>
                </form>

                {/* Confirmation Popup */}
                {showConfirmation && (
                  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-2xl p-8 m-4 max-w-md w-full shadow-2xl">
                      <div className="text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                          <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">Email Received!</h3>
                        <p className="text-gray-600 mb-6">
                          Thanks for your interest! We'll reach out soon to schedule your demo.
                        </p>
                        <button
                          onClick={() => setShowConfirmation(false)}
                          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
                  <div className="flex items-center justify-center sm:justify-start">
                    <div className="flex items-center px-4 py-2 bg-green-50 rounded-full">
                      <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-green-800 font-medium">APIs Available</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start">
                    <div className="flex items-center px-4 py-2 bg-green-50 rounded-full">
                      <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-green-800 font-medium">No setup fees</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-center sm:justify-start">
                    <div className="flex items-center px-4 py-2 bg-green-50 rounded-full">
                      <svg className="w-4 h-4 text-green-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-green-800 font-medium">Cancel anytime</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}

