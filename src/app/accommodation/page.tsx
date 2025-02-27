"use client"

import { useEffect, useState } from 'react'
import { getAllHouses } from '../services/houseService'
import { getAllAmenities } from '../services/amenityService'
import { House } from '../DataModels/House'
import { Amenity } from '../DataModels/Amenity'
import { SkeletonList } from "@/app/components/Skeleton"
import { optimizeBase64Image } from '@/utils/imageOptimization'
import { cache } from '../../services/cache'
import HouseCard from '@/app/components/HouseCard'
import pageImage from '../../../public/Images/Accommodation/accommodation.png'
import Image from 'next/image'
import './accommodation.css'
import HouseFilter from '@/app/components/housefilter'

export default function Accommodations() {
  const [houses, setHouses] = useState<House[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [amenities, setAmenities] = useState<Amenity[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [minBeds, setMinBeds] = useState(1)
  const [minBaths, setMinBaths] = useState(1)
  const [guestCount, setGuestCount] = useState(1)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])

  // Fetch houses from Firebase
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const [cachedHouses, cachedAmenities] = [
          cache.get('houses'),
          cache.get('amenities')
        ]

        // If we have both cached data, use it immediately
        if (cachedHouses && cachedAmenities) {
          setHouses(cachedHouses.filter((house: House) => house.active))
          setAmenities(cachedAmenities)
          
          // Fetch fresh data in the background
          Promise.all([
            getAllHouses(),
            getAllAmenities()
          ]).then(async ([housesData, amenitiesData]) => {
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
            setAmenities(amenitiesData)
            
            // Update cache
            cache.set('houses', housesData)
            cache.set('amenities', amenitiesData)
          })
          return
        }

        // If no cache or partial cache, fetch everything
        const [housesData, amenitiesData] = await Promise.all([
          getAllHouses(),
          getAllAmenities()
        ])
        
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
        setAmenities(amenitiesData)
        
        // Cache both houses and amenities
        cache.set('houses', housesData)
        cache.set('amenities', amenitiesData)
      } catch (err) {
        setError('Failed to fetch accommodations. Please try again later.')
        console.error('Error fetching data:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchHouses()
  }, [])

  // Add filtered houses calculation
  const filteredHouses = (() => {
    try {
      return houses.filter(house => {
        if (!house) return false;
        
        const matchesSearch = searchQuery ? 
          house.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
          house.description?.toLowerCase().includes(searchQuery.toLowerCase()) : 
          true

        const matchesBeds = house.beds >= minBeds
        const matchesBaths = house.baths >= minBaths
        const matchesGuests = house.capacity >= guestCount
        const matchesAmenities = selectedAmenities.length > 0 ? 
          selectedAmenities.every(amenityId => house.amenities?.[amenityId]) : 
          true

        return matchesSearch && matchesBeds && matchesBaths && matchesGuests && matchesAmenities
      })
    } catch (error) {
      console.error('Error filtering houses:', error)
      return []
    }
  })()

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
    <main className="bg-black">
      {/* Hero Image Container */}
      <div className="w-full h-[70vh] relative pb-8">
        <Image
          src={pageImage}
          alt="Accommodations"
          fill
          className="object-cover object-center-bottom"
          priority
        />
        
        {/* Filter Positioned higher up */}
        <div className="absolute bottom-20 left-0 right-0 z-10">
          <div className="container mx-auto px-4">
            <HouseFilter
              selectedAmenities={selectedAmenities}
              amenities={amenities}
              guestCount={guestCount}
              onSearch={setSearchQuery}
              onBedChange={setMinBeds}
              onBathChange={setMinBaths}
              onGuestChange={setGuestCount}
              onAmenitiesChange={setSelectedAmenities}
            />
          </div>
        </div>
      </div>

      {/* Accommodations Grid */}
      <div className="container mx-auto mt-[-100px] px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHouses.map((house) => (
            <HouseCard 
              key={house.houseId}
              house={house}
              amenitiesList={amenities}
            />
          ))}
        </div>
      </div>
    </main>
  )
} 
