"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { User, Menu, X } from "lucide-react"
import Image from "next/image"
import logoBlack from "../../../public/Images/Layout/logoBlackTransparent.svg" // Update with your actual paths
import logoWhite from "../../../public/Images/Layout/logoWhiteTransparent.svg" // Update with your actual paths
import { useWindowUtils } from '../hooks/useWindowUtils'
import { LoginModal } from "./auth/LoginModal"
import { loginUser } from "../services/authService"
import { User as UserType } from "../DataModels/User"

export function Navigation() {
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [useDarkLogo, setUseDarkLogo] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const { isMounted, getScrollY, getComputedStyle, addEventListeners } = useWindowUtils()
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState<UserType | null>(null)

  useEffect(() => {
    if (!isMounted) return

    const checkTheme = () => {
      const mainElement = document.querySelector('main')
      const navTheme = mainElement?.getAttribute('data-nav-theme')
      
      setUseDarkLogo(navTheme === 'light')
    }

    const handleScroll = () => {
      checkTheme()
      const currentScrollY = getScrollY()
      
      if (isMobileMenuOpen) return
      
      if (currentScrollY < lastScrollY || currentScrollY < 50) {
        setIsVisible(true)
      } 
      else if (currentScrollY > lastScrollY && !isHovering) {
        setIsVisible(false)
      }

      setLastScrollY(currentScrollY)
    }

    checkTheme()
    handleScroll()

    return addEventListeners({
      'scroll': handleScroll
    })
  }, [isMounted, lastScrollY, isHovering, isMobileMenuOpen, useDarkLogo])

  useEffect(() => {
    // Load user from localStorage on mount
    const savedUser = localStorage.getItem('currentUser')
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser))
    }
  }, [])

  useEffect(() => {
    // Save user to localStorage when it changes
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser))
    } else {
      localStorage.removeItem('currentUser')
    }
  }, [currentUser])

  const menuItems = [
    { name: "HOME", href: "/" },
    { name: "ACCOMODATION", href: "/coming" },
    { name: "BOATING", href: "/boating" },
    { name: "MARKETING", href: "/marketing" },
    { name: "DESTINATION", href: "/coming" },
    { name: "CONTACT US", href: "/contact-us" },
    ...(currentUser?.role === 'staff' ? [{ name: "ADMIN DASHBOARD", href: "/admin" }] : []),
  ]

  const handleLogin = async (email: string, password: string) => {
    try {
      const user = await loginUser(email, password)
      setCurrentUser(user)
      setIsLoginModalOpen(false)
    } catch (error) {
      throw error
    }
  }

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-sm transition-transform duration-300 ease-in-out ${
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
                    useDarkLogo ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <Image
                  src={logoBlack}
                  alt="Logo Black"
                  fill
                  className={`absolute top-0 left-0 transition-opacity duration-300 ${
                    useDarkLogo ? 'opacity-0' : 'opacity-100'
                  }`}
                />
              </div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-20">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-custom3 transition-colors text-white hover:text-gray-300"
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 transition-colors text-white hover:text-gray-300"
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
              <button 
                className="p-2 hover:bg-gray-100 rounded-full"
                onClick={() => setIsLoginModalOpen(true)}
              >
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

      <LoginModal 
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLogin={handleLogin}
      />
    </>
  )
}

