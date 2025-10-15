'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { MapPin, Calendar, User, ArrowRight, Heart, MessageCircle, Clock, ChevronLeft, ChevronRight } from 'lucide-react'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  location: string
  date: string
  author: string
  authorAvatar: string
  category: string
  readTime: string
  likes: number
  comments: number
  image: string
  featured?: boolean
  slug: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Menyusuri Jejak Sunrise di Puncak Gunung Bromo',
    slug: 'menyusuri-jejak-sunrise-di-puncak-gunung-bromo',
    excerpt: 'Petualangan seru di tengah malam untuk menyaksikan keindahan matahari terbit dari atas puncak Bromo. Nuansa langit yang berubah warna dari hitam pekat menjadi jingga keemasan memberikan pengalaman spiritual yang tak terlupakan. Perjalanan dimulai pukul 2 pagi dari probolinggo, melewati lautan pasir yang dingin hingga akhirnya tiba di puncak penanjakan 1.',
    location: 'Probolinggo, Jawa Timur',
    date: '3 hari yang lalu',
    author: 'Rizki Adventurer',
    authorAvatar: 'https://picsum.photos/seed/author1/40/40',
    category: 'Mountain',
    readTime: '8 min',
    likes: 156,
    comments: 23,
    image: 'https://picsum.photos/seed/bromo-sunrise-mountain-volcanic-landscape/800/400',
    featured: true
  },
  {
    id: 2,
    title: 'Keseharian di Pedesaan Ubud yang Masih Asri',
    slug: 'keseharian-di-pedesaan-ubud-yang-masih-asri',
    excerpt: 'Tinggal selama seminggu di Ubud membuka mata betapa Bali masih menyimpan pesona otentik di balik hiruk pikuk pariwisata. Dari belajar memasak tradisional dengan ibu-ibu lokal, bersepeda melewati sawah terasering, hingga mengikuti upacara keagamaan di pura desa.',
    location: 'Ubud, Bali',
    date: '1 minggu yang lalu',
    author: 'Sarah Explorer',
    authorAvatar: 'https://picsum.photos/seed/author2/40/40',
    category: 'Culture',
    readTime: '12 min',
    likes: 289,
    comments: 45,
    image: 'https://picsum.photos/seed/ubud-bali-rice-terraces-traditional-village-landscape/800/400'
  },
  {
    id: 3,
    title: 'Snorkeling di Surga Tersembunyi Raja Ampat',
    excerpt: 'Keindahan bawah laut Raja Ampat memang tak terbantahkan. Dari ikan mandar hingga terumbu karang yang masih pristine, setiap kali menyelam rasanya seperti memasuki dunia lain. Spot snorkeling di Cape Kri memberikan pengalaman melihat lebih dari 200 spesies ikan dalam sekali menyelam.',
    location: 'Raja Ampat, Papua Barat',
    date: '2 minggu yang lalu',
    author: 'Budi Diver',
    authorAvatar: 'https://picsum.photos/seed/author3/40/40',
    category: 'Marine',
    readTime: '10 min',
    likes: 342,
    comments: 67,
    image: 'https://picsum.photos/seed/raja-ampat-underwater-coral-reef-tropical-fish/800/400'
  },
  {
    id: 4,
    title: 'Backpacking Keliling Jawa dengan Anggaran Minimal',
    excerpt: 'Siapa bilang keliling Jawa harus mahal? Dengan anggaran Rp 500.000, saya berhasil menjelajahi 5 kota dalam 10 hari. Dari naik ekonomi class, makan di warung lokal, hingga menginap di hostel backpacker. Ini dia tips dan trik lengkapnya.',
    location: 'Multiple Cities, Jawa',
    date: '3 minggu yang lalu',
    author: 'Maya Backpacker',
    authorAvatar: 'https://picsum.photos/seed/author4/40/40',
    category: 'Budget Travel',
    readTime: '15 min',
    likes: 523,
    comments: 89,
    image: 'https://picsum.photos/seed/java-island-backpacking-traditional-temples-landscape/800/400'
  },
  {
    id: 5,
    title: 'Misteriusnya Candi Borobudur Saat Sunrise',
    excerpt: 'Borobudur di pagi hari memiliki aura yang berbeda. Kabut tipis yang menyelimuti stupa, suara burung yang berkicauan, dan matahari terbit yang perlahan muncul dari balik gunung Merapi menciptakan suasana magis yang memukau.',
    location: 'Magelang, Jawa Tengah',
    date: '1 bulan yang lalu',
    author: 'Andi Historian',
    authorAvatar: 'https://picsum.photos/seed/author5/40/40',
    category: 'Heritage',
    readTime: '7 min',
    likes: 445,
    comments: 56,
    image: 'https://picsum.photos/seed/borobudur-temple-sunrise-ancient-buddhist-monument/800/400'
  },
  {
    id: 6,
    title: 'Menjelajahi Keindahan Pantai Kuta Bali',
    excerpt: 'Pantai Kuta memang sudah terkenal, namun pesonanya tidak pernah lekang oleh waktu. Dari sunset yang memukau hingga ombak yang cocok untuk pemula, Kuta tetap menjadi surga bagi para wisatawan lokal maupun mancanegara.',
    location: 'Kuta, Bali',
    date: '1 bulan yang lalu',
    author: 'Dina Surfer',
    authorAvatar: 'https://picsum.photos/seed/author6/40/40',
    category: 'Beach',
    readTime: '6 min',
    likes: 267,
    comments: 34,
    image: 'https://picsum.photos/seed/kuta-beach-sunset-waves-ocean/800/400'
  },
  {
    id: 7,
    title: 'Petualangan di Taman Nasional Komodo',
    excerpt: 'Mendekati komodo di habitat aslinya adalah pengalaman yang menegangkan sekaligus mengagumkan. Berjalan kaki di Pulau Komodo dengan pemandu lokal memberikan wawasan tentang kehidupan komodo dan ekosistem unik di Flores.',
    location: 'Flores, NTT',
    date: '1 bulan yang lalu',
    author: 'Reza Wildlife',
    authorAvatar: 'https://picsum.photos/seed/author7/40/40',
    category: 'Wildlife',
    readTime: '9 min',
    likes: 389,
    comments: 52,
    image: 'https://picsum.photos/seed/komodo-dragon-island-national-park/800/400'
  },
  {
    id: 8,
    title: 'Kuliner Jalanan yang Wajib Dicoba di Yogyakarta',
    excerpt: 'Yogyakarta tidak hanya tentang budaya dan sejarah, tetapi juga surganya kuliner jalanan. Dari gudeg hingga bakpia, dari sate klathak hingga wedang ronde, setiap sudut kota menyimpan kelezatan yang unik.',
    location: 'Yogyakarta, DIY',
    date: '2 bulan yang lalu',
    author: 'Lina Foodie',
    authorAvatar: 'https://picsum.photos/seed/author8/40/40',
    category: 'Food',
    readTime: '11 min',
    likes: 456,
    comments: 78,
    image: 'https://picsum.photos/seed/yogyakarta-street-food-gudeg-traditional-market/800/400'
  },
  {
    id: 9,
    title: 'Trekking Menuju Air Terjun Tumpak Sewu',
    excerpt: 'Air Terjun Tumpak Sewu di Lumajang memang menakjubkan. Turun ke dasar air terjun melalui ratusan anak tangga yang curam namun pemandangan yang disajikan setelahnya sepadan dengan usaha yang dikeluarkan.',
    location: 'Lumajang, Jawa Timur',
    date: '2 bulan yang lalu',
    author: 'Fajar Hiker',
    authorAvatar: 'https://picsum.photos/seed/author9/40/40',
    category: 'Nature',
    readTime: '13 min',
    likes: 521,
    comments: 91,
    image: 'https://picsum.photos/seed/tumpak-sewu-waterfall-tropical-forest-canyon/800/400'
  },
  {
    id: 10,
    title: 'Menikmati Keindahan Danau Toba dari Atas Kapal',
    excerpt: 'Danau Toba adalah danau vulkanik terbesar di dunia dengan pemandangan yang memukau. Berlayar di atas danau yang tenang sambil menikmati pemandangan perbukitan hijau dan pulau Samosir di tengah adalah pengalaman spiritual.',
    location: 'Samosir, Sumatera Utara',
    date: '2 bulan yang lalu',
    author: 'Hendri Explorer',
    authorAvatar: 'https://picsum.photos/seed/author10/40/40',
    category: 'Lake',
    readTime: '10 min',
    likes: 334,
    comments: 45,
    image: 'https://picsum.photos/seed/lake-toba-volcanic-crater-sumatra-landscape/800/400'
  },
  {
    id: 11,
    title: 'Eksplorasi Goa Gong Pacitan yang Menakjubkan',
    excerpt: 'Goa Gong di Pacitan adalah goa terindah di Asia Tenggara dengan stalaktit dan stalagmit yang membentuk orkestra alam. Penerangan yang baik membuat kita bisa menikmati keindahan formasi batuan yang sudah berusia jutaan tahun.',
    location: 'Pacitan, Jawa Timur',
    date: '3 bulan yang lalu',
    author: 'Rina Caver',
    authorAvatar: 'https://picsum.photos/seed/author11/40/40',
    category: 'Adventure',
    readTime: '8 min',
    likes: 289,
    comments: 41,
    image: 'https://picsum.photos/seed/gong-cave-stalactites-stalagmites-underground-cave/800/400'
  },
  {
    id: 12,
    title: 'Pesona Keindahan Pulau Derawan di Kalimantan',
    excerpt: 'Pulau Derawan adalah surga tersembunyi di Kalimantan Timur dengan pantai pasir putih yang lembut, air laut yang jernih, dan penyu hijau yang bertelur di tepi pantai. Surga diving yang belum terjamah oleh banyak wisatawan.',
    location: 'Berau, Kalimantan Timur',
    date: '3 bulan yang lalu',
    author: 'Borneo Explorer',
    authorAvatar: 'https://picsum.photos/seed/author12/40/40',
    category: 'Island',
    readTime: '12 min',
    likes: 412,
    comments: 68,
    image: 'https://picsum.photos/seed/derawan-island-beach-crystal-clear-water-tropical-paradise/800/400'
  }
]

