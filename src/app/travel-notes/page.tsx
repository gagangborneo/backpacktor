'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Mountain,
  MapPin,
  Calendar,
  Navigation,
  Car,
  Bus,
  Train,
  Plane,
  Ship,
  DollarSign,
  Eye,
  Plus,
  Search,
  Filter,
  ArrowRight
} from 'lucide-react'
import Link from 'next/link'
import { Navbar } from '@/components/navbar'

interface TravelNote {
  id: string
  title: string
  startPoint: string
  endPoint: string
  createdAt: string
  status: 'draft' | 'published'
  totalEstimate: number
  placeCount: number
  views: number
  author: string
  authorAvatar: string
}

const travelNotes: TravelNote[] = [
  {
    id: '1',
    title: 'Perjalanan Jakarta - Bromo Sunrise',
    startPoint: 'Jakarta',
    endPoint: 'Bromo, Jawa Timur',
    createdAt: '2024-01-15',
    status: 'published',
    totalEstimate: 2500000,
    placeCount: 5,
    views: 1234,
    author: 'Rizki Adventurer',
    authorAvatar: 'https://picsum.photos/seed/rizki/40/40'
  },
  {
    id: '2',
    title: 'Petualangan Bali - Ubud Cultural Trip',
    startPoint: 'Denpasar, Bali',
    endPoint: 'Ubud, Bali',
    createdAt: '2024-01-12',
    status: 'published',
    totalEstimate: 850000,
    placeCount: 3,
    views: 892,
    author: 'Sarah Explorer',
    authorAvatar: 'https://picsum.photos/seed/sarah/40/40'
  },
  {
    id: '3',
    title: 'Eksplorasi Raja Ampat Diving Paradise',
    startPoint: 'Sorong, Papua Barat',
    endPoint: 'Raja Ampat, Papua Barat',
    createdAt: '2024-01-10',
    status: 'published',
    totalEstimate: 8500000,
    placeCount: 8,
    views: 2156,
    author: 'Budi Diver',
    authorAvatar: 'https://picsum.photos/seed/budi/40/40'
  },
  {
    id: '4',
    title: 'Backpacking Jawa - Heritage Trail',
    startPoint: 'Yogyakarta',
    endPoint: 'Malang, Jawa Timur',
    createdAt: '2024-01-08',
    status: 'published',
    totalEstimate: 1500000,
    placeCount: 6,
    views: 1567,
    author: 'Maya Backpacker',
    authorAvatar: 'https://picsum.photos/seed/maya/40/40'
  },
  {
    id: '5',
    title: 'Sumatera Utara - Danau Toba Explorer',
    startPoint: 'Medan',
    endPoint: 'Samosir, Danau Toba',
    createdAt: '2024-01-05',
    status: 'published',
    totalEstimate: 3200000,
    placeCount: 4,
    views: 789,
    author: 'Hendri Explorer',
    authorAvatar: 'https://picsum.photos/seed/hendri/40/40'
  }
]

const transportModes = {
  car: { icon: Car, label: 'Mobil' },
  bus: { icon: Bus, label: 'Bus' },
  train: { icon: Train, label: 'Kereta' },
  plane: { icon: Plane, label: 'Pesawat' },
  ship: { icon: Ship, label: 'Kapal' }
}

const categories = ['All', 'Budget Travel', 'Adventure', 'Cultural', 'Nature', 'Marine', 'Heritage']

