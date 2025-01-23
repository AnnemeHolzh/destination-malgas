import { HeroCarousel } from "./components/hero-carousel"
import { AboutSection } from "./components/about-section"
import { ReasonsCarousel } from "./components/reasons-carousel"

export default function Home() {
  return (
    <>
      <HeroCarousel />
      <AboutSection />
      <ReasonsCarousel />
    </>
  )
}

