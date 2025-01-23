'use client';

import Image from "next/image";
import { createHouse, generateHouseId } from "./services/houseService";
import { app } from "./Firebase/firebaseConfig";
import { createUser, generateUserId } from "./services/userService";
import { createAmenity, generateAmenityId } from "./services/amenityService";
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

