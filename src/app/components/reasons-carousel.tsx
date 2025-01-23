"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import bg from "../../../public/Images/Landing/Section3/bg.jpg"
import NavButton from "./NavButton"
import styles from "./reasons-carousel.module.css"

import slide1 from "../../../public/Images/Landing/Section3/carousel/slide1.png"
import slide2 from "../../../public/Images/Landing/Section3/carousel/slide2.png"
import slide3 from "../../../public/Images/Landing/Section3/carousel/slide3.png"
import slide4 from "../../../public/Images/Landing/Section3/carousel/slide4.png"
import slide5 from "../../../public/Images/Landing/Section3/carousel/slide5.png"
import slide6 from "../../../public/Images/Landing/Section3/carousel/slide6.png"


const reasons = [
  {
    number: 1,
    title: "Stunning Scenery",
    description1:
      "Immerse yourself in the breathtaking landscapes that surround you.",
    description2:
      "From lush riverbanks to rolling hills, every view is a postcard moment.",
    image: slide1,
  },
  {
    number: 2,
    title: "Hiking Trails ",
    description1: "Explore numerous hiking trails that cater to all levels of fitness.",
    description2: "Discover the diverse flora and fauna, and perhaps spot some local wildlife.",
    image: slide2,
  },
  {
    number: 3,
    title: "Whale Watching",
    description1: "Visit during whale season to witness the magnificent spectacle of these gentle giants.",
    description2: "Infanta and Witsand are renowned for their whale watching opportunities.",
    image: slide3,
  },
  {
    number: 4,
    title: "Fishing",
    description1: "The Breede River is teeming with fish like Cob and Garrick.",
    description2: "Whether you're a seasoned angler or a beginner, you'll find great spots for fishing.",
    image: slide4,
  },
  {
    number: 5,
    title: "Bird Watching",
    description1: "With a rich variety of bird species, including fish eagles and kingfishers, Malgas is a haven for bird watchers.",
    description2: "",
    image: slide5,
  },
  {
    number: 6,
    title: "Local Attractions",
    description1: "Explore historical monuments, visit local pubs and restaurants, and tour nearby wineries.",
    description2: "There's always something new to discover.",
    image: slide6,
  },
]

export function ReasonsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % reasons.length)
        setIsAnimating(false)
      }, 500); // Match this with animation duration
    }
  }

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentIndex((prev) => (prev - 1 + reasons.length) % reasons.length)
        setIsAnimating(false)
      }, 500); // Match this with animation duration
    }
  }

  const currentReason = reasons[currentIndex]

  return (
    <section
      className="relative min-h-screen py-12 md:py-24"
      style={{ backgroundImage: `url(${bg.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-custom4 text-white mb-8 md:mb-16 text-center text-shadow">
          6 Reasons why you should visit{" "}
          <span className="font-custom1 block md:inline-block mx-2 text-5xl sm:text-6xl md:text-7xl lg:text-8xl mt-2 md:mt-3">
            Malgas
          </span>
        </h2>
        <p className="text-white mb-6  mx-auto text-center md:text-center text-lg md:text-xl lg:text-2xl font-custom3">
            Malgas is more than just a place to stay—it's a destination filled with natural beauty and a variety of activities.
          </p>
        <div className="mx-2 sm:mx-4 md:mx-16">
         

          <div className="md:hidden">
            <div className={`bg-white/20 backdrop-blur-sm p-6 rounded-lg mb-6 ${styles.carouselItem} ${isAnimating ? styles.animating : ''}`}>
              <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                {currentReason.number}. {currentReason.title}
              </h3>
              <div className="mb-6">
                <p className="text-white mb-3 text-lg font-custom3">{currentReason.description1}</p>
                <p className="text-white text-lg font-custom3">{currentReason.description2}</p>
              </div>
              <div className="relative h-[250px] w-full">
                <Image
                  src={currentReason.image}
                  alt={`${currentReason.title} image`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          </div>

          <div className="hidden md:grid md:grid-cols-2 gap-12">
            <div className={`bg-white/20 backdrop-blur-sm p-12 rounded-lg flex flex-col justify-between h-full ${styles.carouselItem} ${isAnimating ? styles.animating : ''}`}>
              <h3 className="text-4xl lg:text-5xl font-bold text-white mt-8">
                {currentReason.number}. {currentReason.title}
              </h3>
              <div className="flex-grow flex flex-col justify-center">
                <p className="text-white mb-4 text-xl lg:text-2xl font-custom3">{currentReason.description1}</p>
                <p className="text-white mb-4 text-xl lg:text-2xl font-custom3">{currentReason.description2}</p>
              </div>
            </div>

            <div className={`relative h-[450px] ${styles.imageContainer} ${isAnimating ? styles.animating : ''}`}>
              <Image
                src={currentReason.image}
                alt={`${currentReason.title} image`}
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-8 md:mt-0 md:absolute md:bottom-8 md:left-0 md:right-0 space-x-4">
          <NavButton direction="prev" onClick={prevSlide} />
          <NavButton direction="next" onClick={nextSlide} />
        </div>
      </div>
    </section>
  )
}

