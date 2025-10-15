'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Mountain,
  ArrowLeft,
  Plus,
  Save,
  X,
  Edit,
  Trash2,
  MapPin,
  Search,
  Filter,
  Navigation,
  Eye,
  Layers,
  Tag,
  Clock,
  MapIcon,
  Map
} from 'lucide-react'
import Link from 'next/link'

interface MapLocation {
  id: number
  title: string
  description: string
  lat: number
  lng: number
  category: string
  image: string
  status: 'published' | 'draft'
  createdAt: string
  views: number
  photos: number
  tags: string[]
  difficulty: 'Mudah' | 'Sedang' | 'Menantang'
  bestTime: string
  address: string
  region: string
}

const mockLocations: MapLocation[] = [
  {
    id: 1,
    title: 'Gunung Bromo',
    description: 'Sunrise spektakuler dengan pemandangan kawah aktif dan lautan pasir yang luas. Spot sempurna untuk photography dan hiking.',
    lat: -7.9425,
    lng: 112.9500,
    category: 'Mountain',
    image: 'https://picsum.photos/seed/bromo-admin/400/300',
    status: 'published',
    createdAt: '2024-01-15',
    views: 1234,
    photos: 156,
    tags: ['sunrise', 'kawah', 'hiking', 'photography', 'jawa timur'],
    difficulty: 'Sedang',
    bestTime: 'Juni - Oktober',
    address: 'Cemoro Lawang, Ngadisari, Sukapura, Probolinggo',
    region: 'Jawa Timur'
  },
  {
    id: 2,
    title: 'Ubud, Bali',
    description: 'Pusat budaya Bali dengan sawah terasering, pura kuno, dan seni tradisional. Destinasi spiritual dan artistik.',
    lat: -8.5069,
    lng: 115.2625,
    category: 'Culture',
    image: 'https://picsum.photos/seed/ubud-admin/400/300',
    status: 'published',
    createdAt: '2024-01-12',
    views: 2156,
    photos: 289,
    tags: ['budaya', 'sawah', 'pura', 'seni', 'spiritual'],
    difficulty: 'Mudah',
    bestTime: 'April - Oktober',
    address: 'Ubud, Gianyar, Bali',
    region: 'Bali'
  },
  {
    id: 3,
    title: 'Raja Ampat',
    description: 'Surga diving dengan keanekaragaman hayati laut tertinggi di dunia. Karst islands dan pantai berpasir putih.',
    lat: -0.2333,
    lng: 130.5333,
    category: 'Marine',
    image: 'https://picsum.photos/seed/raja-admin/400/300',
    status: 'published',
    createdAt: '2024-01-10',
    views: 3421,
    photos: 445,
    tags: ['diving', 'snorkeling', 'biodiversity', 'islands', 'coral'],
    difficulty: 'Menantang',
    bestTime: 'Oktober - April',
    address: 'Kepulauan Raja Ampat, Papua Barat Daya',
    region: 'Papua Barat Daya'
  }
]

const categories = ['Mountain', 'Beach', 'Culture', 'Marine', 'Heritage', 'Nature', 'Adventure']

