'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Badge } from '@/components/ui/badge'
import { MapPin, Heart, Eye } from 'lucide-react'

interface GalleryImage {
  id: number
  src: string
  alt: string
  location: string
  likes: number
  views: number
  height: string
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: 'https://picsum.photos/seed/bromo-sunrise/400/500',
    alt: 'Sunrise at Mount Bromo',
    location: 'Mount Bromo, Indonesia',
    likes: 234,
    views: 1520,
    height: 'h-96'
  },
  {
    id: 2,
    src: 'https://picsum.photos/seed/ubud-terrace/300/400',
    alt: 'Rice terraces in Ubud',
    location: 'Ubud, Bali',
    likes: 189,
    views: 980,
    height: 'h-80'
  },
  {
    id: 3,
    src: 'https://picsum.photos/seed/raja-ampat-beach/350/250',
    alt: 'Beach in Raja Ampat',
    location: 'Raja Ampat, Papua',
    likes: 312,
    views: 2100,
    height: 'h-64'
  },
  {
    id: 4,
    src: 'https://picsum.photos/seed/dieng-plateau/300/450',
    alt: 'Dieng Plateau landscape',
    location: 'Dieng, Central Java',
    likes: 156,
    views: 890,
    height: 'h-96'
  },
  {
    id: 5,
    src: 'https://picsum.photos/seed/borobudur-temple/400/300',
    alt: 'Borobudur Temple',
    location: 'Magelang, Indonesia',
    likes: 445,
    views: 3200,
    height: 'h-72'
  },
  {
    id: 6,
    src: 'https://picsum.photos/seed/komodo-island/320/380',
    alt: 'Komodo Dragon',
    location: 'Komodo Island',
    likes: 278,
    views: 1650,
    height: 'h-80'
  },
  {
    id: 7,
    src: 'https://picsum.photos/seed/lake-toba/380/280',
    alt: 'Lake Toba view',
    location: 'North Sumatra',
    likes: 201,
    views: 1200,
    height: 'h-64'
  },
  {
    id: 8,
    src: 'https://picsum.photos/seed/bali-beach-sunset/340/420',
    alt: 'Beach sunset in Bali',
    location: 'Uluwatu, Bali',
    likes: 389,
    views: 2400,
    height: 'h-96'
  },
  {
    id: 9,
    src: 'https://picsum.photos/seed/mount-rinjani/360/320',
    alt: 'Mount Rinjani',
    location: 'Lombok, Indonesia',
    likes: 267,
    views: 1800,
    height: 'h-72'
  },
  {
    id: 10,
    src: 'https://picsum.photos/seed/wakatobi-diving/320/360',
    alt: 'Diving in Wakatobi',
    location: 'Wakatobi, Sulawesi',
    likes: 334,
    views: 2100,
    height: 'h-80'
  },
  {
    id: 11,
    src: 'https://picsum.photos/seed/bromo-night/350/400',
    alt: 'Milky way at Bromo',
    location: 'Mount Bromo, Indonesia',
    likes: 423,
    views: 2800,
    height: 'h-96'
  },
  {
    id: 12,
    src: 'https://picsum.photos/seed/yogyakarta-temple/380/300',
    alt: 'Prambanan Temple',
    location: 'Yogyakarta, Indonesia',
    likes: 298,
    views: 1900,
    height: 'h-72'
  }
]

export default function TravelGallery() {
  const [hoveredImage, setHoveredImage] = useState<number | null>(null)

  return (
    <section className="pt-24 pb-16 bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      <div className="container mx-auto px-4">

        <div className="columns-2 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {galleryImages && galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="break-inside-avoid"
              onMouseEnter={() => setHoveredImage(image.id)}
              onMouseLeave={() => setHoveredImage(null)}
            >
              <div className="relative group cursor-pointer overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
                <div className={`${image.height} relative overflow-hidden`}>
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-300 ${
                    hoveredImage === image.id ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm font-medium">{image.location}</span>
                      </div>
                      <p className="text-sm opacity-90 mb-3">{image.alt}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4" />
                            <span className="text-xs">{image.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            <span className="text-xs">{image.views}</span>
                          </div>
                        </div>
                        <Badge className="bg-white/20 text-white border-white/30 text-xs">
                          Travel
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-12"
        >
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105">
            Lihat Semua Foto
          </button>
        </motion.div>
      </div>
    </section>
  )
}