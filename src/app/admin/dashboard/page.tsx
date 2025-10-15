'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Mountain,
  Home,
  FileText,
  Image,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Edit,
  Trash2,
  Eye,
  Plus,
  TrendingUp,
  Calendar,
  Heart,
  MessageCircle,
  BarChart3,
  MapPin
} from 'lucide-react'
import Link from 'next/link'

const sidebarItems = [
  {
    icon: Home,
    label: 'Dashboard',
    href: '/admin/dashboard',
    active: true
  },
  {
    icon: FileText,
    label: 'Artikel',
    href: '/admin/blog'
  },
  {
    icon: FileText,
    label: 'Catatan Perjalanan',
    href: '/admin/travel-notes'
  },
  {
    icon: Image,
    label: 'Galeri',
    href: '/admin/gallery'
  },
  {
    icon: MapPin,
    label: 'Peta Lokasi',
    href: '/admin/map'
  },
  {
    icon: Settings,
    label: 'Pengaturan',
    href: '/admin/settings'
  }
]

const recentPosts = [
  {
    id: 1,
    title: 'Menyusuri Jejak Sunrise di Puncak Gunung Bromo',
    author: 'Rizki Adventurer',
    date: '2 jam yang lalu',
    status: 'published',
    views: 1234,
    likes: 156
  },
  {
    id: 2,
    title: 'Keseharian di Pedesaan Ubud yang Masih Asri',
    author: 'Sarah Explorer',
    date: '5 jam yang lalu',
    status: 'draft',
    views: 0,
    likes: 0
  },
  {
    id: 3,
    title: 'Snorkeling di Surga Tersembunyi Raja Ampat',
    author: 'Budi Diver',
    date: '1 hari yang lalu',
    status: 'published',
    views: 892,
    likes: 89
  }
]

const stats = [
  {
    title: 'Total Artikel',
    value: '156',
    change: '+12%',
    icon: FileText,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100'
  },
  {
    title: 'Total Galeri',
    value: '1,234',
    change: '+8%',
    icon: Image,
    color: 'text-green-600',
    bgColor: 'bg-green-100'
  },
  {
    title: 'Pengguna Aktif',
    value: '2,845',
    change: '+23%',
    icon: Users,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100'
  },
  {
    title: 'Total Views',
    value: '45.2K',
    change: '+18%',
    icon: TrendingUp,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100'
  }
]

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-16'
      } flex flex-col`}>
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center flex-shrink-0">
              <Mountain className="h-6 w-6 text-white" />
            </div>
            {sidebarOpen && (
              <span className="text-xl font-bold text-gray-800">Backpacktor</span>
            )}
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  item.active
                    ? 'bg-purple-50 text-purple-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {sidebarOpen && <span className="font-medium">{item.label}</span>}
              </Link>
            ))}
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-200">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {sidebarOpen && <span className="font-medium">Keluar</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-600"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Artikel Baru
              </Button>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">Winda Provita</p>
                  <p className="text-xs text-gray-500">winda@backpacktor.id</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">W</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                        <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <TrendingUp className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                        </div>
                      </div>
                      <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                        <stat.icon className={`h-6 w-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Posts */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Artikel Terbaru</CardTitle>
                    <CardDescription>Daftar artikel yang baru saja dipublikasikan</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    Lihat Semua
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-800 mb-1 line-clamp-1">
                          {post.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>{post.author}</span>
                          <span>•</span>
                          <span>{post.date}</span>
                        </div>
                        <div className="flex items-center gap-4 mt-2">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{post.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4 text-gray-400" />
                            <span className="text-sm text-gray-600">{post.likes}</span>
                          </div>
                          <Badge className={`${
                            post.status === 'published'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {post.status === 'published' ? 'Diterbitkan' : 'Draft'}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Aksi Cepat</CardTitle>
                <CardDescription>Tugas yang sering dilakukan</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Button className="w-full h-20 flex flex-col gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      <Plus className="h-6 w-6" />
                      <span>Artikel Baru</span>
                    </Button>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                      <Image className="h-6 w-6" />
                      <span>Upload Foto</span>
                    </Button>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                      <BarChart3 className="h-6 w-6" />
                      <span>Lihat Statistik</span>
                    </Button>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                  >
                    <Button variant="outline" className="w-full h-20 flex flex-col gap-2">
                      <Users className="h-6 w-6" />
                      <span>Kelola User</span>
                    </Button>
                  </motion.div>
                </div>

                {/* Recent Activity */}
                <div className="mt-6">
                  <h3 className="font-medium text-gray-800 mb-4">Aktivitas Terbaru</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">
                        <strong>Rizki</strong> menerbitkan artikel baru
                      </span>
                      <span className="text-gray-400 text-xs">2 jam lalu</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-gray-600">
                        <strong>Sarah</strong> mengupload 5 foto baru
                      </span>
                      <span className="text-gray-400 text-xs">3 jam lalu</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      <span className="text-gray-600">
                        <strong>Budi</strong> memberi komentar pada artikel
                      </span>
                      <span className="text-gray-400 text-xs">5 jam lalu</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}