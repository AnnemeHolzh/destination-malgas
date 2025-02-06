"use client"

import { useEffect, useState } from 'react'
import { getAllHouses, updateHouse, deleteHouse } from '../../../services/houseService'
import { House } from '../../../DataModels/House'
import { Check, X, Edit, Trash2, MoreVertical } from 'lucide-react'
import Image from 'next/image'
import EditHouseForm from './EditHouseForm'

function ConfirmationModal({ isOpen, onClose, onConfirm }: { 
  isOpen: boolean, 
  onClose: () => void, 
  onConfirm: () => void 
}) {
  const [confirmationText, setConfirmationText] = useState('')

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-xl font-bold mb-4">Confirm Deletion</h3>
        <p className="text-gray-600 mb-4">
          Type <span className="font-bold">DELETE</span> to confirm deletion.
        </p>
        <input
          type="text"
          value={confirmationText}
          onChange={(e) => setConfirmationText(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-4"
          placeholder="Type DELETE here"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={confirmationText !== 'DELETE'}
            className="px-4 py-2 bg-red-600 text-white rounded-md disabled:bg-red-300"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default function ManageHouses() {
  const [houses, setHouses] = useState<House[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedHouse, setSelectedHouse] = useState<House | null>(null)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [actionMenuHouse, setActionMenuHouse] = useState<string | null>(null)

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const housesData = await getAllHouses()
        setHouses(housesData)
      } catch (err) {
        setError('Failed to fetch houses')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchHouses()
  }, [])

  const handleActiveToggle = async (houseId: string, isActive: boolean) => {
    try {
      await updateHouse(houseId, { active: !isActive })
      setHouses(prev => prev.map(house => 
        house.houseId === houseId ? { ...house, active: !isActive } : house
      ))
    } catch (err) {
      setError('Failed to update house status')
    }
  }

  const handleDelete = async () => {
    if (!selectedHouse) return
    
    try {
      await deleteHouse(selectedHouse.houseId)
      setHouses(prev => prev.filter(house => house.houseId !== selectedHouse.houseId))
      setIsDeleteModalOpen(false)
      setSelectedHouse(null)
    } catch (err) {
      setError('Failed to delete house')
    }
  }

  const handleUpdate = async (updatedHouse: House) => {
    try {
      await updateHouse(updatedHouse.houseId, updatedHouse)
      setHouses(prev => prev.map(house => 
        house.houseId === updatedHouse.houseId ? updatedHouse : house
      ))
      setIsEditModalOpen(false)
      setSelectedHouse(null)
    } catch (err) {
      setError('Failed to update house')
    }
  }

  if (loading) {
    return <div className="p-6">Loading houses...</div>
  }

  if (error) {
    return <div className="p-6 text-red-500">{error}</div>
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Manage Houses</h2>
      
      <div className="space-y-4">
        {houses.map((house) => (
          <div key={house.houseId} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 relative bg-gray-100 rounded-md flex items-center justify-center">
                {house.media?.photos?.[0] ? (
                  <Image
                    src={`data:image/jpeg;base64,${house.media.photos[0]}`}
                    alt={house.name}
                    fill
                    className="object-cover rounded-md"
                  />
                ) : (
                  <span className="text-gray-400 text-sm">No Image</span>
                )}
              </div>
              <div>
                <h3 className="font-semibold">{house.name}</h3>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={house.active}
                  onChange={() => handleActiveToggle(house.houseId, house.active)}
                  className="sr-only"
                />
                <div className={`w-6 h-6 rounded border flex items-center justify-center transition-colors ${
                  house.active ? 'bg-green-500 border-green-500' : 'bg-white border-gray-300'
                }`}>
                  {house.active && <Check className="w-4 h-4 text-white" />}
                </div>
                <span className="text-sm text-gray-600">
                  {house.active ? 'Active' : 'Inactive'}
                </span>
              </label>

              <div className="relative">
                <button
                  onClick={() => setActionMenuHouse(house.houseId)}
                  className="p-2 hover:bg-gray-100 rounded-md"
                >
                  <MoreVertical className="w-5 h-5 text-gray-600" />
                </button>

                {actionMenuHouse === house.houseId && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setSelectedHouse(house)
                          setIsEditModalOpen(true)
                          setActionMenuHouse(null)
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setSelectedHouse(house)
                          setIsDeleteModalOpen(true)
                          setActionMenuHouse(null)
                        }}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedHouse(null)
        }}
        onConfirm={handleDelete}
      />

      {selectedHouse && (
        <EditHouseForm
          house={selectedHouse}
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setSelectedHouse(null)
          }}
          onUpdate={handleUpdate}
        />
      )}
    </div>
  )
} 