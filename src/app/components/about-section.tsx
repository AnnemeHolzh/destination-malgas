import Image from "next/image"
import aboutImage from "../../../public/Images/Landing/Section2/image.png"
import CustomButton from "./ui/button"
import styles from './about-section.module.css'

export function AboutSection() {
  return (
    <section className={`${styles['about-section']} relative min-h-screen`}>
      <div className="container mx-auto px-4 py-24">
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-[1px] bg-white flex-1 max-w-[600px]"></div>
          <h1 className="text-7xl md:text-8xl font-script text-white text-shadow">About Us</h1>
          <div className="h-[1px] bg-white flex-1 max-w-[600px]"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center max-w-6xl mx-auto gap-8">
          <div className="rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <Image 
              src={aboutImage}
              alt="Aerial view of Malgas"
              className="rounded-lg shadow-lg"
              width={700}
              height={400}
              style={{ objectFit: 'cover' }}
            />
          </div>

          <div className="bg-white/20 backdrop-blur-sm p-8 rounded-lg max-w-lg">
            <h3 className="text-4xl font-bold text-white mb-4">Get to know us!</h3>
            <p className="text-xl text-gray-300 mb-8">
              Our mission is to provide a comprehensive umbrella of services designed to enhance your experience,
              whether you're here for boating, accommodation, business, tourism, or events. Explore the best of Malgas
              with us and discover everything this charming destination has to offer.
            </p>
            <div className="flex justify-center">
              <CustomButton text="Our Services" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

