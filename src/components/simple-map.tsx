'use client'

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'

interface Location {
  id: number
  title: string
  description: string
  lat: number
  lng: number
  category: string
  image: string
  likes: number
  comments: number
  photos: number
  date: string
}

interface SimpleMapProps {
  locations: Location[]
  center: [number, number]
  zoom: number
  className?: string
}

export default function SimpleMap({ locations, center, zoom, className }: SimpleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<any>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (!isClient || !mapRef.current) return

    // Initialize map only if it doesn't exist
    if (!mapInstanceRef.current) {
      import('leaflet').then((L) => {
        // Initialize map
        const map = L.map(mapRef.current!).setView(center, zoom)

        // Add tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map)

        // Store map instance
        mapInstanceRef.current = map
      })
    }
  }, [isClient, center, zoom])

  // Update markers when locations change
  useEffect(() => {
    if (!isClient || !mapInstanceRef.current || !locations || !Array.isArray(locations)) return

    import('leaflet').then((L) => {
      const map = mapInstanceRef.current

      // Clear existing markers
      map.eachLayer((layer: any) => {
        if (layer instanceof L.Marker) {
          map.removeLayer(layer)
        }
      })

      // Add new markers
      locations.forEach((location) => {
        const iconColors = {
          Mountain: '#8B4513',
          Beach: '#87CEEB',
          Culture: '#9370DB',
          Marine: '#4682B4',
          Heritage: '#DAA520',
          Nature: '#228B22',
          Adventure: '#FF6347'
        }

        const customIcon = L.divIcon({
          html: `
            <div style="
              background: ${iconColors[location.category as keyof typeof iconColors] || '#666'};
              width: 30px;
              height: 30px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 3px solid white;
              box-shadow: 0 2px 6px rgba(0,0,0,0.3);
            ">
              <svg style="width: 16px; height: 16px; color: white; fill: currentColor;" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
            </div>
          `,
          className: 'custom-div-icon',
          iconSize: [30, 30],
          iconAnchor: [15, 30]
        })

        const marker = L.marker([location.lat, location.lng], { icon: customIcon })
          .addTo(map)
          .bindPopup(`
            <div style="min-width: 200px;">
              <img src="${location.image}" alt="${location.title}" style="width: 100%; height: 120px; object-fit: cover; border-radius: 4px; margin-bottom: 8px;">
              <h3 style="margin: 0 0 4px 0; font-weight: bold; color: #333;">${location.title}</h3>
              <p style="margin: 0 0 8px 0; font-size: 14px; color: #666;">${location.description}</p>
              <div style="font-size: 12px; color: #888;">
                <span style="background: #f0f0f0; padding: 2px 6px; border-radius: 3px;">${location.category}</span>
                <span style="margin-left: 8px;">${location.date}</span>
              </div>
              <div style="display: flex; gap: 12px; margin-top: 8px; font-size: 12px; color: #666;">
                <span>❤️ ${location.likes}</span>
                <span>💬 ${location.comments}</span>
                <span>📷 ${location.photos}</span>
              </div>
            </div>
          `)
      })
    })
  }, [isClient, locations])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [])

  if (!isClient) {
    return (
      <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading map...</p>
        </div>
      </div>
    )
  }

  return <div ref={mapRef} className={className} />
}