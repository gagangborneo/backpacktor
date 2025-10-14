'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  ArrowLeft, 
  MapPin, 
  Calendar,
  DollarSign,
  Users,
  Clock,
  Edit,
  Share2,
  Bookmark,
  Eye,
  Heart,
  Plane,
  Hotel,
  Utensils,
  Camera,
  ShoppingBag,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertCircle,
  Clock as ClockIcon
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

interface TravelPlan {
  id: string
  title: string
  slug: string
  description?: string
  destination: string
  location?: string
  startDate: string
  endDate: string
  totalBudget: number
  currency: string
  status: string
  isPublic: boolean
  views: number
  likes: number
  createdAt: string
  author?: {
    name: string
    avatar?: string
    bio?: string
  }
  expenses?: Expense[]
  days?: Day[]
}

const mockTravelPlan: TravelPlan = {
  id: '1',
  title: 'Backpacking ke Jawa Timur',
  slug: 'backpacking-ke-jawa-timur',
  description: 'Perjalanan 5 hari mengunjungi Bromo, Malang, dan Surabaya dengan budget terbatas. Explore the beauty of East Java from mountain sunrise to city adventures.',
  destination: 'Jawa Timur',
  location: 'Indonesia',
  startDate: '2024-02-15',
  endDate: '2024-02-19',
  totalBudget: 2500000,
  currency: 'IDR',
  status: 'planning',
  isPublic: true,
  views: 1250,
  likes: 89,
  createdAt: '2024-01-15T10:30:00Z',
  author: {
    name: 'Andi Traveler',
    avatar: '/api/placeholder/100/100',
    bio: 'Passionate traveler who loves exploring Indonesia on a budget'
  },
  expenses: [
    {
      id: '1',
      name: 'Tiket Kereta Api Surabaya-Malang',
      description: 'Kereta api ekonomi dari Surabaya ke Malang',
      amount: 800000,
      category: 'transportation',
      date: '2024-02-15',
      isEssential: true,
      notes: 'Pesan 1 bulan sebelumnya untuk harga lebih murah'
    },
    {
      id: '2',
      name: 'Homestay di Malang',
      description: '2 malam di homestay dekat alun-alun',
      amount: 600000,
      category: 'accommodation',
      date: '2024-02-15',
      isEssential: true,
      notes: 'Sudah termasuk breakfast'
    },
    {
      id: '3',
      name: 'Rental Jeep Bromo',
      description: 'Sewa jeep untuk sunrise tour di Bromo',
      amount: 400000,
      category: 'activities',
      date: '2024-02-16',
      isEssential: true,
      notes: 'Sharing dengan 6 orang lainnya'
    },
    {
      id: '4',
      name: 'Tiket Masuk Bromo',
      description: 'Tiket masuk Taman Nasional Bromo',
      amount: 320000,
      category: 'activities',
      date: '2024-02-16',
      isEssential: true
    },
    {
      id: '5',
      name: 'Makanan dan Minuman',
      description: 'Estimasi untuk makan 5 hari',
      amount: 500000,
      category: 'food',
      isEssential: true,
      notes: 'Termasuk mencoba kuliner lokal'
    },
    {
      id: '6',
      name: 'Oleh-oleh',
      description: 'Bakpia Malang dan oleh-oleh khas',
      amount: 200000,
      category: 'shopping',
      date: '2024-02-18',
      isEssential: false,
      notes: 'Optional, tergantung budget'
    }
  ],
  days: [
    {
      id: '1',
      dayNumber: 1,
      title: 'Arrival in Malang',
      description: 'Welcome to Malang! Check-in at homestay and explore the city',
      date: '2024-02-15',
      activities: [
        {
          id: '1',
          name: 'Arrival at Malang Station',
          description: 'Arrive by train from Surabaya, take becak to homestay',
          location: 'Malang Kota Station',
          startTime: '14:00',
          endTime: '15:30',
          cost: 50000,
          notes: 'Becak fare from station to homestay'
        },
        {
          id: '2',
          name: 'City Tour Malang',
          description: 'Explore colonial architecture and local markets',
          location: 'Alun-alun Malang',
          startTime: '16:00',
          endTime: '18:00',
          cost: 0,
          notes: 'Free walking tour'
        },
        {
          id: '3',
          name: 'Dinner at Local Warung',
          description: 'Try traditional Javanese cuisine',
          location: 'Near Alun-alun',
          startTime: '19:00',
          endTime: '20:30',
          cost: 50000,
          notes: 'Recommended: Rawon and tempe'
        }
      ]
    },
    {
      id: '2',
      dayNumber: 2,
      title: 'Bromo Sunrise Adventure',
      description: 'Early morning trip to Mount Bromo for spectacular sunrise',
      date: '2024-02-16',
      activities: [
        {
          id: '4',
          name: 'Pickup from Homestay',
          description: 'Jeep pickup at 3 AM for Bromo tour',
          location: 'Homestay',
          startTime: '03:00',
          endTime: '03:30',
          cost: 0,
          notes: 'Included in jeep rental'
        },
        {
          id: '5',
          name: 'Sunrise at Penanjakan',
          description: 'Watch spectacular sunrise over Mount Bromo',
          location: 'Penanjakan Viewpoint',
          startTime: '05:00',
          endTime: '07:00',
          cost: 0,
          notes: 'Bring warm clothes!'
        },
        {
          id: '6',
          name: 'Explore Bromo Crater',
          description: 'Hike to Bromo crater and explore the sea of sand',
          location: 'Mount Bromo',
          startTime: '07:30',
          endTime: '10:00',
          cost: 0,
          notes: 'Rent horse if tired (extra cost)'
        }
      ]
    },
    {
      id: '3',
      dayNumber: 3,
      title: 'Malang Culture & Shopping',
      description: 'Explore cultural sites and shop for local products',
      date: '2024-02-17',
      activities: [
        {
          id: '7',
          name: 'Visit Singosari Temple',
          description: 'Explore ancient Hindu temple',
          location: 'Singosari',
          startTime: '09:00',
          endTime: '11:00',
          cost: 10000,
          notes: 'Small entrance fee'
        },
        {
          id: '8',
          name: 'Shopping at Oro-oro Dowo',
          description: 'Buy local products and souvenirs',
          location: 'Oro-oro Dowo Market',
          startTime: '13:00',
          endTime: '15:00',
          cost: 100000,
          notes: 'Good place for local snacks'
        }
      ]
    }
  ]
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'transportation': return <Plane className="h-4 w-4" />
    case 'accommodation': return <Hotel className="h-4 w-4" />
    case 'food': return <Utensils className="h-4 w-4" />
    case 'activities': return <Camera className="h-4 w-4" />
    case 'shopping': return <ShoppingBag className="h-4 w-4" />
    default: return <MoreHorizontal className="h-4 w-4" />
  }
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

