"use client"

import { useEffect, useState } from "react"
import styles from "./hero-carousel.module.css"
import CustomButton from "./ui/button"
import NavButton from "./NavButton"
import ImageCarousel from "./ImageCarousel"

import slide1 from "../../../public/Images/Landing/Section1/slide1.jpg"
import slide2 from "../../../public/Images/Landing/Section1/slide2.jpg"
import slide3 from "../../../public/Images/Landing/Section1/slide3.jpg"
import slide4 from "../../../public/Images/Landing/Section1/slide4.jpg"
import slide5 from "../../../public/Images/Landing/Section1/slide5.jpg"
import slide6 from "../../../public/Images/Landing/Section1/slide6.jpg"
import slide7 from "../../../public/Images/Landing/Section1/slide7.jpg"

import c_slide1 from "../../../public/Images/Landing/Section1/carousel/carousel_img1.png"
import c_slide2 from "../../../public/Images/Landing/Section1/carousel/carousel_img2.png"
import c_slide3 from "../../../public/Images/Landing/Section1/carousel/carousel_img3.png"
import c_slide4 from "../../../public/Images/Landing/Section1/carousel/carousel_img4.png"
import c_slide5 from "../../../public/Images/Landing/Section1/carousel/carousel_img5.png"
import c_slide6 from "../../../public/Images/Landing/Section1/carousel/carousel_img6.png"
import c_slide7 from "../../../public/Images/Landing/Section1/carousel/carousel_img7.png"

const carouselItems = [
  {
    title: "Destination Malgas",
    description: "Get to know us! We aim to provide a comprehensive service to ensure your stay is memorable.",
    number: "01",
    bgImage: slide1,
  },
  {
    title: "Accommodation Booking",
    description: "Choose from our variety of houses, cottages, and houseboats.",
    number: "02",
    bgImage: slide2,
  },
  {
    title: "Boating",
    description: "Take advantage of our private jetties and explore the Breede River, offering boat charters and boat rentals.",
    number: "03",
    bgImage: slide3,
  },
  {
    title: "Local Service Providers",
    description: "Supporting our local service providers, contact us for assistance or let us do the marketing for you.",
    number: "04",
    bgImage: slide4,
  },
  {
    title: "Bait and Tackle",
    description: "Stock up on everything you need for a successful fishing trip.",
    number: "05",
    bgImage: slide5,
  },
  {
    title: "Dining Options",
    description: "Visit The Boathouse Pub and Pizza for a delightful meal or choose from a variety of other options.",
    number: "06",
    bgImage: slide6,
  },
  {
    title: "Information Hub",
    description: "Our hub provides all the information you need about local attractions and activities, office and shop.",
    number: "07",
    bgImage: slide7,
  },
]

const images = [
  c_slide2,
  c_slide3,
  c_slide4,
  c_slide5,
  c_slide6,
  c_slide7,
  c_slide1,
]

export function HeroCarousel() {
  const [mainIndex, setMainIndex] = useState(0)
  const [imageIndex, setImageIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setTimeout(() => {
        setMainIndex((prev) => (prev + 1) % carouselItems.length)
        setImageIndex((prev) => (prev + 1) % images.length)
        setIsAnimating(false)
      }, 500)
    }
  }

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setTimeout(() => {
        setMainIndex((prev) => (prev - 1 + carouselItems.length) % carouselItems.length)
        setImageIndex((prev) => (prev - 1 + images.length) % images.length)
        setIsAnimating(false)
      }, 500)
    }
  }

  const currentItem = carouselItems[mainIndex]

  const getTitleFontSize = (title: string) => {
    const baseSize = window.innerWidth < 768 ? '4rem' : 'clamp(5rem, 8vw, 9rem)'; // Adjust base size for mobile
    const charCount = title.length;

    // Adjust font size based on character count
    if (charCount > 20) {
      return `calc(${baseSize} - 0.5rem)`; // Decrease size for longer titles
    }
    return baseSize;
  };

  if (!isMounted) {
    return null // or loading placeholder
  }

  return (
    <section
      className={`hero-carousel-section relative h-screen overflow-hidden`}
      style={{ backgroundImage: `url(${currentItem.bgImage.src})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className="relative h-full container mx-auto px-4 flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12">
          <div className={`flex-1 z-10 flex flex-col items-start w-full lg:w-auto ${styles.contentContainer} ${isAnimating ? styles.animating : ''}`}>
            <h1 className={`${styles.title}`} style={{ fontSize: getTitleFontSize(currentItem.title), textAlign: window.innerWidth < 768 ? 'center' : 'left' }}>
              {currentItem.title}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white max-w-xl mb-8 text-center md:text-left">
              {currentItem.description}
            </p>
            <div className={`self-start mt-4 ${window.innerWidth < 768 ? 'flex justify-center' : ''}`}>
              <CustomButton text="Contact Us" />
            </div>
          </div>

          <div className={`hidden lg:flex flex-1 justify-end items-center overflow-hidden pr-0 ${styles.imageWrapper} ${isAnimating ? styles.animating : ''}`}>
            <ImageCarousel images={images} currentIndex={imageIndex} />
          </div>
        </div>

        <h2 className={`absolute bottom-20 md:bottom-8 right-4 md:right-8 text-4xl md:text-7xl text-white opacity-80 ${styles.numberIndicator} ${isAnimating ? styles.animating : ''}`}>
          {currentItem.number}
        </h2>

        <div className="flex justify-center absolute bottom-4 md:bottom-8 left-0 right-0 space-x-4">
          <NavButton direction="prev" onClick={prevSlide} />
          <NavButton direction="next" onClick={nextSlide} />
        </div>
      </div>
    </section>
  )
}

