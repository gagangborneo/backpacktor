'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Navbar } from '@/components/navbar'
import {
  MapPin,
  Calendar,
  Globe,
  Heart,
  Eye,
  Mail,
  Phone,
  Camera,
  Compass,
  Mountain,
  Instagram,
  Facebook,
  Twitter,
  Award,
  Clock,
  Users,
  Map,
  Star,
  Backpack,
  Coffee,
  Sparkles,
  Navigation,
  BookOpen,
  Zap,
  Target
} from 'lucide-react'

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 text-8xl transform rotate-12">🏔️</div>
        <div className="absolute top-40 right-32 text-6xl transform -rotate-6">🎒</div>
        <div className="absolute bottom-40 left-40 text-7xl transform rotate-45">🧭</div>
        <div className="absolute bottom-20 right-20 text-5xl transform -rotate-12">📸</div>
      </div>

      {/* Navigation */}
      <Navbar showSearch={false} />

      {/* Unique Hero Section */}
      <section className="relative pt-24 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            {/* Brand Logo Animation */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-6"
            >
              <div className="w-24 h-24 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 rounded-3xl flex items-center justify-center shadow-2xl">
                <Backpack className="w-12 h-12 text-white" />
              </div>
            </motion.div>

            <h1 className="text-6xl font-black mb-4 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Backpacktor
            </h1>

            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-5 h-5 text-purple-500" />
              <p className="text-2xl text-gray-700 font-medium">Digital Wanderer & Storyteller</p>
              <Sparkles className="w-5 h-5 text-pink-500" />
            </div>

            <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Exploring the archipelago one adventure at a time 🌴 From volcanic peaks to pristine beaches,
              sharing stories that inspire wanderlust and celebrate the beauty of Indonesia.
            </p>
          </motion.div>

          {/* Profile Card with Unique Layout */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {/* Main Profile Card */}
            <div className="md:col-span-2">
              <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
                <div className="h-2 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400"></div>
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="relative">
                      <div className="w-32 h-32 bg-gradient-to-br from-purple-200 to-pink-200 rounded-2xl flex items-center justify-center">
                        <Avatar className="w-28 h-28">
                          <AvatarImage src="https://picsum.photos/seed/backpacker-adventure-portrait/300/300" alt="Profile" />
                          <AvatarFallback>
                            <Users className="w-14 h-14 text-purple-600" />
                          </AvatarFallback>
                        </Avatar>
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
                        <Zap className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-gray-800 mb-2">Hi, I'm Backpacktor! 👋</h2>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        Passionate travel blogger on a mission to explore every corner of Indonesia.
                        With a backpack full of dreams and a camera ready for adventures, I turn ordinary
                        journeys into extraordinary stories.
                      </p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                          🇮🇩 Indonesia Explorer
                        </Badge>
                        <Badge className="bg-pink-100 text-pink-700 hover:bg-pink-200">
                          📸 Photography Enthusiast
                        </Badge>
                        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">
                          🏔️ Mountain Lover
                        </Badge>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          Jakarta, Indonesia
                        </div>
                        <div className="flex items-center gap-1">
                          <Globe className="w-4 h-4" />
                          ID/EN
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Stats Card */}
            <div>
              <Card className="border-0 shadow-2xl bg-gradient-to-br from-purple-600 to-pink-500 text-white h-full">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Target className="w-6 h-6" />
                    Adventure Stats
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-purple-100">Destinations</span>
                      <span className="text-2xl font-bold">30+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-100">Years Active</span>
                      <span className="text-2xl font-bold">5+</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-100">Total Views</span>
                      <span className="text-2xl font-bold">150K</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-purple-100">Followers</span>
                      <span className="text-2xl font-bold">10K</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Skills Section */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Superpowers 🚀</h2>
              <p className="text-gray-600">Skills that make adventures possible</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Mountain className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Travel Expertise</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Navigation className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">Mountain Trekking</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Compass className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">Beach Hopping</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Camera className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">Cultural Tours</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Coffee className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">Budget Travel</span>
                  </div>
                </div>
              </Card>

              <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800">Creative Skills</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 text-gray-700">
                    <Star className="w-4 h-4 text-pink-500" />
                    <span className="text-sm">Content Writing</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Eye className="w-4 h-4 text-pink-500" />
                    <span className="text-sm">Photography</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Heart className="w-4 h-4 text-pink-500" />
                    <span className="text-sm">SEO</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <Clock className="w-4 h-4 text-pink-500" />
                    <span className="text-sm">Video Editing</span>
                  </div>
                </div>
              </Card>
            </div>
          </motion.section>

          {/* Favorite Destinations - Simplified List */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16"
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-gray-800">
                  <Mountain className="h-6 w-6 text-purple-600" />
                  Favorite Destinations ✨
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[
                    { name: 'Gunung Bromo', location: 'Jawa Timur', icon: '🌋' },
                    { name: 'Pulau Komodo', location: 'Nusa Tenggara Timur', icon: '🦎' },
                    { name: 'Raja Ampat', location: 'Papua Barat', icon: '🏝️' },
                    { name: 'Pulau Bali', location: 'Bali', icon: '🌺' },
                    { name: 'Danau Toba', location: 'Sumatera Utara', icon: '🏔️' },
                    { name: 'Tumpak Sewu', location: 'Jawa Timur', icon: '💧' }
                  ].map((destination, index) => (
                    <div key={index} className="group flex items-center gap-3 p-4 rounded-lg border border-purple-100 hover:border-purple-300 hover:bg-purple-50 transition-all duration-300 cursor-pointer">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                        {destination.icon}
                      </span>
                      <div>
                        <h4 className="font-semibold text-gray-800 group-hover:text-purple-600 transition-colors">
                          {destination.name}
                        </h4>
                        <p className="text-sm text-gray-600 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {destination.location}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.section>

          {/* Contact & Social */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl text-gray-800">
                  <Mail className="h-6 w-6 text-purple-600" />
                  Let's Connect! 🤝
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4">Get in Touch</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-purple-600" />
                        <span className="text-gray-700">contact@backpacktor.com</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-purple-600" />
                        <span className="text-gray-700">+62 812-3456-7890</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-4">Follow My Journey</h3>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                        <Instagram className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                        <Facebook className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                        <Twitter className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="border-purple-200 text-purple-700 hover:bg-purple-50">
                        <Camera className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.section>
        </div>
      </section>
    </div>
  )
}