export default function TravelNotesPage() {
  const [notes, setNotes] = useState<TravelNote[]>(travelNotes)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredNotes = notes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.startPoint.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.endPoint.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = note.status === 'published'
    const matchesCategory = selectedCategory === 'All' || note.title.toLowerCase().includes(selectedCategory.toLowerCase())
    return matchesSearch && matchesStatus && matchesCategory
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      {/* Navigation */}
      <Navbar showSearch={true} showCreateButton={true} />

      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pb-0">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
              Catatan <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">Perjalanan</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto mb-8">
              Dokumentasikan setiap petualanan Anda dengan catatan perjalanan terperinci
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 text-lg">
                <Plus className="h-5 w-5 mr-2" />
                Buat Catatan Baru
              </Button>
              <Button size="lg" variant="outline" className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-4 text-lg">
                Jelajahi Catatan
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="pb-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Cari catatan perjalanan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-lg"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="h-12 px-4 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 bg-white"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Travel Notes List */}
      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {filteredNotes.length === 0 ? (
              <div className="text-center py-12">
                <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Belum ada catatan perjalanan</h3>
                <p className="text-gray-600 mb-6">Mulai buat catatan perjalanan pertama Anda</p>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Buat Catatan Baru
                </Button>
              </div>
            ) : (
              filteredNotes.map((note, index) => (
                <motion.div
                  key={note.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
                    {/* Route Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
                      <div className="flex items-center justify-between mb-4">
                        <Badge className="bg-white/20 text-white border-white/30">
                          <Calendar className="h-3 w-3 mr-1" />
                          {note.createdAt}
                        </Badge>
                        <div className="flex items-center gap-2 text-sm">
                          <Eye className="h-4 w-4" />
                          <span>{note.views}</span>
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold mb-2">{note.title}</h2>
                      <div className="flex items-center gap-4 text-white/90">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5" />
                          <span className="text-lg">{note.startPoint}</span>
                        </div>
                        <span className="text-xl">→</span>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5" />
                          <span className="text-lg">{note.endPoint}</span>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <CardContent className="p-6">
                      {/* Author Info */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={note.authorAvatar}
                            alt={note.author}
                            className="w-10 h-10 rounded-full"
                          />
                          <div>
                            <p className="font-medium text-gray-800">{note.author}</p>
                            <p className="text-sm text-gray-500">
                              {note.placeCount} tempat dikunjungi
                            </p>
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-700">
                          Diterbitkan
                        </Badge>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <div className="flex items-center justify-center gap-2 text-green-600 font-bold text-xl mb-1">
                            <DollarSign className="h-5 w-5" />
                            <span>Rp {note.totalEstimate.toLocaleString('id-ID')}</span>
                          </div>
                          <p className="text-sm text-gray-600">Total Estimasi</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-center">
                          <div className="flex items-center justify-center gap-2 text-purple-600 font-bold text-xl mb-1">
                            <Navigation className="h-5 w-5" />
                            <span>{note.placeCount}</span>
                          </div>
                          <p className="text-sm text-gray-600">Tempat Dikunjungi</p>
                        </div>
                      </div>

                      {/* Preview Places */}
                      <div className="mb-6">
                        <h3 className="font-medium text-gray-800 mb-3">Rute Perjalanan</h3>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="space-y-2">
                            <div className="flex items-center gap-3 text-sm">
                              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                              <span className="text-gray-700">{note.startPoint}</span>
                              <span className="text-gray-400">→</span>
                              <span className="text-gray-500">{note.placeCount - 1} tempat lainnya</span>
                              <span className="text-gray-400">→</span>
                              <span className="text-gray-700">{note.endPoint}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Link href={`/travel-notes/${note.id}`}>
                          <Button
                            variant="outline"
                            className="flex-1 border-purple-300 text-purple-600 hover:bg-purple-50"
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Lihat Detail
                          </Button>
                        </Link>
                        <Button
                          variant="outline"
                          className="border-purple-300 text-purple-600 hover:bg-purple-50"
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Buat Serupa
                        </Button>
                        <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                          Mulai Perjalanan
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>

          {/* Load More */}
          {filteredNotes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-center mt-12"
            >
              <Button variant="outline" className="border-purple-300 text-purple-600 hover:bg-purple-50 px-8 py-3">
                Muat Lebih Banyak
              </Button>
            </motion.div>
          )}
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
              Siap Mendokumentasikan Petualangan Anda?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Buat catatan perjalanan terperinci untuk setiap petualangan Anda
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg">
                <Plus className="h-5 w-5 mr-2" />
                Buat Catatan Perjalanan
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-4 text-lg">
                <MapPin className="h-5 w-5 mr-2" />
                Jelajahi Peta
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}