const getStatusColor = (status: string) => {
  switch (status) {
    case 'planning': return 'bg-blue-100 text-blue-700'
    case 'active': return 'bg-green-100 text-green-700'
    case 'completed': return 'bg-purple-100 text-purple-700'
    case 'cancelled': return 'bg-red-100 text-red-700'
    default: return 'bg-gray-100 text-gray-700'
  }
}

const getStatusLabel = (status: string) => {
  switch (status) {
    case 'planning': return 'Perencanaan'
    case 'active': return 'Aktif'
    case 'completed': return 'Selesai'
    case 'cancelled': return 'Dibatalkan'
    default: return status
  }
}

const formatCurrency = (amount: number, currency: string = 'IDR') => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}

const calculateDays = (startDate: string, endDate: string) => {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const diffTime = Math.abs(end.getTime() - start.getTime())
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1
}

const calculateTotalExpenses = (expenses?: Expense[]) => {
  if (!expenses) return 0
  return expenses.reduce((sum, expense) => sum + expense.amount, 0)
}

const calculateBudgetStatus = (totalBudget: number, totalExpenses: number) => {
  const percentage = (totalExpenses / totalBudget) * 100
  if (percentage < 80) return { status: 'good', color: 'text-green-600', icon: TrendingUp }
  if (percentage < 100) return { status: 'warning', color: 'text-yellow-600', icon: AlertCircle }
  return { status: 'over', color: 'text-red-600', icon: TrendingDown }
}

