import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  ArrowLeft,
  MapPin,
  Eye,
  Heart,
  Calendar,
  Share2,
  Bookmark,
  Clock,
  User,
  Tag,
  Mountain
} from 'lucide-react'
import '@/styles/article.css'

interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  content: string
  featured: boolean
  published: boolean
  views: number
  likes: number
  coverImage?: string
  location?: string
  createdAt: string
  publishedAt?: string
  readingTime?: number
  author?: {
    name: string
    avatar?: string
    bio?: string
  }
  category?: {
    name: string
    color?: string
  }
  tags?: {
    name: string
  }[]
  gallery?: {
    url: string
    alt: string
    caption?: string
  }[]
  relatedPosts?: Post[]
}

// Mock data untuk blog posts
const blogPosts: Post[] = [
  {
    id: '1',
    title: 'Menyusuri Jejak Sunrise di Puncak Gunung Bromo',
    slug: 'menyusuri-jejak-sunrise-di-puncak-gunung-bromo',
    excerpt: 'Petualangan seru di tengah malam untuk menyaksikan keindahan matahari terbit dari atas puncak Bromo. Nuansa langit yang berubah warna dari hitam pekat menjadi jingga keemasan memberikan pengalaman spiritual yang tak terlupakan. Perjalanan dimulai pukul 2 pagi dari probolinggo, melewati lautan pasir yang dingin hingga akhirnya tiba di puncak penanjakan 1.',
  content: `
# Keindahan Sunrise di Bromo: Pengalaman Spiritual di Puncak Jawa

Perjalanan dimulai tepat pukul 03.00 dini hari ketika suhu udara masih sangat dingin. Dengan mengenakan jaket tebal dan sarung tangan, kami memulai pendakian menggunakan jeep menuju viewpoint Penanjakan 1.

## Persiapan yang Matang

Sebelum berangkat ke Bromo, ada beberapa persiapan penting yang harus dilakukan:

- **Pakaian**: Jaket tebal, sarung tangan, penutup kepala, dan masker (karena debu vulkanik)
- **Kesehatan**: Pastikan kondisi tubuh fit, karena kita akan berada di ketinggian 2.329 mdpl
- **Transportasi**: Sewa jeep dari desa terdekat (Cemoro Lawang atau Ngadisari)
- **Akomodasi**: Menginap di homestay lokal atau hotel di area Bromo

## Perjalanan Menuju Puncak

Jeep kami melintasi medan yang berbatu dan gelap. Hanya cahaya lampu kendaraan lain yang menjadi penerang di kegelapan dini hari. Sekitar pukul 04.30, kami tiba di Penanjakan 1 dan langsung mencari posisi terbaik untuk menyaksikan sunrise.

### Moment yang Dinanti-nanti

Pukul 05.00, langit mulai memperlihatkan perubahan warna. Dari kegelapan total, perlahan berubah menjadi ungu, lalu jingga, dan akhirnya terang benderang. Gunung Bromo dengan puncaknya yang berkabut terlihat sangat megah.

## Eksplorasi Kawah Bromo

Setelah puas menikmati sunrise, perjalanan dilanjutkan menuju kawah Bromo. Dari Penanjakan 1, kami turun kembali menggunakan jeep dan melanjutkan dengan berjalan kaki sekitar 3 km menuju puncak kawah.

### Tangga yang Menantang

Ada sekitar 250 anak tangga yang harus dilewati untuk mencapai puncak kawah. Meskipun melelahkan, setiap langkah terbayar dengan pemandangan yang luar biasa. Dari puncak, kita bisa melihat langsung kawah aktif dengan asap belerang yang masih keluar.

## Tips Berharga

1. **Datang lebih awal**: Usahakan sudah di viewpoint paling lambat pukul 04.30
2. **Bawa kamera**: Sunrise di Bromo terlalu indah untuk dilewatkan
3. **Jaga kesehatan**: Minum air hangat dan jaga suhu tubuh
4. **Hormati lokal**: Ikuti aturan dan jaga kebersihan

## Kesan Mendalam

Bromo tidak hanya menawarkan keindahan alam yang spektakuler, tetapi juga pengalaman spiritual yang mendalam. Melihat matahari terbit di antara gunung-gunung sambil merasakan hembusan angin pagi yang dingin membuat kita menyadari betapa kecilnya kita di hadapan alam.

## Penutup

Perjalanan ke Bromo adalah pengalaman yang akan selalu diingat. Dari persiapan yang matang hingga moment sunrise yang memukau, semuanya menjadi bagian dari cerita traveling yang tak terlupakan. Bagi para traveler yang mencari pengalaman spiritual sekaligus petualangan, Bromo adalah destinasi yang wajib dikunjungi.

Selamat berpetualang dan jangan lupa untuk selalu menjaga kelestarian alam!
  `,
  featured: true,
  published: true,
  views: 1250,
  likes: 89,
  coverImage: 'https://picsum.photos/seed/bromo-sunrise-mountain-landscape/1200/600',
  location: 'Jawa Timur, Indonesia',
  createdAt: '2024-01-15T10:30:00Z',
  publishedAt: '2024-01-15T10:30:00Z',
  readingTime: 8,
  author: {
    name: 'Andi Traveler',
    avatar: '/api/placeholder/100/100',
    bio: 'Petualang sejati yang sudah menjelajahi 30+ negara dan mencintai keindahan alam Indonesia.'
  },
  category: {
    name: 'Mountain',
    color: 'green'
  },
  tags: [
    { name: 'Indonesia' },
    { name: 'Sunrise' },
    { name: 'Mountain' },
    { name: 'Adventure' },
    { name: 'Spiritual' }
  ],
  gallery: [
    {
      url: 'https://picsum.photos/seed/bromo-sunrise-golden-peak-mountain/800/600',
      alt: 'Sunrise di Puncak Bromo',
      caption: 'Moment indah saat matahari terbit dari balik gunung Bromo'
    },
    {
      url: 'https://picsum.photos/seed/bromo-volcanic-crater-smoke-landscape/800/600',
      alt: 'Kawah Aktif Bromo',
      caption: 'Kawah Bromo yang masih mengeluarkan asap belerang'
    },
    {
      url: 'https://picsum.photos/seed/bromo-sea-of-sand-desert-landscape/800/600',
      alt: 'Lautan Pasir Bromo',
      caption: 'Lautan pasir yang eksotis di kawasan Bromo'
    },
    {
      url: 'https://picsum.photos/seed/bromo-starry-night-mountain-landscape/800/600',
      alt: 'Bromo Malam Hari',
      caption: 'Keindahan Bromo di bawah taburan bintang'
    },
    {
      url: 'https://picsum.photos/seed/bromo-local-horsemen-riding-tour/800/600',
      alt: 'Penunggang Kuda Lokal',
      caption: 'Petualangan dengan kuda lokal di lautan pasir'
    },
    {
      url: 'https://picsum.photos/seed/bromo-mountain-temple-traditional/800/600',
      alt: 'Pura di Bromo',
      caption: 'Pura Luhur Poten yang menjadi tempat ibadah umat Hindu'
    }
  ],
  relatedPosts: [
    {
      id: '2',
      title: 'Menjelajahi Kota Tua Penang',
      slug: 'menjelajahi-kota-tua-penang',
      excerpt: 'Kota tua Penang di Malaysia menyimpan sejuta pesona dan sejarah...',
      featured: false,
      published: true,
      views: 890,
      likes: 67,
      coverImage: 'https://picsum.photos/seed/penang-heritage-city-sunset/400/200',
      location: 'Penang, Malaysia',
      createdAt: '2024-01-10T14:20:00Z',
      publishedAt: '2024-01-10T14:20:00Z',
      category: {
        name: 'City',
        color: 'blue'
      }
    },
    {
      id: '3',
      title: 'Backpacking ke Ubud yang Spiritual',
      slug: 'backpacking-ke-ubud-yang-spiritual',
      excerpt: 'Ubud tidak hanya tentang sawah hijau, tapi juga spiritualitas...',
      featured: true,
      published: true,
      views: 1567,
      likes: 120,
      coverImage: 'https://picsum.photos/seed/ubud-spiritual-rice-terraces-bali/400/200',
      location: 'Bali, Indonesia',
      createdAt: '2024-01-08T09:15:00Z',
      publishedAt: '2024-01-08T09:15:00Z',
      category: {
        name: 'Culture',
        color: 'purple'
      }
    }
  ]
},
  {
    id: '2',
    title: 'Keseharian di Pedesaan Ubud yang Masih Asri',
    slug: 'keseharian-di-pedesaan-ubud-yang-masih-asri',
    excerpt: 'Tinggal selama seminggu di Ubud membuka mata betapa Bali masih menyimpan pesona otentik di balik hiruk pikuk pariwisata. Dari belajar memasak tradisional dengan ibu-ibu lokal, bersepeda melewati sawah terasering, hingga mengikuti upacara keagamaan di pura desa.',
    content: `
# Keseharian di Pedesaan Ubud yang Masih Asri

## Perkenalan dengan Ubud yang Sesungguhnya

Banyak orang mengenal Ubud sebagai pusat seni dan keramaian, namun di balik itu semua, Ubud masih menyimpan pesona pedesaan yang autentik. Selama seminggu tinggal di sini, saya menemukan sisi lain dari Bali yang jarang tersentuh oleh turis.

## Kehidupan Subuh di Desa

Hari-hari di desa Ubud dimulai sejak pukul 05.00 pagi. Suara ayam berkokok menjadi alarm alami yang membangunkan penduduk. Udara segar terasa menyegarkan saat saya berjalan-jalan di sekitar penginapan.

Para petani sudah mulai berangkat ke sawah membawa cangkul dan alat pertanian tradisional. Mereka menyapa ramai saat kami berpapasan di jalan setapak yang masih sepi.

## Belajar Memasak dari Ibu-Ibu Lokal

Salah satu pengalaman paling berharga adalah belajar memasak masakan Bali dari ibu-ibu desa. Dari mempersiapkan bumbu base genep hingga teknik memasak lawar dan sate lilit.

Proses belajar ini tidak hanya tentang resep, tetapi juga tentang filosofi di balik setiap masakan. Setiap bahan memiliki makna dan setiap teknik memasak menceritakan sejarah budaya Bali.

## Bersepeda Melewati Sawah Terasering

Sore hari adalah waktu yang tepat untuk bersepeda mengelilingi desa. Pemandangan sawah terasering yang hijau menciptakan lanskap yang memukau.

Petani yang sedang menanam padi atau membersihkan sawah sering kali mengajak ngobrol sambil menawarkan kelapa muda langsung dari pohonnya.

## Pelajaran Berharga dari Kehidupan Desa

Seminggu di Ubud mengajarkan saya tentang kesederhanaan, kebersamaan, dan kehidupan yang seimbang. Masyarakat desa di sini menunjukkan bahwa kebahagiaan tidak selalu tentang materi, melainkan tentang hubungan dengan alam dan sesama.

Terima kasih Ubud, sampai jumpa kembali!
    `,
    featured: false,
    published: true,
    views: 1890,
    likes: 289,
    coverImage: 'https://picsum.photos/seed/ubud-village-rice-fields-landscape/1200/600',
    location: 'Ubud, Bali',
    createdAt: '2024-10-05T08:00:00Z',
    publishedAt: '2024-10-05T08:00:00Z',
    readingTime: 12,
    author: {
      name: 'Sarah Explorer',
      avatar: '/api/placeholder/100/100',
      bio: 'Travel blogger yang passionate terhadap budaya dan kehidupan lokal. Telah menjelajahi 15+ negara dengan fokus pada pengalaman otentik.'
    },
    category: {
      name: 'Culture',
      color: 'purple'
    },
    tags: [
      { name: 'Ubud' },
      { name: 'Bali' },
      { name: 'Culture' },
      { name: 'Village Life' },
      { name: 'Tradition' }
    ],
    gallery: [
      {
        url: 'https://picsum.photos/seed/ubud-rice-terraces-tropical-landscape/800/600',
        alt: 'Sawah Terasering Ubud',
        caption: 'Pemandangan sawah terasering yang hijau dan subur'
      },
      {
        url: 'https://picsum.photos/seed/ubud-traditional-cooking-class-local/800/600',
        alt: 'Kelas Memasak Tradisional',
        caption: 'Belajar memasak masakan Bali bersama ibu-ibu lokal'
      },
      {
        url: 'https://picsum.photos/seed/ubud-village-cycling-tour-rice-fields/800/600',
        alt: 'Bersepeda di Desa',
        caption: 'Bersepeda melewati sawah dan desa-desa tradisional'
      },
      {
        url: 'https://picsum.photos/seed/ubud-traditional-ceremony-temple-offering/800/600',
        alt: 'Upacara Tradisional',
        caption: 'Mengikuti upacara keagamaan di pura desa'
      },
      {
        url: 'https://picsum.photos/seed/ubud-coconut-palm-trees-village-life/800/600',
        alt: 'Kehidupan Desa',
        caption: 'Suasana kehidupan desa yang masih asri dan tradisional'
      }
    ]
  }
]

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  // Find post by slug
  const { slug } = await params
  const post = blogPosts.find(p => p.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/blog">
              <Button variant="ghost" className="text-purple-700 hover:bg-purple-50">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-purple-700 hover:bg-purple-50">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-purple-700">
                <Bookmark className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Article Header */}
        <header className="mb-8">
          {/* Cover Image */}
          {post.coverImage && (
            <div className="mb-8 rounded-xl overflow-hidden shadow-2xl relative">
              <Image
                src={post.coverImage}
                alt={post.title}
                width={1200}
                height={600}
                className="w-full h-96 object-cover"
                priority
              />
              {post.featured && (
                <Badge className="absolute top-6 left-6 bg-yellow-500 text-white">
                  Artikel Unggulan
                </Badge>
              )}
            </div>
          )}

          {/* Title and Meta */}
          <div className="text-center mb-6">
            {post.category && (
              <Badge variant="secondary" className="mb-4 bg-purple-100 text-purple-700">
                {post.category.name}
              </Badge>
            )}
            <h1 className="article-title mb-4">
              {post.title}
            </h1>
            <p className="article-excerpt mb-6">
              {post.excerpt}
            </p>
            
            {/* Article Meta */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{post.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.publishedAt || post.createdAt).toLocaleDateString('id-ID', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
              {post.readingTime && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readingTime} menit baca</span>
                </div>
              )}
            </div>
          </div>

          {/* Author Info */}
          {post.author && (
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-8">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback>
                      <User className="h-8 w-8" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{post.author.name}</h3>
                    <p className="text-gray-600 text-sm">{post.author.bio}</p>
                  </div>
                  <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                    Follow
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </header>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto">
          <Card className="border-0 shadow-lg bg-white/95 backdrop-blur-sm">
            <CardContent className="p-12">
              <div
                className="article-content"
                dangerouslySetInnerHTML={{
                  __html: post.content.replace(/\n/g, '<br />').replace(/### (.*?)<br \/>/g, '<h3>$1</h3>').replace(/## (.*?)<br \/>/g, '<h2>$1</h2>').replace(/# (.*?)<br \/>/g, '<h1>$1</h1>')
                }}
              />
            </CardContent>
          </Card>
        </div>

        {/* Gallery Section */}
        {post.gallery && post.gallery.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12"
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-gray-800">
                  <Camera className="h-6 w-6 text-purple-600" />
                  Galeri Perjalanan
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {post.gallery.map((image, index) => (
                    <div key={index} className="group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
                      <div className="relative h-64">
                        <Image
                          src={image.url}
                          alt={image.alt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      {image.caption && (
                        <div className="p-3 bg-white/90 backdrop-blur-sm">
                          <p className="text-sm text-gray-700 text-center">{image.caption}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.section>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <Tag className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold text-gray-800">Tags</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="border-purple-200 text-purple-700 hover:bg-purple-50 cursor-pointer"
                >
                  #{tag.name}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Engagement */}
        <div className="mt-8 flex items-center justify-between pt-8 border-t border-purple-100">
          <div className="flex items-center gap-6">
            <Button
              variant="outline"
              size="sm"
              className="border-purple-200 text-purple-700 hover:bg-purple-50"
            >
              <Heart className="h-4 w-4 mr-2" />
              {post.likes}
            </Button>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Eye className="h-4 w-4" />
              <span>{post.views.toLocaleString()} views</span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
            <Share2 className="h-4 w-4 mr-2" />
            Bagikan
          </Button>
        </div>

        {/* Related Posts */}
        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <section className="mt-16 pt-16 border-t border-purple-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-8 flex items-center gap-2">
              <Mountain className="h-6 w-6 text-purple-600" />
              Artikel Terkait
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {post.relatedPosts.map((relatedPost, index) => (
                <div key={relatedPost.id}>
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white/80 backdrop-blur-sm overflow-hidden group">
                    <div className="h-32 relative">
                      <Image
                        src={relatedPost.coverImage || 'https://picsum.photos/seed/related-post-landscape/400/200'}
                        alt={relatedPost.title}
                        width={400}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="h-3 w-3 text-purple-600" />
                        <span className="text-xs text-gray-600">{relatedPost.location}</span>
                      </div>
                      <h3 className="font-semibold text-gray-800 hover:text-purple-600 transition-colors cursor-pointer mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            <span>{relatedPost.views.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="h-3 w-3" />
                            <span>{relatedPost.likes}</span>
                          </div>
                        </div>
                        {relatedPost.category && (
                          <Badge variant="secondary" className="bg-purple-100 text-purple-700 text-xs">
                            {relatedPost.category.name}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </section>
        )}
      </article>
    </div>
  )
}