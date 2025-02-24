import { useState } from 'react'
import { House } from '../app/DataModels/House'
import { Amenity } from '../app/DataModels/Amenity'
import { Bed, Bath, Check } from 'lucide-react'
import Image from 'next/image'

interface HouseCardProps {
  house: House
  amenitiesList: Amenity[]
}

const HouseCard = ({ house, amenitiesList }: HouseCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  
  // Get first two available amenities
  const firstTwoAmenities = Object.entries(house.amenities)
    .filter(([, value]) => value)
    .slice(0, 2)
    .map(([id]) => amenitiesList.find(a => a.amenityId === id))
    .filter(Boolean) as Amenity[]

  // Extract first sentence of description
  const shortDescription = house.description.split('.')[0] + (house.description.includes('.') ? '.' : '')

  return (
    <div 
      className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* House Image */}
      {house.media.photos[0] && (
        <Image
          src={`data:image/jpeg;base64,${house.media.photos[0]}`}
          alt={house.name}
          width={320}
          height={240}
          className="object-cover w-full h-full"
          loading="lazy"
        />
      )}

      {/* Bottom Overlay (Non-hover state) */}
      {!isHovered && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
          <h2 className="text-xl font-bold text-white text-center">{house.name}</h2>
        </div>
      )}

      {/* Hover Overlay */}
      {isHovered && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent p-6 flex flex-col justify-end space-y-4">
          {/* House Name */}
          <h2 className="text-2xl font-bold text-white">{house.name}</h2>

          {/* Short Description */}
          <p className="text-sm text-gray-200 line-clamp-3">{shortDescription}</p>

          {/* Beds & Baths Info */}
          <div className="flex gap-4 text-white">
            <div className="flex items-center gap-2">
              <Bed className="w-5 h-5" />
              <span>{house.beds}</span>
            </div>
            <div className="flex items-center gap-2">
              <Bath className="w-5 h-5" />
              <span>{house.baths}</span>
            </div>
          </div>

          {/* Amenities */}
          <div className="flex gap-4">
            {firstTwoAmenities.map((amenity) => (
              <div key={amenity.amenityId} className="flex items-center gap-2">
                <div
                  className="w-6 h-6"
                  dangerouslySetInnerHTML={{ 
                    __html: Buffer.from(amenity.icon.split(',')[1], 'base64').toString()
                      .replace('<svg', '<svg width="100%" height="100%" preserveAspectRatio="xMidYMid meet"')
                  }}
                />
                <Check className="w-4 h-4 text-green-400" />
              </div>
            ))}
          </div>

          {/* Book Now Button */}
          <button className="w-full py-2 px-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition-colors">
            Book Now
          </button>
        </div>
      )}
    </div>
  )
}

export default HouseCard 