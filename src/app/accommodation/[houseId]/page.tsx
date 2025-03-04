import type { Metadata } from 'next'
import { getHouseById } from '@/app/services/houseService'
import { getAllAmenities } from '@/app/services/amenityService'
import Image from 'next/image'
import { Bed, Bath } from 'lucide-react'
import BookingForm from '@/app/components/BookingForm'
import ImageGalleryWrapper from '@/app/components/ImageGalleryWrapper'
import { parseDescription } from '@/utils/parseDescription'

type Props = {
  params: Promise<{ houseId: string }>
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
}

export async function generateMetadata(
  { params }: Props
): Promise<Metadata> {
  const resolvedParams = await params
  const house = await getHouseById(resolvedParams.houseId)
  return {
    title: house?.name ?? 'House Details',
    description: house?.shortDescription ?? 'View house details'
  }
}

export default async function HousePage({ params }: Props) {
  try {
    const resolvedParams = await params
    const [house, amenities] = await Promise.all([
      getHouseById(resolvedParams.houseId),
      getAllAmenities()
    ]).catch(error => {
      console.error('Error fetching data:', error);
      throw new Error('Failed to fetch data');
    });

    if (!house) {
      return (
        <main className="min-h-screen bg-black text-white flex items-center justify-center">
          <div>House not found</div>
        </main>
      );
    }

    if (!Array.isArray(amenities)) {
      console.error('Amenities is not an array:', amenities);
      return (
        <main className="min-h-screen bg-black text-white flex items-center justify-center">
          <div>Error loading house details. Please try again later.</div>
        </main>
      );
    }

    return (
      <main className="min-h-screen bg-black text-white pb-12">
        {/* Hero Image Section */}
        <div className="w-full h-[30vh] relative overflow-hidden">
          {house.media?.photos?.[0] && (
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
              {house.name?.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ')}
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
              {Array.isArray(amenities) && house.amenities && amenities
                .filter(amenity => amenity && amenity.amenityId && house.amenities[amenity.amenityId])
                .map(amenity => (
                  <div 
                    key={amenity.amenityId}
                    className="flex flex-col items-center text-center"
                  >
                    <div 
                      className="w-8 h-8 mb-2"
                      dangerouslySetInnerHTML={{ 
                        __html: amenity.icon ? atob(amenity.icon.split(',')[1])
                          .replace('<svg', '<svg class="w-full h-full" fill="currentColor"') : ''
                      }}
                    />
                    <span className="text-sm">{amenity.name}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            {house.description && parseDescription(house.description).map((section, index) => (
              <div key={index}>
                {section.type === 'h1' ? (
                  <h1 className="text-3xl font-custom4 mb-4 mt-8">{section.content}</h1>
                ) : section.type === 'h2' ? (
                  <h2 className="text-xl font-custom4 mb-3 mt-6">{section.content}</h2>
                ) : section.type === 'h3' ? (
                  <h3 className="text-1xl font-custom4 mb-2 mt-4">{section.content}</h3>
                ) : (
                  <p className="text-gray-300 font-custom3 text-lg">{section.content}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  } catch (error) {
    console.error('Error in HousePage:', error);
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div>Failed to load house details. Please try again later.</div>
      </main>
    );
  }
}