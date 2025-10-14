'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  ArrowLeft, 
  MapPin, 
  Eye, 
  Heart, 
  Calendar,
  Share2,
  Bookmark,
  Clock,
  User,
  Tag,
  Mountain
} from 'lucide-react'

interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  featured: boolean
  published: boolean
  views: number
  likes: number
  coverImage?: string
  location?: string
  createdAt: string
  publishedAt?: string
  readingTime?: number
  author?: {
    name: string
    avatar?: string
    bio?: string
  }
  category?: {
    name: string
    color?: string
  }
  tags?: {
    name: string
  }[]
  relatedPosts?: Post[]
}

const mockPost: Post = {
  id: '1',
  title: 'Keindahan Sunrise di Bromo: Pengalaman Spiritual di Puncak Jawa',
  slug: 'keindahan-sunrise-di-bromo',
  excerpt: 'Matahari terbit di Gunung Bromo memberikan pemandangan yang memukau dengan langit yang berubah warna dari gelap menjadi jingga hingga cerah. Pengalaman yang tak terlupakan bagi setiap traveler yang datang ke sini.',
  content: `
# Keindahan Sunrise di Bromo: Pengalaman Spiritual di Puncak Jawa

Perjalanan dimulai tepat pukul 03.00 dini hari ketika suhu udara masih sangat dingin. Dengan mengenakan jaket tebal dan sarung tangan, kami memulai pendakian menggunakan jeep menuju viewpoint Penanjakan 1.

## Persiapan yang Matang

Sebelum berangkat ke Bromo, ada beberapa persiapan penting yang harus dilakukan:

- **Pakaian**: Jaket tebal, sarung tangan, penutup kepala, dan masker (karena debu vulkanik)
- **Kesehatan**: Pastikan kondisi tubuh fit, karena kita akan berada di ketinggian 2.329 mdpl
- **Transportasi**: Sewa jeep dari desa terdekat (Cemoro Lawang atau Ngadisari)
- **Akomodasi**: Menginap di homestay lokal atau hotel di area Bromo

## Perjalanan Menuju Puncak

Jeep kami melintasi medan yang berbatu dan gelap. Hanya cahaya lampu kendaraan lain yang menjadi penerang di kegelapan dini hari. Sekitar pukul 04.30, kami tiba di Penanjakan 1 dan langsung mencari posisi terbaik untuk menyaksikan sunrise.

### Moment yang Dinanti-nanti

Pukul 05.00, langit mulai memperlihatkan perubahan warna. Dari kegelapan total, perlahan berubah menjadi ungu, lalu jingga, dan akhirnya terang benderang. Gunung Bromo dengan puncaknya yang berkabut terlihat sangat megah.

## Eksplorasi Kawah Bromo

Setelah puas menikmati sunrise, perjalanan dilanjutkan menuju kawah Bromo. Dari Penanjakan 1, kami turun kembali menggunakan jeep dan melanjutkan dengan berjalan kaki sekitar 3 km menuju puncak kawah.

### Tangga yang Menantang

Ada sekitar 250 anak tangga yang harus dilewati untuk mencapai puncak kawah. Meskipun melelahkan, setiap langkah terbayar dengan pemandangan yang luar biasa. Dari puncak, kita bisa melihat langsung kawah aktif dengan asap belerang yang masih keluar.

## Tips Berharga

1. **Datang lebih awal**: Usahakan sudah di viewpoint paling lambat pukul 04.30
2. **Bawa kamera**: Sunrise di Bromo terlalu indah untuk dilewatkan
3. **Jaga kesehatan**: Minum air hangat dan jaga suhu tubuh
4. **Hormati lokal**: Ikuti aturan dan jaga kebersihan

## Kesan Mendalam

Bromo tidak hanya menawarkan keindahan alam yang spektakuler, tetapi juga pengalaman spiritual yang mendalam. Melihat matahari terbit di antara gunung-gunung sambil merasakan hembusan angin pagi yang dingin membuat kita menyadari betapa kecilnya kita di hadapan alam.

## Penutup

Perjalanan ke Bromo adalah pengalaman yang akan selalu diingat. Dari persiapan yang matang hingga moment sunrise yang memukau, semuanya menjadi bagian dari cerita traveling yang tak terlupakan. Bagi para traveler yang mencari pengalaman spiritual sekaligus petualangan, Bromo adalah destinasi yang wajib dikunjungi.

Selamat berpetualang dan jangan lupa untuk selalu menjaga kelestarian alam! 🌋
  `,
  featured: true,
  published: true,
  views: 1250,
  likes: 89,
  coverImage: '/api/placeholder/1200/600',
  location: 'Jawa Timur, Indonesia',
  createdAt: '2024-01-15T10:30:00Z',
  publishedAt: '2024-01-15T10:30:00Z',
  readingTime: 8,
  author: {
    name: 'Andi Traveler',
    avatar: '/api/placeholder/100/100',
    bio: 'Petualang sejati yang sudah menjelajahi 30+ negara dan mencintai keindahan alam Indonesia.'
  },
  category: {
    name: 'Mountain',
    color: 'green'
  },
  tags: [
    { name: 'Indonesia' },
    { name: 'Sunrise' },
    { name: 'Mountain' },
    { name: 'Adventure' },
    { name: 'Spiritual' }
  ],
  relatedPosts: [
    {
      id: '2',
      title: 'Menjelajahi Kota Tua Penang',
      slug: 'menjelajahi-kota-tua-penang',
      excerpt: 'Kota tua Penang di Malaysia menyimpan sejuta pesona dan sejarah...',
      featured: false,
      published: true,
      views: 890,
      likes: 67,
      coverImage: '/api/placeholder/400/200',
      location: 'Penang, Malaysia',
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
      featured: true,
      published: true,
      views: 1567,
      likes: 120,
      coverImage: '/api/placeholder/400/200',
      location: 'Bali, Indonesia',
      createdAt: '2024-01-08T09:15:00Z',
      publishedAt: '2024-01-08T09:15:00Z',
      category: {
        name: 'Culture',
        color: 'purple'
      }
    }
  ]
}

