'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, BookOpen, MapPin, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

interface MobileNavProps {
  isOpen: boolean
  onClose: () => void
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Beranda', icon: Home },
    { href: '/blog', label: 'Blog', icon: BookOpen },
    { href: '/travel-notes', label: 'Perjalanan', icon: BookOpen },
    { href: '/map', label: 'Jelajah', icon: MapPin },
  ]

  const isActive = (path: string) => {
    return pathname === path
  }

  if (!isOpen) return null

  return (
    <>
      {/* Mobile Menu Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 md:hidden"
        onClick={onClose}
      />

      {/* Mobile Menu Slide-in */}
      <div className="fixed left-0 top-0 bottom-0 w-72 bg-white shadow-xl z-50 md:hidden transform transition-transform duration-300">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? 'bg-purple-100 text-purple-700 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                onClick={onClose}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </>
  )
}

interface BottomNavProps {
  showCreateButton?: boolean
}

export function BottomNav({ showCreateButton = false }: BottomNavProps) {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Beranda', icon: Home },
    { href: '/blog', label: 'Blog', icon: BookOpen },
    { href: '/travel-notes', label: 'Perjalanan', icon: BookOpen },
    { href: '/map', label: 'Jelajah', icon: MapPin },
  ]

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                isActive(item.href)
                  ? 'text-purple-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </Link>
          )
        })}

        {showCreateButton && (
          <div className="flex items-center">
            <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">+</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}