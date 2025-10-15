'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
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
import { Switch } from '@/components/ui/switch'
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  MapPin,
  Heart,
  MessageCircle,
  Clock,
  Star,
  Grid,
  List,
  FileText,
  Save,
  X,
  Image,
  Link2
} from 'lucide-react'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  author: string
  category: string
  location: string
  status: 'published' | 'draft' | 'scheduled'
  publishedAt: string
  views: number
  likes: number
  comments: number
  readTime: string
  featured: boolean
  image: string
  imageUrl: string
  tags: string[]
  seoTitle: string
  seoDescription: string
  slug: string
}

const mockPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Menyusuri Jejak Sunrise di Puncak Gunung Bromo',
    excerpt: 'Petualangan seru di tengah malam untuk menyaksikan keindahan matahari terbit dari atas puncak Bromo...',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    author: 'Rizki Adventurer',
    category: 'Mountain',
    location: 'Probolinggo, Jawa Timur',
    status: 'published',
    publishedAt: '2024-01-15',
    views: 1234,
    likes: 156,
    comments: 23,
    readTime: '8 min',
    featured: true,
    image: 'https://picsum.photos/seed/bromo-admin/400/300',
    imageUrl: 'https://picsum.photos/seed/bromo-admin/400/300',
    tags: ['gunung', 'sunrise', 'petualangan', 'bromo'],
    seoTitle: 'Panduan Lengkap Menyaksikan Sunrise di Gunung Bromo',
    seoDescription: 'Tips dan trik untuk mendapatkan pengalaman terbaik saat menonton sunrise di puncak Gunung Bromo',
    slug: 'menyusuri-jejak-sunrise-puncak-gunung-bromo'
  },
  {
    id: 2,
    title: 'Keseharian di Pedesaan Ubud yang Masih Asri',
    excerpt: 'Tinggal selama seminggu di Ubud membuka mata betapa Bali masih menyimpan pesona otentik...',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    author: 'Sarah Explorer',
    category: 'Culture',
    location: 'Ubud, Bali',
    status: 'published',
    publishedAt: '2024-01-12',
    views: 892,
    likes: 89,
    comments: 12,
    readTime: '12 min',
    featured: false,
    image: 'https://picsum.photos/seed/ubud-admin/400/300',
    imageUrl: 'https://picsum.photos/seed/ubud-admin/400/300',
    tags: ['bali', 'ubud', 'culture', 'desa'],
    seoTitle: 'Kehidupan Pedesaan Ubud yang Masih Asri',
    seoDescription: 'Temukan keindahan dan ketenangan desa-desa di sekitar Ubud yang masih mempertahankan tradisi',
    slug: 'keseharian-desa-ubud-masih-asri'
  },
  {
    id: 3,
    title: 'Snorkeling di Surga Tersembunyi Raja Ampat',
    excerpt: 'Keindahan bawah laut Raja Ampat memang tak terbantahkan. Dari ikan mandar hingga terumbu karang...',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    author: 'Budi Diver',
    category: 'Marine',
    location: 'Raja Ampat, Papua',
    status: 'draft',
    publishedAt: '2024-01-10',
    views: 0,
    likes: 0,
    comments: 0,
    readTime: '10 min',
    featured: false,
    image: 'https://picsum.photos/seed/raja-admin/400/300',
    imageUrl: 'https://picsum.photos/seed/raja-admin/400/300',
    tags: ['snorkeling', 'raja ampat', 'bawah laut', 'marine life'],
    seoTitle: 'Panduan Snorkeling Raja Ampat Terlengkap',
    seoDescription: 'Tips snorkeling dan tempat terbaik untuk menikmati keindahan bawah laut Raja Ampat',
    slug: 'snorkeling-surga-tersembunyi-raja-ampat'
  },
  {
    id: 4,
    title: 'Backpacking Keliling Jawa dengan Anggaran Minimal',
    excerpt: 'Siapa bilang keliling Jawa harus mahal? Dengan anggaran Rp 500.000, saya berhasil menjelajahi...',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    author: 'Maya Backpacker',
    category: 'Budget Travel',
    location: 'Multiple Cities',
    status: 'published',
    publishedAt: '2024-01-08',
    views: 567,
    likes: 45,
    comments: 8,
    readTime: '15 min',
    featured: false,
    image: 'https://picsum.photos/seed/java-admin/400/300',
    imageUrl: 'https://picsum.photos/seed/java-admin/400/300',
    tags: ['backpacking', 'budget travel', 'jawa', 'wisata murah'],
    seoTitle: 'Panduan Backpacking Jawa Hemat',
    seoDescription: 'Cara backpacking keliling Pulau Jawa dengan budget minimal dan tips penginapan murah',
    slug: 'backpacking-keliling-jawa-anggaran-minimal'
  }
]

