'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Plus, 
  FileText, 
  Users, 
  Eye, 
  Heart, 
  TrendingUp,
  Edit,
  Trash2,
  Search,
  DollarSign,
  Calendar
} from 'lucide-react'

interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  published: boolean
  views: number
  likes: number
  createdAt: string
  publishedAt?: string
  category?: {
    name: string
    color?: string
  }
}

const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Keindahan Sunrise di Bromo',
    slug: 'keindahan-sunrise-di-bromo',
    excerpt: 'Matahari terbit di Gunung Bromo memberikan pemandangan yang memukau...',
    published: true,
    views: 1250,
    likes: 89,
    createdAt: '2024-01-15T10:30:00Z',
    publishedAt: '2024-01-15T10:30:00Z',
    category: {
      name: 'Mountain',
      color: 'green'
    }
  },
  {
    id: '2',
    title: 'Menjelajahi Kota Tua Penang',
    slug: 'menjelajahi-kota-tua-penang',
    excerpt: 'Kota tua Penang di Malaysia menyimpan sejuta pesona dan sejarah...',
    published: true,
    views: 890,
    likes: 67,
    createdAt: '2024-01-10T14:20:00Z',
    publishedAt: '2024-01-10T14:20:00Z',
    category: {
      name: 'City',
      color: 'blue'
    }
  },
  {
    id: '3',
    title: 'Backpacking ke Ubud yang Spiritual',
    slug: 'backpacking-ke-ubud-yang-spiritual',
    excerpt: 'Ubud tidak hanya tentang sawah hijau, tapi juga spiritualitas...',
    published: false,
    views: 0,
    likes: 0,
    createdAt: '2024-01-08T09:15:00Z',
    category: {
      name: 'Culture',
      color: 'purple'
    }
  }
]

const stats = {
  totalPosts: 24,
  publishedPosts: 18,
  totalViews: 15420,
  totalLikes: 892
}

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800">Backpacktor Admin</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <Plus className="h-4 w-4 mr-2" />
                Artikel Baru
              </Button>
              <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Rencana Budget
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Artikel</CardTitle>
              <FileText className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">{stats.totalPosts}</div>
              <p className="text-xs text-gray-500">+2 dari bulan lalu</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Dipublikasi</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">{stats.publishedPosts}</div>
              <p className="text-xs text-gray-500">+1 dari bulan lalu</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">{stats.totalViews.toLocaleString()}</div>
              <p className="text-xs text-gray-500">+12% dari bulan lalu</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Likes</CardTitle>
              <Heart className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800">{stats.totalLikes}</div>
              <p className="text-xs text-gray-500">+8% dari bulan lalu</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content */}
        <Tabs defaultValue="posts" className="space-y-6">
          <TabsList className="bg-white/80 backdrop-blur-sm border border-purple-100">
            <TabsTrigger value="posts" className="data-[state=active]:bg-purple-100">
              Artikel
            </TabsTrigger>
            <TabsTrigger value="budget" className="data-[state=active]:bg-green-100">
              Budget Planner
            </TabsTrigger>
            <TabsTrigger value="categories" className="data-[state=active]:bg-purple-100">
              Kategori
            </TabsTrigger>
            <TabsTrigger value="tags" className="data-[state=active]:bg-purple-100">
              Tags
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-purple-100">
              Pengaturan
            </TabsTrigger>
          </TabsList>

          <TabsContent value="posts" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-800">Daftar Artikel</h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari artikel..."
                    className="pl-10 pr-4 py-2 border border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              {posts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold text-gray-800 hover:text-purple-600 transition-colors cursor-pointer">
                              {post.title}
                            </h3>
                            <Badge 
                              variant={post.published ? "default" : "secondary"}
                              className={post.published 
                                ? "bg-green-100 text-green-700" 
                                : "bg-yellow-100 text-yellow-700"
                              }
                            >
                              {post.published ? "Dipublikasi" : "Draft"}
                            </Badge>
                            {post.category && (
                              <Badge 
                                variant="outline"
                                className="border-purple-200 text-purple-700"
                              >
                                {post.category.name}
                              </Badge>
                            )}
                          </div>
                          <p className="text-gray-600 mb-4">{post.excerpt}</p>
                          <div className="flex items-center gap-6 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Eye className="h-4 w-4" />
                              <span>{post.views.toLocaleString()} views</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Heart className="h-4 w-4" />
                              <span>{post.likes} likes</span>
                            </div>
                            <span>Dibuat {new Date(post.createdAt).toLocaleDateString('id-ID')}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Button size="sm" variant="outline" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="border-red-200 text-red-700 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="budget" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-gray-800">Daftar Rencana Budget</h2>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Cari rencana budget..."
                    className="pl-10 pr-4 py-2 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white/80 backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>

            <div className="grid gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-800 hover:text-green-600 transition-colors cursor-pointer">
                            Backpacking ke Jawa Timur
                          </h3>
                          <Badge className="bg-blue-100 text-blue-700">
                            Perencanaan
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-4">Perjalanan 5 hari mengunjungi Bromo, Malang, dan Surabaya dengan budget terbatas</p>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            <span>Rp 2.500.000</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>15-19 Feb 2024</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>1.250 views</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button size="sm" variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-200 text-red-700 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-gray-800 hover:text-green-600 transition-colors cursor-pointer">
                            Liburan Akhir Tahun ke Bali
                          </h3>
                          <Badge className="bg-purple-100 text-purple-700">
                            Selesai
                          </Badge>
                        </div>
                        <p className="text-gray-600 mb-4">Celebrating New Year in Bali with friends - 7 days of paradise</p>
                        <div className="flex items-center gap-6 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4" />
                            <span>Rp 8.500.000</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>28 Dec 2023 - 3 Jan 2024</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>2.100 views</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button size="sm" variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="border-red-200 text-red-700 hover:bg-red-50">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </TabsContent>

          <TabsContent value="categories">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Kelola Kategori</CardTitle>
                <CardDescription>
                  Atur kategori untuk mengelompokkan artikel-artikel Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Fitur ini akan segera hadir...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tags">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Kelola Tags</CardTitle>
                <CardDescription>
                  Atur tags untuk memudahkan pencarian artikel
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Fitur ini akan segera hadir...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>Pengaturan</CardTitle>
                <CardDescription>
                  Atur preferensi dan konfigurasi blog Anda
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Fitur ini akan segera hadir...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}