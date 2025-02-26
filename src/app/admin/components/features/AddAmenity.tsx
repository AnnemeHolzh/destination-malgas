"use client"

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { generateAmenityId, createAmenity } from '../../../services/amenityService'
import { processSvg } from '../../../utils/imageProcessing'
import { Upload } from 'lucide-react'
import { ErrorBoundary } from 'react-error-boundary'
import { logErrorToFirebase } from '../../../services/errorService'

function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

export default function AddAmenity() {
  const [name, setName] = useState('')
  const [icon, setIcon] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const onDrop = async (acceptedFiles: File[]) => {
    try {
      const file = acceptedFiles[0]
      
      // Validate file type
      if (file.type !== 'image/svg+xml') {
        throw new Error('Only SVG files are allowed')
      }

      const svg = await processSvg(file)
      setIcon(svg)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process SVG')
      await logErrorToFirebase(err, 'AddAmenity/onDrop', {
        error: err instanceof Error ? err.message : 'Failed to process SVG'
      });
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      'image/svg+xml': ['.svg']
    },
    maxFiles: 1
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      if (!icon) {
        throw new Error('Please upload an icon')
      }

      const newAmenity = {
        amenityId: generateAmenityId(),
        name,
        icon,
        createdAt: Date.now()
      }

      await createAmenity(newAmenity)
      
      // Reset form
      setName('')
      setIcon(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create amenity')
      await logErrorToFirebase(err, 'AddAmenity/handleSubmit', {
        error: err instanceof Error ? err.message : 'Failed to create amenity'
      });
    } finally {
      setLoading(false)
    }
  }

  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Add Amenity</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Amenity Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={e => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

        {/* Icon Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
          <div
            {...getRootProps()}
            className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-500 transition-colors"
          >
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <input {...getInputProps()} />
                <p className="pl-1">Drag and drop SVG here, or click to select file</p>
              </div>
            </div>
          </div>

            {/* Icon Preview */}
            {icon && (
              <div className="mt-4 flex justify-center">
                <div
                  className="w-16 h-16 p-2 border rounded-lg"
                  dangerouslySetInnerHTML={{ 
                    __html: atob(icon.split(',')[1])
                      .replace('<svg', '<svg width="100%" height="100%" preserveAspectRatio="xMidYMid meet"')
                  }}
                />
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className={`px-4 py-2 rounded-md text-white ${
                loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
              } transition-colors duration-200`}
            >
              {loading ? 'Creating...' : 'Create Amenity'}
            </button>
          </div>
        </form>
      </div>
    </ErrorBoundary>
  )
} 