export default function BudgetPlannerDetailPage() {
  const [plan, setPlan] = useState<TravelPlan>(mockTravelPlan)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLike = () => {
    setIsLiked(!isLiked)
    setPlan(prev => ({
      ...prev,
      likes: isLiked ? prev.likes - 1 : prev.likes + 1
    }))
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  if (!mounted) return null

  const totalExpenses = calculateTotalExpenses(plan.expenses)
  const budgetStatus = calculateBudgetStatus(plan.totalBudget, totalExpenses)
  const remainingBudget = plan.totalBudget - totalExpenses
  const daysCount = calculateDays(plan.startDate, plan.endDate)

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" className="text-purple-700 hover:bg-purple-50">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Kembali
            </Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-purple-700 hover:bg-purple-50">
                <Share2 className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className={isBookmarked ? "text-purple-700" : "text-gray-600 hover:text-purple-700"}
                onClick={handleBookmark}
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </Button>
              <Button variant="ghost" size="sm" className="text-purple-700 hover:bg-purple-50">
                <Edit className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <article className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Plan Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          {/* Hero Section */}
          <div className="mb-8 rounded-xl overflow-hidden shadow-2xl">
            <div className="h-96 bg-gradient-to-br from-green-400 via-blue-400 to-purple-400 relative">
              <div className="absolute inset-0 bg-black/40"></div>
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <Badge className={`mb-4 ${getStatusColor(plan.status)}`}>
                  {getStatusLabel(plan.status)}
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                  {plan.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-white/90">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    <span className="text-lg">{plan.destination}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    <span className="text-lg">{daysCount} hari</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    <span className="text-lg font-semibold">
                      {formatCurrency(plan.totalBudget, plan.currency)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Plan Info */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Budget Overview */}
            <Card className="lg:col-span-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  Overview Budget
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Total Budget</p>
                    <p className="text-lg font-bold text-gray-800">
                      {formatCurrency(plan.totalBudget, plan.currency)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Total Pengeluaran</p>
                    <p className="text-lg font-bold text-gray-800">
                      {formatCurrency(totalExpenses, plan.currency)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Sisa Budget</p>
                    <p className={`text-lg font-bold ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {formatCurrency(Math.abs(remainingBudget), plan.currency)}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-1">Status</p>
                    <div className="flex items-center justify-center gap-1">
                      <budgetStatus.icon className={`h-4 w-4 ${budgetStatus.color}`} />
                      <span className={`text-sm font-medium ${budgetStatus.color}`}>
                        {Math.round((totalExpenses / plan.totalBudget) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Budget Progress Bar */}
                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress Budget</span>
                    <span>{Math.round((totalExpenses / plan.totalBudget) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full ${
                        budgetStatus.status === 'good' ? 'bg-green-500' :
                        budgetStatus.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${Math.min((totalExpenses / plan.totalBudget) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Author Info */}
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-purple-600" />
                  Author
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={plan.author?.avatar} alt={plan.author?.name} />
                    <AvatarFallback>
                      <Users className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">{plan.author?.name}</h3>
                    <p className="text-sm text-gray-600">{plan.author?.bio}</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Created</span>
                    <span className="text-gray-800">
                      {new Date(plan.createdAt).toLocaleDateString('id-ID')}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Duration</span>
                    <span className="text-gray-800">{daysCount} days</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full mt-4 border-purple-200 text-purple-700 hover:bg-purple-50">
                  Follow Author
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Description */}
          {plan.description && (
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-3">Deskripsi Perjalanan</h2>
                <p className="text-gray-700 leading-relaxed">{plan.description}</p>
              </CardContent>
            </Card>
          )}
        </motion.header>

        {/* Itinerary Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Calendar className="h-6 w-6 text-blue-600" />
            Itinerary Perjalanan
          </h2>
          
          <div className="space-y-6">
            {plan.days?.map((day, index) => (
              <Card key={day.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center font-bold">
                          {day.dayNumber}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">
                            {day.title || `Day ${day.dayNumber}`}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {new Date(day.date).toLocaleDateString('id-ID', { 
                              weekday: 'long', 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                      </CardTitle>
                      {day.description && (
                        <p className="text-gray-600 mt-2">{day.description}</p>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {day.activities?.map((activity) => (
                      <div key={activity.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-purple-100 text-purple-700 rounded-lg flex items-center justify-center">
                            <Clock className="h-5 w-5" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-800">{activity.name}</h4>
                              {activity.description && (
                                <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                              )}
                              {activity.location && (
                                <div className="flex items-center gap-1 mt-2">
                                  <MapPin className="h-3 w-3 text-gray-500" />
                                  <span className="text-sm text-gray-600">{activity.location}</span>
                                </div>
                              )}
                            </div>
                            {activity.cost !== undefined && activity.cost > 0 && (
                              <div className="text-right">
                                <p className="font-semibold text-green-700">
                                  {formatCurrency(activity.cost, plan.currency)}
                                </p>
                              </div>
                            )}
                          </div>
                          {activity.startTime && activity.endTime && (
                            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                              <ClockIcon className="h-3 w-3" />
                              <span>{activity.startTime} - {activity.endTime}</span>
                            </div>
                          )}
                          {activity.notes && (
                            <p className="text-xs text-gray-500 mt-2 italic">{activity.notes}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Budget Breakdown Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-green-600" />
            Rincian Budget
          </h2>
          
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="grid gap-4">
                {plan.expenses?.map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getCategoryColor(expense.category)}`}>
                        {getCategoryIcon(expense.category)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{expense.name}</h4>
                        {expense.description && (
                          <p className="text-sm text-gray-600">{expense.description}</p>
                        )}
                        <div className="flex items-center gap-2 mt-1">
                          {expense.date && (
                            <span className="text-xs text-gray-500">
                              {new Date(expense.date).toLocaleDateString('id-ID')}
                            </span>
                          )}
                          {!expense.isEssential && (
                            <Badge variant="outline" className="text-xs border-orange-200 text-orange-700">
                              Optional
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">
                        {formatCurrency(expense.amount, plan.currency)}
                      </p>
                      {expense.notes && (
                        <p className="text-xs text-gray-500 mt-1">{expense.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Engagement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex items-center justify-between pt-8 border-t border-purple-100"
        >
          <div className="flex items-center gap-6">
            <Button
              variant={isLiked ? "default" : "outline"}
              size="sm"
              onClick={handleLike}
              className={isLiked 
                ? "bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700" 
                : "border-green-200 text-green-700 hover:bg-green-50"
              }
            >
              <Heart className={`h-4 w-4 mr-2 ${isLiked ? 'fill-current' : ''}`} />
              {plan.likes}
            </Button>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <Eye className="h-4 w-4" />
              <span>{plan.views.toLocaleString()} views</span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
            <Share2 className="h-4 w-4 mr-2" />
            Bagikan Rencana
          </Button>
        </motion.div>
      </article>
    </div>
  )
}