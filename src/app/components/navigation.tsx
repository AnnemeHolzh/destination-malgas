"use client"

import Link from "next/link"
import { Search, User } from "lucide-react"
import Image from "next/image"

export function Navigation() {
  const menuItems = ["HOME", "ACCOMODATION", "BOATING", "MARKETING", "DESTINATION", "CONTACT US"]

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex-shrink-0">
            <div className="w-16 h-16 bg-gray-200 rounded-full" />
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(" ", "-")}`}
                className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
         
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <User className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

