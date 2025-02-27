"use client"

import { useEffect, useState, useRef } from 'react'
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
import { useIntersection } from '@mantine/hooks'
import { useDeferredValue } from 'react'

export default function Accommodations() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [amenities, setAmenities] = useState<Amenity[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [minBeds, setMinBeds] = useState(1)
  const [minBaths, setMinBaths] = useState(1)
  const [guestCount, setGuestCount] = useState(1)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [allHouses, setAllHouses] = useState<House[]>([])
  const deferredHouses = useDeferredValue(allHouses)

  // Add pagination state
  const lastHouseRef = useRef<HTMLDivElement>(null)
  const { ref, entry } = useIntersection({
    root: lastHouseRef.current,
    threshold: 1,
  })

  // Fetch houses from Firebase
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const cachedData = cache.get('houses')
        if (cachedData) {
          // If we have cached data, fetch the full house data in the background
          setAllHouses(Array.isArray(cachedData) ? 
            cachedData.filter((house: House) => house.active) : [])
          
          // Fetch fresh data in the background
          getAllHouses().then(async (housesData) => {
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
            
            const activeHouses = optimizedHouses.filter(house => house.active)
            setAllHouses(activeHouses)
            setAmenities(amenitiesData)
            
            // Cache houses without images
            cache.set('houses', housesData)
          })
          return
        }

        // If no cache, fetch everything
        const [housesData, amenitiesData] = await Promise.all([
          getAllHouses(),
          getAllAmenities()
        ])
        
        // Process images in chunks
        const chunkSize = 5
        const optimizedChunks: House[] = []
        const processChunk = async (chunk: House[]) => {
          const optimized = await Promise.all(chunk.map(async house => ({
            ...house,
            media: {
              ...house.media,
              photos: await Promise.all(house.media.photos.map(photo => optimizeBase64Image(photo)))
            }
          })));
          optimizedChunks.push(...optimized);
        };

        for (let i = 0; i < housesData.length; i += chunkSize) {
          const chunk = housesData.slice(i, i + chunkSize);
          await processChunk(chunk);
        }
        setAllHouses(optimizedChunks.filter(house => house.active));
        
        const activeHouses = optimizedChunks.filter(house => house.active)
        setAllHouses(activeHouses)
        setAmenities(amenitiesData)
        
        // Cache houses without images
        cache.set('houses', housesData)
      } catch (err) {
        setError('Failed to fetch accommodations. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchHouses()
  }, [page])

  // Lazy load more houses when scrolled to bottom
  useEffect(() => {
    if (entry?.isIntersecting) {
      setPage(prev => prev + 1)
    }
  }, [entry])

  // Add filtered houses calculation
  const filteredHouses = deferredHouses.filter(house => {
    const matchesSearch = searchQuery ? 
      house.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      house.description.toLowerCase().includes(searchQuery.toLowerCase()) : 
      true

    const matchesBeds = house.beds >= minBeds
    const matchesBaths = house.baths >= minBaths
    const matchesGuests = house.capacity >= guestCount
    const matchesAmenities = selectedAmenities.length > 0 ? 
      selectedAmenities.every(amenityId => house.amenities[amenityId]) : 
      true

    return matchesSearch && matchesBeds && matchesBaths && matchesGuests && matchesAmenities
  })

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
          {filteredHouses.map((house, index) => (
            <div ref={index === filteredHouses.length - 1 ? ref : null} key={house.houseId}>
              <HouseCard house={house} amenitiesList={amenities} />
            </div>
          ))}
        </div>
      </div>
    </main>
  )
} 