export default function BlogPostPage() {
  const [post, setPost] = useState<Post>(mockPost)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Simulate fetching post data based on slug
    // In real app, this would be an API call
  }, [])

  const handleLike = () => {
    setIsLiked(!isLiked)
    setPost(prev => ({
      ...prev,
      likes: isLiked ? prev.likes - 1 : prev.likes + 1
    }))
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" className="text-purple-700 hover:bg-purple-50">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-purple-700 hover:bg-purple-50">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={isBookmarked ? "text-purple-700" : "text-gray-600 hover:text-purple-700"}
                onClick={handleBookmark}
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Article Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          {/* Cover Image */}
          {post.coverImage && (
            <div className="mb-8 rounded-xl overflow-hidden shadow-2xl">
              <div className="h-96 bg-gradient-to-br from-purple-400 via-pink-400 to-orange-400 relative">
                {post.featured && (
                  <Badge className="absolute top-6 left-6 bg-yellow-500 text-white">
                    Artikel Unggulan
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Title and Meta */}
          <div className="text-center mb-6">
            {post.category && (
              <Badge variant="secondary" className="mb-4 bg-purple-100 text-purple-700">
                {post.category.name}
              </Badge>
            )}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
              {post.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6 max-w-2xl mx-auto">
              {post.excerpt}
            </p>
            
            {/* Article Meta */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{post.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString('id-ID', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              {post.readingTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readingTime} menit baca</span>
                </div>
              )}
            </div>
          </div>

          {/* Author Info */}
          {post.author && (
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-8">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>
                      <User className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{post.author.name}</h3>
                    <p className="text-gray-600 text-sm">{post.author.bio}</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                    Follow
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </motion.header>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: post.content.replace(/\n/g, '<br />').replace(/### (.*?)<br \/>/g, '<h3>$1</h3>').replace(/## (.*?)<br \/>/g, '<h2>$1</h2>').replace(/# (.*?)<br \/>/g, '<h1>$1</h1>')
                }}
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <Tag className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold text-gray-800">Tags</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 cursor-pointer"
                >
                  #{tag.name}
                </Badge>
              ))}
            </div>
          </motion.div>
        )}

        {/* Engagement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 flex items-center justify-between pt-8 border-t border-purple-100"
        >
          <div className="flex items-center gap-6">
            <Button
              variant={isLiked ? "default" : "outline"}
              size="sm"
              onClick={handleLike}
              className={isLiked 
                ? "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700" 
                : "border-purple-200 text-purple-700 hover:bg-purple-50"
              }
            >
              <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
              {post.likes}
            </Button>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Eye className="h-4 w-4" />
              <span>{post.views.toLocaleString()} views</span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
            <Share2 className="h-4 w-4 mr-2" />
            Bagikan
          </Button>
        </motion.div>

        {/* Related Posts */}
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="mt-16 pt-16 border-t border-purple-100"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
              <Mountain className="h-6 w-6 text-purple-600" />
              Artikel Terkait
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {post.relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm overflow-hidden group">
                    <div className="h-32 bg-gradient-to-br from-purple-400 to-pink-400"></div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-3 w-3 text-purple-600" />
                        <span className="text-xs text-gray-600">{relatedPost.location}</span>
                      </div>
                      <h3 className="font-semibold text-gray-800 hover:text-purple-600 transition-colors cursor-pointer mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{relatedPost.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            <span>{relatedPost.likes}</span>
                          </div>
                        </div>
                        {relatedPost.category && (
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                            {relatedPost.category.name}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}
      </article>
    </div>
  )
}