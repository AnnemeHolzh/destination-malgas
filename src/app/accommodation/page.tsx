"use client"

import { useEffect, useState } from 'react'
import { getAllHouses } from '../services/houseService'
import { getAllAmenities } from '../services/amenityService'
import { House } from '../DataModels/House'
import { Amenity } from '../DataModels/Amenity'
import { SkeletonList } from "@/components/Skeleton"
import { optimizeBase64Image } from '@/utils/imageOptimization'
import { cache } from '../../services/cache'
import HouseCard from '@/components/HouseCard'

export default function Accommodations() {
  const [houses, setHouses] = useState<House[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [amenities, setAmenities] = useState<Amenity[]>([])

  // Fetch houses from Firebase
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const cachedData = cache.get('houses')
        if (cachedData) {
          const activeHouses = cachedData.filter((house: House) => house.active)
          setHouses(activeHouses)
          return
        }

        const housesData = await getAllHouses()
        const amenitiesData = await getAllAmenities()
        const optimizedHouses = await Promise.all(housesData.map(async house => ({
          ...house,
          media: {
            ...house.media,
            photos: await Promise.all(house.media.photos.map(photo => 
              optimizeBase64Image(photo)
            ))
          }
        })))
        
        // Filter active houses before setting state
        const activeHouses = optimizedHouses.filter(house => house.active)
        setHouses(activeHouses)
        setAmenities(amenitiesData)
        
        // Cache all houses for admin purposes
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
          <HouseCard 
            key={house.houseId} 
            house={house} 
            amenitiesList={amenities}
          />
        ))}
      </div>
    </main>
  )
} 
