"use client"

import { useState, useEffect } from 'react'

export function useWindowUtils() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const safeWindow = typeof window !== 'undefined' ? window : null

  const getScrollY = () => {
    if (typeof window === 'undefined') return 0
    return window.scrollY
  }

  const getComputedStyle = (element: Element) => {
    if (typeof window === 'undefined') return { backgroundColor: '' }
    return window.getComputedStyle(element)
  }

  const addEventListeners = (events: { [key: string]: EventListener }) => {
    if (typeof window === 'undefined') return () => {}

    Object.entries(events).forEach(([event, handler]) => {
      window.addEventListener(event, handler)
    })

    return () => {
      Object.entries(events).forEach(([event, handler]) => {
        window.removeEventListener(event, handler)
      })
    }
  }

  return {
    isMounted,
    window: safeWindow,
    getScrollY,
    getComputedStyle,
    addEventListeners
  }
} 