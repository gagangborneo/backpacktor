'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Plus,
  Search,
  Edit,
  Trash2,
  FolderOpen,
  Hash,
  Calendar,
  Eye,
  Save,
  X,
  ChevronDown,
  ChevronUp
} from 'lucide-react'

interface Category {
  id: string
  name: string
  slug: string
  description: string
  type: 'blog' | 'travel' | 'gallery'
  parentId: string | null
  postCount: number
  color: string
  icon: string
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
  children?: Category[]
}

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Destinasi Asia',
    slug: 'destinasi-asia',
    description: 'Tempat-tempat menarik di benua Asia',
    type: 'travel',
    parentId: null,
    postCount: 15,
    color: '#3B82F6',
    icon: '🌏',
    status: 'active',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    children: [
      {
        id: '1-1',
        name: 'Southeast Asia',
        slug: 'southeast-asia',
        description: 'Negara-negara di Asia Tenggara',
        type: 'travel',
        parentId: '1',
        postCount: 8,
        color: '#06B6D4',
        icon: '🏝️',
        status: 'active',
        createdAt: '2024-01-15',
        updatedAt: '2024-01-15'
      },
      {
        id: '1-2',
        name: 'East Asia',
        slug: 'east-asia',
        description: 'Negara-negara di Asia Timur',
        type: 'travel',
        parentId: '1',
        postCount: 7,
        color: '#10B981',
        icon: '🏮',
        status: 'active',
        createdAt: '2024-01-15',
        updatedAt: '2024-01-15'
      }
    ]
  },
  {
    id: '2',
    name: 'Tips Travel',
    slug: 'tips-travel',
    description: 'Tips dan trik untuk perjalanan yang lebih baik',
    type: 'blog',
    parentId: null,
    postCount: 12,
    color: '#F59E0B',
    icon: '✈️',
    status: 'active',
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10'
  },
  {
    id: '3',
    name: 'Makanan Lokal',
    slug: 'makanan-lokal',
    description: 'Kuliner khas dari berbagai daerah',
    type: 'blog',
    parentId: null,
    postCount: 9,
    color: '#EF4444',
    icon: '🍜',
    status: 'active',
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08'
  },
  {
    id: '4',
    name: 'Landscape',
    slug: 'landscape',
    description: 'Foto-foto pemandangan alam',
    type: 'gallery',
    parentId: null,
    postCount: 25,
    color: '#8B5CF6',
    icon: '🏔️',
    status: 'active',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05'
  },
  {
    id: '5',
    name: 'Arsitektur',
    slug: 'arsitektur',
    description: 'Bangunan dan struktur menarik',
    type: 'gallery',
    parentId: null,
    postCount: 18,
    color: '#EC4899',
    icon: '🏛️',
    status: 'inactive',
    createdAt: '2024-01-03',
    updatedAt: '2024-01-03'
  }
]

const categoryTypes = [
  { value: 'blog', label: 'Blog', color: '#F59E0B' },
  { value: 'travel', label: 'Travel', color: '#3B82F6' },
  { value: 'gallery', label: 'Gallery', color: '#8B5CF6' }
]

