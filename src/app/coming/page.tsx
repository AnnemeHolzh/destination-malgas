"use client"

import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '../components/ui/contactButton'
import comingSoonBg from '../../../public/Images/Landing/Section3/bg.jpg'

export default function ComingSoon() {
  const router = useRouter()

  return (
    <main 
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ 
        backgroundImage: `url(${comingSoonBg.src})`, 
        backgroundSize: 'cover', 
        backgroundPosition: 'center' 
      }}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      
      <div className="relative z-10 text-center space-y-8 p-8">
        <h1 className="text-7xl md:text-8xl font-script text-white text-shadow animate-fade-in">
          Coming Soon
        </h1>
        
        <div className="bg-white/20 backdrop-blur-sm p-8 rounded-lg max-w-2xl mx-auto">
          <p className="text-xl text-gray-100 mb-8 font-custom3">
            We're working on something exciting! This feature will be available soon.
            In the meantime, explore our other amazing offerings.
          </p>
          
          <Button
            onClick={() => router.push('/')}
            className="bg-[#556B2F] text-white hover:bg-[#556B2F]/90 transform hover:scale-105 transition-all"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </main>
  )
}
