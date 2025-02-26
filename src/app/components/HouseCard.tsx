import { useState, useEffect } from 'react'
import { House } from '../DataModels/House'
import { Amenity } from '../DataModels/Amenity'
import { Bed, Bath, Check, Users } from 'lucide-react'
import Image from 'next/image'
import CustomButton from '@/app/components/ui/button'
import Link from 'next/link'

interface HouseCardProps {
  house: House
  amenitiesList: Amenity[]
}

const HouseCard = ({ house, amenitiesList }: HouseCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  
  // Get first two available amenities
  const firstTwoAmenities = Object.entries(house.amenities)
    .filter(([, value]) => value)
    .slice(0, 3)
    .map(([id]) => amenitiesList.find(a => a.amenityId === id))
    .filter(Boolean) as Amenity[]

  // Extract first sentence of description
  const shortDescription = house.shortDescription || '';

  return (
    <Link href={`/accommodation/${house.houseId}`}>
      <div 
        className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 h-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative pt-[56.25%]">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse" />
          )}
          
          {house.media.photos[0] && (
            <>
              <Image
                src={`data:image/webp;base64,${house.media.photos[0]}`}
                alt={house.name}
                fill
                className={`object-cover absolute top-0 left-0 w-full h-full transition-all duration-300 group-hover:blur-sm ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                priority
                loading="eager"
                onLoadingComplete={() => setImageLoaded(true)}
                quality={75}
              />
              {/* Default Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </>
          )}
        </div>

        {/* Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center p-6">
            {/* House Name */}
            <h2 className="text-2xl text-white font-custom4 mb-2 text-center">{house.name}</h2>

            {/* Short Description */}
            <p className="text-sm text-gray-200 line-clamp-3 font-custom3 mb-6 text-center">
              {shortDescription}
            </p>

            {/* Book Now Button */}
            <div className="mt-4 mb-6">
              <CustomButton
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault()
                  e.stopPropagation()
                  // Add booking logic here
                }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20"
              >
                Book Now
              </CustomButton>
            </div>

            {/* Bottom Row */}
            <div className="w-full flex flex-col items-center gap-4 mt-auto">
              {/* Beds & Baths + Amenities */}
              <div className="flex justify-center items-center gap-6">
                {/* Beds & Baths */}
                <div className="flex gap-4 text-white">
                  <div className="flex items-center gap-2">
                    <Bed className="w-5 h-5" />
                    <span>{house.beds}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5" />
                    <span>{house.baths}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{house.capacity}</span>
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
                            .replace(/<path/g, '<path fill="white"')
                            .replace(/<circle/g, '<circle fill="white"')
                            .replace(/<rect/g, '<rect fill="white"')
                            .replace(/<polygon/g, '<polygon fill="white"')
                        }}
                      />
                      <Check className="w-4 h-4 text-green-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Non-hover Bottom Text */}
        {!isHovered && (
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h2 className="text-xl text-white text-center truncate font-custom4">{house.name}</h2>
            <p className="text-sm text-gray-200 text-center line-clamp-2 mt-2 font-custom3">
              {shortDescription}
            </p>
          </div>
        )}
      </div>
    </Link>
  )
}

export default HouseCard 