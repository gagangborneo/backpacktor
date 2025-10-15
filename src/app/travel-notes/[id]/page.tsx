'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  DollarSign,
  ArrowLeft,
  Share2,
  Heart,
  Edit,
  Trash2,
  Plus,
  Minus
} from 'lucide-react'
import Footer from '@/components/footer'
import { Navbar } from '@/components/navbar'

// Mock data for travel notes
const mockTravelNotes = [
  {
    id: '1',
    title: 'Perjalanan Jakarta - Bromo Sunrise',
    author: 'Rizki Adventurer',
    authorAvatar: 'https://picsum.photos/seed/rizki/40/40',
    date: '2024-01-15',
    startPoint: 'Jakarta',
    endPoint: 'Bromo, Jawa Timur',
    duration: '5 hari',
    budget: 'Rp 2.500.000',
    travelers: 3,
    description: 'Perjalanan seru menuju Gunung Bromo untuk menikmati sunrise yang spektakuler dan eksplorasi Taman Nasional Bromo Tengger Semeru.',
    places: [
      {
        id: 1,
        name: 'Kota Malang',
        notes: 'Transit dan persiapan pendakian',
        transport: 'Kereta api',
        cost: 'Rp 500.000',
        duration: '1 hari'
      },
      {
        id: 2,
        name: 'Gunung Bromo',
        notes: 'Sunise tour dan eksplorasi kawah Bromo',
        transport: 'Jeep 4x4',
        cost: 'Rp 1.200.000',
        duration: '2 hari'
      },
      {
        id: 3,
        name: 'Bukit Bromo (Pananjakan)',
        notes: 'View point terbaik untuk melihat sunrise',
        transport: 'Jeep 4x4',
        cost: 'Rp 800.000',
        duration: '1 hari'
      }
    ],
    images: [
      'https://picsum.photos/seed/bromo-sunrise/800/600',
      'https://picsum.photos/seed/bromo-crater/800/600',
      'https://picsum.photos/seed/bromo-jeep/800/600',
      'https://picsum.photos/seed/bromo-panorama/800/600'
    ],
    tags: ['Bromo', 'Sunrise', 'Mountain', 'Adventure'],
    likes: 1234,
    views: 1520,
    isLiked: false
  },
  {
    id: '2',
    title: 'Petualangan Bali - Ubud Cultural Trip',
    author: 'Sarah Explorer',
    authorAvatar: 'https://picsum.photos/seed/sarah/40/40',
    date: '2024-01-12',
    startPoint: 'Denpasar, Bali',
    endPoint: 'Ubud, Bali',
    duration: '4 hari',
    budget: 'Rp 850.000',
    travelers: 2,
    description: 'Eksplorasi budaya Bali di Ubud, dari pura kuno hingga sawah terasering yang indah.',
    places: [
      {
        id: 1,
        name: 'Pura Besakih',
        notes: 'Pura terbesar dan terpenting di Bali',
        transport: 'Sewa motor',
        cost: 'Rp 300.000',
        duration: '1 hari'
      },
      {
        id: 2,
        name: 'Tegalalang Rice Terrace',
        notes: 'Sawah terasering yang ikonis',
        transport: 'Sewa motor',
        cost: 'Rp 200.000',
        duration: 'setengah hari'
      },
      {
        id: 3,
        name: 'Ubud Monkey Forest',
        notes: 'Suaka margasatwa monyet di tengah kota',
        transport: 'Jalan kaki',
        cost: 'Rp 150.000',
        duration: 'setengah hari'
      }
    ],
    images: [
      'https://picsum.photos/seed/besakih-temple/800/600',
      'https://picsum.photos/seed/ubud-rice-terrace/800/600',
      'https://picsum.photos/seed/monkey-forest/800/600'
    ],
    tags: ['Bali', 'Culture', 'Temple', 'Nature'],
    likes: 892,
    views: 980,
    isLiked: true
  },
  {
    id: '3',
    title: 'Eksplorasi Raja Ampat Diving Paradise',
    author: 'Budi Diver',
    authorAvatar: 'https://picsum.photos/seed/budi/40/40',
    date: '2024-01-10',
    startPoint: 'Sorong, Papua Barat',
    endPoint: 'Raja Ampat, Papua Barat',
    duration: '7 hari',
    budget: 'Rp 8.500.000',
    travelers: 4,
    description: 'Petualangan diving di surga bawah laut Raja Ampat dengan keanekaragaman hayati laut yang luar biasa.',
    places: [
      {
        id: 1,
        name: 'Waisai',
        notes: 'Kota kabupaten dan gerbang menuju Raja Ampat',
        transport: 'Kapal cepat',
        cost: 'Rp 2.000.000',
        duration: '1 hari'
      },
      {
        id: 2,
        name: 'Pianemo',
        notes: 'View point karst yang memukau dengan pemandangan pulau-pulau kecil',
        transport: 'Speedboat',
        cost: 'Rp 3.500.000',
        duration: '2 hari'
      },
      {
        id: 3,
        name: 'Wayag Island',
        notes: 'Snorkeling dan beach camping di pulau terindah',
        transport: 'Liveaboard',
        cost: 'Rp 3.000.000',
        duration: '2 hari'
      }
    ],
    images: [
      'https://picsum.photos/seed/raja-ampat-beach/800/600',
      'https://picsum.photos/seed/pianemo-view/800/600',
      'https://picsum.photos/seed/wayag-island/800/600'
    ],
    tags: ['Raja Ampat', 'Diving', 'Beach', 'Adventure'],
    likes: 2156,
    views: 2100,
    isLiked: false
  },
  {
    id: '4',
    title: 'Backpacking Jawa - Heritage Trail',
    author: 'Maya Backpacker',
    authorAvatar: 'https://picsum.photos/seed/maya/40/40',
    date: '2024-01-08',
    startPoint: 'Yogyakarta',
    endPoint: 'Malang, Jawa Timur',
    duration: '6 hari',
    budget: 'Rp 1.500.000',
    travelers: 4,
    description: 'Jelajahi warisan budaya Jawa dari Yogyakarta hingga Malang, menikmati candi-candi kuno dan keindahan alam.',
    places: [
      {
        id: 1,
        name: 'Candi Borobudur',
        notes: 'Candi Buddha terbesar di dunia dengan relief yang menakjubkan',
        transport: 'Travel agent',
        cost: 'Rp 500.000',
        duration: '1 hari'
      },
      {
        id: 2,
        name: 'Candi Prambanan',
        notes: 'Candi Hindu terbesar di Indonesia dengan arsitektur yang megah',
        transport: 'Travel agent',
        cost: 'Rp 400.000',
        duration: 'setengah hari'
      },
      {
        id: 3,
        name: 'Kota Tua Semarang',
        notes: 'Eksplorasi bangunan kolonial dan Lawang Sewu',
        transport: 'Kereta api',
        cost: 'Rp 300.000',
        duration: '1 hari'
      },
      {
        id: 4,
        name: 'Batu Malang',
        notes: 'Kota wisata dengan udara sejuk dan banyak atraksi',
        transport: 'Bus',
        cost: 'Rp 300.000',
        duration: '2 hari'
      }
    ],
    images: [
      'https://picsum.photos/seed/borobudur-temple/800/600',
      'https://picsum.photos/seed/prambanan-temple/800/600',
      'https://picsum.photos/seed/lawang-sewu/800/600',
      'https://picsum.photos/seed/batu-malang/800/600'
    ],
    tags: ['Jawa', 'Heritage', 'Temple', 'Culture'],
    likes: 1567,
    views: 1890,
    isLiked: true
  },
  {
    id: '5',
    title: 'Sumatera Utara - Danau Toba Explorer',
    author: 'Hendri Explorer',
    authorAvatar: 'https://picsum.photos/seed/hendri/40/40',
    date: '2024-01-05',
    startPoint: 'Medan',
    endPoint: 'Samosir, Danau Toba',
    duration: '5 hari',
    budget: 'Rp 3.200.000',
    travelers: 3,
    description: 'Eksplorasi Danau Toba yang megah dan pulau vulkanik terbesar di dunia dengan kebudayaan Batak yang kaya.',
    places: [
      {
        id: 1,
        name: 'Parapat',
        notes: 'Kota tepi danau sebagai gerbang menuju Samosir',
        transport: 'Travel',
        cost: 'Rp 800.000',
        duration: '1 hari'
      },
      {
        id: 2,
        name: 'Pulau Samosir',
        notes: 'Eksplorasi desa tradisional Batak dan situs sejarah',
        transport: 'Ferry',
        cost: 'Rp 1.200.000',
        duration: '2 hari'
      },
      {
        id: 3,
        name: 'Toba Caldera',
        notes: 'View point terbaik untuk melihat kaldera raksasa',
        transport: 'Ojek',
        cost: 'Rp 500.000',
        duration: '1 hari'
      },
      {
        id: 4,
        name: 'Air Terjun Sipiso-piso',
        notes: 'Air terjun tinggi dengan pemandangan Danau Toba',
        transport: 'Sewa mobil',
        cost: 'Rp 700.000',
        duration: '1 hari'
      }
    ],
    images: [
      'https://picsum.photos/seed/danau-toba/800/600',
      'https://picsum.photos/seed/pulau-samosir/800/600',
      'https://picsum.photos/seed/toba-caldera/800/600',
      'https://picsum.photos/seed/sipiso-piso/800/600'
    ],
    tags: ['Danau Toba', 'Sumatera', 'Nature', 'Culture'],
    likes: 789,
    views: 1250,
    isLiked: false
  }
]

