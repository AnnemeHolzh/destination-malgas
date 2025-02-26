"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { House } from '@/app/DataModels/House'
import { Input } from '@/app/components/ui/input'

interface BookingFormProps {
  house: House
}

export default function BookingForm({ house }: BookingFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    arrivalDate: '',
    departureDate: '',
    adults: 1,
    kids: 0,
    comments: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Create query parameters
    const params = new URLSearchParams({
      firstName: formData.firstName,
      lastName: formData.lastName,
      arrivalDate: formData.arrivalDate,
      departureDate: formData.departureDate,
      adults: formData.adults.toString(),
      kids: formData.kids.toString(),
      comments: formData.comments,
      houseName: house.name
    })

    // Redirect to contact page with booking details
    router.push(`/contact-us?${params.toString()}`)
  }

  return (
    <div className="text-black">
      <h3 className="text-2xl font-bold mb-6">BOOK A NIGHT</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="First Name"
          value={formData.firstName}
          onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
          required
        />
        <Input
          type="text"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
          required
        />
        <Input
          type="date"
          placeholder="Arrival Date"
          value={formData.arrivalDate}
          onChange={(e) => setFormData(prev => ({ ...prev, arrivalDate: e.target.value }))}
          required
        />
        <Input
          type="date"
          placeholder="Departure Date"
          value={formData.departureDate}
          onChange={(e) => setFormData(prev => ({ ...prev, departureDate: e.target.value }))}
          required
        />
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm mb-1">Adults</label>
            <Input
              type="number"
              min="1"
              value={formData.adults}
              onChange={(e) => setFormData(prev => ({ ...prev, adults: parseInt(e.target.value) }))}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Kids</label>
            <Input
              type="number"
              min="0"
              value={formData.kids}
              onChange={(e) => setFormData(prev => ({ ...prev, kids: parseInt(e.target.value) }))}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm mb-1">Comments</label>
          <textarea
            className="w-full px-3 py-2 border rounded-md h-18 resize-none"
            value={formData.comments}
            onChange={(e) => setFormData(prev => ({ ...prev, comments: e.target.value }))}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition-colors"
        >
          Book Now
        </button>
      </form>
    </div>
  )
}