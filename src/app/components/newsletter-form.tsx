"use client"

import { useState } from "react"
import { Send } from "lucide-react"

export default function NewsletterForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setStatus("success")
    setEmail("")
  }

  return (
    <div className="container mx-auto px-4 mb-12">
      <div className="bg-black py-6 px-8 rounded-2xl max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          {/* Custom mail icon with plus */}
          <div className="relative">
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8 text-white" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7L12 14L2 7" />
            </svg>
            <span className="absolute -right-1 -top-1 w-3 h-3 bg-white flex items-center justify-center rounded-full">
              <span className="text-black text-xs font-bold">+</span>
            </span>
          </div>
          <div>
            <h3 className="text-white font-custom4">Subscribe now to get latest updates</h3>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="relative">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-transparent text-gray-300 placeholder-gray-500 border-b border-gray-700 pb-2 focus:outline-none focus:border-gray-500 transition-colors"
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="absolute right-0 top-0 text-gray-400 hover:text-white transition-colors disabled:opacity-50 mx-4"
            aria-label="Subscribe"
          >
            <Send className="w-5 h-5" />
          </button>
        </form>

        {status === "success" && <p className="text-green-400 mt-2">Thanks for subscribing!</p>}
      </div>
    </div>
  )
}

