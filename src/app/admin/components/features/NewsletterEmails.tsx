"use client"

import { useEffect, useState } from 'react'
import { Copy, ClipboardList } from 'lucide-react'
import { NewsletterSubscriber } from '../../../DataModels/NewsletterSubscriber'
import { getAllNewsletterSubscribers } from '../../../services/newsletterService'
import { logErrorToFirebase } from '../../../services/errorService'

export default function NewsletterEmails() {
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadSubscribers = async () => {
      try {
        const data = await getAllNewsletterSubscribers()
        setSubscribers(data)
      } catch (err) {
        console.error('Failed to load subscribers:', err)
        await logErrorToFirebase(err, 'NewsletterEmails/loadSubscribers');
      } finally {
        setLoading(false)
      }
    }
    
    loadSubscribers()
  }, [])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
    } catch (err) {
      await logErrorToFirebase(err, 'NewsletterEmails/copyToClipboard');
      console.error('Failed to copy text:', err)
    }
  }

  const copyAllEmails = () => {
    const allEmails = subscribers.map(s => s.email).join(' ')
    copyToClipboard(allEmails)
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-600">Loading subscribers...</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          <ClipboardList className="w-6 h-6" />
          Newsletter Subscribers
        </h2>
        <button
          onClick={copyAllEmails}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center gap-2"
        >
          <Copy className="w-4 h-4" />
          Copy All Emails
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Email</th>
              <th className="px-6 py-3 text-right text-sm font-medium text-gray-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {subscribers.map((subscriber) => (
              <tr key={subscriber.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {subscriber.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <button
                    onClick={() => copyToClipboard(subscriber.email)}
                    className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {subscribers.length === 0 && (
        <p className="text-gray-500 mt-4">No subscribers found</p>
      )}
    </div>
  )
} 