const icons = ['📝', '🌍', '📷', '🏝️', '🏛️', '🍜', '✈️', '🏔️', '🏮', '🌏', '🎨', '🎭']

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(mockCategories)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['1'])
  const [newCategory, setNewCategory] = useState({
    name: '',
    description: '',
    type: 'blog' as 'blog' | 'travel' | 'gallery',
    parentId: '',
    color: '#3B82F6',
    icon: '📝',
    status: 'active' as 'active' | 'inactive'
  })

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || category.type === filterType
    return matchesSearch && matchesType && category.parentId === null
  })

  const toggleExpanded = (categoryId: string) => {
    setExpandedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleCreateCategory = () => {
    const category: Category = {
      id: Date.now().toString(),
      name: newCategory.name,
      slug: generateSlug(newCategory.name),
      description: newCategory.description,
      type: newCategory.type,
      parentId: newCategory.parentId || null,
      postCount: 0,
      color: newCategory.color,
      icon: newCategory.icon,
      status: newCategory.status,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    }

    if (newCategory.parentId) {
      setCategories(prev => prev.map(cat => {
        if (cat.id === newCategory.parentId) {
          return {
            ...cat,
            children: [...(cat.children || []), category]
          }
        }
        return cat
      }))
    } else {
      setCategories(prev => [...prev, category])
    }

    setNewCategory({
      name: '',
      description: '',
      type: 'blog',
      parentId: '',
      color: '#3B82F6',
      icon: '📝',
      status: 'active'
    })
    setIsCreateDialogOpen(false)
  }

  const handleEditCategory = () => {
    if (!editingCategory) return

    const updatedCategory = {
      ...editingCategory,
      name: newCategory.name,
      slug: generateSlug(newCategory.name),
      description: newCategory.description,
      type: newCategory.type,
      color: newCategory.color,
      icon: newCategory.icon,
      status: newCategory.status,
      updatedAt: new Date().toISOString().split('T')[0]
    }

    setCategories(prev => prev.map(cat =>
      cat.id === editingCategory.id ? updatedCategory : cat
    ))

    setNewCategory({
      name: '',
      description: '',
      type: 'blog',
      parentId: '',
      color: '#3B82F6',
      icon: '📝',
      status: 'active'
    })
    setIsEditDialogOpen(false)
    setEditingCategory(null)
  }

  const handleDeleteCategory = (categoryId: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
      setCategories(prev => prev.filter(cat => cat.id !== categoryId))
    }
  }

  const openEditDialog = (category: Category) => {
    setEditingCategory(category)
    setNewCategory({
      name: category.name,
      description: category.description,
      type: category.type,
      parentId: category.parentId || '',
      color: category.color,
      icon: category.icon,
      status: category.status
    })
    setIsEditDialogOpen(true)
  }

  const getParentCategories = () => {
    return categories.filter(cat => cat.parentId === null && cat.type === newCategory.type)
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Kategori</h1>
          <p className="text-gray-500 mt-1">Kelola kategori untuk blog, travel notes, dan galeri</p>
        </div>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-purple-600 hover:bg-purple-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Kategori Baru
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Kategori</p>
                <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
              </div>
              <FolderOpen className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Kategori Blog</p>
                <p className="text-2xl font-bold text-gray-900">
                  {categories.filter(cat => cat.type === 'blog').length}
                </p>
              </div>
              <div className="h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                📝
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Kategori Travel</p>
                <p className="text-2xl font-bold text-gray-900">
                  {categories.filter(cat => cat.type === 'travel').length}
                </p>
              </div>
              <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                🌍
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Kategori Gallery</p>
                <p className="text-2xl font-bold text-gray-900">
                  {categories.filter(cat => cat.type === 'gallery').length}
                </p>
              </div>
              <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                📷
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Cari kategori..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filterType} onValueChange={setFilterType}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter Tipe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Tipe</SelectItem>
            <SelectItem value="blog">Blog</SelectItem>
            <SelectItem value="travel">Travel</SelectItem>
            <SelectItem value="gallery">Gallery</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Categories List */}
      <div className="space-y-4">
        {filteredCategories.map(category => {
          const isExpanded = expandedCategories.includes(category.id)
          const hasChildren = category.children && category.children.length > 0
          const typeConfig = categoryTypes.find(t => t.value === category.type)

          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className={`hover:shadow-md transition-all duration-200 ${
                category.status === 'inactive' ? 'opacity-60' : ''
              }`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => toggleExpanded(category.id)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {hasChildren ? (
                          isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                        ) : (
                          <div className="w-4 h-4" />
                        )}
                      </button>

                      <div className="flex items-center gap-3">
                        <div
                          className="text-2xl p-2 rounded-lg"
                          style={{ backgroundColor: `${category.color}20` }}
                        >
                          {category.icon}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-gray-900">{category.name}</h3>
                            <Badge
                              variant="secondary"
                              style={{ backgroundColor: `${typeConfig?.color}20`, color: typeConfig?.color }}
                            >
                              {typeConfig?.label}
                            </Badge>
                            {category.status === 'inactive' && (
                              <Badge variant="outline" className="text-gray-500">
                                Nonaktif
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{category.description}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-400">
                            <span className="flex items-center gap-1">
                              <Hash className="h-3 w-3" />
                              {category.slug}
                            </span>
                            <span className="flex items-center gap-1">
                              <FolderOpen className="h-3 w-3" />
                              {category.postCount} post
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {category.createdAt}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(category)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteCategory(category.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Children Categories */}
                  <AnimatePresence>
                    {hasChildren && isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="ml-12 mt-4 space-y-2">
                          {category.children?.map(child => {
                            const childTypeConfig = categoryTypes.find(t => t.value === child.type)
                            return (
                              <div
                                key={child.id}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    className="text-xl p-1 rounded"
                                    style={{ backgroundColor: `${child.color}20` }}
                                  >
                                    {child.icon}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <h4 className="font-medium text-gray-800">{child.name}</h4>
                                      <Badge
                                        variant="secondary"
                                        style={{ backgroundColor: `${childTypeConfig?.color}20`, color: childTypeConfig?.color }}
                                        className="text-xs"
                                      >
                                        {childTypeConfig?.label}
                                      </Badge>
                                    </div>
                                    <p className="text-xs text-gray-500">{child.description}</p>
                                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                                      <span>{child.postCount} post</span>
                                      <span>{child.createdAt}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => openEditDialog(child)}
                                  >
                                    <Edit className="h-3 w-3" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteCategory(child.id)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* Create Category Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Kategori Baru</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nama Kategori</Label>
              <Input
                id="name"
                value={newCategory.name}
                onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Masukkan nama kategori"
              />
            </div>

            <div>
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                value={newCategory.description}
                onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Deskripsi kategori"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="type">Tipe Kategori</Label>
              <Select
                value={newCategory.type}
                onValueChange={(value: 'blog' | 'travel' | 'gallery') =>
                  setNewCategory(prev => ({ ...prev, type: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categoryTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="parent">Kategori Induk (Opsional)</Label>
              <Select
                value={newCategory.parentId}
                onValueChange={(value) => setNewCategory(prev => ({ ...prev, parentId: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori induk" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Tidak ada</SelectItem>
                  {getParentCategories().map(parent => (
                    <SelectItem key={parent.id} value={parent.id}>
                      {parent.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="color">Warna</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="color"
                  type="color"
                  value={newCategory.color}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, color: e.target.value }))}
                  className="w-16 h-10"
                />
                <Input
                  value={newCategory.color}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, color: e.target.value }))}
                  placeholder="#3B82F6"
                />
              </div>
            </div>

            <div>
              <Label>Icon</Label>
              <div className="grid grid-cols-6 gap-2 mt-2">
                {icons.map(icon => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setNewCategory(prev => ({ ...prev, icon }))}
                    className={`p-2 text-xl rounded border-2 transition-all ${
                      newCategory.icon === icon
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={newCategory.status}
                onValueChange={(value: 'active' | 'inactive') =>
                  setNewCategory(prev => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Nonaktif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Batal
            </Button>
            <Button
              onClick={handleCreateCategory}
              disabled={!newCategory.name}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Category Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Kategori</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Nama Kategori</Label>
              <Input
                id="edit-name"
                value={newCategory.name}
                onChange={(e) => setNewCategory(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Masukkan nama kategori"
              />
            </div>

            <div>
              <Label htmlFor="edit-description">Deskripsi</Label>
              <Textarea
                id="edit-description"
                value={newCategory.description}
                onChange={(e) => setNewCategory(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Deskripsi kategori"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="edit-color">Warna</Label>
              <div className="flex items-center gap-2">
                <Input
                  id="edit-color"
                  type="color"
                  value={newCategory.color}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, color: e.target.value }))}
                  className="w-16 h-10"
                />
                <Input
                  value={newCategory.color}
                  onChange={(e) => setNewCategory(prev => ({ ...prev, color: e.target.value }))}
                  placeholder="#3B82F6"
                />
              </div>
            </div>

            <div>
              <Label>Icon</Label>
              <div className="grid grid-cols-6 gap-2 mt-2">
                {icons.map(icon => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setNewCategory(prev => ({ ...prev, icon }))}
                    className={`p-2 text-xl rounded border-2 transition-all ${
                      newCategory.icon === icon
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={newCategory.status}
                onValueChange={(value: 'active' | 'inactive') =>
                  setNewCategory(prev => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Aktif</SelectItem>
                  <SelectItem value="inactive">Nonaktif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Batal
            </Button>
            <Button
              onClick={handleEditCategory}
              disabled={!newCategory.name}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Update
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}