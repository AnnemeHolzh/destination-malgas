"use client"

import { useState } from 'react'
import { House } from '@/app/DataModels/House'
import { Input } from '@/app/components/ui/input'

interface BookingFormProps {
  house: House
}

export default function BookingForm({ house }: BookingFormProps) {
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
    // Handle booking submission
    console.log(formData)
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
            className="w-full px-3 py-2 border rounded-md"
            rows={4}
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

      <div className="mt-8 text-center">
        <h4 className="font-bold mb-2">HAVE ANY QUESTIONS?</h4>
        <p className="text-xl">000 000 0000</p>
      </div>
    </div>
  )
}