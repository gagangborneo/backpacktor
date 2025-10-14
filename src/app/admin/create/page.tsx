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
  Image as ImageIcon, 
  MapPin,
  Tag,
  FileText,
  X
} from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import the MDX editor to avoid SSR issues
const MDXEditor = dynamic(() => import('@mdxeditor/editor'), { 
  ssr: false,
  loading: () => <p>Loading editor...</p>
})

interface Category {
  id: string
  name: string
  color?: string
}

interface Tag {
  id: string
  name: string
}

const mockCategories: Category[] = [
  { id: '1', name: 'Mountain', color: 'green' },
  { id: '2', name: 'Beach', color: 'blue' },
  { id: '3', name: 'City', color: 'purple' },
  { id: '4', name: 'Culture', color: 'orange' },
  { id: '5', name: 'Food', color: 'red' }
]

const mockTags: Tag[] = [
  { id: '1', name: 'Indonesia' },
  { id: '2', name: 'Traveling' },
  { id: '3', name: 'Adventure' },
  { id: '4', name: 'Nature' },
  { id: '5', name: 'Backpacking' }
]

export default function CreatePost() {
  const [mounted, setMounted] = useState(false)
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [content, setContent] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [location, setLocation] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [isSaving, setIsSaving] = useState(false)
  const [isPreview, setIsPreview] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert('Artikel berhasil disimpan!')
  }

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) 
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    )
  }

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="text-purple-700 hover:bg-purple-50">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Buat Artikel Baru</h1>
                <p className="text-sm text-gray-600">Tulis cerita traveling terbaik Anda</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsPreview(!isPreview)}
                className="border-purple-200 text-purple-700 hover:bg-purple-50"
              >
                <Eye className="h-4 w-4 mr-2" />
                {isPreview ? 'Edit' : 'Preview'}
              </Button>
              <Button 
                size="sm"
                onClick={handleSave}
                disabled={isSaving}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
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
          {/* Main Editor */}
          <div className="lg:col-span-3">
            {isPreview ? (
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardContent className="p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {coverImage && (
                      <div className="mb-6 rounded-lg overflow-hidden">
                        <img 
                          src={coverImage} 
                          alt={title}
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    )}
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">{title || 'Judul Artikel'}</h1>
                    {location && (
                      <div className="flex items-center gap-2 text-gray-600 mb-4">
                        <MapPin className="h-4 w-4" />
                        <span>{location}</span>
                      </div>
                    )}
                    {excerpt && (
                      <p className="text-xl text-gray-600 mb-6">{excerpt}</p>
                    )}
                    <div className="prose prose-lg max-w-none">
                      {content ? (
                        <div dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br />') }} />
                      ) : (
                        <p className="text-gray-400">Konten artikel akan muncul di sini...</p>
                      )}
                    </div>
                  </motion.div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Title Input */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Judul Artikel
                        </label>
                        <Input
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Tulis judul artikel yang menarik..."
                          className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Excerpt
                        </label>
                        <Textarea
                          value={excerpt}
                          onChange={(e) => setExcerpt(e.target.value)}
                          placeholder="Tulis ringkasan singkat artikel..."
                          rows={3}
                          className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Cover Image */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <ImageIcon className="h-5 w-5" />
                      Cover Image
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <Input
                        value={coverImage}
                        onChange={(e) => setCoverImage(e.target.value)}
                        placeholder="URL gambar cover..."
                        className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                      />
                      {coverImage && (
                        <div className="rounded-lg overflow-hidden">
                          <img 
                            src={coverImage} 
                            alt="Cover preview"
                            className="w-full h-48 object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* MDX Editor */}
                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Konten Artikel
                    </CardTitle>
                    <CardDescription>
                      Gunakan editor berikut untuk menulis konten artikel Anda
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="min-h-[400px] border border-purple-200 rounded-lg overflow-hidden">
                      {typeof window !== 'undefined' && (
                        <MDXEditor
                          markdown={content}
                          onChange={setContent}
                          placeholder="Mulai menulis artikel Anda di sini..."
                          className="min-h-[400px]"
                        />
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Publikasi</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  Publikasikan Sekarang
                </Button>
                <Button variant="outline" className="w-full border-purple-200 text-purple-700 hover:bg-purple-50">
                  Simpan sebagai Draft
                </Button>
              </CardContent>
            </Card>

            {/* Category */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Kategori
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="border-purple-200 focus:border-purple-500 focus:ring-purple-500">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Location */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Lokasi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Input
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Mis: Bali, Indonesia"
                  className="border-purple-200 focus:border-purple-500 focus:ring-purple-500"
                />
              </CardContent>
            </Card>

            {/* Tags */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Tag className="h-4 w-4" />
                  Tags
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockTags.map((tag) => (
                    <div
                      key={tag.id}
                      className="flex items-center justify-between p-2 rounded-lg border border-purple-100 cursor-pointer hover:bg-purple-50"
                      onClick={() => handleTagToggle(tag.id)}
                    >
                      <span className="text-sm text-gray-700">{tag.name}</span>
                      {selectedTags.includes(tag.id) && (
                        <Badge variant="default" className="bg-purple-600">
                          <X className="h-3 w-3" />
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}