'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Search,
  MapPin,
  Eye,
  Heart,
  Calendar,
  Filter,
  Grid,
  List,
  Mountain
} from 'lucide-react'
import { Navbar } from '@/components/navbar'

interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  featured: boolean
  published: boolean
  views: number
  likes: number
  coverImage?: string
  location?: string
  createdAt: string
  publishedAt?: string
  category?: {
    name: string
    color?: string
  }
  tags?: {
    name: string
  }[]
}

const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Menyusuri Jejak Sunrise di Puncak Gunung Bromo',
    slug: 'menyusuri-jejak-sunrise-di-puncak-gunung-bromo',
    excerpt: 'Petualangan seru di tengah malam untuk menyaksikan keindahan matahari terbit dari atas puncak Bromo. Nuansa langit yang berubah warna dari hitam pekat menjadi jingga keemasan memberikan pengalaman spiritual yang tak terlupakan.',
    featured: true,
    published: true,
    views: 1250,
    likes: 156,
    coverImage: 'https://picsum.photos/seed/bromo-mountain-sunrise-landscape/800/400',
    location: 'Probolinggo, Jawa Timur',
    createdAt: '2024-10-12T10:30:00Z',
    publishedAt: '2024-10-12T10:30:00Z',
    category: {
      name: 'Mountain',
      color: 'green'
    },
    tags: [
      { name: 'Indonesia' },
      { name: 'Sunrise' },
      { name: 'Mountain' },
      { name: 'Adventure' },
      { name: 'East Java' }
    ]
  },
  {
    id: '2',
    title: 'Keseharian di Pedesaan Ubud yang Masih Asri',
    slug: 'keseharian-di-pedesaan-ubud-yang-masih-asri',
    excerpt: 'Tinggal selama seminggu di Ubud membuka mata betapa Bali masih menyimpan pesona otentik di balik hiruk pikuk pariwisata. Dari belajar memasak tradisional dengan ibu-ibu lokal, bersepeda melewati sawah terasering, hingga mengikuti upacara keagamaan di pura desa.',
    featured: false,
    published: true,
    views: 1890,
    likes: 289,
    coverImage: 'https://picsum.photos/seed/ubud-rice-terraces-bali-landscape/800/400',
    location: 'Ubud, Bali',
    createdAt: '2024-10-05T14:20:00Z',
    publishedAt: '2024-10-05T14:20:00Z',
    category: {
      name: 'Culture',
      color: 'purple'
    },
    tags: [
      { name: 'Bali' },
      { name: 'Ubud' },
      { name: 'Culture' },
      { name: 'Village Life' },
      { name: 'Tradition' }
    ]
  },
  {
    id: '3',
    title: 'Backpacking ke Ubud yang Spiritual',
    slug: 'backpacking-ke-ubud-yang-spiritual',
    excerpt: 'Ubud tidak hanya tentang sawah hijau, tapi juga spiritualitas yang mendalam. Rasakan energi positif di setiap sudut kota seni ini.',
    featured: true,
    published: true,
    views: 1567,
    likes: 120,
    coverImage: 'https://picsum.photos/seed/ubud-spiritual-retreat-bali-temple-landscape/800/400',
    location: 'Bali, Indonesia',
    createdAt: '2024-01-08T09:15:00Z',
    publishedAt: '2024-01-08T09:15:00Z',
    category: {
      name: 'Culture',
      color: 'purple'
    },
    tags: [
      { name: 'Bali' },
      { name: 'Spiritual' },
      { name: 'Culture' }
    ]
  },
  {
    id: '4',
    title: 'Pesona Pantai Kuta yang Abadi',
    slug: 'pesona-pantai-kuta-yang-abadi',
    excerpt: 'Pantai Kuta tetap menjadi salah satu destinasi favorit di Bali. Ombak yang cocok untuk surfing dan sunset yang memukau.',
    featured: false,
    published: true,
    views: 2100,
    likes: 156,
    coverImage: 'https://picsum.photos/seed/kuta-beach-bali-sunset-waves-ocean-landscape/800/400',
    location: 'Bali, Indonesia',
    createdAt: '2024-01-05T16:45:00Z',
    publishedAt: '2024-01-05T16:45:00Z',
    category: {
      name: 'Beach',
      color: 'blue'
    },
    tags: [
      { name: 'Bali' },
      { name: 'Beach' },
      { name: 'Sunset' }
    ]
  },
  {
    id: '5',
    title: 'Petualangan di Taman Nasional Komodo',
    slug: 'petualangan-di-taman-nasional-komodo',
    excerpt: 'Bertemu langsung dengan komodo liar di habitat aslinya adalah pengalaman yang mendebarkan dan tak terlupakan.',
    featured: true,
    published: true,
    views: 3200,
    likes: 245,
    coverImage: 'https://picsum.photos/seed/komodo-dragon-island-national-park-wildlife-landscape/800/400',
    location: 'Nusa Tenggara Timur, Indonesia',
    createdAt: '2024-01-01T11:20:00Z',
    publishedAt: '2024-01-01T11:20:00Z',
    category: {
      name: 'Adventure',
      color: 'orange'
    },
    tags: [
      { name: 'Indonesia' },
      { name: 'Wildlife' },
      { name: 'Adventure' }
    ]
  },
  {
    id: '6',
    title: 'Kuliner Legendaris di Yogyakarta',
    slug: 'kuliner-legendaris-di-yogyakarta',
    excerpt: 'Dari Gudeg hingga Bakpia, Yogyakarta menawarkan pengalaman kuliner yang kaya akan rasa dan sejarah.',
    featured: false,
    published: true,
    views: 980,
    likes: 78,
    coverImage: 'https://picsum.photos/seed/yogyakarta-traditional-food-gudeg-culinary-landscape/800/400',
    location: 'Yogyakarta, Indonesia',
    createdAt: '2023-12-28T13:10:00Z',
    publishedAt: '2023-12-28T13:10:00Z',
    category: {
      name: 'Food',
      color: 'red'
    },
    tags: [
      { name: 'Indonesia' },
      { name: 'Food' },
      { name: 'Culture' }
    ]
  }
]

