"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"

const carouselItems = [
  {
    title: "Destination Malgas",
    description: "Get to know us! We aim to provide a comprehensive service to ensure your stay is memorable.",
    number: "01",
    bgColor: "bg-blue-400",
    images: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
  },
  {
    title: "Explore Malgas",
    description: "Discover the beauty of our riverside destination and create lasting memories.",
    number: "02",
    bgColor: "bg-green-400",
    images: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
  },
  {
    title: "Experience Nature",
    description: "Immerse yourself in the natural wonders that Malgas has to offer.",
    number: "03",
    bgColor: "bg-amber-400",
    images: [
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
      "/placeholder.svg?height=400&width=300",
    ],
  },
]

export function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselItems.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)
  }

  const currentItem = carouselItems[currentIndex]

  return (
    <section className="relative h-screen">
      <div className={`absolute inset-0 ${currentItem.bgColor} transition-colors duration-500`} />

      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
          <div className="flex-1">
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 font-script">{currentItem.title}</h1>
            <p className="text-xl text-white max-w-2xl mb-8">{currentItem.description}</p>
            <button className="w-fit text-white border-white hover:bg-white hover:text-black">Contact Us</button>
          </div>

          <div className="flex-1">
            <div className="relative w-full overflow-hidden">
              <div
                className="flex gap-4 transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
              >
                {carouselItems.map((item, index) => (
                  <div key={index} className="flex gap-4 min-w-full">
                    <div className="grid grid-cols-2 gap-4">
                      {item.images.map((image, imageIndex) => (
                        <div key={imageIndex} className="aspect-[3/4] relative overflow-hidden rounded-lg">
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Carousel image ${imageIndex + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 right-8 text-6xl font-bold text-white/50">{currentItem.number}</div>

        <div className="absolute bottom-8 left-8 flex space-x-4">
          <button onClick={prevSlide} className="text-white hover:bg-white/20">
            <ChevronLeft className="w-8 h-8" />
          </button>
          <button onClick={nextSlide} className="text-white hover:bg-white/20">
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      </div>
    </section>
  )
}