export default function MapManager() {
  const [locations, setLocations] = useState<MapLocation[]>(mockLocations)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingLocation, setEditingLocation] = useState<MapLocation | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    lat: '',
    lng: '',
    category: '',
    status: 'draft' as 'published' | 'draft',
    tags: '',
    difficulty: 'Mudah' as 'Mudah' | 'Sedang' | 'Menantang',
    bestTime: '',
    address: '',
    region: ''
  })

  const filteredLocations = locations.filter(location => {
    const matchesSearch = location.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         location.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === '' || location.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (editingLocation) {
      // Update existing location
      setLocations(locations.map(loc =>
        loc.id === editingLocation.id
          ? {
              ...loc,
              title: formData.title,
              description: formData.description,
              lat: parseFloat(formData.lat),
              lng: parseFloat(formData.lng),
              category: formData.category,
              status: formData.status,
              tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
              difficulty: formData.difficulty,
              bestTime: formData.bestTime,
              address: formData.address,
              region: formData.region
            }
          : loc
      ))
    } else {
      // Add new location
      const newLocation: MapLocation = {
        id: Math.max(...locations.map(l => l.id)) + 1,
        title: formData.title,
        description: formData.description,
        lat: parseFloat(formData.lat),
        lng: parseFloat(formData.lng),
        category: formData.category,
        image: `https://picsum.photos/seed/${formData.title.toLowerCase().replace(/\s+/g, '-')}/400/300`,
        status: formData.status,
        createdAt: new Date().toISOString().split('T')[0],
        views: 0,
        photos: 0,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
        difficulty: formData.difficulty,
        bestTime: formData.bestTime,
        address: formData.address,
        region: formData.region
      }
      setLocations([...locations, newLocation])
    }

    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      lat: '',
      lng: '',
      category: '',
      status: 'draft',
      tags: '',
      difficulty: 'Mudah',
      bestTime: '',
      address: '',
      region: ''
    })
    setEditingLocation(null)
    setShowAddModal(false)
  }

  const handleEdit = (location: MapLocation) => {
    setEditingLocation(location)
    setFormData({
      title: location.title,
      description: location.description,
      lat: location.lat.toString(),
      lng: location.lng.toString(),
      category: location.category,
      status: location.status,
      tags: location.tags.join(', '),
      difficulty: location.difficulty,
      bestTime: location.bestTime,
      address: location.address,
      region: location.region
    })
    setShowAddModal(true)
  }

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus lokasi ini?')) {
      setLocations(locations.filter(loc => loc.id !== id))
    }
  }

  const handleStatusChange = (id: number, status: 'published' | 'draft') => {
    setLocations(locations.map(loc =>
      loc.id === id ? { ...loc, status } : loc
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Mountain className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">Backpacktor</span>
          </div>
        </div>
        <div className="flex-1"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard">
                <Button variant="ghost" size="sm" className="text-gray-600">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Kembali
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-gray-800">Manajemen Peta</h1>
            </div>
            <Button
              onClick={() => setShowAddModal(true)}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              <Plus className="h-4 w-4 mr-2" />
              Tambah Lokasi
            </Button>
          </div>
        </header>

        {/* Filters */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Cari lokasi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
            >
              <option value="">Semua Kategori</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Locations Table */}
        <main className="flex-1 p-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Navigation className="h-5 w-5" />
                Lokasi Peta
              </CardTitle>
              <CardDescription>
                Kelola lokasi-lokasi yang akan ditampilkan di peta perjalanan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4">Lokasi</th>
                      <th className="text-left py-3 px-4">Koordinat</th>
                      <th className="text-left py-3 px-4">Kategori</th>
                      <th className="text-left py-3 px-4">Kesulitan</th>
                      <th className="text-left py-3 px-4">Tags</th>
                      <th className="text-left py-3 px-4">Status</th>
                      <th className="text-left py-3 px-4">Dibuat</th>
                      <th className="text-left py-3 px-4">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLocations.map((location, index) => (
                      <motion.tr
                        key={location.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={location.image}
                              alt={location.title}
                              className="w-12 h-12 rounded object-cover"
                            />
                            <div>
                              <div className="font-medium text-gray-800">{location.title}</div>
                              <div className="text-sm text-gray-600 line-clamp-1 max-w-xs">
                                {location.address}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm">
                            <div className="font-mono text-xs">{location.lat.toFixed(4)}</div>
                            <div className="font-mono text-xs">{location.lng.toFixed(4)}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={`
                            ${location.category === 'Mountain' ? 'bg-amber-100 text-amber-700' : ''}
                            ${location.category === 'Beach' ? 'bg-blue-100 text-blue-700' : ''}
                            ${location.category === 'Culture' ? 'bg-purple-100 text-purple-700' : ''}
                            ${location.category === 'Marine' ? 'bg-cyan-100 text-cyan-700' : ''}
                            ${location.category === 'Heritage' ? 'bg-yellow-100 text-yellow-700' : ''}
                          `}>
                            {location.category}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={`
                            ${location.difficulty === 'Mudah' ? 'bg-green-100 text-green-700' : ''}
                            ${location.difficulty === 'Sedang' ? 'bg-yellow-100 text-yellow-700' : ''}
                            ${location.difficulty === 'Menantang' ? 'bg-red-100 text-red-700' : ''}
                          `}>
                            {location.difficulty}
                          </Badge>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex flex-wrap gap-1 max-w-xs">
                            {location.tags.slice(0, 2).map((tag, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {location.tags.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{location.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className={`
                            ${location.status === 'published'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                            }
                          `}>
                            {location.status}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-sm text-gray-600">
                          <div>{location.createdAt}</div>
                          <div className="text-xs text-gray-400">{location.region}</div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleStatusChange(location.id, location.status === 'published' ? 'draft' : 'published')}
                            >
                              {location.status === 'published' ? 'Draft' : 'Publish'}
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(location)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(`https://www.google.com/maps?q=${location.lat},${location.lng}`, '_blank')}
                            >
                              <MapPin className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(location.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {filteredLocations.length === 0 && (
                <div className="text-center py-12">
                  <MapPin className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Tidak ada lokasi ditemukan</h3>
                  <p className="text-gray-600 mb-4">Tambahkan lokasi pertama untuk memulai</p>
                  <Button
                    onClick={() => setShowAddModal(true)}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Lokasi
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {editingLocation ? 'Edit Lokasi' : 'Tambah Lokasi Baru'}
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={resetForm}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Judul Lokasi
                    </Label>
                    <Input
                      placeholder="Contoh: Gunung Bromo"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Kategori
                    </Label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                      required
                    >
                      <option value="">Pilih kategori</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Deskripsi
                  </Label>
                  <textarea
                    placeholder="Deskripsi lengkap lokasi..."
                    value={formData.description}
                    onChange={(e) => setFormData({...formData, description: e.target.value})}
                    className="w-full h-24 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-purple-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Alamat Lengkap
                    </Label>
                    <Input
                      placeholder="Contoh: Cemoro Lawang, Ngadisari, Sukapura"
                      value={formData.address}
                      onChange={(e) => setFormData({...formData, address: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Region
                    </Label>
                    <Input
                      placeholder="Contoh: Jawa Timur"
                      value={formData.region}
                      onChange={(e) => setFormData({...formData, region: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Latitude
                    </Label>
                    <Input
                      type="number"
                      step="any"
                      placeholder="Contoh: -7.9425"
                      value={formData.lat}
                      onChange={(e) => setFormData({...formData, lat: e.target.value})}
                      required
                    />
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Longitude
                    </Label>
                    <Input
                      type="number"
                      step="any"
                      placeholder="Contoh: 112.9500"
                      value={formData.lng}
                      onChange={(e) => setFormData({...formData, lng: e.target.value})}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Tingkat Kesulitan
                    </Label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) => setFormData({...formData, difficulty: e.target.value as 'Mudah' | 'Sedang' | 'Menantang'})}
                      className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                    >
                      <option value="Mudah">Mudah</option>
                      <option value="Sedang">Sedang</option>
                      <option value="Menantang">Menantang</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Waktu Terbaik Dikunjungi
                    </Label>
                    <Input
                      placeholder="Contoh: Juni - Oktober"
                      value={formData.bestTime}
                      onChange={(e) => setFormData({...formData, bestTime: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Tags
                  </Label>
                  <Input
                    placeholder="Contoh: sunrise, hiking, photography, kawah (pisahkan dengan koma)"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Pisahkan tags dengan koma
                  </p>
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Status
                  </Label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value as 'published' | 'draft'})}
                    className="w-full p-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Diterbitkan</option>
                  </select>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={resetForm}>
                    Batal
                  </Button>
                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    {editingLocation ? 'Update' : 'Simpan'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}