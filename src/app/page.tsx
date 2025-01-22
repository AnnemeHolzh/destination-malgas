'use client';

"use client"
import Image from "next/image";
import { createHouse, generateHouseId } from "./services/houseService";
import { app } from "./Firebase/firebaseConfig";
import { createUser, generateUserId } from "./services/userService";
import { createAmenity, generateAmenityId } from "./services/amenityService";

export default function Home() {
  return (
    <>
      <HeroCarouselWrapper />
      <AboutSection />
      <ReasonsCarousel />
    </>
  )
}

