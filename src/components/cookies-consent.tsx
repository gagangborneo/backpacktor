'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { X, Cookie, Shield, Eye } from 'lucide-react'

interface CookiesConsentProps {
  className?: string
}

export function CookiesConsent({ className = '' }: CookiesConsentProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookies-consent')
    if (!hasConsented) {
      // Show banner after a short delay
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookies-consent', 'accepted')
    localStorage.setItem('cookies-consent-date', new Date().toISOString())
    setIsVisible(false)
  }

  const handleReject = () => {
    localStorage.setItem('cookies-consent', 'rejected')
    localStorage.setItem('cookies-consent-date', new Date().toISOString())
    setIsVisible(false)
  }

  const handleCustomize = () => {
    setShowDetails(!showDetails)
  }

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg ${className}`}
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-start gap-4">
            {/* Cookie Icon */}
            <div className="flex-shrink-0 mt-1">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <Cookie className="h-5 w-5 text-white" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Persetujuan Cookie
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">
                    Kami menggunakan cookie untuk meningkatkan pengalaman Anda, menganalisis lalu lintas situs, dan mempersonalisasi konten. Dengan melanjutkan menggunakan situs ini, Anda menyetujui penggunaan cookie kami.
                  </p>

                  {/* Detailed Options */}
                  {showDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mb-4 p-4 bg-gray-50 rounded-lg"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            id="essential"
                            checked
                            disabled
                            className="mt-1 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded"
                          />
                          <div className="flex-1">
                            <label htmlFor="essential" className="text-sm font-medium text-gray-900">
                              Cookie Esensial
                            </label>
                            <p className="text-xs text-gray-500 mt-1">
                              Diperlukan agar situs berfungsi dengan baik.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            id="analytics"
                            defaultChecked
                            className="mt-1 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                          />
                          <div className="flex-1">
                            <label htmlFor="analytics" className="text-sm font-medium text-gray-900">
                              Cookie Analitik
                            </label>
                            <p className="text-xs text-gray-500 mt-1">
                              Membantu kami memahami bagaimana pengunjung berinteraksi dengan situs kami.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            id="marketing"
                            className="mt-1 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500"
                          />
                          <div className="flex-1">
                            <label htmlFor="marketing" className="text-sm font-medium text-gray-900">
                              Cookie Pemasaran
                            </label>
                            <p className="text-xs text-gray-500 mt-1">
                              Digunakan untuk menampilkan iklan yang relevan dengan Anda.
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Button
                      size="sm"
                      onClick={handleAccept}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                    >
                      Terima Semua
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleReject}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Tolak Semua
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleCustomize}
                      className="text-purple-700 hover:bg-purple-50"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Sesuaikan
                    </Button>
                  </div>
                </div>

                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsVisible(false)}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-600 h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Additional Links */}
          <div className="mt-4 pt-4 border-t border-gray-200 flex flex-wrap gap-4 text-xs text-gray-500">
            <a href="/privacy" className="hover:text-purple-600 transition-colors">
              Kebijakan Privasi
            </a>
            <a href="/terms" className="hover:text-purple-600 transition-colors">
              Syarat & Ketentuan
            </a>
            <a href="/cookies" className="hover:text-purple-600 transition-colors">
              Kebijakan Cookie
            </a>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}