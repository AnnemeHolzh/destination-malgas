"use client"

import { useState } from 'react'
import { Amenity } from '../DataModels/Amenity'

interface HouseFilterProps {
  amenities: Amenity[]
  guestCount: number
  onSearch: (query: string) => void
  onBedChange: (count: number) => void
  onBathChange: (count: number) => void
  onGuestChange: (count: number) => void
  onAmenitiesChange: (amenities: string[]) => void
  selectedAmenities: string[]
}

export default function HouseFilter({ 
  amenities,
  guestCount,
  onSearch,
  onBedChange,
  onBathChange,
  onGuestChange,
  onAmenitiesChange,
  selectedAmenities
}: HouseFilterProps) {
  const [isAmenitiesOpen, setIsAmenitiesOpen] = useState(false)

  const handleAmenityToggle = (amenityId: string) => {
    onAmenitiesChange(
      selectedAmenities.includes(amenityId)
        ? selectedAmenities.filter(id => id !== amenityId)
        : [...selectedAmenities, amenityId]
    )
  }

  return (
    <div className="w-full bg-white/20 backdrop-blur-md p-8 rounded-lg">
      <div className="flex flex-wrap gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Search by name or description
          </label>
          <input
            type="text"
            placeholder="Search houses..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full bg-transparent border border-white rounded-md px-4 py-2 text-white placeholder-gray-300"
          />
        </div>

        {/* Bed Count */}
        <div className="w-32">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Minimum beds
          </label>
          <input
            type="number"
            min="1"
            onChange={(e) => onBedChange(Number(e.target.value))}
            placeholder="Beds"
            className="w-full bg-transparent border border-white rounded-md px-4 py-2 text-white"
          />
        </div>

        {/* Bath Count */}
        <div className="w-32">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Minimum baths
          </label>
          <input
            type="number"
            min="1"
            onChange={(e) => onBathChange(Number(e.target.value))}
            placeholder="Baths"
            className="w-full bg-transparent border border-white rounded-md px-4 py-2 text-white"
          />
        </div>

        {/* Guest Count */}
        <div className="w-32">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Guests
          </label>
          <select
            value={guestCount}
            onChange={(e) => onGuestChange(parseInt(e.target.value))}
            className="w-full bg-transparent border border-white rounded-md px-4 py-2 text-white"
          >
            {[...Array(12)].map((_, i) => (
              <option key={i + 1} value={i + 1} className="bg-gray-800">
                {i + 1} Guest{i !== 0 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>

        {/* Amenities Dropdown */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-300 mb-1">
            Amenities
          </label>
          <button
            onClick={() => setIsAmenitiesOpen(!isAmenitiesOpen)}
            className="bg-transparent border border-white rounded-md px-4 py-2 text-white"
          >
            Select ({selectedAmenities.length})
          </button>
          
          {isAmenitiesOpen && (
            <div className="absolute end-0 mt-2 w-64 max-w-[90vw] bg-gray-800/90 backdrop-blur-md border border-white rounded-md p-4 z-10 overflow-x-auto">
              <div className="space-y-2">
                {amenities.map((amenity) => (
                  <label key={amenity.amenityId} className="flex items-center gap-2 text-white cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedAmenities.includes(amenity.amenityId)}
                      onChange={() => handleAmenityToggle(amenity.amenityId)}
                      className="rounded border-white bg-transparent"
                    />
                    <span>{amenity.name}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}