export default function TravelBlogCards() {
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 4

  // Calculate pagination
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = blogPosts.slice(indexOfFirstPost, indexOfLastPost)
  const totalPages = Math.ceil(blogPosts.length / postsPerPage)

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)
  const nextPage = () => setCurrentPage(prev => Math.min(prev + 1, totalPages))
  const prevPage = () => setCurrentPage(prev => Math.max(prev - 1, 1))

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Cerita Perjalanan Terbaru</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ikuti petualangan seru dan dapatkan inspirasi dari cerita traveling komunitas Backpacktor
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {currentPosts && currentPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, x: post.featured ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className={`overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group ${
                  post.featured ? 'ring-2 ring-purple-200 ring-offset-4' : ''
                }`}>
                  {/* Featured Badge */}
                  {post.featured && (
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1 text-sm font-medium text-center">
                      ⭐ Artikel Unggulan
                    </div>
                  )}

                  <div className="md:flex">
                    {/* Image Section */}
                    <div className="md:w-2/5 lg:w-1/3 overflow-hidden">
                      <div className="h-64 md:h-80 relative">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <Badge className="absolute top-4 left-4 bg-white/20 text-white border-white/30">
                          {post.category}
                        </Badge>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="md:w-3/5 lg:w-2/3 p-6">
                      <CardHeader className="p-0 pb-4">
                        <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-purple-600" />
                            <span>{post.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4 text-purple-600" />
                            <span>{post.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4 text-purple-600" />
                            <span>{post.readTime}</span>
                          </div>
                        </div>
                        <CardTitle className="text-2xl font-bold text-gray-800 mb-2 group-hover:text-purple-600 transition-colors cursor-pointer">
                          {post.title}
                        </CardTitle>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="flex items-center gap-2">
                            <img
                              src={post.authorAvatar}
                              alt={post.author}
                              className="w-8 h-8 rounded-full"
                            />
                            <span className="text-sm text-gray-600">{post.author}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500">
                            <div className="flex items-center gap-1">
                              <Heart className="h-4 w-4" />
                              <span>{post.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="h-4 w-4" />
                              <span>{post.comments}</span>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="p-0">
                        <CardDescription className="text-gray-600 text-base leading-relaxed mb-4">
                          {post.excerpt}
                        </CardDescription>
                        <Link href={`/blog/${post.slug}`}>
                          <Button variant="ghost" className="text-purple-600 hover:bg-purple-50 p-0 h-auto font-medium group">
                            Baca Selengkapnya
                            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center justify-center gap-4 mt-12"
            >
              <Button
                variant="outline"
                size="sm"
                onClick={prevPage}
                disabled={currentPage === 1}
                className="flex items-center gap-2 border-purple-300 text-purple-600 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-4 w-4" />
                Sebelumnya
              </Button>

              <div className="flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => paginate(page)}
                    className={`w-10 h-10 rounded-lg ${
                      currentPage === page
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white border-0"
                        : "border-purple-300 text-purple-600 hover:bg-purple-50"
                    }`}
                  >
                    {page}
                  </Button>
                ))}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={nextPage}
                disabled={currentPage === totalPages}
                className="flex items-center gap-2 border-purple-300 text-purple-600 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Selanjutnya
                <ChevronRight className="h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {/* Article Count */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-center mt-8 text-gray-600"
          >
            <p className="text-sm">
              Menampilkan {indexOfFirstPost + 1}-{Math.min(indexOfLastPost, blogPosts.length)} dari {blogPosts.length} artikel
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}