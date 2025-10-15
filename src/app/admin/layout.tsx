'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  LayoutDashboard,
  FileText,
  MapPin,
  Image,
  FolderTree,
  Settings,
  Users,
  Menu,
  X,
  ChevronDown,
  LogOut,
  Bell,
  Search
} from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface MenuItem {
  title: string
  icon: React.ElementType
  href?: string
  children?: MenuItem[]
  badge?: string
}

const menuItems: MenuItem[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/admin'
  },
  {
    title: 'Manajemen Konten',
    icon: FolderTree,
    children: [
      {
        title: 'Blog',
        icon: FileText,
        href: '/admin/blog'
      },
      {
        title: 'Catatan Perjalanan',
        icon: MapPin,
        href: '/admin/travel-notes'
      },
      {
        title: 'Galeri',
        icon: Image,
        href: '/admin/gallery'
      },
      {
        title: 'Kategori',
        icon: FolderTree,
        href: '/admin/categories'
      }
    ]
  },
  {
    title: 'Pengaturan',
    icon: Settings,
    href: '/admin/settings'
  },
  {
    title: 'Manajemen User',
    icon: Users,
    href: '/admin/users'
  }
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedItems, setExpandedItems] = useState<string[]>(['Manajemen Konten'])
  const pathname = usePathname()
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024)
      if (window.innerWidth >= 1024) {
        setSidebarOpen(true)
      }
    }

    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  const isActive = (href?: string) => {
    if (!href) return false
    return pathname === href || pathname.startsWith(href + '/')
  }

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const isExpanded = expandedItems.includes(item.title)
    const hasChildren = item.children && item.children.length > 0
    const active = isActive(item.href)

    return (
      <div key={item.title}>
        <motion.div
          initial={false}
          animate={{
            backgroundColor: active ? 'rgba(147, 51, 234, 0.1)' : 'transparent'
          }}
          className={`
            relative group cursor-pointer rounded-lg transition-all duration-200
            ${level > 0 ? 'ml-4' : ''}
          `}
        >
          <div
            onClick={() => {
              if (hasChildren) {
                toggleExpanded(item.title)
              } else if (item.href) {
                setSidebarOpen(false)
              }
            }}
            className={`
              flex items-center justify-between p-3 rounded-lg transition-all duration-200
              ${active ? 'text-purple-700 bg-purple-50' : 'text-gray-700 hover:text-purple-600 hover:bg-gray-50'}
              ${hasChildren ? '' : ''}
            `}
          >
            <Link
              href={item.href || '#'}
              className="flex items-center gap-3 flex-1"
              onClick={(e) => hasChildren && e.preventDefault()}
            >
              <item.icon className={`h-5 w-5 ${active ? 'text-purple-600' : 'text-gray-500 group-hover:text-purple-600'}`} />
              <span className="font-medium">{item.title}</span>
              {item.badge && (
                <span className="px-2 py-1 text-xs bg-red-500 text-white rounded-full">
                  {item.badge}
                </span>
              )}
            </Link>
            {hasChildren && (
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-gray-400"
              >
                <ChevronDown className="h-4 w-4" />
              </motion.div>
            )}
          </div>
        </motion.div>

        <AnimatePresence>
          {hasChildren && isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              {item.children?.map(child => renderMenuItem(child, level + 1))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="p-2">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              {/* Mobile Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="lg:hidden fixed inset-0 bg-black/50 z-40"
                onClick={() => setSidebarOpen(false)}
              />
            </>
          )}
        </AnimatePresence>

        <motion.aside
          initial={false}
          animate={{
            x: (sidebarOpen || isDesktop) ? 0 : -320,
            transition: { duration: 0.3, ease: 'easeInOut' }
          }}
          className={`
            fixed lg:relative top-0 left-0 h-full lg:h-auto w-80 bg-white shadow-lg lg:shadow-none
            border-r border-gray-200 lg:border-gray-200 z-50 lg:z-auto
            ${(sidebarOpen || isDesktop) ? 'translate-x-0 lg:translate-x-0' : '-translate-x-full lg:translate-x-0'}
          `}
        >
          <div className="flex flex-col h-full">
            {/* Sidebar Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
                  <p className="text-sm text-gray-500">Manajemen Konten</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSidebarOpen(false)}
                  className="lg:hidden p-2"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* User Info */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                  A
                </div>
                <div>
                  <p className="font-medium text-gray-800">Admin User</p>
                  <p className="text-sm text-gray-500">admin@backpacktor.com</p>
                </div>
              </div>
            </div>

            {/* Navigation Menu */}
            <nav className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-1">
                {menuItems.map(item => renderMenuItem(item))}
              </div>
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-gray-200">
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-red-600 hover:bg-red-50">
                <LogOut className="h-4 w-4 mr-3" />
                Keluar
              </Button>
            </div>
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className="flex-1 overflow-hidden">
          {/* Top Bar */}
          <div className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="hidden lg:flex items-center gap-2">
                  <Bell className="h-4 w-4" />
                  Notifikasi
                </Button>
                <Button variant="ghost" size="sm" className="hidden lg:flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  Keluar
                </Button>
              </div>
            </div>
          </div>

          {/* Page Content */}
          <div className="p-6 overflow-y-auto h-[calc(100vh-64px-60px)] lg:h-[calc(100vh-80px)]">
            {children}
          </div>
        </main>
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 shadow-lg">
        <div className="flex overflow-x-auto scrollbar-hide">
          <div className="flex space-x-1 px-2 py-2 min-w-max" style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitScrollbar: 'none'
          }}>
            {[
              { icon: LayoutDashboard, label: 'Dashboard', href: '/admin' },
              { icon: FileText, label: 'Blog', href: '/admin/blog' },
              { icon: MapPin, label: 'Travel', href: '/admin/travel-notes' },
              { icon: Image, label: 'Gallery', href: '/admin/gallery' },
              { icon: FolderTree, label: 'Kategori', href: '/admin/categories' },
              { icon: Settings, label: 'Settings', href: '/admin/settings' },
              { icon: Users, label: 'Users', href: '/admin/users' }
            ].map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex flex-col items-center justify-center py-2 px-3 min-w-[60px] relative
                  ${isActive(item.href)
                    ? 'text-purple-600 bg-purple-50 rounded-lg scale-105'
                    : 'text-gray-500 hover:text-purple-600 hover:bg-gray-50 rounded-lg hover:scale-105'
                  }
                  transition-all duration-200 transform
                `}
                onClick={() => {
                  // Close sidebar when navigating on mobile
                  if (window.innerWidth < 1024) {
                    setSidebarOpen(false)
                  }
                }}
              >
                <item.icon className="h-5 w-5 mb-1" />
                <span className="text-xs font-medium whitespace-nowrap">{item.label}</span>
                {isActive(item.href) && (
                  <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-purple-600 rounded-full"></div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}