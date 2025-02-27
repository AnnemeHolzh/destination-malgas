'use client'

import { useState } from 'react'
import Image from 'next/image'
import ImageGallery from './ImageGallery'
import { House } from '../DataModels/House'

interface ImageGalleryWrapperProps {
  house: House
}

export default function ImageGalleryWrapper({ house }: ImageGalleryWrapperProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)
  const [galleryStartIndex, setGalleryStartIndex] = useState(0)

  return (
    <div className="md:col-span-2 grid grid-cols-2 gap-4">
      {/* Left Column - Large Vertical Image */}
      <div 
        className="relative h-[600px] rounded-lg overflow-hidden cursor-pointer"
        onClick={() => {
          setGalleryStartIndex(1)
          setIsGalleryOpen(true)
        }}
      >
        {house.media.photos[1] && (
          <Image
            src={`data:image/jpeg;base64,${house.media.photos[1]}`}
            alt={`${house.name} view 2`}
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* Right Column - Two Square Images */}
      <div className="grid grid-rows-2 gap-4">
        <div 
          className="relative h-[290px] rounded-lg overflow-hidden cursor-pointer"
          onClick={() => {
            setGalleryStartIndex(2)
            setIsGalleryOpen(true)
          }}
        >
          {house.media.photos[2] && (
            <Image
              src={`data:image/jpeg;base64,${house.media.photos[2]}`}
              alt={`${house.name} view 3`}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div 
          className="relative h-[290px] rounded-lg overflow-hidden cursor-pointer"
          onClick={() => {
            setGalleryStartIndex(3)
            setIsGalleryOpen(true)
          }}
        >
          {house.media.photos[3] && (
            <>
              <Image
                src={`data:image/jpeg;base64,${house.media.photos[3]}`}
                alt={`${house.name} view 4`}
                fill
                className="object-cover"
              />
              {house.media.photos.length > 4 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-2xl font-bold">
                    +{house.media.photos.length - 4}
                  </span>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <ImageGallery
        images={house.media.photos}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        startIndex={galleryStartIndex}
      />
    </div>
  )
}