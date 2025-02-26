import { getHouseById } from '@/app/services/houseService'
import { getAllAmenities } from '@/app/services/amenityService'
import Image from 'next/image'
import { Bed, Bath } from 'lucide-react'
import BookingForm from '@/app/components/BookingForm'
import ImageGalleryWrapper from '@/app/components/ImageGalleryWrapper'
import { parseDescription } from '@/utils/parseDescription'

export default async function HousePage({
  params,
}: {
  params: { houseId: string }
}) {
  const [house, amenities] = await Promise.all([
    getHouseById(params.houseId),
    getAllAmenities()
  ])

  if (!house) {
    return <div>House not found</div>
  }

  return (
    <main className="min-h-screen bg-black text-white pb-12">
      {/* Hero Image Section */}
      <div className="w-full h-[30vh] relative overflow-hidden">
        {house.media.photos[0] && (
          <Image
            src={`data:image/jpeg;base64,${house.media.photos[0]}`}
            alt={house.name}
            fill
            className="object-cover"
            priority
          />
        )}
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 py-12">
        {/* Name and Price */}
        <div className="flex items-end gap-4 mb-8">
          <h1 className="text-8xl font-custom2 whitespace-nowrap overflow-visible">
            {house.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
          </h1>
          <p className="text-4xl font-custom4 whitespace-nowrap">
            ZAR {(house.pricePerNight ?? 0).toFixed(2)} p.n. - Sleeps {house.capacity}
          </p>
        </div>
       
        <div className="grid md:grid-cols-3 gap-4">
          {/* Image Grid Section - 2/3 width */}
          <ImageGalleryWrapper house={house} />

          {/* Booking Form Section - 1/3 width */}
          <div>
            <div className="md:h-[600px] bg-white rounded-lg p-6 text-black h-full mb-4">
              <BookingForm house={house} />
            </div>
          </div>
        </div>

        {/* Amenities Grid */}
        <div className="mb-8 mt-12 flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 w-full max-w-6xl px-4">
            {/* Beds Info */}
            <div className="flex flex-col items-center text-center">
              <div className="w-8 h-8 mb-2">
                <Bed className="w-full h-full" />
              </div>
              <span className="text-sm">{house.beds} Beds</span>
            </div>

            {/* Baths Info */}
            <div className="flex flex-col items-center text-center">
              <div className="w-8 h-8 mb-2">
                <Bath className="w-full h-full" />
              </div>
              <span className="text-sm">{house.baths} Baths</span>
            </div>

            {/* Other Amenities */}
            {amenities
              .filter(amenity => house.amenities[amenity.amenityId])
              .map(amenity => (
                <div 
                  key={amenity.amenityId}
                  className="flex flex-col items-center text-center"
                >
                  <div 
                    className="w-8 h-8 mb-2"
                    dangerouslySetInnerHTML={{ 
                      __html: atob(amenity.icon.split(',')[1])
                        .replace('<svg', '<svg class="w-full h-full" fill="currentColor"')
                    }}
                  />
                  <span className="text-sm">{amenity.name}</span>
                </div>
              ))}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-4">
          {parseDescription(house.description).map((section, index) => (
            <div key={index}>
              {section.type === 'heading' ? (
                <h3 className="text-2xl font-bold mb-2">{section.content}</h3>
              ) : (
                <p className="text-gray-300 text-lg">{section.content}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}