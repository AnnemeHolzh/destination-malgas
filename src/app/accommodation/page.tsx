"use client"

import { useEffect, useState } from 'react'
import { getAllHouses } from '../services/houseService'
import { House } from '../DataModels/House'
import Image from 'next/image'
import { SkeletonList } from "@/components/Skeleton"
import { optimizeBase64Image } from '@/utils/imageOptimization'
import { cache } from '../../services/cache'

export default function Accommodations() {
  const [houses, setHouses] = useState<House[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch houses from Firebase
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const cachedData = cache.get('houses')
        if (cachedData) {
          setHouses(cachedData)
          return
        }

        const housesData = await getAllHouses()
        const optimizedHouses = await Promise.all(housesData.map(async house => ({
          ...house,
          media: {
            ...house.media,
            photos: await Promise.all(house.media.photos.map(photo => 
              optimizeBase64Image(photo)
            ))
          }
        })))
        const activeHouses = optimizedHouses.filter(house => house.active)
        setHouses(activeHouses)
        cache.set('houses', housesData)
      } catch (err) {
        setError('Failed to fetch accommodations. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchHouses()
  }, [])

  if (loading) {
    return (
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-12">Our Accommodations</h1>
        <SkeletonList count={6} />
      </main>
    )
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">{error}</div>
  }

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-12">Our Accommodations</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {houses.map((house) => (
          <div 
            key={house.houseId}
            className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105"
          >
            {/* House Image */}
            {house.media.photos[0] && (
              <div className="relative aspect-square">
                <img
                  src={`data:image/jpeg;base64,${house.media.photos[0]}`}
                  alt={house.name}
                  className="object-cover w-full h-full"
                  loading="lazy"
                />
              </div>
            )}

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* House Info */}
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h2 className="text-2xl font-bold mb-2">{house.name}</h2>
              <p className="text-sm line-clamp-3">{house.description}</p>
            </div>

            {/* House Name (always visible) */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-4">
              <h2 className="text-xl font-bold text-white text-center">{house.name}</h2>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
} 