const categories = [
  { name: 'Semua Kategori', value: 'all' },
  { name: 'Mountain', value: 'mountain' },
  { name: 'Beach', value: 'beach' },
  { name: 'City', value: 'city' },
  { name: 'Culture', value: 'culture' },
  { name: 'Food', value: 'food' },
  { name: 'Adventure', value: 'adventure' }
]

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>(mockPosts)
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(mockPosts)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('latest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    let filtered = posts

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.location?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => 
        post.category?.name.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        case 'popular':
          return b.views - a.views
        case 'liked':
          return b.likes - a.likes
        default:
          return 0
      }
    })

    setFilteredPosts(filtered)
  }, [posts, searchTerm, selectedCategory, sortBy])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      {/* Navigation */}
      <Navbar showSearch={true} />

      <div className="container mx-auto px-4 pt-20 pb-8 md:pb-0">
        {/* Search and Filter Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Cari artikel, lokasi, atau tema..."
                    className="pl-10 pr-4 py-3 border-purple-200 focus:border-purple-500 focus:ring-purple-500 bg-white/80"
                  />
                </div>

                {/* Category Filter */}
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-full lg:w-48 border-purple-200 focus:border-purple-500 focus:ring-purple-500 bg-white/80">
                    <SelectValue placeholder="Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Sort By */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full lg:w-40 border-purple-200 focus:border-purple-500 focus:ring-purple-500 bg-white/80">
                    <SelectValue placeholder="Urutkan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="latest">Terbaru</SelectItem>
                    <SelectItem value="popular">Terpopuler</SelectItem>
                    <SelectItem value="liked">Terbanyak suka</SelectItem>
                  </SelectContent>
                </Select>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-2 p-1 bg-purple-100 rounded-lg">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="bg-white text-purple-700 hover:bg-purple-50"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="bg-white text-purple-700 hover:bg-purple-50"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Featured Posts */}
        {filteredPosts.filter(post => post.featured).length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Artikel Unggulan
              </span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.filter(post => post.featured).slice(0, 3).map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm overflow-hidden group cursor-pointer">
                    <div className="h-48 relative overflow-hidden">
                      <Image
                        src={post.coverImage || 'https://picsum.photos/seed/landscape-nature-mountains/800/400'}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                      <Badge className="absolute top-4 left-4 bg-yellow-500 text-white">
                        Unggulan
                      </Badge>
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4 text-purple-600" />
                        <span className="text-sm text-gray-600">{post.location}</span>
                      </div>
                      <CardTitle className="text-xl text-gray-800 hover:text-purple-600 transition-colors cursor-pointer">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-gray-600 mb-4">
                        {post.excerpt}
                      </CardDescription>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span>{post.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            <span>{post.likes}</span>
                          </div>
                        </div>
                        {post.category && (
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                            {post.category.name}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* All Posts */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Semua Artikel ({filteredPosts.length})
          </h2>
          
          {filteredPosts.length === 0 ? (
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardContent className="p-12 text-center">
                <p className="text-gray-500">Tidak ada artikel yang ditemukan.</p>
              </CardContent>
            </Card>
          ) : (
            <div className={viewMode === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
              : "space-y-6"
            }>
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/blog/${post.slug}`}>
                    <Card className={`h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm group cursor-pointer ${viewMode === 'list' ? 'flex flex-row' : ''}`}>
                    {viewMode === 'grid' ? (
                      <>
                        <div className="h-48 rounded-t-lg relative overflow-hidden">
                          <Image
                            src={post.coverImage || 'https://picsum.photos/seed/landscape-nature-mountains/800/400'}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {post.featured && (
                            <Badge className="absolute top-4 left-4 bg-yellow-500 text-white">
                              Unggulan
                            </Badge>
                          )}
                        </div>
                        <CardHeader>
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="h-4 w-4 text-purple-600" />
                            <span className="text-sm text-gray-600">{post.location}</span>
                          </div>
                          <CardTitle className="text-xl text-gray-800 hover:text-purple-600 transition-colors cursor-pointer">
                            {post.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-gray-600 mb-4">
                            {post.excerpt}
                          </CardDescription>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                <span>{post.views.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="h-4 w-4" />
                                <span>{post.likes}</span>
                              </div>
                            </div>
                            {post.category && (
                              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                                {post.category.name}
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </>
                    ) : (
                      <>
                        <div className="w-32 h-32 flex-shrink-0 relative overflow-hidden">
                          <Image
                            src={post.coverImage || 'https://picsum.photos/seed/landscape-nature-mountains/800/400'}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          {post.featured && (
                            <Badge className="absolute top-2 left-2 bg-yellow-500 text-white">
                              Unggulan
                            </Badge>
                          )}
                        </div>
                        <div className="flex-1 p-6">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-purple-600" />
                              <span className="text-sm text-gray-600">{post.location}</span>
                            </div>
                            {post.category && (
                              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                                {post.category.name}
                              </Badge>
                            )}
                          </div>
                          <h3 className="text-lg font-semibold text-gray-800 hover:text-purple-600 transition-colors cursor-pointer mb-2">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <Eye className="h-4 w-4" />
                                <span>{post.views.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="h-4 w-4" />
                                <span>{post.likes}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(post.createdAt).toLocaleDateString('id-ID')}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </motion.section>
      </div>
    </div>
  )
}