const categories = ['All', 'Mountain', 'Beach', 'Culture', 'Marine', 'Heritage', 'Nature', 'Adventure', 'Budget Travel']
const statuses = ['All', 'published', 'draft', 'scheduled']

export default function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>(mockPosts)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list')

  // Form states
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    location: '',
    status: 'draft' as 'published' | 'draft' | 'scheduled',
    featured: false,
    imageUrl: '',
    tags: '',
    seoTitle: '',
    seoDescription: '',
    slug: ''
  })

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === '' || filterCategory === 'All' || post.category === filterCategory
    const matchesStatus = filterStatus === '' || filterStatus === 'All' || post.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleDelete = (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus artikel ini?')) {
      setPosts(posts.filter(post => post.id !== id))
    }
  }

  const handleToggleFeatured = (id: number) => {
    setPosts(posts.map(post =>
      post.id === id ? { ...post, featured: !post.featured } : post
    ))
  }

  const handleStatusChange = (id: number, status: 'published' | 'draft' | 'scheduled') => {
    setPosts(posts.map(post =>
      post.id === id ? { ...post, status } : post
    ))
  }

  // CRUD Functions
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const generateReadTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.split(/\s+/).length
    const readTime = Math.ceil(words / wordsPerMinute)
    return `${readTime} min`
  }

  const handleCreatePost = () => {
    const newPost: BlogPost = {
      id: Date.now(),
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      author: formData.author,
      category: formData.category,
      location: formData.location,
      status: formData.status,
      publishedAt: new Date().toISOString().split('T')[0],
      views: 0,
      likes: 0,
      comments: 0,
      readTime: generateReadTime(formData.content),
      featured: formData.featured,
      image: formData.imageUrl || 'https://picsum.photos/seed/blog-new/400/300',
      imageUrl: formData.imageUrl,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      seoTitle: formData.seoTitle || formData.title,
      seoDescription: formData.seoDescription || formData.excerpt,
      slug: formData.slug || generateSlug(formData.title)
    }

    setPosts([...posts, newPost])
    resetForm()
    setIsCreateDialogOpen(false)
    alert('Artikel berhasil dibuat!')
  }

  const handleEditPost = (post: BlogPost) => {
    setEditingPost(post)
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      author: post.author,
      category: post.category,
      location: post.location,
      status: post.status,
      featured: post.featured,
      imageUrl: post.imageUrl,
      tags: post.tags.join(', '),
      seoTitle: post.seoTitle,
      seoDescription: post.seoDescription,
      slug: post.slug
    })
    setIsEditDialogOpen(true)
  }

  const handleUpdatePost = () => {
    if (!editingPost) return

    const updatedPost: BlogPost = {
      ...editingPost,
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      author: formData.author,
      category: formData.category,
      location: formData.location,
      status: formData.status,
      featured: formData.featured,
      imageUrl: formData.imageUrl,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      seoTitle: formData.seoTitle,
      seoDescription: formData.seoDescription,
      slug: formData.slug
    }

    setPosts(posts.map(post =>
      post.id === editingPost.id ? updatedPost : post
    ))

    resetForm()
    setIsEditDialogOpen(false)
    setEditingPost(null)
    alert('Artikel berhasil diperbarui!')
  }

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      author: '',
      category: '',
      location: '',
      status: 'draft',
      featured: false,
      imageUrl: '',
      tags: '',
      seoTitle: '',
      seoDescription: '',
      slug: ''
    })
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Manajemen Blog</h1>
          <p className="text-gray-600">Kelola semua artikel blog di website</p>
        </div>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Artikel Baru
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Artikel</p>
                <p className="text-2xl font-bold text-gray-800">{posts.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Dipublikasi</p>
                <p className="text-2xl font-bold text-green-600">{posts.filter(p => p.status === 'published').length}</p>
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
                <p className="text-2xl font-bold text-yellow-600">{posts.filter(p => p.status === 'draft').length}</p>
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
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-800">
                  {posts.reduce((acc, post) => acc + post.views, 0).toLocaleString()}
                </p>
              </div>
              <Eye className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari artikel..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Category Filter */}
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 bg-white"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-purple-500 bg-white"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>
                    {status === 'All' ? 'Semua Status' :
                     status === 'published' ? 'Diterbitkan' :
                     status === 'draft' ? 'Draft' : 'Terjadwal'}
                  </option>
                ))}
              </select>

              {/* View Mode Toggle */}
              <div className="flex items-center gap-2 p-1 bg-gray-100 rounded-lg">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="p-2"
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="p-2"
                >
                  <Grid className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Posts List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <div className="space-y-4">
          {filteredPosts.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Tidak ada artikel ditemukan</h3>
                <p className="text-gray-600 mb-4">Coba ubah filter atau buat artikel baru</p>
                <Button
                  onClick={() => setIsCreateDialogOpen(true)}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Buat Artikel Baru
                </Button>
              </CardContent>
            </Card>
          ) : (
            <>
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative aspect-[16/9] overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                          {post.featured && (
                            <Badge className="absolute top-2 left-2 bg-yellow-500 text-white">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                          <Badge className={`absolute top-2 right-2 ${
                            post.status === 'published'
                              ? 'bg-green-500 text-white'
                              : post.status === 'draft'
                              ? 'bg-gray-500 text-white'
                              : 'bg-blue-500 text-white'
                          }`}>
                            {post.status}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-medium text-gray-800 mb-2 line-clamp-2">{post.title}</h3>
                          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mb-3">
                            <User className="h-3 w-3" />
                            <span>{post.author}</span>
                            <span>•</span>
                            <span>{post.publishedAt}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                              <div className="flex items-center gap-1">
                                <Eye className="h-3 w-3" />
                                <span>{post.views}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Heart className="h-3 w-3" />
                                <span>{post.likes}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="h-3 w-3" />
                                <span>{post.comments}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleToggleFeatured(post.id)}
                              className="flex-1"
                            >
                              <Star className={`h-3 w-3 ${post.featured ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEditPost(post)}
                            >
                              <Edit className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDelete(post.id)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredPosts.map((post, index) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card>
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                              <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-medium text-gray-800 truncate">{post.title}</h3>
                                {post.featured && (
                                  <Badge className="bg-yellow-500 text-white">
                                    <Star className="h-3 w-3 mr-1" />
                                    Featured
                                  </Badge>
                                )}
                                <Badge className={`
                                  ${post.status === 'published'
                                    ? 'bg-green-500 text-white'
                                    : post.status === 'draft'
                                    ? 'bg-gray-500 text-white'
                                    : 'bg-blue-500 text-white'
                                  }
                                `}>
                                  {post.status}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{post.excerpt}</p>
                              <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                                <div className="flex items-center gap-1">
                                  <User className="h-4 w-4" />
                                  <span>{post.author}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  <span>{post.location}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  <span>{post.publishedAt}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{post.readTime}</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-gray-500">
                                <div className="flex items-center gap-1">
                                  <Eye className="h-4 w-4" />
                                  <span>{post.views}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Heart className="h-4 w-4" />
                                  <span>{post.likes}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <MessageCircle className="h-4 w-4" />
                                  <span>{post.comments}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 ml-4">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleToggleFeatured(post.id)}
                              >
                                <Star className={`h-4 w-4 ${post.featured ? 'fill-yellow-500 text-yellow-500' : ''}`} />
                              </Button>
                              <select
                                value={post.status}
                                onChange={(e) => handleStatusChange(post.id, e.target.value as 'published' | 'draft' | 'scheduled')}
                                className="text-xs px-2 py-1 border border-gray-200 rounded focus:outline-none focus:border-purple-500"
                              >
                                <option value="published">Publish</option>
                                <option value="draft">Draft</option>
                                <option value="scheduled">Scheduled</option>
                              </select>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEditPost(post)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDelete(post.id)}
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
              )}
            </>
          )}
        </div>
      </motion.div>

      {/* Create/Edit Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Artikel Baru</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Judul Artikel</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Masukkan judul artikel"
                />
              </div>
              <div>
                <Label htmlFor="author">Penulis</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="Nama penulis"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Kategori</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(cat => cat !== 'All').map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="location">Lokasi</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Lokasi artikel"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="excerpt">Ringkasan</Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Ringkasan artikel (akan muncul di halaman utama)"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="content">Konten Lengkap</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Konten lengkap artikel..."
                rows={8}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="imageUrl">URL Gambar</Label>
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <Label htmlFor="tags">Tags (pisahkan dengan koma)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="travel, adventure, tips"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="seoTitle">SEO Title</Label>
                <Input
                  id="seoTitle"
                  value={formData.seoTitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))}
                  placeholder="Judul untuk SEO"
                />
              </div>
              <div>
                <Label htmlFor="seoDescription">SEO Description</Label>
                <Input
                  id="seoDescription"
                  value={formData.seoDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, seoDescription: e.target.value }))}
                  placeholder="Deskripsi untuk SEO (max 160 karakter)"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="slug">Slug (URL)</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="artikel-url"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={formData.status} onValueChange={(value: 'published' | 'draft' | 'scheduled') => setFormData(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                />
                <Label htmlFor="featured">Featured Article</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsCreateDialogOpen(false)
              resetForm()
            }}>
              Batal
            </Button>
            <Button
              onClick={handleCreatePost}
              disabled={!formData.title || !formData.content}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Simpan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Artikel</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-title">Judul Artikel</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Masukkan judul artikel"
                />
              </div>
              <div>
                <Label htmlFor="edit-author">Penulis</Label>
                <Input
                  id="edit-author"
                  value={formData.author}
                  onChange={(e) => setFormData(prev => ({ ...prev, author: e.target.value }))}
                  placeholder="Nama penulis"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-category">Kategori</Label>
                <Select value={formData.category} onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(cat => cat !== 'All').map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-location">Lokasi</Label>
                <Input
                  id="edit-location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="Lokasi artikel"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-excerpt">Ringkasan</Label>
              <Textarea
                id="edit-excerpt"
                value={formData.excerpt}
                onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                placeholder="Ringkasan artikel (akan muncul di halaman utama)"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="edit-content">Konten Lengkap</Label>
              <Textarea
                id="edit-content"
                value={formData.content}
                onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                placeholder="Konten lengkap artikel..."
                rows={8}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-imageUrl">URL Gambar</Label>
                <Input
                  id="edit-imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, imageUrl: e.target.value }))}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div>
                <Label htmlFor="edit-tags">Tags (pisahkan dengan koma)</Label>
                <Input
                  id="edit-tags"
                  value={formData.tags}
                  onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value }))}
                  placeholder="travel, adventure, tips"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-seoTitle">SEO Title</Label>
                <Input
                  id="edit-seoTitle"
                  value={formData.seoTitle}
                  onChange={(e) => setFormData(prev => ({ ...prev, seoTitle: e.target.value }))}
                  placeholder="Judul untuk SEO"
                />
              </div>
              <div>
                <Label htmlFor="edit-seoDescription">SEO Description</Label>
                <Input
                  id="edit-seoDescription"
                  value={formData.seoDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, seoDescription: e.target.value }))}
                  placeholder="Deskripsi untuk SEO (max 160 karakter)"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="edit-slug">Slug (URL)</Label>
              <Input
                id="edit-slug"
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                placeholder="artikel-url"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="edit-status">Status</Label>
                <Select value={formData.status} onValueChange={(value: 'published' | 'draft' | 'scheduled') => setFormData(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="scheduled">Scheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-featured"
                  checked={formData.featured}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
                />
                <Label htmlFor="edit-featured">Featured Article</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setIsEditDialogOpen(false)
              resetForm()
            }}>
              Batal
            </Button>
            <Button
              onClick={handleUpdatePost}
              disabled={!formData.title || !formData.content}
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