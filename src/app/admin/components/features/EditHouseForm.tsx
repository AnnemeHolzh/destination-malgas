"use client"

import { useState, useEffect } from 'react'
import { House } from '../../../DataModels/House'
import { Amenity } from '../../../DataModels/Amenity'
import { getAllAmenities } from '../../../services/amenityService'
import { X, Trash2 } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { logErrorToFirebase } from '../../../services/errorService'
import { updateHouse } from '../../../../utils/firebaseRest'

interface EditHouseFormProps {
  house: House
  isOpen: boolean
  onClose: () => void
  onUpdate: (house: House) => Promise<void>
}

interface ImageUpload {
  file: File
  preview: string
}

export default function EditHouseForm({ house, isOpen, onClose, onUpdate }: EditHouseFormProps) {
  const [formData, setFormData] = useState<House>({
    ...house,
    shortDescription: house.shortDescription || '',
    amenities: house.amenities || {},
    pricePerNight: house.pricePerNight || 0,
  })
  const [amenities, setAmenities] = useState<Amenity[]>([])
  const [newImages, setNewImages] = useState<ImageUpload[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showImageManager, setShowImageManager] = useState(false)

  useEffect(() => {
    const loadAmenities = async () => {
      try {
        const amenitiesList = await getAllAmenities()
        setAmenities(amenitiesList)
      } catch (error) {
        await logErrorToFirebase(error, 'EditHouseForm/loadAmenities');
        setError('Failed to load amenities')
      }
    }
    loadAmenities()
  }, [])

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { getRootProps, getInputProps } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: (acceptedFiles) => {
      const newUploads = acceptedFiles.map(file => ({
        file,
        preview: URL.createObjectURL(file)
      }))
      setNewImages(prev => [...prev, ...newUploads])
    }
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'capacity' ? parseInt(value) || 0 : value
    }))
  }

  const handleAmenityChange = (amenityId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenityId]: {
          available: checked,
          amount: checked ? (prev.amenities[amenityId]?.amount || 1) : 0
        }
      }
    }))
  }

  const handleAmountChange = (amenityId: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      amenities: {
        ...prev.amenities,
        [amenityId]: {
          available: prev.amenities[amenityId]?.available ?? false,
          amount: value
        }
      }
    }))
  }

  const handleDeleteExistingPhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      media: {
        ...prev.media,
        photos: prev.media.photos.filter((_, i) => i !== index)
      }
    }))
  }

  const handleDeleteNewPhoto = (index: number) => {
    URL.revokeObjectURL(newImages[index].preview)
    setNewImages(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Convert new images to base64
      const newPhotosBase64 = await Promise.all(
        newImages.map(async (image) => {
          const buffer = await image.file.arrayBuffer()
          const base64 = Buffer.from(buffer).toString('base64')
          return base64
        })
      )

      // Combine existing and new photos
      const updatedHouse: House = {
        ...formData,
        media: {
          ...formData.media,
          photos: [...formData.media.photos, ...newPhotosBase64]
        },
        updatedAt: Date.now()
      }

      // Use REST API for update
      await updateHouse(updatedHouse.houseId, updatedHouse)
      
      // Update local state through parent component
      await onUpdate(updatedHouse)
      
      // Clear new images after successful update
      setNewImages([])
    } catch (error) {
      console.error('Update error:', error)
      setError('Failed to update house. Please try again.')
      await logErrorToFirebase(error, 'EditHouseForm/handleSubmit')
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-start justify-center z-50 overflow-y-auto py-8">
      <div className="bg-white rounded-lg p-6 max-w-7xl w-full mx-4 flex gap-8 min-h-[80vh]">
        {/* Left Column - Always Visible */}
        <div className="flex-1 min-w-[400px] sticky top-0 h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">Edit House</h3>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-6 h-6" />
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  rows={4}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Total Capacity
                </label>
                <input
                  type="number"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Short Description
                </label>
                <textarea
                  name="shortDescription"
                  value={formData.shortDescription}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  rows={2}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price Per Night ($)
                </label>
                <input
                  type="number"
                  name="pricePerNight"
                  min="0"
                  value={formData.pricePerNight}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amenities
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {amenities.map((amenity) => (
                  <div key={amenity.amenityId} className="space-y-2">
                    <label className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        {amenity.icon && (
                          <div
                            className="w-5 h-5"
                            dangerouslySetInnerHTML={{
                              __html: atob(amenity.icon.split(',')[1])
                                .replace('<svg', '<svg width="100%" height="100%" preserveAspectRatio="xMidYMid meet"')
                            }}
                          />
                        )}
                        <input
                          type="checkbox"
                          checked={!!formData.amenities[amenity.amenityId]?.available}
                          onChange={(e) => handleAmenityChange(amenity.amenityId, e.target.checked)}
                        />
                        <span>{amenity.name}</span>
                      </div>
                    </label>
                    {formData.amenities[amenity.amenityId]?.available && (
                      <input
                        type="number"
                        min="0"
                        value={formData.amenities[amenity.amenityId].amount}
                        onChange={(e) => handleAmountChange(amenity.amenityId, parseInt(e.target.value))}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Add this submit button section INSIDE the form */}
            <div className="flex justify-end gap-4 mt-8">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>

            {/* Floating toggle button remains here */}
            <button
              type="button"
              onClick={() => setShowImageManager(!showImageManager)}
              className="fixed bottom-4 right-4 z-50 px-4 py-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 md:hidden"
            >
              {showImageManager ? 'Hide Images' : 'Show Images'}
            </button>
          </form>
        </div>

        {/* Right Column - Image Manager */}
        <div className={`flex-1 max-w-[500px] bg-gray-50 rounded-lg p-6 transition-all 
          ${showImageManager ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'} 
          hidden md:block md:translate-x-0 md:opacity-100`}>
          <ImageManagerModal
            existingPhotos={formData.media.photos}
            newImages={newImages}
            onDeleteExisting={handleDeleteExistingPhoto}
            onDeleteNew={handleDeleteNewPhoto}
            onClose={() => setShowImageManager(false)}
          />
        </div>
      </div>
    </div>
  )
}

const ImageManagerModal = ({
  existingPhotos,
  newImages,
  onDeleteExisting,
  onDeleteNew,
  onClose
}: {
  existingPhotos: string[]
  newImages: ImageUpload[]
  onDeleteExisting: (index: number) => void
  onDeleteNew: (index: number) => void
  onClose: () => void
}) => (
  <div className="h-full">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-bold">Image Manager</h3>
      <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full md:hidden">
        <X className="w-6 h-6" />
      </button>
    </div>
    
    <div className="grid grid-cols-2 gap-4 overflow-y-auto h-[calc(100%-60px)]">
      {existingPhotos.map((photo, index) => (
        <div key={`existing-${index}`} className="relative group">
          <div className="aspect-square relative rounded-lg overflow-hidden">
            <Image
              src={`data:image/jpeg;base64,${photo}`}
              alt={`House photo ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
          <button
            type="button"
            onClick={() => onDeleteExisting(index)}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      
      {newImages.map((image, index) => (
        <div key={`new-${index}`} className="relative group">
          <div className="aspect-square relative rounded-lg overflow-hidden">
            <Image
              src={image.preview}
              alt={`New photo ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
          <button
            type="button"
            onClick={() => onDeleteNew(index)}
            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  </div>
) 