import Image from 'next/image'
import { Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-[#0f1729] text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          
          {/* Left Section - Logo and Description */}
          <div className="space-y-6">
            <div>
              <img
                src="/logo_white.svg"
                alt="Freight Radar"
                className="h-8 w-auto"
              />
            </div>
            <p className="text-gray-300 text-base leading-relaxed max-w-md">
              A smart platform for freight tracking and logistics optimisation, giving you easy visibility of your imports across every supplier and freight forwarder. 
            </p>
              <p className="text-gray-300 text-base leading-relaxed max-w-md">
              Made with ❤️ in Switzerland. 
            </p>
          </div>

          {/* Right Section - Contact Details */}
          <div className="space-y-8">
            <h3 className="text-lg font-semibold text-white mb-6">Contact Us</h3>
            
            {/* Email */}
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div>
                <a 
                  href="mailto:support@myfreightradar.com" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  support@myfreightradar.com
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
              <div className="text-gray-300 leading-relaxed">
                <div className="font-medium text-white mb-1">Freight Radar</div>
                <div>21 Rue du Midi</div>
                <div>1248 Hermance, Switzerland</div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Border */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="text-center text-gray-400 text-sm">
            © {new Date().getFullYear()} Freight Radar. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  )
}