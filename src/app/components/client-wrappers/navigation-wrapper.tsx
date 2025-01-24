"use client"

import dynamic from 'next/dynamic'

const Navigation = dynamic(
  () => import('../navigation').then(mod => mod.Navigation),
  { ssr: false }
)

export function NavigationWrapper() {
  return <Navigation />
}