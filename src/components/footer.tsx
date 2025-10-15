'use client'

import { motion } from 'framer-motion'
import { Mountain, Mail, Facebook, Instagram, Youtube, MapPin, Phone, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center space-y-8">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <Mountain className="h-7 w-7 text-white" />
              </div>
              <span className="text-2xl font-bold">Backpacktor</span>
            </div>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Bagikan cerita perjalanan Anda dan inspirasi traveler lainnya untuk menjelajahi keindahan Indonesia.
              Dari gunung hingga pantai, abadikan setiap momen berharga dalam petualangan Anda.
            </p>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 text-gray-400"
          >
            <div className="flex items-center gap-2">
              <Mail className="h-5 w-5 text-purple-400" />
              <span>info@backpacktor.id</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-5 w-5 text-purple-400" />
              <span>+62 812-3456-7890</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-purple-400" />
              <span>Jakarta, Indonesia</span>
            </div>
          </motion.div>

          {/* Social Media Icons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex items-center justify-center gap-4"
          >
            <a
              href="https://facebook.com/backpacktor"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
            >
              <Facebook className="h-6 w-6 group-hover:text-white" />
            </a>
            <a
              href="https://instagram.com/backpacktor"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-800 hover:bg-pink-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
            >
              <Instagram className="h-6 w-6 group-hover:text-white" />
            </a>
            <a
              href="https://youtube.com/@backpacktor"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-800 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
            >
              <Youtube className="h-6 w-6 group-hover:text-white" />
            </a>
            <a
              href="mailto:info@backpacktor.id"
              className="w-12 h-12 bg-gray-800 hover:bg-purple-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 group"
            >
              <Mail className="h-6 w-6 group-hover:text-white" />
            </a>
          </motion.div>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-6 text-gray-400 text-sm"
          >
            <a href="#" className="hover:text-purple-400 transition-colors">Tentang Kami</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Blog</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Rencana Perjalanan</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Galeri</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Kontak</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Privasi</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Syarat & Ketentuan</a>
          </motion.div>

          {/* Copyright */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="border-t border-gray-800 pt-8"
          >
            <p className="text-gray-400 text-sm flex items-center justify-center gap-2">
              © 2024 Backpacktor. Made with
              <Heart className="h-4 w-4 text-red-500 fill-current" />
              by Indonesian Travelers
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}