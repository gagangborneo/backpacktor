'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  MapPin,
  Mountain,
  Menu,
  X,
  Search,
  BookOpen,
  Route,
  Camera as CameraIcon,
  Heart,
  Calendar,
  ArrowRight,
  Clock,
  Users
} from 'lucide-react'
import TravelGallery from '@/components/travel-gallery'
import Footer from '@/components/footer'
import { CookiesConsent } from '@/components/cookies-consent'
import { Navbar } from '@/components/navbar'
import Link from 'next/link'

const heroStats = [
  { number: '500+', label: 'Destinasi' },
  { number: '1.2K', label: 'Cerita Perjalanan' },
  { number: '10K', label: 'Foto Traveling' },
  { number: '50K', label: 'Backpacker' }
]

// Mock data for recent blog posts
const recentBlogPosts = [
  {
    id: '1',
    title: 'Keindahan Sunrise di Bromo',
    coverImage: 'https://picsum.photos/seed/bromo-sunrise/400/200',
    location: 'Gunung Bromo, Jawa Timur',
    date: '15 Jan 2024'
  },
  {
    id: '2',
    title: 'Eksplorasi Ubud Culture',
    coverImage: 'https://picsum.photos/seed/ubud-temple/400/200',
    location: 'Ubud, Bali',
    date: '12 Jan 2024'
  },
  {
    id: '3',
    title: 'Diving Paradise Raja Ampat',
    coverImage: 'https://picsum.photos/seed/raja-ampat-beach/400/200',
    location: 'Raja Ampat, Papua Barat',
    date: '10 Jan 2024'
  }
]

// Mock data for recent travel notes
const recentTravelNotes = [
  {
    id: '1',
    title: 'Perjalanan Jakarta - Bromo',
    startPoint: 'Jakarta',
    endPoint: 'Bromo, Jawa Timur',
    duration: '5 hari',
    budget: 'Rp 2.5jt',
    travelers: 3,
    date: '15 Jan 2024'
  },
  {
    id: '2',
    title: 'Bali Cultural Trip',
    startPoint: 'Denpasar',
    endPoint: 'Ubud, Bali',
    duration: '4 hari',
    budget: 'Rp 850rb',
    travelers: 2,
    date: '12 Jan 2024'
  },
  {
    id: '3',
    title: 'Sumatera Utara Explorer',
    startPoint: 'Medan',
    endPoint: 'Samosir, Danau Toba',
    duration: '5 hari',
    budget: 'Rp 3.2jt',
    travelers: 3,
    date: '05 Jan 2024'
  }
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      {/* Navigation */}
      <Navbar showSearch={true} />

      {/* Main Content with proper padding */}
      <div className="pt-16 pb-20 md:pb-0">
        {/* Travel Gallery Section */}
        <TravelGallery />

        {/* Recent Blog Posts Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Artikel Terbaru</h2>
                <p className="text-gray-600">Temukan inspirasi dan tips perjalanan terbaru</p>
              </div>
              <Link href="/blog">
                <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                  Lihat Semua Blog
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentBlogPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="h-32 relative">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-1">{post.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="h-3 w-3" />
                        <span>{post.location}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Recent Travel Notes Section */}
        <section className="py-16 bg-white/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Catatan Perjalanan</h2>
                <p className="text-gray-600">Dokumentasi petualanan dari komunitas backpacker</p>
              </div>
              <Link href="/travel-notes">
                <Button variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50">
                  Lihat Semua Catatan
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentTravelNotes.map((note, index) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                >
                  <Card className="p-4 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <MapPin className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-800 line-clamp-1">{note.title}</h3>
                        <div className="text-sm text-gray-500">
                          {note.startPoint} → {note.endPoint}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Clock className="h-3 w-3" />
                        <span>{note.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600">
                        <Users className="h-3 w-3" />
                        <span>{note.travelers} orang</span>
                      </div>
                      <div className="flex items-center gap-1 text-green-600 font-medium">
                        <span>Rp</span>
                        <span>{note.budget}</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>{note.date}</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                Siap Memulai Petualangan Anda?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Bergabunglah dengan komunitas backpacker dan bagikan cerita perjalanan Anda
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-3 text-lg">
                  <Route className="h-5 w-5 mr-2" />
                  Rencanakan Perjalanan
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <Footer />

        {/* Cookies Consent */}
        <CookiesConsent />
      </div>
    </div>
  )
}