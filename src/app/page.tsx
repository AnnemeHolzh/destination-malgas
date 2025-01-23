'use client';

import Image from "next/image";
import { HeroCarouselWrapper } from "./components/client-wrappers/hero-carousel-wrapper";
import { AboutSection } from "./components/about-section";
import { ReasonsCarousel } from "./components/reasons-carousel";

export default function Home() {
  return (
    <>
      <HeroCarouselWrapper />
      <AboutSection />
      <ReasonsCarousel />
    </>
  )
}


