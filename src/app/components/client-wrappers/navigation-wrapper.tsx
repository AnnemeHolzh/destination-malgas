"use client"

import dynamic from 'next/dynamic'

const Navigation = dynamic(
  () => import('../navigation').then(mod => mod.Navigation),
  { ssr: false }
)

// Remove the unused navigation array
// const navigation = [
//   { name: 'Home', href: '/' },
//   { name: 'About', href: '/about' },
//   { name: 'Accommodations', href: '/accommodations' },
//   { name: 'Contact', href: '/contact-us' },
// ]

export function NavigationWrapper() {
  return <Navigation />
}