export default function TravelNoteDetail() {
  const params = useParams()
  const router = useRouter()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [travelNote, setTravelNote] = useState(mockTravelNotes.find(note => note.id === params.id))
  const [isLiked, setIsLiked] = useState(travelNote?.isLiked || false)

  if (!travelNote) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Catatan Perjalanan Tidak Ditemukan</h1>
          <Button onClick={() => router.push('/travel-notes')}>
            Kembali ke Daftar Catatan
          </Button>
        </div>
      </div>
    )
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    setTravelNote({
      ...travelNote,
      likes: isLiked ? travelNote.likes - 1 : travelNote.likes + 1,
      isLiked: !isLiked
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: travelNote.title,
        text: travelNote.description,
        url: window.location.href
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert('Link telah disalin ke clipboard!')
    }
  }

  const totalEstimatedCost = travelNote.places.reduce((total, place) => {
    const cost = parseInt(place.cost.replace(/[^0-9]/g, ''))
    return total + cost
  }, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      {/* Navigation */}
      <Navbar showSearch={false} />

      {/* Navigation Actions */}
      <div className="fixed top-20 left-0 right-0 z-40 bg-white/90 backdrop-blur-sm border-b border-purple-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="text-purple-700 hover:bg-purple-50"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
              <h1 className="text-lg font-bold text-gray-800">Detail Catatan Perjalanan</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="text-purple-700 hover:bg-purple-50"
              >
                <Share2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLike}
                className={`${isLiked ? 'text-red-500' : 'text-purple-700'} hover:bg-purple-50`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                <span className="ml-1 text-sm">{travelNote.likes}</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pt-32 pb-12 md:pb-0">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Image Gallery */}
              <div className="relative h-96 bg-gray-200">
                <img
                  src={travelNote.images[currentImageIndex]}
                  alt={travelNote.title}
                  className="w-full h-full object-cover"
                />

                {/* Image Navigation */}
                {travelNote.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => prev === 0 ? travelNote.images.length - 1 : prev - 1)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all"
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setCurrentImageIndex((prev) => prev === travelNote.images.length - 1 ? 0 : prev + 1)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all"
                    >
                      <ArrowLeft className="h-4 w-4 rotate-180" />
                    </button>
                  </>
                )}

                {/* Image Indicators */}
                {travelNote.images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {travelNote.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                          currentImageIndex === index ? 'bg-white w-8' : 'bg-white/50'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Title and Meta */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">{travelNote.title}</h1>
                    <p className="text-gray-600 mb-4">{travelNote.description}</p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {travelNote.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Author and Stats */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <img
                      src={travelNote.authorAvatar}
                      alt={travelNote.author}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-semibold text-gray-800">{travelNote.author}</p>
                      <p className="text-sm text-gray-500">{travelNote.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Heart className="h-4 w-4" />
                      <span>{travelNote.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>👁️</span>
                      <span>{travelNote.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Journey Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Ringkasan Perjalanan</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-4 bg-purple-50 rounded-lg">
                  <MapPin className="h-5 w-5 text-purple-600" />
                  <div>
                    <p className="text-sm text-gray-600">Rute</p>
                    <p className="font-semibold text-gray-800">{travelNote.startPoint} → {travelNote.endPoint}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">Durasi</p>
                    <p className="font-semibold text-gray-800">{travelNote.duration}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">Anggaran</p>
                    <p className="font-semibold text-gray-800">{travelNote.budget}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-orange-50 rounded-lg">
                  <Users className="h-5 w-5 text-orange-600" />
                  <div>
                    <p className="text-sm text-gray-600">Wisatawan</p>
                    <p className="font-semibold text-gray-800">{travelNote.travelers} orang</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Detailed Itinerary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Rincian Perjalanan</h2>
                <div className="text-sm text-gray-600">
                  Total Estimasi Biaya: <span className="font-bold text-lg text-green-600">
                    Rp {totalEstimatedCost.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                {travelNote.places.map((place, index) => (
                  <div
                    key={place.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="flex items-center justify-center w-8 h-8 bg-purple-100 text-purple-700 rounded-full font-semibold text-sm">
                            {index + 1}
                          </span>
                          <h3 className="text-lg font-semibold text-gray-800">{place.name}</h3>
                        </div>

                        <p className="text-gray-600 mb-3">{place.notes}</p>

                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span>{place.duration}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <span>🚗</span>
                            <span>{place.transport}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-sm text-gray-600">Estimasi Biaya</p>
                        <p className="font-bold text-lg text-green-600">{place.cost}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Catatan
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8"
            >
              Buat Serupa
            </Button>

            <Button
              size="lg"
              variant="destructive"
              className="px-8"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Hapus
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}