'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Plus,
  Trash2,
  Calendar,
  MapPin,
  DollarSign,
  Users,
  Clock,
  Plane,
  Hotel,
  Utensils,
  Camera,
  ShoppingBag,
  MoreHorizontal
} from 'lucide-react'

interface Expense {
  id: string
  name: string
  description?: string
  amount: number
  category: string
  date?: string
  isEssential: boolean
  notes?: string
}

interface Day {
  id: string
  dayNumber: number
  title?: string
  description?: string
  date: string
  activities: Activity[]
}

interface Activity {
  id: string
  name: string
  description?: string
  location?: string
  startTime?: string
  endTime?: string
  cost?: number
  notes?: string
}

const categoryOptions = [
  { value: 'transportation', label: 'Transportasi', icon: Plane },
  { value: 'accommodation', label: 'Akomodasi', icon: Hotel },
  { value: 'food', label: 'Makanan & Minuman', icon: Utensils },
  { value: 'activities', label: 'Aktivitas', icon: Camera },
  { value: 'shopping', label: 'Belanja', icon: ShoppingBag },
  { value: 'other', label: 'Lainnya', icon: MoreHorizontal }
]

const statusOptions = [
  { value: 'planning', label: 'Perencanaan', color: 'bg-blue-100 text-blue-700' },
  { value: 'active', label: 'Aktif', color: 'bg-green-100 text-green-700' },
  { value: 'completed', label: 'Selesai', color: 'bg-purple-100 text-purple-700' },
  { value: 'cancelled', label: 'Dibatalkan', color: 'bg-red-100 text-red-700' }
]

