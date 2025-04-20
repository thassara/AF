import  { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
interface CountryMapProps {
    latlng: [number, number] // Tuple instead of number[]
    name: string
  }
  
export function CountryMap({ latlng, name }: CountryMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<L.Map | null>(null)
  useEffect(() => {
    if (!mapRef.current) return
    // Initialize map only if it hasn't been initialized yet
    if (!mapInstanceRef.current) {
      // Create map
      const map = L.map(mapRef.current).setView(latlng, 6)
      // Add OpenStreetMap tiles
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map)
      // Add marker for the country
      L.marker(latlng).addTo(map).bindPopup(`<b>${name}</b>`).openPopup()
      mapInstanceRef.current = map
    }
    // Cleanup function
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove()
        mapInstanceRef.current = null
      }
    }
  }, [latlng, name])
  return <div ref={mapRef} className="h-[400px] w-full rounded-lg" />
}
