"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import bg from "../../../public/Images/Landing/Section3/bg.jpg"
import NavButton from "./NavButton"

const reasons = [
  {
    number: 1,
    title: "Stunning Scenery",
    description:
      "Immerse yourself in the breath taking landscapes that surround you. From lush riverbanks to rolling hills, every view is a postcard moment.",
    bgColor: "bg-green-400",
    images: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
  },
  {
    number: 2,
    title: "Rich History",
    description: "Discover the fascinating heritage and stories that make Malgas unique.",
    bgColor: "bg-blue-400",
    images: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
  },
  {
    number: 3,
    title: "Water Activities",
    description: "Experience the thrill of various water sports and activities on our beautiful river.",
    bgColor: "bg-amber-400",
    images: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
  },
]

export function ReasonsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % reasons.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + reasons.length) % reasons.length)
  }

  const currentReason = reasons[currentIndex]

  return (
    <section
      className="relative min-h-screen"
      style={{ backgroundImage: `url(${bg.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="container mx-auto px-4 py-24">
        <h2 className="text-5xl md:text-6xl font-custom4 text-white mb-16 flex justify-center items-center text-shadow">
          6 Reasons why you should visit <span className="font-custom1 inline-block mx-2 text-8xl ml-6 mt-3">Malgas</span>
        </h2>

        <p className="text-gray-300 mb-12 max-w-2xl">
          Malgas is more than just a place to stay—it's a destination filled with natural beauty and a variety of
          activities.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-black/50 backdrop-blur-sm p-8 rounded-lg">
            <h3 className="text-3xl font-bold text-white mb-4">
              {currentReason.number}. {currentReason.title}
            </h3>
            <p className="text-gray-300 mb-8">{currentReason.description}</p>

            
          </div>

          <div className="relative h-[400px]">
            <div className="absolute w-full h-full" style={{ perspective: "1000px" }}>
              {currentReason.images.map((image, index) => (
                <div
                  key={index}
                  className="absolute right-0 w-64 h-64 transition-all duration-500"
                  style={{
                    transform: `translateX(${index * 64}px) translateZ(${-index * 20}px)`,
                    zIndex: currentReason.images.length - index,
                  }}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${currentReason.title} image ${index + 1}`}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
            
          </div>
          <div className="flex justify-center absolute bottom-8 left-0 right-0 space-x-4">
          <NavButton direction="prev" onClick={prevSlide} />
          <NavButton direction="next" onClick={nextSlide} />
        </div>
        </div>
      </div>
    </section>
  )
}

