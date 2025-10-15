'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Plus,
  Save,
  Trash2,
  MapPin,
  Calendar,
  Navigation,
  DollarSign,
  Edit,
  Copy,
  FileText
} from 'lucide-react'

interface TravelNote {
  id: string
  title: string
  startPoint: string
  endPoint: string
  createdAt: string
  status: 'draft' | 'published'
  totalEstimate: number
  placeCount: number
}

interface TravelPlace {
  id: string
  name: string
  notes: string
  transportMode: 'car' | 'bus' | 'train' | 'plane' | 'ship' | 'walk' | 'motorcycle'
  estimatedCost: number
}

const mockNotes: TravelNote[] = [
  {
    id: '1',
    title: 'Perjalanan Jakarta - Bromo Sunrise',
    startPoint: 'Jakarta',
    endPoint: 'Bromo, Jawa Timur',
    createdAt: '2024-01-15',
    status: 'published',
    totalEstimate: 2500000,
    placeCount: 5
  },
  {
    id: '2',
    title: 'Petualangan Bali',
    startPoint: 'Denpasar, Bali',
    endPoint: 'Ubud, Bali',
    createdAt: '2024-01-12',
    status: 'draft',
    totalEstimate: 850000,
    placeCount: 3
  }
]

export default function TravelNotesManager() {
  const [notes, setNotes] = useState<TravelNote[]>(mockNotes)
  const [isCreating, setIsCreating] = useState(false)
  const [editingNote, setEditingNote] = useState<TravelNote | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    startPoint: '',
    endPoint: ''
  })
  const [places, setPlaces] = useState<TravelPlace[]>([])

  const handleCreateNote = () => {
    if (!formData.title || !formData.startPoint || !formData.endPoint) return

    const newNote: TravelNote = {
      id: Date.now().toString(),
      title: formData.title,
      startPoint: formData.startPoint,
      endPoint: formData.endPoint,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'draft',
      totalEstimate: 0,
      placeCount: 0
    }

    setNotes([...notes, newNote])
    setEditingNote(newNote)
    setIsCreating(false)
    resetForm()
  }

  const resetForm = () => {
    setFormData({
      title: '',
      startPoint: '',
      endPoint: ''
    })
    setPlaces([])
    setIsCreating(false)
    setEditingNote(null)
  }

  const handleDeleteNote = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus catatan ini?')) {
      setNotes(notes.filter(note => note.id !== id))
    }
  }

  const handleEditNote = (note: TravelNote) => {
    setEditingNote(note)
    setFormData({
      title: note.title,
      startPoint: note.startPoint,
      endPoint: note.endPoint
    })
    setPlaces([])
  }

  const addPlace = () => {
    const newPlace: TravelPlace = {
      id: Date.now().toString(),
      name: '',
      notes: '',
      transportMode: 'car',
      estimatedCost: 0
    }
    setPlaces([...places, newPlace])
  }

  const updatePlace = (id: string, field: keyof TravelPlace, value: any) => {
    setPlaces(places.map(place =>
      place.id === id ? { ...place, [field]: value } : place
    ))
  }

  const deletePlace = (id: string) => {
    setPlaces(places.filter(place => place.id !== id))
  }

  const calculateTotal = () => {
    return places.reduce((total, place) => total + place.estimatedCost, 0)
  }

  const saveNote = () => {
    if (!editingNote) return

    const updatedNote: TravelNote = {
      ...editingNote,
      title: formData.title,
      startPoint: formData.startPoint,
      endPoint: formData.endPoint,
      totalEstimate: calculateTotal(),
      placeCount: places.length
    }

    setNotes(notes.map(note =>
      note.id === editingNote.id ? updatedNote : note
    ))

    alert('Catatan perjalanan berhasil disimpan!')
    resetForm()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Travel Notes Management</h1>
          <p className="text-gray-600">Manage your travel notes and itineraries</p>
        </div>
        <Button
          onClick={() => setIsCreating(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Travel Note
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Catatan</p>
                <p className="text-2xl font-bold text-gray-800">{notes.length}</p>
              </div>
              <MapPin className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Dipublikasi</p>
                <p className="text-2xl font-bold text-green-600">{notes.filter(n => n.status === 'published').length}</p>
              </div>
              <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Draft</p>
                <p className="text-2xl font-bold text-yellow-600">{notes.filter(n => n.status === 'draft').length}</p>
              </div>
              <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold text-gray-800">
                  Rp {notes.reduce((acc, note) => acc + note.totalEstimate, 0).toLocaleString('id-ID')}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {(isCreating || editingNote) && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  {editingNote ? 'Edit Catatan' : 'Catatan Perjalanan Baru'}
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={resetForm}>
                  ×
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Judul Perjalanan
                  </Label>
                  <Input
                    placeholder="Contoh: Perjalanan Jakarta - Bromo"
                    value={formData.title}
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Asal Mulai
                  </Label>
                  <Input
                    placeholder="Contoh: Jakarta"
                    value={formData.startPoint}
                    onChange={(e) => setFormData({...formData, startPoint: e.target.value})}
                  />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Tujuan
                  </Label>
                  <Input
                    placeholder="Contoh: Bromo, Jawa Timur"
                    value={formData.endPoint}
                    onChange={(e) => setFormData({...formData, endPoint: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-sm font-medium text-gray-700">
                    Rincian Tempat & Transportasi
                  </Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={addPlace}
                    className="text-purple-600 border-purple-300 hover:bg-purple-50"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Tambah Tempat
                  </Button>
                </div>

                {places.length === 0 ? (
                  <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                    <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">Belum ada tempat yang ditambahkan</p>
                    <Button
                      variant="outline"
                      onClick={addPlace}
                      className="text-purple-600 border-purple-300 hover:bg-purple-50"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Tambah Tempat Pertama
                    </Button>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="text-left p-3 border-b font-medium text-gray-700">
                            Nama Tempat
                          </th>
                          <th className="text-left p-3 border-b font-medium text-gray-700">
                            Catatan
                          </th>
                          <th className="text-left p-3 border-b font-medium text-gray-700">
                            Transportasi
                          </th>
                          <th className="text-left p-3 border-b font-medium text-gray-700">
                            Estimasi Biaya
                          </th>
                          <th className="text-center p-3 border-b font-medium text-gray-700">
                            Aksi
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {places.map((place, index) => (
                          <motion.tr
                            key={place.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            className="border-b hover:bg-gray-50"
                          >
                            <td className="p-3">
                              <Input
                                placeholder="Nama tempat"
                                value={place.name}
                                onChange={(e) => updatePlace(place.id, 'name', e.target.value)}
                                className="h-8"
                              />
                            </td>
                            <td className="p-3">
                              <textarea
                                placeholder="Catatan tentang tempat ini..."
                                value={place.notes}
                                onChange={(e) => updatePlace(place.id, 'notes', e.target.value)}
                                className="w-full h-16 p-2 border border-gray-200 rounded resize-none text-sm"
                              />
                            </td>
                            <td className="p-3">
                              <select
                                value={place.transportMode}
                                onChange={(e) => updatePlace(place.id, 'transportMode', e.target.value)}
                                className="h-8 text-sm border border-gray-200 rounded px-2"
                              >
                                <option value="car">Mobil</option>
                                <option value="motorcycle">Motor</option>
                                <option value="bus">Bus</option>
                                <option value="train">Kereta</option>
                                <option value="plane">Pesawat</option>
                                <option value="ship">Kapal</option>
                                <option value="walk">Jalan Kaki</option>
                              </select>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center gap-2">
                                <span className="text-gray-500">Rp</span>
                                <Input
                                  type="number"
                                  placeholder="0"
                                  value={place.estimatedCost}
                                  onChange={(e) => updatePlace(place.id, 'estimatedCost', parseInt(e.target.value) || 0)}
                                  className="h-8 w-32"
                                />
                              </div>
                            </td>
                            <td className="p-3 text-center">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => deletePlace(place.id)}
                                className="h-8 w-8 p-0"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                      <tfoot className="bg-gray-50 font-semibold">
                        <tr>
                          <td colSpan={3} className="p-3 text-right">
                            Total Estimasi Biaya:
                          </td>
                          <td colSpan={2} className="p-3">
                            <div className="flex items-center gap-2 text-green-600">
                              <span className="text-gray-500">Rp</span>
                              <span>{calculateTotal().toLocaleString('id-ID')}</span>
                            </div>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <Button variant="outline" onClick={resetForm}>
                  Batal
                </Button>
                <Button
                  onClick={saveNote}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  {editingNote ? 'Update' : 'Simpan'}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note, index) => (
          <motion.div
            key={note.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg mb-1">{note.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <MapPin className="h-4 w-4" />
                      <span>{note.startPoint} → {note.endPoint}</span>
                    </CardDescription>
                  </div>
                  <Badge className={`${
                    note.status === 'published'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {note.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{note.createdAt}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Navigation className="h-4 w-4" />
                      <span>{note.placeCount} tempat</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-lg font-semibold text-green-600">
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-5 w-5" />
                      <span>Rp {note.totalEstimate.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="text-xs text-gray-500">Estimasi</div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditNote(note)}
                      className="flex-1"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-purple-600 border-purple-300 hover:bg-purple-50"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Salin
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteNote(note.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {notes.length === 0 && !isCreating && !editingNote && (
        <div className="text-center py-12">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-800 mb-2">Belum ada catatan perjalanan</h3>
          <p className="text-gray-600 mb-4">Buat catatan pertama Anda untuk mulai merencanakan perjalanan</p>
          <Button
            onClick={() => setIsCreating(true)}
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Buat Catatan Baru
          </Button>
        </div>
      )}
    </div>
  )
}