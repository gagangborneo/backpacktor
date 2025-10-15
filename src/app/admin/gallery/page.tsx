'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Plus,
  Search,
  Filter,
  Grid3X3,
  List,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Image as ImageIcon,
  Calendar,
  Folder,
  Star,
  Clock,
  Heart,
  MessageCircle,
  X
} from 'lucide-react'
import { toast } from 'sonner'

interface GalleryItem {
  id: string
  title: string
  description: string
  imageUrl: string
  category: string
  tags: string[]
  featured: boolean
  published: boolean
  createdAt: string
  updatedAt: string
  views: number
  likes: number
  comments: number
  fileSize: string
  dimensions: string
  photographer: string
  location: string
}

const mockGalleryItems: GalleryItem[] = [
  {
    id: '1',
    title: 'Sunrise at Mount Bromo',
    description: 'Beautiful sunrise view from Mount Bromo with sea of clouds',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    category: 'Landscape',
    tags: ['sunrise', 'mountain', 'nature'],
    featured: true,
    published: true,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
    views: 1234,
    likes: 89,
    comments: 12,
    fileSize: '2.4 MB',
    dimensions: '1920x1080',
    photographer: 'John Photographer',
    location: 'Mount Bromo, East Java'
  },
  {
    id: '2',
    title: 'Traditional Balinese Dance',
    description: 'Cultural performance in Ubud, Bali',
    imageUrl: 'https://images.unsplash.com/photo-1533109721383-bccf4fdd2234?w=800&h=600&fit=crop',
    category: 'Culture',
    tags: ['dance', 'bali', 'culture'],
    featured: false,
    published: true,
    createdAt: '2024-01-12',
    updatedAt: '2024-01-12',
    views: 892,
    likes: 67,
    comments: 8,
    fileSize: '1.8 MB',
    dimensions: '1920x1080',
    photographer: 'Sarah Artist',
    location: 'Ubud, Bali'
  },
  {
    id: '3',
    title: 'Jakarta Skyline at Night',
    description: 'Modern city lights of Jakarta from above',
    imageUrl: 'https://images.unsplash.com/photo-1555972043-6802a9e8b1c6?w=800&h=600&fit=crop',
    category: 'Urban',
    tags: ['city', 'night', 'skyline'],
    featured: true,
    published: true,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10',
    views: 756,
    likes: 54,
    comments: 6,
    fileSize: '3.1 MB',
    dimensions: '1920x1080',
    photographer: 'Mike Urban',
    location: 'Jakarta'
  },
  {
    id: '4',
    title: 'Hidden Waterfall in Lombok',
    description: 'Secret waterfall discovered in the jungles of Lombok',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    category: 'Nature',
    tags: ['waterfall', 'nature', 'lombok'],
    featured: false,
    published: false,
    createdAt: '2024-01-08',
    updatedAt: '2024-01-08',
    views: 445,
    likes: 32,
    comments: 4,
    fileSize: '2.7 MB',
    dimensions: '1920x1080',
    photographer: 'Alex Nature',
    location: 'Lombok'
  },
  {
    id: '5',
    title: 'Street Food Paradise',
    description: 'Vibrant street food scene in Yogyakarta',
    imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop',
    category: 'Food',
    tags: ['food', 'street', 'yogyakarta'],
    featured: false,
    published: true,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05',
    views: 623,
    likes: 45,
    comments: 7,
    fileSize: '1.9 MB',
    dimensions: '1920x1080',
    photographer: 'Foodie Tom',
    location: 'Yogyakarta'
  }
]

const categories = ['All', 'Landscape', 'Culture', 'Urban', 'Nature', 'Food', 'Architecture', 'People']
const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'views', label: 'Most Views' },
  { value: 'likes', label: 'Most Liked' },
  { value: 'title', label: 'Alphabetical' }
]

