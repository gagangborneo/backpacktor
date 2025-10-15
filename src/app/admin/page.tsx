'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  FileText,
  MapPin,
  Image,
  Users,
  Eye,
  Heart,
  MessageCircle,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock
} from 'lucide-react'
import Link from 'next/link'

const statsCards = [
  {
    title: 'Total Blog',
    value: '48',
    change: '+12%',
    trend: 'up',
    icon: FileText,
    color: 'bg-blue-500',
    href: '/admin/blog'
  },
  {
    title: 'Catatan Perjalanan',
    value: '23',
    change: '+8%',
    trend: 'up',
    icon: MapPin,
    color: 'bg-green-500',
    href: '/admin/travel-notes'
  },
  {
    title: 'Total Galeri',
    value: '156',
    change: '-3%',
    trend: 'down',
    icon: Image,
    color: 'bg-purple-500',
    href: '/admin/gallery'
  },
  {
    title: 'Total User',
    value: '1,234',
    change: '+15%',
    trend: 'up',
    icon: Users,
    color: 'bg-orange-500',
    href: '/admin/users'
  }
]

const recentActivities = [
  {
    id: 1,
    type: 'blog',
    title: 'Keindahan Sunrise di Bromo',
    action: 'ditambahkan',
    time: '2 jam yang lalu',
    user: 'Admin'
  },
  {
    id: 2,
    type: 'travel',
    title: 'Perjalanan Jakarta - Bali',
    action: 'diperbarui',
    time: '4 jam yang lalu',
    user: 'Admin'
  },
  {
    id: 3,
    type: 'gallery',
    title: 'Foto Pantai Kuta',
    action: 'diunggah',
    time: '6 jam yang lalu',
    user: 'Admin'
  },
  {
    id: 4,
    type: 'user',
    title: 'User baru mendaftar',
    action: 'terdaftar',
    time: '8 jam yang lalu',
    user: 'System'
  }
]

const popularContent = [
  {
    id: 1,
    type: 'blog',
    title: 'Keindahan Sunrise di Bromo',
    views: 1234,
    likes: 89,
    comments: 12
  },
  {
    id: 2,
    type: 'travel',
    title: 'Perjalanan Jakarta - Bali',
    views: 892,
    likes: 67,
    comments: 8
  },
  {
    id: 3,
    type: 'blog',
    title: 'Petualangan di Ubud',
    views: 756,
    likes: 54,
    comments: 6
  }
]

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600">Selamat datang di Admin Panel Backpacktor</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Link href={stat.href}>
              <Card className="hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                      <div className="flex items-center gap-1 mt-2">
                        {stat.trend === 'up' ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                        <span className={`text-sm font-medium ${
                          stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                        }`}>
                          {stat.change}
                        </span>
                        <span className="text-sm text-gray-500">dari bulan lalu</span>
                      </div>
                    </div>
                    <div className={`p-3 rounded-lg ${stat.color}`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Aktivitas Terbaru
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className={`p-2 rounded-lg ${
                      activity.type === 'blog' ? 'bg-blue-100' :
                      activity.type === 'travel' ? 'bg-green-100' :
                      activity.type === 'gallery' ? 'bg-purple-100' :
                      'bg-orange-100'
                    }`}>
                      {
                        activity.type === 'blog' ? <FileText className="h-4 w-4 text-blue-600" /> :
                        activity.type === 'travel' ? <MapPin className="h-4 w-4 text-green-600" /> :
                        activity.type === 'gallery' ? <Image className="h-4 w-4 text-purple-600" /> :
                        <Users className="h-4 w-4 text-orange-600" />
                      }
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{activity.title}</p>
                      <p className="text-sm text-gray-500">
                        {activity.action} oleh {activity.user}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Popular Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Konten Populer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularContent.map((content, index) => (
                  <motion.div
                    key={content.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        content.type === 'blog' ? 'bg-blue-100' : 'bg-green-100'
                      }`}>
                        {content.type === 'blog' ?
                          <FileText className="h-4 w-4 text-blue-600" /> :
                          <MapPin className="h-4 w-4 text-green-600" />
                        }
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 text-sm line-clamp-1">
                          {content.title}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{content.views}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{content.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-3 w-3 text-gray-400" />
                            <span className="text-xs text-gray-500">{content.comments}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Aksi Cepat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link href="/admin/blog/new">
                <Button className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Tulis Blog Baru
                </Button>
              </Link>
              <Link href="/admin/travel-notes/new">
                <Button variant="outline" className="w-full justify-start">
                  <MapPin className="h-4 w-4 mr-2" />
                  Tambah Perjalanan
                </Button>
              </Link>
              <Link href="/admin/gallery/new">
                <Button variant="outline" className="w-full justify-start">
                  <Image className="h-4 w-4 mr-2" />
                  Upload Foto
                </Button>
              </Link>
              <Link href="/admin/users/new">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Tambah User
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}