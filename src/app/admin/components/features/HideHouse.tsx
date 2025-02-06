"use client"

import { useEffect, useState } from 'react'
import { getAllHouses, updateHouse } from '../../../services/houseService'
import { House } from '../../../DataModels/House'
import Image from 'next/image'

export default function HideHouse() {
  const [houses, setHouses] = useState<House[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch all houses from Firebase
  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const housesData = await getAllHouses()
        setHouses(housesData)
      } catch (err) {
        setError('Failed to fetch houses. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchHouses()
  }, [])

  // Handle toggle of house visibility
  const handleToggleVisibility = async (houseId: string, isActive: boolean) => {
    try {
      await updateHouse(houseId, { active: isActive })
      // Update local state to reflect the change
      setHouses(prev => prev.map(house => 
        house.houseId === houseId ? { ...house, active: isActive } : house
      ))
    } catch (err) {
      setError('Failed to update house visibility. Please try again.')
      console.error(err)
    }
  }

  if (loading) {
    return <div className="p-6">Loading houses...</div>
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Manage House Visibility</h2>
      
      <div className="space-y-4">
        {houses.map(house => (
          <div key={house.houseId} className="flex items-center gap-4 p-4 border rounded-lg">
            <input
              type="checkbox"
              checked={house.active}
              onChange={(e) => handleToggleVisibility(house.houseId, e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <div className="flex-1">
              <h3 className="text-lg font-medium">{house.name}</h3>
            </div>
            {house.media.photos[0] && (
              <div className="w-20 h-20 relative rounded-lg overflow-hidden">
                <img
                  src={`data:image/jpeg;base64,${house.media.photos[0]}`}
                  alt={house.name}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
} 