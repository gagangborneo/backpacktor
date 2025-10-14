'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  MapPin, 
  Camera, 
  Heart, 
  Compass, 
  Star, 
  Mountain,
  Menu,
  X,
  Search,
  User,
  Calendar,
  Plane,
  Home,
  BookOpen,
  Route,
  Coffee,
  Camera as CameraIcon,
  Umbrella,
  DollarSign
} from 'lucide-react'

const slides = [
  {
    id: 1,
    title: 'Petualangan Tanpa Batas',
    subtitle: 'Temukan keindahan tersembunyi di seluruh penjuru dunia',
    image: '/api/placeholder/1920/1080',
    location: 'Bromo, Indonesia'
  },
  {
    id: 2,
    title: 'Cerita Traveling Inspirasional',
    subtitle: 'Bagikan pengalaman dan inspirasi perjalanan Anda',
    image: '/api/placeholder/1920/1080',
    location: 'Ubud, Bali'
  },
  {
    id: 3,
    title: 'Jejak Backpacker Sejati',
    subtitle: 'Dari gunung hingga pantai, abadikan setiap momen',
    image: '/api/placeholder/1920/1080',
    location: 'Raja Ampat, Papua'
  }
]

const features = [
  { 
    icon: BookOpen, 
    title: 'Blog Traveling', 
    description: 'Kumpulan cerita dan pengalaman traveling dari para backpacker',
    color: 'from-purple-500 to-purple-600'
  },
  { 
    icon: Route, 
    title: 'Rencana Perjalanan', 
    description: 'Buat dan kelola rencana perjalanan Anda dengan mudah',
    color: 'from-blue-500 to-blue-600'
  },
  { 
    icon: Coffee, 
    title: 'Rekomendasi Tempat', 
    description: 'Temukan tempat-tempat menarik untuk dikunjungi',
    color: 'from-green-500 to-green-600'
  },
  { 
    icon: CameraIcon, 
    title: 'Galeri Foto', 
    description: 'Bagikan momen terbaik perjalanan Anda',
    color: 'from-pink-500 to-pink-600'
  },
  { 
    icon: Umbrella, 
    title: 'Tips Traveling', 
    description: 'Dapatkan tips dan trik untuk perjalanan yang lebih baik',
    color: 'from-orange-500 to-orange-600'
  },
  { 
    icon: DollarSign, 
    title: 'Budget Traveling', 
    description: 'Kelola budget dan hemat dalam perjalanan',
    color: 'from-yellow-500 to-yellow-600'
  }
]