export default function GalleryManagement() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(mockGalleryItems)
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>(mockGalleryItems)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isPreviewDialogOpen, setIsPreviewDialogOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Landscape',
    tags: '',
    featured: false,
    published: true,
    photographer: '',
    location: ''
  })

  useEffect(() => {
    let filtered = galleryItems

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    }

    if (selectedCategory !== 'All') {
      filtered = filtered.filter(item => item.category === selectedCategory)
    }

    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())
        break
      case 'popular':
        filtered.sort((a, b) => b.likes - a.likes)
        break
      case 'views':
        filtered.sort((a, b) => b.views - a.views)
        break
      case 'title':
        filtered.sort((a, b) => a.title.localeCompare(b.title))
        break
    }

    setFilteredItems(filtered)
  }, [galleryItems, searchTerm, selectedCategory, sortBy])

  const handleCreateGallery = () => {
    if (!formData.title.trim()) {
      toast.error('Title is required')
      return
    }

    const newItem: GalleryItem = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      imageUrl: `https://images.unsplash.com/photo-${Math.random()}?w=800&h=600&fit=crop`,
      category: formData.category,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      featured: formData.featured,
      published: formData.published,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      views: 0,
      likes: 0,
      comments: 0,
      fileSize: '2.0 MB',
      dimensions: '1920x1080',
      photographer: formData.photographer,
      location: formData.location
    }

    setGalleryItems([newItem, ...galleryItems])
    setIsCreateDialogOpen(false)
    resetForm()
    toast.success('Gallery item created successfully')
  }

  const handleUpdateGallery = () => {
    if (!selectedItem || !formData.title.trim()) {
      toast.error('Title is required')
      return
    }

    const updatedItems = galleryItems.map(item =>
      item.id === selectedItem.id
        ? {
            ...item,
            title: formData.title,
            description: formData.description,
            category: formData.category,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
            featured: formData.featured,
            published: formData.published,
            updatedAt: new Date().toISOString().split('T')[0],
            photographer: formData.photographer,
            location: formData.location
          }
        : item
    )

    setGalleryItems(updatedItems)
    setIsEditDialogOpen(false)
    setSelectedItem(null)
    resetForm()
    toast.success('Gallery item updated successfully')
  }

  const handleDeleteGallery = (id: string) => {
    setGalleryItems(galleryItems.filter(item => item.id !== id))
    toast.success('Gallery item deleted successfully')
  }

  const handleToggleFeatured = (id: string) => {
    setGalleryItems(galleryItems.map(item =>
      item.id === id ? { ...item, featured: !item.featured } : item
    ))
    toast.success('Featured status updated')
  }

  const handleTogglePublished = (id: string) => {
    setGalleryItems(galleryItems.map(item =>
      item.id === id ? { ...item, published: !item.published } : item
    ))
    toast.success('Published status updated')
  }

  const handleEdit = (item: GalleryItem) => {
    setSelectedItem(item)
    setFormData({
      title: item.title,
      description: item.description,
      category: item.category,
      tags: item.tags.join(', '),
      featured: item.featured,
      published: item.published,
      photographer: item.photographer,
      location: item.location
    })
    setIsEditDialogOpen(true)
  }

  const handlePreview = (item: GalleryItem) => {
    setSelectedItem(item)
    setIsPreviewDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category: 'Landscape',
      tags: '',
      featured: false,
      published: true,
      photographer: '',
      location: ''
    })
  }

  const simulateUpload = () => {
    setIsUploading(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsUploading(false)
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const renderGalleryCard = (item: GalleryItem) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="relative group">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2">
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handlePreview(item)}
            >
              <Eye className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => handleEdit(item)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="absolute top-2 left-2 flex gap-2">
          {item.featured && (
            <Badge className="bg-yellow-500 text-white">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}
          {!item.published && (
            <Badge variant="secondary">Draft</Badge>
          )}
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">{item.title}</h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{item.description}</p>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span className="flex items-center gap-1">
            <Folder className="h-3 w-3" />
            {item.category}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {item.createdAt}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {item.views}
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-3 w-3" />
              {item.likes}
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="h-3 w-3" />
              {item.comments}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 mb-3">
          {item.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {item.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{item.tags.length - 3}
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleToggleFeatured(item.id)}
              className={item.featured ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : ''}
            >
              <Star className={`h-3 w-3 ${item.featured ? 'fill-current' : ''}`} />
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleTogglePublished(item.id)}
              className={item.published ? 'bg-green-50 border-green-200 text-green-700' : ''}
            >
              {item.published ? 'Published' : 'Draft'}
            </Button>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handlePreview(item)}>
                <Eye className="h-4 w-4 mr-2" />
                Preview
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEdit(item)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Download className="h-4 w-4 mr-2" />
                Download
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => handleDeleteGallery(item.id)}
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.div>
  )

  const renderGalleryList = (item: GalleryItem) => (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex gap-4">
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-24 h-24 object-cover rounded-lg"
        />

        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>

              <div className="flex items-center gap-4 text-xs text-gray-500 mb-2">
                <span className="flex items-center gap-1">
                  <Folder className="h-3 w-3" />
                  {item.category}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {item.createdAt}
                </span>
                <span className="flex items-center gap-1">
                  <ImageIcon className="h-3 w-3" />
                  {item.dimensions}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {item.fileSize}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {item.views} views
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="h-3 w-3" />
                  {item.likes} likes
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="h-3 w-3" />
                  {item.comments} comments
                </span>
              </div>

              <div className="flex items-center gap-1">
                {item.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <div className="flex gap-2">
                {item.featured && (
                  <Badge className="bg-yellow-500 text-white">
                    <Star className="h-3 w-3 mr-1" />
                    Featured
                  </Badge>
                )}
                {!item.published && (
                  <Badge variant="secondary">Draft</Badge>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleToggleFeatured(item.id)}
                  className={item.featured ? 'bg-yellow-50 border-yellow-200 text-yellow-700' : ''}
                >
                  <Star className={`h-3 w-3 ${item.featured ? 'fill-current' : ''}`} />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleTogglePublished(item.id)}
                  className={item.published ? 'bg-green-50 border-green-200 text-green-700' : ''}
                >
                  {item.published ? 'Published' : 'Draft'}
                </Button>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="sm" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handlePreview(item)}>
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleEdit(item)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleDeleteGallery(item.id)}
                    className="text-red-600"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Gallery Management</h1>
          <p className="text-gray-600">Manage your photo gallery and media</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Photo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Photo</DialogTitle>
              <DialogDescription>
                Upload a new photo to your gallery
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
                <Button className="mt-4" onClick={simulateUpload} disabled={isUploading}>
                  {isUploading ? 'Uploading...' : 'Select Files'}
                </Button>
                {isUploading && (
                  <div className="mt-4">
                    <div className="bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{uploadProgress}%</p>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="Enter photo title"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.filter(cat => cat !== 'All').map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter photo description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="photographer">Photographer</Label>
                  <Input
                    id="photographer"
                    value={formData.photographer}
                    onChange={(e) => setFormData(prev => ({ ...prev, photographer: e.target.value }))}
                    placeholder="Photographer name"
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    placeholder="Photo location"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="nature, landscape, sunset"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked as boolean }))}
                  />
                  <Label htmlFor="featured">Featured</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="published"
                    checked={formData.published}
                    onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked as boolean }))}
                  />
                  <Label htmlFor="published">Published</Label>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateGallery}>
                Add Photo
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search photos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex gap-2">
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                </Button>

                <div className="flex gap-1 border rounded-md">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>{filteredItems.length} photos found</span>
              <div className="flex items-center gap-2">
                <span>Published: {galleryItems.filter(item => item.published).length}</span>
                <span>•</span>
                <span>Drafts: {galleryItems.filter(item => !item.published).length}</span>
                <span>•</span>
                <span>Featured: {galleryItems.filter(item => item.featured).length}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gallery Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        <AnimatePresence mode="wait">
          {filteredItems.map(item =>
            viewMode === 'grid' ? renderGalleryCard(item) : renderGalleryList(item)
          )}
        </AnimatePresence>
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-600 mb-2">No photos found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Photo</DialogTitle>
            <DialogDescription>
              Update photo information
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Enter photo title"
                />
              </div>
              <div>
                <Label htmlFor="edit-category">Category</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(cat => cat !== 'All').map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter photo description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-photographer">Photographer</Label>
                <Input
                  id="edit-photographer"
                  value={formData.photographer}
                  onChange={(e) => setFormData(prev => ({ ...prev, photographer: e.target.value }))}
                  placeholder="Photographer name"
                />
              </div>
              <div>
                <Label htmlFor="edit-location">Location</Label>
                <Input
                  id="edit-location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Photo location"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-tags">Tags (comma separated)</Label>
              <Input
                id="edit-tags"
                value={formData.tags}
                onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                placeholder="nature, landscape, sunset"
              />
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="edit-featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked as boolean }))}
                />
                <Label htmlFor="edit-featured">Featured</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="edit-published"
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked as boolean }))}
                />
                <Label htmlFor="edit-published">Published</Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateGallery}>
              Update Photo
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={isPreviewDialogOpen} onOpenChange={setIsPreviewDialogOpen}>
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle>{selectedItem?.title}</DialogTitle>
                <DialogDescription>
                  {selectedItem?.description}
                </DialogDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsPreviewDialogOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={selectedItem.imageUrl}
                  alt={selectedItem.title}
                  className="w-full h-96 object-cover rounded-lg"
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Eye className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">{selectedItem.views}</p>
                  <p className="text-sm text-gray-600">Views</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Heart className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">{selectedItem.likes}</p>
                  <p className="text-sm text-gray-600">Likes</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <MessageCircle className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">{selectedItem.comments}</p>
                  <p className="text-sm text-gray-600">Comments</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <Download className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-gray-800">{selectedItem.fileSize}</p>
                  <p className="text-sm text-gray-600">File Size</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Photo Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dimensions:</span>
                      <span className="text-gray-800">{selectedItem.dimensions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">File Size:</span>
                      <span className="text-gray-800">{selectedItem.fileSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Category:</span>
                      <span className="text-gray-800">{selectedItem.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Photographer:</span>
                      <span className="text-gray-800">{selectedItem.photographer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Location:</span>
                      <span className="text-gray-800">{selectedItem.location}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Status</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge className={selectedItem.featured ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-600'}>
                        <Star className="h-3 w-3 mr-1" />
                        {selectedItem.featured ? 'Featured' : 'Not Featured'}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={selectedItem.published ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}>
                        {selectedItem.published ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                  </div>

                  <h4 className="font-medium text-gray-800 mb-2 mt-4">Tags</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedItem.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}