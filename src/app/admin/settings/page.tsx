'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Settings,
  ArrowLeft,
  Save,
  Globe,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  Music,
  Link2,
  Mail,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  Copy,
  ExternalLink
} from 'lucide-react'
import Link from 'next/link'

interface SocialMediaLink {
  platform: string
  url: string
  icon: React.ReactNode
  color: string
  label: string
}

interface SiteSettings {
  siteName: string
  siteDescription: string
  siteUrl: string
  contactEmail: string
  contactPhone: string
  contactAddress: string
  socialMedia: SocialMediaLink[]
  googleAnalytics: string
  facebookPixel: string
  googleMapsApiKey: string
  maintenanceMode: boolean
  showFooterSocial: boolean
  showContactInfo: boolean
}

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState('general')
  const [showApiKeys, setShowApiKeys] = useState(false)

  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'Backpacktor',
    siteDescription: 'Platform berbagi cerita perjalanan dan destinasi wisata Indonesia',
    siteUrl: 'https://backpacktor.com',
    contactEmail: 'info@backpacktor.com',
    contactPhone: '+62 812-3456-7890',
    contactAddress: 'Jakarta, Indonesia',
    socialMedia: [
      {
        platform: 'facebook',
        url: 'https://facebook.com/backpacktor',
        icon: <Facebook className="h-5 w-5" />,
        color: 'bg-blue-600',
        label: 'Facebook'
      },
      {
        platform: 'instagram',
        url: 'https://instagram.com/backpacktor',
        icon: <Instagram className="h-5 w-5" />,
        color: 'bg-gradient-to-br from-purple-600 to-pink-600',
        label: 'Instagram'
      },
      {
        platform: 'youtube',
        url: 'https://youtube.com/@backpacktor',
        icon: <Youtube className="h-5 w-5" />,
        color: 'bg-red-600',
        label: 'YouTube'
      },
      {
        platform: 'twitter',
        url: 'https://twitter.com/backpacktor',
        icon: <Twitter className="h-5 w-5" />,
        color: 'bg-sky-500',
        label: 'Twitter'
      },
      {
        platform: 'tiktok',
        url: 'https://tiktok.com/@backpacktor',
        icon: <Music className="h-5 w-5" />,
        color: 'bg-gray-900',
        label: 'TikTok'
      }
    ],
    googleAnalytics: 'G-XXXXXXXXXX',
    facebookPixel: '1234567890123456',
    googleMapsApiKey: 'AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXX',
    maintenanceMode: false,
    showFooterSocial: true,
    showContactInfo: true
  })

  const tabs = [
    { id: 'general', label: 'Umum', icon: <Settings className="h-4 w-4" /> },
    { id: 'social', label: 'Media Sosial', icon: <Globe className="h-4 w-4" /> },
    { id: 'contact', label: 'Kontak', icon: <Mail className="h-4 w-4" /> },
    { id: 'api', label: 'API Keys', icon: <Link2 className="h-4 w-4" /> }
  ]

  const handleSave = () => {
    // Simulate save
    alert('Pengaturan berhasil disimpan!')
  }

  const handleSocialMediaChange = (platform: string, url: string) => {
    setSettings(prev => ({
      ...prev,
      socialMedia: prev.socialMedia.map(social =>
        social.platform === platform ? { ...social, url } : social
      )
    }))
  }

  const toggleSocialMedia = (platform: string) => {
    setSettings(prev => ({
      ...prev,
      socialMedia: prev.socialMedia.map(social =>
        social.platform === platform
          ? { ...social, url: social.url ? '' : `https://${platform}.com/backpacktor` }
          : social
      )
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Tabs */}
        <div className="bg-white border-b border-gray-200">
          <div className="flex">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'text-purple-600 border-purple-600'
                    : 'text-gray-600 border-transparent hover:text-gray-900'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Pengaturan Umum</CardTitle>
                  <CardDescription>
                    Konfigurasi dasar situs Anda
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Nama Situs
                      </Label>
                      <Input
                        value={settings.siteName}
                        onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                        placeholder="Nama situs"
                      />
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        URL Situs
                      </Label>
                      <Input
                        value={settings.siteUrl}
                        onChange={(e) => setSettings({...settings, siteUrl: e.target.value})}
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Deskripsi Situs
                    </Label>
                    <textarea
                      value={settings.siteDescription}
                      onChange={(e) => setSettings({...settings, siteDescription: e.target.value})}
                      className="w-full h-24 p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:border-purple-500"
                      placeholder="Deskripsi singkat tentang situs Anda"
                    />
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="maintenanceMode"
                        checked={settings.maintenanceMode}
                        onChange={(e) => setSettings({...settings, maintenanceMode: e.target.checked})}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <Label htmlFor="maintenanceMode" className="text-sm text-gray-700">
                        Mode Maintenance
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="showFooterSocial"
                        checked={settings.showFooterSocial}
                        onChange={(e) => setSettings({...settings, showFooterSocial: e.target.checked})}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <Label htmlFor="showFooterSocial" className="text-sm text-gray-700">
                        Tampilkan Media Sosial di Footer
                      </Label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="showContactInfo"
                        checked={settings.showContactInfo}
                        onChange={(e) => setSettings({...settings, showContactInfo: e.target.checked})}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <Label htmlFor="showContactInfo" className="text-sm text-gray-700">
                        Tampilkan Info Kontak
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Social Media Settings */}
          {activeTab === 'social' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Media Sosial</CardTitle>
                  <CardDescription>
                    Konfigurasi tautan media sosial yang akan ditampilkan di footer
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {settings.socialMedia.map((social) => (
                    <div key={social.platform} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 ${social.color} rounded-lg flex items-center justify-center text-white`}>
                            {social.icon}
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{social.label}</h3>
                            <p className="text-sm text-gray-500">Tampilkan di footer</p>
                          </div>
                        </div>
                        <Button
                          variant={social.url ? "default" : "outline"}
                          size="sm"
                          onClick={() => toggleSocialMedia(social.platform)}
                        >
                          {social.url ? 'Aktif' : 'Nonaktif'}
                        </Button>
                      </div>

                      {social.url && (
                        <div>
                          <Label className="text-sm font-medium text-gray-700 mb-2 block">
                            URL {social.label}
                          </Label>
                          <div className="flex gap-2">
                            <Input
                              value={social.url}
                              onChange={(e) => handleSocialMediaChange(social.platform, e.target.value)}
                              placeholder={`https://${social.platform}..com/username`}
                            />
                            {social.url && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => window.open(social.url, '_blank')}
                              >
                                <ExternalLink className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Preview Footer</h4>
                    <div className="flex gap-3">
                      {settings.socialMedia.filter(social => social.url).map((social) => (
                        <a
                          key={social.platform}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-10 h-10 ${social.color} rounded-lg flex items-center justify-center text-white hover:opacity-90 transition-opacity`}
                        >
                          {social.icon}
                        </a>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Contact Settings */}
          {activeTab === 'contact' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Informasi Kontak</CardTitle>
                  <CardDescription>
                    Informasi kontak yang akan ditampilkan di situs
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Email Kontak
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          type="email"
                          value={settings.contactEmail}
                          onChange={(e) => setSettings({...settings, contactEmail: e.target.value})}
                          placeholder="info@example.com"
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-2 block">
                        Telepon
                      </Label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                          value={settings.contactPhone}
                          onChange={(e) => setSettings({...settings, contactPhone: e.target.value})}
                          placeholder="+62 812-3456-7890"
                          className="pl-10"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Alamat
                    </Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        value={settings.contactAddress}
                        onChange={(e) => setSettings({...settings, contactAddress: e.target.value})}
                        placeholder="Alamat lengkap"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-medium text-gray-900 mb-2">Preview Info Kontak</h4>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>{settings.contactEmail || 'Email belum diatur'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{settings.contactPhone || 'Telepon belum diatur'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4" />
                        <span>{settings.contactAddress || 'Alamat belum diatur'}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* API Keys Settings */}
          {activeTab === 'api' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    API Keys & Integrasi
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowApiKeys(!showApiKeys)}
                    >
                      {showApiKeys ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                  </CardTitle>
                  <CardDescription>
                    Konfigurasi API keys untuk integrasi pihak ketiga
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Google Analytics ID
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        type={showApiKeys ? "text" : "password"}
                        value={settings.googleAnalytics}
                        onChange={(e) => setSettings({...settings, googleAnalytics: e.target.value})}
                        placeholder="G-XXXXXXXXXX"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(settings.googleAnalytics)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Format: G-XXXXXXXXXX
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Facebook Pixel ID
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        type={showApiKeys ? "text" : "password"}
                        value={settings.facebookPixel}
                        onChange={(e) => setSettings({...settings, facebookPixel: e.target.value})}
                        placeholder="1234567890123456"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(settings.facebookPixel)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Format: 16 digit numeric ID
                    </p>
                  </div>

                  <div>
                    <Label className="text-sm font-medium text-gray-700 mb-2 block">
                      Google Maps API Key
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        type={showApiKeys ? "text" : "password"}
                        value={settings.googleMapsApiKey}
                        onChange={(e) => setSettings({...settings, googleMapsApiKey: e.target.value})}
                        placeholder="AIzaSy..."
                        className="flex-1"
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigator.clipboard.writeText(settings.googleMapsApiKey)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Required for map functionality. Keep this key secure.
                    </p>
                  </div>

                  <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                    <h4 className="font-medium text-amber-800 mb-2">⚠️ Security Notice</h4>
                    <p className="text-sm text-amber-700">
                      API keys are sensitive information. Make sure to keep them secure and only share with trusted team members.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}