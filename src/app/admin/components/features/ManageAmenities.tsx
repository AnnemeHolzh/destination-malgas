"use client"

import { useState, useEffect } from 'react'
import { Amenity } from '../../../DataModels/Amenity'
import { getAllAmenities, updateAmenity } from '../../../services/amenityService'
import { Edit, X, Upload } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import { processSvg } from '../../../utils/imageProcessing'
import { logErrorToFirebase } from '../../../services/errorService'

interface EditAmenityModalProps {
  amenity: Amenity
  isOpen: boolean
  onClose: () => void
  onUpdate: (updatedAmenity: Amenity) => Promise<void>
}

function EditAmenityModal({ amenity, isOpen, onClose, onUpdate }: EditAmenityModalProps) {
  const [formData, setFormData] = useState<Amenity>(amenity)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const onDrop = async (acceptedFiles: File[]) => {
    try {
      const file = acceptedFiles[0]
      if (file.type !== 'image/svg+xml') {
        throw new Error('Only SVG files are allowed')
      }
      const svg = await processSvg(file)
      setFormData(prev => ({ ...prev, icon: svg }))
    } catch (err) {
      await logErrorToFirebase(err, 'EditAmenityModal/onDrop', {
        error: err instanceof Error ? err.message : 'Failed to process SVG'
      });
      setError(err instanceof Error ? err.message : 'Failed to process SVG')
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/svg+xml': ['.svg'] },
    maxFiles: 1
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (!formData.name.trim()) throw new Error('Name is required')
      if (!formData.icon) throw new Error('Icon is required')
      
      await onUpdate(formData)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update amenity')
      await logErrorToFirebase(err, 'EditAmenityModal/handleSubmit', {
        error: err instanceof Error ? err.message : 'Failed to update amenity'
      });
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Edit Amenity</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border rounded-md"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
            <div
              {...getRootProps()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-indigo-500 transition-colors"
            >
              <input {...getInputProps()} />
              {formData.icon ? (
                <div
                  className="mx-auto w-16 h-16"
                  dangerouslySetInnerHTML={{ 
                    __html: atob(formData.icon.split(',')[1])
                      .replace('<svg', '<svg width="100%" height="100%" preserveAspectRatio="xMidYMid meet"')
                  }}
                />
              ) : (
                <div className="space-y-2">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <p className="text-sm text-gray-600">Drop SVG or click to upload</p>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-2">
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
        </form>
      </div>
    </div>
  )
}

export default function ManageAmenities() {
  const [amenities, setAmenities] = useState<Amenity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedAmenity, setSelectedAmenity] = useState<Amenity | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const fetchAmenities = async () => {
      try {
        const amenitiesData = await getAllAmenities()
        setAmenities(amenitiesData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch amenities')
      } finally {
        setLoading(false)
      }
    }
    fetchAmenities()
  }, [])

  const handleUpdate = async (updatedAmenity: Amenity) => {
    try {
      await updateAmenity(updatedAmenity.amenityId, updatedAmenity)
      setAmenities(prev => prev.map(a => 
        a.amenityId === updatedAmenity.amenityId ? updatedAmenity : a
      ))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update amenity')
    }
  }

  if (loading) return <div className="p-6">Loading amenities...</div>
  if (error) return <div className="p-6 text-red-500">{error}</div>

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Amenities</h2>
      
      <div className="space-y-4">
        {amenities.map(amenity => (
          <div key={amenity.amenityId} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 p-2 bg-gray-100 rounded-lg">
                <div
                  className="w-full h-full"
                  dangerouslySetInnerHTML={{ 
                    __html: atob(amenity.icon.split(',')[1])
                      .replace('<svg', '<svg width="100%" height="100%" preserveAspectRatio="xMidYMid meet"')
                  }}
                />
              </div>
              <span className="font-medium">{amenity.name}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setSelectedAmenity(amenity)
                  setIsModalOpen(true)
                }}
                className="p-2 hover:bg-gray-100 rounded-md text-indigo-600"
              >
                <Edit className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedAmenity && (
        <EditAmenityModal
          amenity={selectedAmenity}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedAmenity(null)
          }}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  )
} 