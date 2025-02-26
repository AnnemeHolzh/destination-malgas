import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { House } from '../../../DataModels/House';
import { createHouse, generateHouseId } from '../../../services/houseService';
import { UploadProgress, processImage } from '../../../services/imageService';
import { getAllAmenities } from '../../../services/amenityService';
import { X, Upload } from 'lucide-react';
import { Amenity } from '../../../DataModels/Amenity';
import Image from 'next/image';
import { chunkedDatabaseWrite } from '../../../utils/chunkedUpload';
import UploadProgressBar from '../../../components/ui/UploadProgressBar';

interface ImageUpload extends UploadProgress {
  file: File;
  preview: string;
}

export default function AddHouse() {
  const [house, setHouse] = useState<Partial<House>>({
    name: '',
    capacity: 0,
    beds: 0,
    baths: 0,
    description: '',
    shortDescription: '',
    media: { photos: [], videos: [] },
    amenities: {},
    active: true,
  });
  
  const [images, setImages] = useState<ImageUpload[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [amenitiesList, setAmenitiesList] = useState<Amenity[]>([]);
  const [uploadProgress, setUploadProgress] = useState({
    progress: 0,
    currentChunk: 0,
    totalChunks: 0
  });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    loadAmenities();
  }, []);

  const loadAmenities = async () => {
    try {
      const amenitiesList = await getAllAmenities();
      setAmenitiesList(amenitiesList);
    } catch {
      setError('Failed to load amenities');
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      progress: 0
    }));
    setImages(prev => [...prev, ...newImages]);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    maxFiles: 10
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setIsUploading(true);

    try {
      // Convert all images to Base64
      const base64Promises = images.map(img => 
        processImage(img.file, (progress) => {
          setImages(prev => prev.map(i => 
            i.file === img.file ? { ...i, ...progress } : i
          ));
        })
      );

      const base64Images = await Promise.all(base64Promises);

      const newHouse: House = {
        ...house as House,
        houseId: generateHouseId(),
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      // Calculate total chunks
      const totalChunks = Math.ceil(base64Images.length / 5);
      setUploadProgress(prev => ({ ...prev, totalChunks }));

      // Use chunked upload with progress tracking
      await chunkedDatabaseWrite(
        `houses/${newHouse.houseId}`,
        newHouse,
        base64Images,
        (progress) => {
          setUploadProgress({
            progress: (progress.uploadedImages / progress.totalImages) * 100,
            currentChunk: progress.currentChunk,
            totalChunks
          });
        }
      );
      
      // Reset form
      setHouse({
        name: '',
        capacity: 0,
        beds: 0,
        baths: 0,
        description: '',
        shortDescription: '',
        media: { photos: [], videos: [] },
        amenities: {},
        active: true,
      });
      setImages([]);

    } catch (error) {
      console.error('Error creating house:', error);
      setError('Failed to create house. Please try again.');
    } finally {
      setLoading(false);
      setIsUploading(false);
    }
  };

  const removeImage = (index: number) => {
    setImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].preview);
      newImages.splice(index, 1);
      return newImages;
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Add House</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">House Name</label>
            <input
              type="text"
              required
              value={house.name}
              onChange={e => setHouse(prev => ({ ...prev, name: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Total Capacity</label>
              <input
                type="number"
                min="0"
                required
                value={house.capacity || 0}
                onChange={e => setHouse(prev => ({
                  ...prev,
                  capacity: parseInt(e.target.value) || 0
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Beds</label>
            <input
              type="number"
              min="0"
              required
              value={house.beds}
              onChange={e => setHouse(prev => ({ ...prev, beds: parseInt(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Bathrooms</label>
            <input
              type="number"
              min="0"
              required
              value={house.baths}
              onChange={e => setHouse(prev => ({ ...prev, baths: parseInt(e.target.value) }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            required
            value={house.description}
            onChange={e => setHouse(prev => ({ ...prev, description: e.target.value }))}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Short Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Short Description</label>
          <textarea
            required
            value={house.shortDescription}
            onChange={e => setHouse(prev => ({ ...prev, shortDescription: e.target.value }))}
            rows={2}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        {/* Amenities */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {amenitiesList.map((amenity) => (
              <div key={amenity.amenityId} className="space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={!!house.amenities?.[amenity.amenityId]?.available}
                    onChange={e => setHouse(prev => ({
                      ...prev,
                      amenities: {
                        ...prev.amenities,
                        [amenity.amenityId]: {
                          available: e.target.checked,
                          amount: e.target.checked ? 1 : 0
                        }
                      }
                    }))}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
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
                    <span className="text-sm text-gray-700">{amenity.name}</span>
                  </div>
                </label>
                <input
                  type="number"
                  min="0"
                  value={house.amenities?.[amenity.amenityId]?.amount}
                  onChange={e => setHouse(prev => ({
                    ...prev,
                    amenities: {
                      ...prev.amenities,
                      [amenity.amenityId]: {
                        available: prev.amenities?.[amenity.amenityId]?.available ?? false,
                        amount: parseInt(e.target.value) || 0
                      }
                    }
                  }))}
                  className="w-full rounded-md border-gray-300 shadow-sm"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Photos</label>
          <div
            {...getRootProps()}
            className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-indigo-500 transition-colors"
          >
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <input {...getInputProps()} />
                <p className="pl-1">Drag and drop images here, or click to select files</p>
              </div>
            </div>
          </div>

          {/* Image Previews */}
          <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map((img, index) => (
              <div key={index} className="relative">
                <Image
                  src={img.preview}
                  alt={`Preview ${index + 1}`}
                  width={96}
                  height={96}
                  className="h-24 w-24 object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
                {img.progress > 0 && img.progress < 100 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                    <div
                      className="h-full bg-indigo-600"
                      style={{ width: `${img.progress}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {isUploading && (
          <div className="mb-4">
            <UploadProgressBar 
              progress={uploadProgress.progress}
              currentChunk={uploadProgress.currentChunk}
              totalChunks={uploadProgress.totalChunks}
            />
          </div>
        )}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className={`
              px-4 py-2 rounded-md text-white
              ${loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'}
              transition-colors duration-200
            `}
          >
            {loading ? 'Creating...' : 'Create House'}
          </button>
        </div>
      </form>
    </div>
  );
} 