'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import {
  Mountain,
  Menu,
  X,
  Search,
  Plus,
  ChevronDown
} from 'lucide-react'
import { MobileNav, BottomNav } from './mobile-nav'

interface NavbarProps {
  showSearch?: boolean
  showCreateButton?: boolean
  showAdminMenu?: boolean
}

export function Navbar({
  showSearch = true,
  showCreateButton = false,
  showAdminMenu = false
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  const navItems = [
    { href: '/', label: 'Beranda', active: isActive('/') },
    { href: '/blog', label: 'Blog', active: isActive('/blog') },
    { href: '/travel-notes', label: 'Catatan Perjalanan', active: isActive('/travel-notes') },
    { href: '/map', label: 'Jelajah', active: isActive('/map') },
    { href: '/profile', label: 'Profile', active: isActive('/profile') },
  ]

  const adminItems = [
    { href: '/admin/dashboard', label: 'Dashboard' },
    { href: '/admin/blog', label: 'Artikel' },
    { href: '/admin/travel-notes', label: 'Catatan Perjalanan' },
    { href: '/admin/gallery', label: 'Galeri' },
    { href: '/admin/map', label: 'Peta Lokasi' },
    { href: '/admin/settings', label: 'Pengaturan' },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-purple-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Mountain className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">Backpacktor</span>
            </Link>

            {/* Main Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`transition-colors font-medium ${
                    item.active
                      ? 'text-purple-600'
                      : 'text-gray-700 hover:text-purple-600'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Admin Dropdown */}
            {showAdminMenu && (
              <div className="relative">
                <button
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                    isActive('/admin')
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  Admin
                  <ChevronDown className={`h-4 w-4 transition-transform ${
                    isProfileDropdownOpen ? 'rotate-180' : ''
                  }`} />
                </button>

                {isProfileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                    {adminItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-4 py-2 text-sm transition-colors ${
                          item.active
                            ? 'bg-purple-50 text-purple-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setIsProfileDropdownOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3">
              {showSearch && (
                <Button variant="ghost" size="sm" className="text-purple-700 hover:bg-purple-50">
                  <Search className="h-4 w-4" />
                </Button>
              )}

              {showCreateButton && (
                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Buat Catatan
                </Button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-purple-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Mountain className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-800">Backpacktor</span>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-purple-700 md:hidden"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="bg-white border-t border-purple-100">
              <div className="container mx-auto px-4 py-4 space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-4 py-3 rounded-lg transition-colors ${
                      item.active
                        ? 'bg-purple-100 text-purple-700 font-medium'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                {showAdminMenu && (
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="px-4 py-2 font-medium text-gray-500">Admin</div>
                    {adminItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-6 py-3 rounded-lg transition-colors ${
                          item.active
                            ? 'bg-purple-50 text-purple-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}

                {showSearch && (
                  <div className="border-t border-gray-200 pt-4 mt-2">
                    <div className="px-4 py-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full text-purple-700 hover:bg-purple-50 justify-start"
                      >
                        <Search className="h-4 w-4 mr-2" />
                        Cari
                      </Button>
                    </div>
                  </div>
                )}

                {showCreateButton && (
                  <div className="border-t border-gray-200 pt-4 mt-2">
                    <div className="px-4 py-2">
                      <Button
                        size="sm"
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Buat Catatan
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile Navigation */}
      <MobileNav isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      {/* Bottom Navigation for Mobile */}
      <BottomNav showCreateButton={showCreateButton} />
    </>
  )
}