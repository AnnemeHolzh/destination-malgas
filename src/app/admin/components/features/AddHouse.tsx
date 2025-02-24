import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { House } from '../../../DataModels/House';
import { createHouse, generateHouseId } from '../../../services/houseService';
import { UploadProgress, processImage } from '../../../services/imageService';
import { getAllAmenities } from '../../../services/amenityService';
import { X, Upload } from 'lucide-react';
import atob from 'atob';
import { Amenity } from '../../../DataModels/Amenity';
import Image from 'next/image';

interface ImageUpload extends UploadProgress {
  file: File;
  preview: string;
}

export default function AddHouse() {
  const [house, setHouse] = useState<Partial<House>>({
    name: '',
    capacity: { adults: 0, children: 0 },
    beds: 0,
    baths: 0,
    description: '',
    media: { photos: [], videos: [] },
    amenities: {},
    active: true,
  });
  
  const [images, setImages] = useState<ImageUpload[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [amenities, setAmenities] = useState<Record<string, string>>({});
  const [amenitiesList, setAmenitiesList] = useState<Amenity[]>([]);

  useEffect(() => {
    loadAmenities();
  }, []);

  const loadAmenities = async () => {
    try {
      const amenitiesList = await getAllAmenities();
      const amenitiesMap = amenitiesList.reduce((acc, amenity) => ({
        ...acc,
        [amenity.amenityId]: amenity.name
      }), {});
      setAmenities(amenitiesMap);
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
        media: {
          photos: base64Images, // Store Base64 strings directly
          videos: []
        },
        createdAt: Date.now(),
        updatedAt: Date.now()
      };

      await createHouse(newHouse);
      
      // Reset form
      setHouse({
        name: '',
        capacity: { adults: 0, children: 0 },
        beds: 0,
        baths: 0,
        description: '',
        media: { photos: [], videos: [] },
        amenities: {},
        active: true,
      });
      setImages([]);

    } catch {
      setError('Failed to create house. Please try again.');
    } finally {
      setLoading(false);
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
              <label className="block text-sm font-medium text-gray-700">Adult Capacity</label>
              <input
                type="number"
                min="0"
                required
                value={house.capacity?.adults || 0}
                onChange={e => setHouse(prev => ({
                  ...prev,
                  capacity: { 
                    ...prev.capacity,
                    adults: parseInt(e.target.value) || 0,
                    children: prev.capacity?.children ?? 0
                  }
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Child Capacity</label>
              <input
                type="number"
                min="0"
                required
                value={house.capacity?.children || 0}
                onChange={e => setHouse(prev => ({
                  ...prev,
                  capacity: { 
                    ...prev.capacity,
                    children: parseInt(e.target.value) || 0,
                    adults: prev.capacity?.adults ?? 0
                  }
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

        {/* Amenities */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Amenities</label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(amenities).map(([id, name]) => (
              <label key={id} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={!!house.amenities?.[id]}
                  onChange={e => setHouse(prev => ({
                    ...prev,
                    amenities: {
                      ...prev.amenities,
                      [id]: e.target.checked
                    }
                  }))}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <div className="flex items-center space-x-2">
                  {amenitiesList.find(a => a.amenityId === id)?.icon && (
                    <div
                      className="w-5 h-5"
                      dangerouslySetInnerHTML={{ 
                        __html: atob(amenitiesList.find(a => a.amenityId === id)!.icon.split(',')[1])
                          .replace('<svg', '<svg width="100%" height="100%" preserveAspectRatio="xMidYMid meet"')
                      }}
                    />
                  )}
                  <span className="text-sm text-gray-700">{name}</span>
                </div>
              </label>
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