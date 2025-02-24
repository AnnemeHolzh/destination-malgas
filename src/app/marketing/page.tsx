"use client"

import Link from "next/link"
import { useState } from "react"

import marketing from "../../../public/Images/Marketing/directMarketing.jpg"
import website from "../../../public/Images/Marketing/website.jpg"
import socialMedia from "../../../public/Images/Marketing/socialMedia.jpg"

export default function MarketingServices() {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  const services = [
    {
      title: "Direct Marketing",
      description:
        "Unlock the power of direct marketing with us—reach your audience with precision and drive results that matter!",
      image: marketing.src,
      slug: "direct-marketing",
      gradient: "bg-gradient-to-t from-[#2F5D63] to-transparent",
    },
    {
      title: "Website",
      description:
        "Showcase Your Local Business! Discover the top local businesses featured on our Destination page.",
      image: website.src,
      slug: "website",
      gradient: "bg-gradient-to-t from-[#B1804C] to-transparent",
    },
    {
      title: "Social Media",
      description:
        "Expand your influence by collaborating with is! Explore with the social media platforms we support and connect with a wider audience today.",
      image: socialMedia.src,
      slug: "social-media",
      gradient: "bg-gradient-to-t from-[#334A36] to-transparent",
    },
  ]


  return (
    <div className="flex h-screen">
      {services.map((service) => (
        <Link
          key={service.slug}
          href={`/marketing/${service.slug}`}
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
              ${service.gradient} 
              bg-gradient-to-t from-opacity-90 via-transparent to-transparent
              ${hoveredSection === service.title ? 'opacity-0' : 'opacity-100'}
            `} 
          />
          <div 
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out
              bg-gradient-to-t from-black/70 via-black/30 to-transparent
              ${hoveredSection === service.title ? 'opacity-100' : 'opacity-0'}
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
              <h2 className={`font-custom1 mb-4 text-white transition-all duration-700 drop-shadow-lg
                ${hoveredSection === service.title 
                  ? "text-right text-7xl" 
                  : "text-center text-6xl"}`}>
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

