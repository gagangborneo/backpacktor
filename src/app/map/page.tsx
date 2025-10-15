'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardFilter, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Mountain, MapPin, Navigation, Layers, Plus, Minus, Search, Filter, Heart, MessageCircle, Camera, Calendar } from 'lucide-react'
import SimpleMap from '@/components/simple-map'
import { Navbar } from '@/components/navbar'

interface Location {
  id: number
  title: string
  description: string
  lat: number
  lng: number
  category: string
  image: string
  likes: number
  comments: number
  photos: number
  date: string
}

const locations: Location[] = [
  {
    id: 1,
    title: 'Gunung Bromo',
    description: 'Sunrise spektakuler dengan pemandangan kawah aktif',
    lat: -7.9425,
    lng: 112.9500,
    category: 'Mountain',
    image: 'https://picsum.photos/seed/bromo-map/400/300',
    likes: 1234,
    comments: 89,
    photos: 156,
    date: '2024-01-15'
  },
  {
    id: 2,
    title: 'Ubud, Bali',
    description: 'Pusat budaya Bali dengan sawah terasering dan pura',
    lat: -8.5069,
    lng: 115.2625,
    category: 'Culture',
    image: 'https://picsum.photos/seed/ubud-map/400/300',
    likes: 2156,
    comments: 234,
    photos: 289,
    date: '2024-01-12'
  },
  {
    id: 3,
    title: 'Raja Ampat',
    description: 'Surga diving dengan keanekaragaman hayati laut yang menakjubkan',
    lat: -0.2333,
    lng: 130.5333,
    category: 'Marine',
    image: 'https://picsum.photos/seed/raja-map/400/300',
    likes: 1876,
    comments: 156,
    photos: 445,
    date: '2024-01-10'
  },
  {
    id: 4,
    title: 'Candi Borobudur',
    description: 'Candi Buddha terbesar di dunia dengan arsitektur megah',
    lat: -7.6079,
    lng: 110.2038,
    category: 'Heritage',
    image: 'https://picsum.photos/seed/borobudur-map/400/300',
    likes: 3421,
    comments: 445,
    photos: 667,
    date: '2024-01-08'
  },
  {
    id: 5,
    title: 'Pantai Kuta',
    description: 'Pantai terkenal dengan sunset yang memukau',
    lat: -8.7184,
    lng: 115.1686,
    category: 'Beach',
    image: 'https://picsum.photos/seed/kuta-map/400/300',
    likes: 1567,
    comments: 234,
    photos: 345,
    date: '2024-01-05'
  }
]

const categories = ['All', 'Mountain', 'Beach', 'Culture', 'Marine', 'Heritage', 'Nature', 'Adventure']

export default function MapPage() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [showLocationList, setShowLocationList] = useState(false)

  const filteredLocations = locations.filter(location => {
    const matchesCategory = selectedCategory === 'All' || location.category === selectedCategory
    const matchesSearch = location.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <Navbar showSearch={true} showCreateButton={true} />

      <div className="flex h-[calc(100vh-64px)] pt-16">
        {/* Map Container */}
        <div className="flex-1 relative">
          <SimpleMap
            locations={filteredLocations}
            center={[-2.5, 118]}
            zoom={5}
            className="w-full h-full z-10"
          />

          {/* Map Controls */}
          <div className="absolute top-2 left-2 z-20">
            <CardFilter className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-2">
                <div className="flex items-center gap-2 mb-2">
                  <Search className="h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Cari lokasi..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-8 text-sm"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="flex-1 h-8 text-sm border border-gray-200 rounded px-2 focus:outline-none focus:border-purple-500"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </CardContent>
            </CardFilter>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 right-4 z-20">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  Kategori
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-amber-600"></div>
                    <span>Mountain</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                    <span>Beach</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                    <span>Culture</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-cyan-600"></div>
                    <span>Marine</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-600"></div>
                    <span>Heritage</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block lg:w-96 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Lokasi Terdekat</h2>
            <div className="space-y-4">
              {filteredLocations.map((location) => (
                <motion.div
                  key={location.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="cursor-pointer"
                  onClick={() => setSelectedLocation(location)}
                >
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="h-32 relative">
                      <img
                        src={location.image}
                        alt={location.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className={`absolute top-2 right-2 ${
                        location.category === 'Mountain' ? 'bg-amber-100 text-amber-700' : ''
                      } ${
                        location.category === 'Beach' ? 'bg-blue-100 text-blue-700' : ''
                      } ${
                        location.category === 'Culture' ? 'bg-purple-100 text-purple-700' : ''
                      } ${
                        location.category === 'Marine' ? 'bg-cyan-100 text-cyan-700' : ''
                      } ${
                        location.category === 'Heritage' ? 'bg-yellow-100 text-yellow-700' : ''
                      }`}>
                        {location.category}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold text-gray-800 mb-1">{location.title}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{location.description}</p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Heart className="h-3 w-3" />
                          <span>{location.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-3 w-3" />
                          <span>{location.comments}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Camera className="h-3 w-3" />
                          <span>{location.photos}</span>
                        </div>
                        <span>•</span>
                        <span>{location.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Location List Toggle */}
        <div className="lg:hidden fixed bottom-20 left-4 right-4 z-30">
          {/* Toggle Button */}
          <motion.div
            className="bg-white rounded-lg shadow-lg"
            whileTap={{ scale: 0.95 }}
          >
            <button
              onClick={() => setShowLocationList(!showLocationList)}
              className="w-full p-2 flex items-center justify-between bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg"
            >
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span className="font-semibold">
                  {showLocationList ? 'Tutup Lokasi' : `Lokasi (${filteredLocations.length})`}
                </span>
              </div>
              <motion.div
                animate={{ rotate: showLocationList ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.div>
            </button>
          </motion.div>

          {/* Location List */}
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: showLocationList ? 'auto' : 0,
              opacity: showLocationList ? 1 : 0
            }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {showLocationList && (
              <div className="mt-2 bg-white rounded-lg shadow-lg border border-gray-200 max-h-64 overflow-y-auto">
                <div className="p-4">
                  <div className="space-y-2">
                    {filteredLocations.map((location, index) => (
                      <motion.div
                        key={location.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="cursor-pointer"
                        onClick={() => {
                          setSelectedLocation(location)
                          setShowLocationList(false) // Close list after selection
                        }}
                      >
                        <div className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors active:bg-purple-50">
                          <h4 className="font-medium text-gray-800 text-sm">{location.title}</h4>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Location Detail Modal */}
      {selectedLocation && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-2xl">{selectedLocation.title}</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedLocation(null)}
                >
                  ×
                </Button>
              </div>
              <CardDescription>{selectedLocation.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <img
                src={selectedLocation.image}
                alt={selectedLocation.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {selectedLocation.lat.toFixed(4)}, {selectedLocation.lng.toFixed(4)}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">{selectedLocation.date}</span>
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-800">{selectedLocation.likes}</div>
                    <div className="text-xs text-gray-500">Likes</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-800">{selectedLocation.comments}</div>
                    <div className="text-xs text-gray-500">Komentar</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-gray-800">{selectedLocation.photos}</div>
                    <div className="text-xs text-gray-500">Foto</div>
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Lihat Galeri
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}