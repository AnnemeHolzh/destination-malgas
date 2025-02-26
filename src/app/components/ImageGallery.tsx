"use client"

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface ImageGalleryProps {
  images: string[]
  isOpen: boolean
  onClose: () => void
  startIndex?: number
}

export default function ImageGallery({ images, isOpen, onClose, startIndex = 0 }: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(startIndex)

  // Declare handlers first
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  // Then use them in useEffect
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') handleNext()
      if (e.key === 'ArrowLeft') handlePrevious()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleNext, handlePrevious, onClose])

  // Reset index when modal opens
  useEffect(() => {
    if (isOpen) setCurrentIndex(startIndex)
  }, [isOpen, startIndex])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
      >
        <X size={32} />
      </button>

      {/* Navigation buttons */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 text-white hover:text-gray-300 z-50"
      >
        <ChevronLeft size={48} />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 text-white hover:text-gray-300 z-50"
      >
        <ChevronRight size={48} />
      </button>

      {/* Image */}
      <div className="relative w-full h-full max-w-7xl max-h-[90vh] mx-4">
        <Image
          src={`data:image/jpeg;base64,${images[currentIndex]}`}
          alt={`Gallery image ${currentIndex + 1}`}
          fill
          className="object-contain"
          priority
        />
        
        {/* Image counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  )
}