"use client"

import { usePathname } from 'next/navigation'
import { Footer } from '../footer'

export function FooterWrapper() {
  const pathname = usePathname()
  
  // Don't render footer for admin routes
  if (pathname?.startsWith('/admin')) {
    return null
  }

  return <Footer />
}