import { Home, Plus, User, Mail, MessageCircle, AlertCircle } from 'lucide-react'

interface AdminSidebarProps {
  activeFeature: string
  setActiveFeature: (feature: string) => void
}

const AdminSidebar = ({ activeFeature, setActiveFeature }: AdminSidebarProps) => {
  const menuItems = [
    { id: 'addHouse', label: 'Add House', icon: Home },
    { id: 'addAmenity', label: 'Add Amenity', icon: Plus },
    { id: 'addStaffUser', label: 'Add Staff User', icon: User },
    { id: 'manageHouses', label: 'Manage Houses', icon: Home },
    { id: 'sendNewsletter', label: 'Send Newsletter', icon: Mail },
    { id: 'myProfile', label: 'My Profile', icon: User },
    { id: 'manageAmenities', label: 'Manage Amenities', icon: Home },
    { id: 'newsletterEmails', label: 'Newsletter Emails', icon: Mail },
    { id: 'messages', label: 'Messages', icon: MessageCircle },
    { id: 'errorLogs', label: 'Error Logs', icon: AlertCircle },
  ]

  return (
    <aside className="w-64 bg-white shadow-lg">
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Admin Dashboard</h2>
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => setActiveFeature(item.id)}
                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  activeFeature === item.id
                    ? 'bg-black text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>
    </aside>
  )
}

export default AdminSidebar 