import { getHouseById } from '@/app/services/houseService'
import { House } from '@/app/DataModels/House'
import Image from 'next/image'
import { getAllAmenities } from '@/app/services/amenityService'
import BookingForm from '@/app/components/BookingForm'

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
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Main Image */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
            <Image
              src={`data:image/jpeg;base64,${house.media.photos[0]}`}
              alt={house.name}
              fill
              className="object-cover"
            />
          </div>
          
          {/* Secondary Images Grid */}
          <div className="grid grid-cols-2 gap-4">
            {house.media.photos.slice(1, 4).map((photo, index) => (
              <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                <Image
                  src={`data:image/jpeg;base64,${photo}`}
                  alt={`${house.name} view ${index + 2}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
            {house.media.photos.length > 4 && (
              <div className="relative aspect-square rounded-lg overflow-hidden group">
                <Image
                  src={`data:image/jpeg;base64,${house.media.photos[4]}`}
                  alt={`${house.name} view 5`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">+{house.media.photos.length - 4}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            {/* House Details */}
            <h1 className="text-6xl font-custom2 mb-4">{house.name}</h1>
            <p className="text-3xl font-bold mb-6">ZAR {house.price.toFixed(2)} p.n.</p>
            <p className="text-gray-300 mb-8">{house.description}</p>

            {/* Amenities Grid */}
            <div className="grid grid-cols-4 gap-4 mb-8">
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

            {/* Additional Information */}
            <h2 className="text-2xl font-bold mb-4">More Information</h2>
            <p className="text-gray-300">{house.additionalInfo}</p>
          </div>

          {/* Booking Form */}
          <div className="bg-white rounded-lg p-6">
            <BookingForm house={house} />
          </div>
        </div>
      </div>
    </main>
  )
}