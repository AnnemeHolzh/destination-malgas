"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { User } from '../DataModels/User'
import AdminSidebar from './components/AdminSidebar'
import AddHouse from './components/features/AddHouse'
import AddAmenity from './components/features/AddAmenity'
import AddStaffUser from './components/features/AddStaffUser'
import ManageHouses from './components/features/ManageHouses'
import SendNewsletter from './components/features/SendNewsletter'
import MyProfile from './components/features/MyProfile'
import NewsletterEmails from './components/features/NewsletterEmails'
import ManageAmenities from './components/features/ManageAmenities'
import Messages from './components/features/Messages'
import { ArrowLeft } from 'lucide-react'

function AdminDashboard() {
  const [activeFeature, setActiveFeature] = useState<string>('addHouse')
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
  
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (mounted) {
      const currentUser: User | null = JSON.parse(localStorage.getItem('currentUser') || 'null')
      if (!currentUser || currentUser.role !== 'staff') {
        router.push('/')
      }
    }
  }, [mounted, router])

  if (!mounted) return null

  const features = {
    addHouse: <AddHouse />,
    addAmenity: <AddAmenity />,
    addStaffUser: <AddStaffUser />,
    manageHouses: <ManageHouses />,
    sendNewsletter: <SendNewsletter />,
    myProfile: <MyProfile />,
    manageAmenities: <ManageAmenities />,
    newsletterEmails: <NewsletterEmails />,
    messages: <Messages />,
  }


  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar 
        activeFeature={activeFeature} 
        setActiveFeature={setActiveFeature}
      />
      <main className="flex-1 overflow-y-auto">
        <div className="p-4">
          <button
            onClick={() => router.push('/')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </button>
        </div>
        <div className="max-w-4xl mx-auto px-8">
          {features[activeFeature as keyof typeof features]}
        </div>
      </main>
    </div>
  )
}

export default AdminDashboard 