"use client"

import { useState, useEffect } from 'react'
import { User } from '../../../DataModels/User'
import { updateUser } from '../../../services/userService'
import { Loader2, Lock, CheckCircle } from 'lucide-react'
import bcrypt from 'bcryptjs'
import { logErrorToFirebase } from '../../../services/errorService'

export default function MyProfile() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('currentUser') || 'null')
    if (user && user.role === 'staff') {
      setCurrentUser(user)
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      })
    }
  }, [])

  const validateForm = async () => {
    if (!formData.firstName || !formData.lastName) {
      setError('Please enter both first and last name')
      return false
    }
    
    if (formData.newPassword && formData.newPassword.length < 8) {
      setError('New password must be at least 8 characters')
      return false
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError('New passwords do not match')
      return false
    }

    if ((formData.email !== currentUser?.email || formData.newPassword) && !formData.currentPassword) {
      setError('Current password is required for changes')
      return false
    }

    if (formData.currentPassword && currentUser?.password) {
      const isValid = await bcrypt.compare(formData.currentPassword, currentUser.password)
      if (!isValid) {
        setError('Current password is incorrect')
        return false
      }
    }

    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    if (!(await validateForm())) return

    setLoading(true)

    try {
      const updates: Partial<User> = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
      }

      if (formData.newPassword) {
        const salt = await bcrypt.genSalt(10)
        updates.password = await bcrypt.hash(formData.newPassword, salt)
      }

      if (currentUser?.uid) {
        await updateUser(currentUser.uid, updates)
        
        // Update local storage with new data
        const updatedUser = { ...currentUser, ...updates }
        localStorage.setItem('currentUser', JSON.stringify(updatedUser))
        
        setSuccess('Profile updated successfully!')
        setTimeout(() => setSuccess(''), 3000)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile')
      await logErrorToFirebase(err, 'MyProfile/handleSubmit');
    } finally {
      setLoading(false)
    }
  }

  if (!currentUser) return null

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Lock className="w-8 h-8 text-indigo-600" />
        <h2 className="text-2xl font-bold">My Profile</h2>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5" />
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              First Name
            </label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Last Name
            </label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div className="pt-6 border-t border-gray-200 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Change Password</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Current Password
            </label>
            <input
              type="password"
              value={formData.currentPassword}
              onChange={(e) => setFormData(prev => ({ ...prev, currentPassword: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <input
                type="password"
                value={formData.newPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, newPassword: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 flex items-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Updating...
              </>
            ) : 'Update Profile'}
          </button>
        </div>
      </form>
    </div>
  )
} 