const recentPosts = [
  { 
    title: 'Keindahan Sunrise di Bromo', 
    excerpt: 'Matahari terbit di Gunung Bromo memberikan pemandangan yang memukau dengan langit yang berubah warna menjadi jingga...',
    location: 'Jawa Timur, Indonesia',
    date: '2 hari yang lalu',
    author: 'Andi Traveler',
    image: '/api/placeholder/400/300',
    category: 'Mountain'
  },
  { 
    title: 'Menjelajahi Kota Tua Penang', 
    excerpt: 'Kota tua Penang di Malaysia menyimpan sejuta pesona dan sejarah. Dari arsitektur kolonial hingga kuliner street food...',
    location: 'Penang, Malaysia',
    date: '1 minggu yang lalu',
    author: 'Siti Explorer',
    image: '/api/placeholder/400/300',
    category: 'City'
  },
  { 
    title: 'Backpacking ke Ubud yang Spiritual', 
    excerpt: 'Ubud tidak hanya tentang sawah hijau, tapi juga spiritualitas yang mendalam. Rasakan energi positif di setiap sudut...',
    location: 'Bali, Indonesia',
    date: '2 minggu yang lalu',
    author: 'Budi Wanderer',
    image: '/api/placeholder/400/300',
    category: 'Culture'
  }
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    // Auto-advance slider
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      {/* Top Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-purple-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Mountain className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">Backpacktor</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">Beranda</a>
              <a href="/blog" className="text-gray-700 hover:text-purple-600 transition-colors">Blog</a>
              <div className="relative group">
                <button className="text-gray-700 hover:text-purple-600 transition-colors flex items-center gap-1">
                  Rencana Perjalanan
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-purple-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <div className="p-4">
                    <a href="#" className="flex items-center gap-3 p-2 hover:bg-purple-50 rounded-lg transition-colors">
                      <Route className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-gray-800">Buat Rencana</p>
                        <p className="text-xs text-gray-500">Rencanakan perjalanan Anda</p>
                      </div>
                    </a>
                    <a href="#" className="flex items-center gap-3 p-2 hover:bg-purple-50 rounded-lg transition-colors">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-800">Kalender Perjalanan</p>
                        <p className="text-xs text-gray-500">Atur jadwal perjalanan</p>
                      </div>
                    </a>
                    <a href="#" className="flex items-center gap-3 p-2 hover:bg-purple-50 rounded-lg transition-colors">
                      <Coffee className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-800">Temukan Tempat</p>
                        <p className="text-xs text-gray-500">Rekomendasi destinasi</p>
                      </div>
                    </a>
                    <a href="#" className="flex items-center gap-3 p-2 hover:bg-purple-50 rounded-lg transition-colors">
                      <DollarSign className="h-5 w-5 text-yellow-600" />
                      <div>
                        <p className="font-medium text-gray-800">Budget Planner</p>
                        <p className="text-xs text-gray-500">Kelola budget traveling</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
              <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">Galeri</a>
              <a href="#" className="text-gray-700 hover:text-purple-600 transition-colors">Tentang</a>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-purple-700 hover:bg-purple-50">
                <Search className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-purple-700 hover:bg-purple-50">
                <User className="h-4 w-4" />
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Mulai Menulis
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-purple-700"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-purple-100">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <a href="#" className="block text-gray-700 hover:text-purple-600 transition-colors">Beranda</a>
              <a href="/blog" className="block text-gray-700 hover:text-purple-600 transition-colors">Blog</a>
              <div className="space-y-2">
                <p className="font-medium text-gray-800">Rencana Perjalanan</p>
                <div className="pl-4 space-y-2">
                  <a href="#" className="block text-sm text-gray-600 hover:text-purple-600">Buat Rencana</a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-purple-600">Kalender Perjalanan</a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-purple-600">Temukan Tempat</a>
                  <a href="#" className="block text-sm text-gray-600 hover:text-purple-600">Budget Planner</a>
                </div>
              </div>
              <a href="#" className="block text-gray-700 hover:text-purple-600 transition-colors">Galeri</a>
              <a href="#" className="block text-gray-700 hover:text-purple-600 transition-colors">Tentang</a>
              <div className="flex gap-2 pt-4">
                <Button variant="ghost" size="sm" className="flex-1 text-purple-700 hover:bg-purple-50">
                  <Search className="h-4 w-4 mr-2" />
                  Cari
                </Button>
                <Button size="sm" className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Mulai Menulis
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Slider */}
      <section className="relative h-screen mt-16 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-pink-900/80 to-yellow-900/80"></div>
            <div className="h-full bg-gradient-to-br from-purple-600 via-pink-600 to-yellow-600"></div>
            
            {/* Slide Content */}
            <div className="relative h-full flex items-center justify-center">
              <div className="text-center text-white max-w-4xl mx-auto px-4">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <Badge className="mb-4 bg-white/20 text-white border-white/30">
                    <MapPin className="h-3 w-3 mr-1" />
                    {slides[currentSlide].location}
                  </Badge>
                  <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                    {slides[currentSlide].title}
                  </h1>
                  <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
                    {slides[currentSlide].subtitle}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button size="lg" className="bg-white text-purple-700 hover:bg-gray-100 px-8 py-3 text-lg">
                      Jelajahi Blog
                    </Button>
                    <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg">
                      Rencanakan Perjalanan
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Slider Navigation */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 z-20">
          <Button
            variant="ghost"
            size="sm"
            onClick={prevSlide}
            className="text-white hover:bg-white/20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </Button>
          
          <div className="flex gap-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={nextSlide}
            className="text-white hover:bg-white/20"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Fitur Backpacktor</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Semua yang Anda butuhkan untuk merencanakan dan berbagi petualangan traveling
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm group">
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 bg-gradient-to-r ${feature.color} rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl text-gray-800">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-gray-600">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Artikel Traveling Terbaru</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ikuti petualangan terbaru dari komunitas Backpacktor
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.map((post, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm overflow-hidden group">
                  <div className="h-48 bg-gradient-to-br from-purple-400 to-pink-400 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                    <Badge className="absolute top-4 left-4 bg-white/20 text-white border-white/30">
                      {post.category}
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
                    <p className="text-sm text-gray-500">by {post.author}</p>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 mb-4">
                      {post.excerpt}
                    </CardDescription>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-gray-500">{post.date}</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-purple-700 hover:bg-purple-50">
                        Baca Selengkapnya
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-center mt-12"
          >
            <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3">
              Lihat Semua Artikel
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Travel Planning CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Siap Merencanakan Petualangan Berikutnya?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Gunakan fitur rencana perjalanan kami untuk membuat itinerary yang sempurna
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-3 text-lg">
                <Route className="h-5 w-5 mr-2" />
                Buat Rencana Perjalanan
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg">
                <Calendar className="h-5 w-5 mr-2" />
                Lihat Kalender
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}