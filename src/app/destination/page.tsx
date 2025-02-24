"use client"

import { useState } from "react"
import NavButton from "../components/NavButton"

import image1 from "../../../public/Images/Destination/BitesBeachCafe.jpg"
import image2 from "../../../public/Images/Destination/BoathousePubandPizza.jpg"
import image3 from "../../../public/Images/Destination/BushPub.jpg"
import image4 from "../../../public/Images/Destination/DeHoopNatureReserve.jpg"
import image5 from "../../../public/Images/Destination/Grunters.jpg"
import image6 from "../../../public/Images/Destination/Malagas.jpg"
import image7 from "../../../public/Images/Destination/MalagasFerry.jpg"
import image8 from "../../../public/Images/Destination/SijnnWineEstate.jpg"
import image9 from "../../../public/Images/Destination/TheFigTreeRestaurant.jpg"
import image10 from "../../../public/Images/Destination/TradingPost.jpg"

const destinations = [
  {
    id: 1,
    title: "Bites Beach Café",
    description: "Beach Cafe, surrounded by the dunes of Koppie Alleen, De Hoop Nature Reserve.",
    image: image1.src, // Update with actual image paths
    externalLink: "https://morukuru.com/news/introducing-bites-beach-cafe/",
    gradient: "bg-gradient-to-t from-[#2F5D63] to-transparent",
  },
  {
    id: 2,
    title: "Boathouse Pub and Pizza",
    description: "The Boathouse Pub & Pizzeria was established years ago, and has since become popular amongst the Breede River locals.",
    image: image2.src,
    externalLink: "https://www.facebook.com/boathousepizzaria/",
    gradient: "bg-gradient-to-t from-[#B1804C] to-transparent",
  },
  {
    id: 3,
    title: "Bush Pub",
    description: "It is well-known for its cocktails; not only for how delicious they are, but also for the sheer variety.",
    image: image3.src, // Update with actual image paths
    externalLink: "https://example1.com",
    gradient: "bg-gradient-to-t from-[#334A36] to-transparent",
  },
  {
    id: 4,
    title: "De Hoop Nature Reserve",
    description: "Experience the beauty it offers along the coastline.",
    image: image4.src,
    externalLink: "https://thebushpub.com/",
    gradient: "bg-gradient-to-t from-[#B1804C] to-transparent",
  },
  {
    id: 5,
    title: "Grunters",
    description: "In the heart of Malgas, sits this homely restaurant. Priding themselves on great fresh quality food.",
    image: image5.src, // Update with actual image paths
    externalLink: "https://www.facebook.com/gruntersmalgas/",
    gradient: "bg-gradient-to-t from-[#2F5D63] to-transparent",
  },
  {
    id: 6,
    title: "Malgas",
    description: "Malgas offers a diverse range of activities and attractions for visitors to enjoy!",
    image: image6.src,
    externalLink: "https://www.sa-venues.com/things-to-do/westerncape/bysuburb/malgas/",
    gradient: "bg-gradient-to-t from-[#334A36] to-transparent",
  },
  {
    id: 7,
    title: "Malagas Ferry",
    description: "The Malagas Ferry ferries you to and from the little bankside village of Malgas in the Overberg to Witsand.",
    image: image7.src, // Update with actual image paths
    externalLink: "",
    gradient: "bg-gradient-to-t from-[#2F5D63] to-transparent",
  },
  {
    id: 8,
    title: "Sijnn Wine Estate",
    description: "A beautiful pioneering wine estate in the middle of nowhere at the end of a long, dusty, bumpy road at the Southern tip of Africa.",
    image: image8.src,
    externalLink: "https://www.sijnn.co.za/",
    gradient: "bg-gradient-to-t from-[#B1804C] to-transparent",
  },
  {
    id: 9,
    title: "The Fig Tree Restaurant",
    description: "De Hoop Collection’s Fig Tree Restaurant offers day and overnight visitors a welcoming and comfortable setting in which to enjoy local culinary creations.",
    image: image9.src, // Update with actual image paths
    externalLink: "https://www.dehoopcollection.com/restaurant/",
    gradient: "bg-gradient-to-t from-[#334A36] to-transparent",
  },
  {
    id: 10,
    title: "Trading Post",
    description: "The Breede River Trading Post is your “One Stop” provision store in the area.",
    image: image10.src,
    externalLink: "https://www.facebook.com/breederrivertradingmalgas/",
    gradient: "bg-gradient-to-t from-[#B1804C] to-transparent",
  },
]

export default function DestinationPage() {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)
  const [startIndex, setStartIndex] = useState(0)

  const handlePrevious = () => {
    setStartIndex((prev) => (prev === 0 ? destinations.length - 3 : prev - 1))
  }

  const handleNext = () => {
    setStartIndex((prev) => (prev === destinations.length - 3 ? 0 : prev + 1))
  }

  const visibleDestinations = destinations.slice(startIndex, startIndex + 3)

  return (
    <div className="relative flex h-screen">
      {/* Previous Button */}
      <div className="absolute left-4 top-1/2 z-50 -translate-y-1/2 transform">
        <NavButton direction="prev" onClick={handlePrevious} />
      </div>

      {/* Destinations */}
      {visibleDestinations.map((destination) => (
        <a
          key={destination.id}
          href={destination.externalLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`relative flex-1 cursor-pointer overflow-hidden transition-all duration-700 ease-in-out
            ${
              hoveredSection === destination.title ? "flex-grow-[3]" : "flex-grow-1"
            }
          `}
          onMouseEnter={() => setHoveredSection(destination.title)}
          onMouseLeave={() => setHoveredSection(null)}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
            style={{ backgroundImage: `url(${destination.image})` }}
          />
          {/* Default gradient */}
          <div 
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out
              ${destination.gradient} 
              bg-gradient-to-t from-opacity-90 via-transparent to-transparent
              ${hoveredSection === destination.title ? 'opacity-0' : 'opacity-100'}
            `} 
          />
          {/* Hover gradient */}
          <div 
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out
              bg-gradient-to-t from-black/70 via-black/30 to-transparent
              ${hoveredSection === destination.title ? 'opacity-100' : 'opacity-0'}
            `} 
          />
          <div
            className={`absolute bottom-0 left-0 right-0 p-8 transition-all duration-700 ease-in-out
              ${
                hoveredSection === destination.title
                  ? "transform translate-x-[20%] opacity-100"
                  : "transform translate-x-0 opacity-100"
              }
            `}
          >
            <div className="max-w-md mx-auto">
              <h2
                className={`font-custom1 mb-4 text-white transition-all duration-700 drop-shadow-lg
                  ${
                    hoveredSection === destination.title
                      ? "text-right text-7xl"
                      : "text-center text-6xl"
                  }`}
              >
                {destination.title}
              </h2>
              <p
                className={`text-white drop-shadow-lg transition-all duration-700 ease-in-out
                  ${
                    hoveredSection === destination.title
                      ? "text-right text-lg opacity-100"
                      : "text-center text-base opacity-70"
                  }
                `}
              >
                {destination.description}
              </p>
            </div>
          </div>
        </a>
      ))}

      {/* Next Button */}
      <div className="absolute right-4 top-1/2 z-50 -translate-y-1/2 transform">
        <NavButton direction="next" onClick={handleNext} />
      </div>
    </div>
  )
}