export default function CreateBudgetPlan() {
  const [mounted, setMounted] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isPreview, setIsPreview] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    destination: '',
    location: '',
    startDate: '',
    endDate: '',
    totalBudget: 0,
    currency: 'IDR',
    status: 'planning',
    isPublic: false
  })

  const [expenses, setExpenses] = useState<Expense[]>([])
  const [days, setDays] = useState<Day[]>([])
  const [newExpense, setNewExpense] = useState<Partial<Expense>>({
    name: '',
    description: '',
    amount: 0,
    category: 'transportation',
    isEssential: true
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const addExpense = () => {
    if (newExpense.name && newExpense.amount) {
      const expense: Expense = {
        id: Date.now().toString(),
        name: newExpense.name || '',
        description: newExpense.description,
        amount: newExpense.amount || 0,
        category: newExpense.category || 'transportation',
        isEssential: newExpense.isEssential || true,
        notes: newExpense.notes
      }
      setExpenses(prev => [...prev, expense])
      setNewExpense({
        name: '',
        description: '',
        amount: 0,
        category: 'transportation',
        isEssential: true
      })
    }
  }

  const removeExpense = (id: string) => {
    setExpenses(prev => prev.filter(exp => exp.id !== id))
  }

  const addDay = () => {
    const dayNumber = days.length + 1
    const day: Day = {
      id: Date.now().toString(),
      dayNumber,
      date: formData.startDate || new Date().toISOString().split('T')[0],
      activities: []
    }
    setDays(prev => [...prev, day])
  }

  const removeDay = (id: string) => {
    setDays(prev => prev.filter(day => day.id !== id))
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert('Rencana perjalanan berhasil disimpan!')
  }

  const calculateTotalExpenses = () => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0)
  }

  const getCategoryIcon = (category: string) => {
    const categoryOpt = categoryOptions.find(opt => opt.value === category)
    if (!categoryOpt) return MoreHorizontal
    const Icon = categoryOpt.icon
    return <Icon className="h-4 w-4" />
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'transportation': return 'bg-blue-100 text-blue-700'
      case 'accommodation': return 'bg-purple-100 text-purple-700'
      case 'food': return 'bg-orange-100 text-orange-700'
      case 'activities': return 'bg-green-100 text-green-700'
      case 'shopping': return 'bg-pink-100 text-pink-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  if (!mounted) return null

  const totalExpenses = calculateTotalExpenses()

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-green-700 hover:bg-green-50">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Buat Rencana Perjalanan</h1>
                <p className="text-sm text-gray-600">Rencanakan budget dan itinerary perjalanan Anda</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsPreview(!isPreview)}
                className="border-green-200 text-green-700 hover:bg-green-50"
              >
                <Eye className="h-4 w-4 mr-2" />
                {isPreview ? 'Edit' : 'Preview'}
              </Button>
              <Button 
                size="sm"
                onClick={handleSave}
                disabled={isSaving}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Menyimpan...' : 'Simpan'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-3">
            {isPreview ? (
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-center mb-8">
                      <h1 className="text-4xl font-bold text-gray-800 mb-4">{formData.title || 'Judul Rencana'}</h1>
                      <div className="flex items-center justify-center gap-4 text-gray-600">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{formData.destination}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {formData.startDate && formData.endDate ? 
                              `${new Date(formData.startDate).toLocaleDateString('id-ID')} - ${new Date(formData.endDate).toLocaleDateString('id-ID')}` 
                              : 'Tanggal belum ditentukan'
                            }
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4" />
                          <span className="font-semibold">
                            {new Intl.NumberFormat('id-ID', {
                              style: 'currency',
                              currency: formData.currency,
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0
                            }).format(formData.totalBudget)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {formData.description && (
                      <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Deskripsi</h2>
                        <p className="text-gray-700 leading-relaxed">{formData.description}</p>
                      </div>
                    )}

                    {expenses.length > 0 && (
                      <div className="mb-8">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Rincian Budget</h2>
                        <div className="space-y-3">
                          {expenses.map((expense) => (
                            <div key={expense.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getCategoryColor(expense.category)}`}>
                                  {getCategoryIcon(expense.category)}
                                </div>
                                <div>
                                  <h4 className="font-semibold text-gray-800">{expense.name}</h4>
                                  {expense.description && (
                                    <p className="text-sm text-gray-600">{expense.description}</p>
                                  )}
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-gray-800">
                                  {new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: formData.currency,
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                  }).format(expense.amount)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 p-4 bg-green-50 rounded-lg">
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-800">Total Pengeluaran:</span>
                            <span className="text-xl font-bold text-green-700">
                              {new Intl.NumberFormat('id-ID', {
                                style: 'currency',
                                currency: formData.currency,
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                              }).format(totalExpenses)}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {days.length > 0 && (
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Itinerary</h2>
                        <div className="space-y-4">
                          {days.map((day) => (
                            <div key={day.id} className="border border-gray-200 rounded-lg p-4">
                              <h3 className="font-semibold text-gray-800 mb-2">
                                Hari {day.dayNumber} - {new Date(day.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                              </h3>
                              {day.title && (
                                <p className="text-gray-600 mb-2">{day.title}</p>
                              )}
                              {day.description && (
                                <p className="text-sm text-gray-500">{day.description}</p>
                              )}
                              {day.activities.length === 0 && (
                                <p className="text-sm text-gray-400 italic">Belum ada aktivitas</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Basic Information */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Informasi Dasar
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Judul Rencana *
                        </label>
                        <Input
                          value={formData.title}
                          onChange={(e) => handleInputChange('title', e.target.value)}
                          placeholder="Contoh: Backpacking ke Jawa Timur"
                          className="border-green-200 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Destinasi *
                        </label>
                        <Input
                          value={formData.destination}
                          onChange={(e) => handleInputChange('destination', e.target.value)}
                          placeholder="Contoh: Jawa Timur"
                          className="border-green-200 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Deskripsi
                      </label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder="Deskripsikan rencana perjalanan Anda..."
                        rows={3}
                        className="border-green-200 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tanggal Mulai *
                        </label>
                        <Input
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => handleInputChange('startDate', e.target.value)}
                          className="border-green-200 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tanggal Selesai *
                        </label>
                        <Input
                          type="date"
                          value={formData.endDate}
                          onChange={(e) => handleInputChange('endDate', e.target.value)}
                          className="border-green-200 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Total Budget *
                        </label>
                        <Input
                          type="number"
                          value={formData.totalBudget}
                          onChange={(e) => handleInputChange('totalBudget', Number(e.target.value))}
                          placeholder="2500000"
                          className="border-green-200 focus:border-green-500 focus:ring-green-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mata Uang
                        </label>
                        <Select value={formData.currency} onValueChange={(value) => handleInputChange('currency', value)}>
                          <SelectTrigger className="border-green-200 focus:border-green-500 focus:ring-green-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="IDR">IDR - Rupiah</SelectItem>
                            <SelectItem value="USD">USD - Dollar</SelectItem>
                            <SelectItem value="EUR">EUR - Euro</SelectItem>
                            <SelectItem value="SGD">SGD - Singapore Dollar</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Status
                        </label>
                        <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                          <SelectTrigger className="border-green-200 focus:border-green-500 focus:ring-green-500">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {statusOptions.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-end">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.isPublic}
                            onChange={(e) => handleInputChange('isPublic', e.target.checked)}
                            className="rounded border-green-300 text-green-600 focus:ring-green-500"
                          />
                          <span className="text-sm text-gray-700">Publik</span>
                        </label>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Expenses Section */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Rincian Budget
                    </CardTitle>
                    <CardDescription>
                      Tambahkan pengeluaran untuk setiap kategori
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {/* Add New Expense Form */}
                    <div className="bg-gray-50 p-4 rounded-lg mb-6">
                      <h4 className="font-medium text-gray-800 mb-4">Tambah Pengeluaran Baru</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nama Pengeluaran *
                          </label>
                          <Input
                            value={newExpense.name}
                            onChange={(e) => setNewExpense(prev => ({ ...prev, name: e.target.value }))}
                            placeholder="Contoh: Tiket Kereta"
                            className="border-green-200 focus:border-green-500 focus:ring-green-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Jumlah *
                          </label>
                          <Input
                            type="number"
                            value={newExpense.amount}
                            onChange={(e) => setNewExpense(prev => ({ ...prev, amount: Number(e.target.value) }))}
                            placeholder="100000"
                            className="border-green-200 focus:border-green-500 focus:ring-green-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Kategori
                          </label>
                          <Select value={newExpense.category} onValueChange={(value) => setNewExpense(prev => ({ ...prev, category: value }))}>
                            <SelectTrigger className="border-green-200 focus:border-green-500 focus:ring-green-500">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {categoryOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-end">
                          <Button onClick={addExpense} className="w-full bg-green-600 hover:bg-green-700">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="mt-4">
                        <label className="flex items-center space-x-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={newExpense.isEssential}
                            onChange={(e) => setNewExpense(prev => ({ ...prev, isEssential: e.target.checked }))}
                            className="rounded border-green-300 text-green-600 focus:ring-green-500"
                          />
                          <span className="text-sm text-gray-700">Pengeluaran Esensial</span>
                        </label>
                      </div>
                    </div>

                    {/* Expenses List */}
                    {expenses.length > 0 ? (
                      <div className="space-y-3">
                        {expenses.map((expense) => (
                          <div key={expense.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getCategoryColor(expense.category)}`}>
                                {getCategoryIcon(expense.category)}
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-800">{expense.name}</h4>
                                {expense.description && (
                                  <p className="text-sm text-gray-600">{expense.description}</p>
                                )}
                                {!expense.isEssential && (
                                  <Badge variant="outline" className="text-xs border-orange-200 text-orange-700 mt-1">
                                    Optional
                                  </Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className="text-right">
                                <p className="font-semibold text-gray-800">
                                  {new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: formData.currency,
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                  }).format(expense.amount)}
                                </p>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeExpense(expense.id)}
                                className="text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                        
                        {/* Total Summary */}
                        <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="font-semibold text-gray-800">Total Pengeluaran:</span>
                              <p className="text-sm text-gray-600 mt-1">
                                {expenses.length} item pengeluaran
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="text-2xl font-bold text-green-700">
                                {new Intl.NumberFormat('id-ID', {
                                  style: 'currency',
                                  currency: formData.currency,
                                  minimumFractionDigits: 0,
                                  maximumFractionDigits: 0
                                }).format(totalExpenses)}
                              </p>
                              {formData.totalBudget > 0 && (
                                <p className="text-sm text-gray-600">
                                  Sisa: {new Intl.NumberFormat('id-ID', {
                                    style: 'currency',
                                    currency: formData.currency,
                                    minimumFractionDigits: 0,
                                    maximumFractionDigits: 0
                                  }).format(formData.totalBudget - totalExpenses)}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <DollarSign className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>Belum ada pengeluaran yang ditambahkan</p>
                        <p className="text-sm">Tambahkan pengeluaran untuk mulai merencanakan budget</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Itinerary Section */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Itinerary Perjalanan
                    </CardTitle>
                    <CardDescription>
                      Atur jadwal perjalanan hari per hari
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-6">
                      <h4 className="font-medium text-gray-800">Daftar Hari</h4>
                      <Button onClick={addDay} className="bg-green-600 hover:bg-green-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Tambah Hari
                      </Button>
                    </div>

                    {days.length > 0 ? (
                      <div className="space-y-4">
                        {days.map((day) => (
                          <div key={day.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h5 className="font-semibold text-gray-800">
                                Hari {day.dayNumber} - {new Date(day.date).toLocaleDateString('id-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                              </h5>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeDay(day.id)}
                                className="text-red-600 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Judul Hari (Opsional)
                                </label>
                                <Input
                                  value={day.title || ''}
                                  onChange={(e) => {
                                    const updatedDays = days.map(d => 
                                      d.id === day.id ? { ...d, title: e.target.value } : d
                                    )
                                    setDays(updatedDays)
                                  }}
                                  placeholder="Contoh: Arrival in Malang"
                                  className="border-green-200 focus:border-green-500 focus:ring-green-500"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                  Deskripsi (Opsional)
                                </label>
                                <Textarea
                                  value={day.description || ''}
                                  onChange={(e) => {
                                    const updatedDays = days.map(d => 
                                      d.id === day.id ? { ...d, description: e.target.value } : d
                                    )
                                    setDays(updatedDays)
                                  }}
                                  placeholder="Deskripsikan rencana untuk hari ini..."
                                  rows={2}
                                  className="border-green-200 focus:border-green-500 focus:ring-green-500"
                                />
                              </div>
                              <div className="text-sm text-gray-500">
                                <p>📝 {day.activities.length} aktivitas</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                        <p>Belum ada hari yang ditambahkan</p>
                        <p className="text-sm">Tambahkan hari untuk mulai membuat itinerary</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Budget</span>
                  <span className="font-medium">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: formData.currency,
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    }).format(formData.totalBudget)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Pengeluaran</span>
                  <span className="font-medium">
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: formData.currency,
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    }).format(totalExpenses)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Sisa Budget</span>
                  <span className={`font-medium ${formData.totalBudget - totalExpenses >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: formData.currency,
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0
                    }).format(Math.abs(formData.totalBudget - totalExpenses))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Jumlah Hari</span>
                  <span className="font-medium">{days.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Jumlah Pengeluaran</span>
                  <span className="font-medium">{expenses.length}</span>
                </div>
              </CardContent>
            </Card>

            {/* Publish Settings */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Publish Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Status</span>
                  <Badge className={statusOptions.find(s => s.value === formData.status)?.color || 'bg-gray-100 text-gray-700'}>
                    {statusOptions.find(s => s.value === formData.status)?.label || formData.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Visibility</span>
                  <Badge variant={formData.isPublic ? "default" : "secondary"}>
                    {formData.isPublic ? 'Publik' : 'Private'}
                  </Badge>
                </div>
                <div className="pt-4 border-t border-gray-200">
                  <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                    {formData.status === 'published' ? 'Update' : 'Publish Now'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    💡 Mulailah dengan menentukan total budget sebelum menambahkan pengeluaran
                  </p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-green-800">
                    💰 Bagi pengeluaran menjadi kategori untuk memudahkan tracking
                  </p>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <p className="text-sm text-purple-800">
                    📅 Buat itinerary harian untuk mengatur waktu dengan efisien
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}