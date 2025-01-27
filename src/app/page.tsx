import { HeroCarouselWrapper } from "./components/client-wrappers/hero-carousel-wrapper"
import { AboutSection } from "./components/about-section"
import { ReasonsCarousel } from "./components/reasons-carousel"

export default function Home() {
  // Add this function to create a dummy house
  async function handleAddDummyHouse() {
    const dummyHouse = {
      houseId: generateHouseId(),
      name: "Test House",
      capacity: {
        adults: 4,
        children: 2
      },
      beds: 3,
      baths: 2,
      description: "A test house created from the homepage",
      media: {
        photos: [],
        videos: []
      },
      amenities: {
        wifi: true,
        parking: true
      },
      active: true,
      createdAt: Date.now(),
      updatedAt: Date.now()
    };

    try {
      await createHouse(dummyHouse);
      console.log('Dummy house created successfully!');
    } catch (error) {
      console.error('Error creating dummy house:', error);
    }
  }

  // Add this function inside the Home component
  async function handleAddDummyUser() {
    const dummyUser = {
      uid: generateUserId(),
      email: `user${Date.now()}@example.com`,
      name: "Test User",
      role: "user" as const,
      createdAt: Date.now()
    };

    try {
      await createUser(dummyUser);
      console.log('Dummy user created successfully!');
    } catch (error) {
      console.error('Error creating dummy user:', error);
    }
  }

  async function handleAddDummyAmenity() {
    const dummyAmenity = {
      amenityId: generateAmenityId(),
      name: "Test Amenity",
      createdAt: Date.now()
    };

    try {
      await createAmenity(dummyAmenity);
      console.log('Dummy amenity created successfully!');
    } catch (error) {
      console.error('Error creating dummy amenity:', error);
    }
  }

  return (
    <>
      <HeroCarouselWrapper />
      <AboutSection />
      <ReasonsCarousel />
    </>
  )
}

