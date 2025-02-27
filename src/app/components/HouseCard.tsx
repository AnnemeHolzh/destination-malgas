import { useState } from 'react'
import { House } from '../DataModels/House'
import { Amenity } from '../DataModels/Amenity'
import { Bed, Bath, Users } from 'lucide-react'
import Image from 'next/image'
import CustomButton from '@/app/components/ui/button'
import Link from 'next/link'

interface HouseCardProps {
  house: House
  amenitiesList: Amenity[]
}

const HouseCard = ({ house }: HouseCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  
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
                }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20"
              >
                Book Now
              </CustomButton>
            </div>

            {/* Bottom Row - Beds/Baths/Guests */}
            <div className="w-full flex justify-center items-center gap-6 mt-auto">
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