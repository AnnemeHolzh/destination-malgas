"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Search, User, Menu, X } from "lucide-react"
import Image from "next/image"
import logoBlack from "../../../public/Images/Layout/logoBlackTransparent.svg" // Update with your actual paths
import logoWhite from "../../../public/Images/Layout/logoWhiteTransparent.svg" // Update with your actual paths

export function Navigation() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [useDarkLogo, setUseDarkLogo] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    const checkBackground = () => {
      // Get the pixel at the logo's position
      const element = document.elementFromPoint(100, 50)
      if (!element) return

      // Get the background color
      const bgcolor = window.getComputedStyle(element).backgroundColor
      
      // Convert RGB to brightness
      const rgb = bgcolor.match(/\d+/g)
      if (!rgb) return
      
      const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000
      
      // Default to dark logo unless background is very dark
      const shouldUseDarkLogo = brightness > 60

      if (shouldUseDarkLogo !== useDarkLogo) {
        setIsTransitioning(true)
        setTimeout(() => {
          setUseDarkLogo(shouldUseDarkLogo)
          setTimeout(() => setIsTransitioning(false), 150)
        }, 150)
      }
    }

    const handleScroll = () => {
      checkBackground()
      const currentScrollY = window.scrollY
      
      if (isMobileMenuOpen) return // Don't hide nav when mobile menu is open
      
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true)
      } 
      else if (currentScrollY > lastScrollY && !isHovering) {
        setIsVisible(false)
      }

      setLastScrollY(currentScrollY)
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (isMobileMenuOpen) return // Don't handle mouse movement when mobile menu is open

      if (e.clientY < 60) {
        setIsHovering(true)
        setIsVisible(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove)
    checkBackground() // Initial check

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [useDarkLogo])

  const menuItems = [
    { name: "HOME", href: "/" },
    { name: "ACCOMODATION", href: "/accomodation" },
    { name: "BOATING", href: "/boating" },
    { name: "MARKETING", href: "/marketing" },
    { name: "DESTINATION", href: "/destination" },
    { name: "CONTACT US", href: "/contact-us" },
  ]

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-sm transition-transform duration-300 ease-in-out ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex-shrink-0 relative w-16 h-16">
              <div className="relative w-16 h-16">
                <Image
                  src={logoWhite}
                  alt="Logo White"
                  fill
                  className={`absolute top-0 left-0 transition-opacity duration-300 ${
                    useDarkLogo ? 'opacity-0' : 'opacity-100'
                  } ${isTransitioning ? 'transition-opacity' : ''}`}
                />
                <Image
                  src={logoBlack}
                  alt="Logo Black"
                  fill
                  className={`absolute top-0 left-0 transition-opacity duration-300 ${
                    useDarkLogo ? 'opacity-100' : 'opacity-0'
                  } ${isTransitioning ? 'transition-opacity' : ''}`}
                />
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-20">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-custom3 text-white hover:text-gray-900 transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-white hover:text-gray-300 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>

            {/* User Icon */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="p-2 hover:bg-gray-100 rounded-full">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Sidebar */}
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-black z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col pt-20 px-4">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-white py-3 text-lg font-custom3 hover:text-gray-300 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          <div className="mt-4 pt-4 border-t border-gray-700">
            <button className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors">
              <User className="w-5 h-5" />
              <span>Account</span>
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

