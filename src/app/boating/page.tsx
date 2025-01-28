"use client"

import Link from "next/link"
import { useState } from "react"

import rentals from "../../../public/Images/Boating/boat.jpg"
import bait from "../../../public/Images/Boating/bait.jpg"
import charters from "../../../public/Images/Boating/charters.jpg"

export default function BoatingServices() {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  const services = [
    {
      title: "Charters",
      description:
        "Known for its abundant fishing opportunities, the area attracts anglers eager to catch a variety of fish species.",
      image: charters.src,
      slug: "charters",
      gradient: "bg-gradient-to-t from-[#2F5D63] to-transparent",
    },
    {
      title: "Rentals",
      description:
        "No boat? No problem! With a valid Skipper License, you can rent a boat from us and enjoy the Breede River to the fullest.",
      image: rentals.src,
      slug: "rentals",
      gradient: "bg-gradient-to-t from-[#B1804C] to-transparent",
    },
    {
      title: "Bait and Tackle",
      description:
        "Supplier of fishing tackle, accessories, apparel and related goods.",
      image: bait.src,
      slug: "bait-and-tackle",
      gradient: "bg-gradient-to-t from-[#334A36] to-transparent",
    },
  ]

  return (
    <div className="flex h-screen">
      {services.map((service) => (
        <Link
          key={service.slug}
          href={`/boating/${service.slug}`}
          className={`relative flex-1 transition-all duration-700 ease-in-out overflow-hidden cursor-pointer
            ${hoveredSection === service.title ? "flex-grow-[3]" : "flex-grow-1"}
          `}
          onMouseEnter={() => setHoveredSection(service.title)}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
            style={{ backgroundImage: `url(${service.image})` }}
          />
          <div 
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out
              ${service.gradient} bg-gradient-to-t from-opacity-90 via-transparent to-transparent
              ${hoveredSection === service.title ? 'opacity-0' : 'opacity-100'}
            `} 
          />
          <div
            className={`absolute bottom-0 left-0 right-0 p-8 transition-all duration-700 ease-in-out
              ${hoveredSection === service.title 
                ? "transform translate-x-[20%] opacity-100" 
                : "transform translate-x-0 opacity-100"}
            `}
          >
            <div className="max-w-md mx-auto">
              <h2 className={`font-script mb-4 text-white transition-all duration-700 drop-shadow-lg
                ${hoveredSection === service.title 
                  ? "text-right text-6xl" 
                  : "text-center text-5xl"}`}>
                {service.title}
              </h2>
              <p
                className={`transition-all duration-700 ease-in-out text-white drop-shadow-lg
                  ${hoveredSection === service.title 
                    ? "text-right opacity-100 text-lg" 
                    : "text-center opacity-70 text-base"}
                `}
              >
                {service.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

