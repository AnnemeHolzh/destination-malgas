"use client"

import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'

const Navigation = dynamic(
  () => import('../navigation').then(mod => mod.Navigation),
  { ssr: false }
)

export function NavigationWrapper() {
  const pathname = usePathname()
  
  // Don't render navigation for admin routes
  if (pathname?.startsWith('/admin')) {
    return null
  }

  return <Navigation />
}