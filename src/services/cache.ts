import { House } from "@/app/DataModels/House";

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export const cache = {
  get: (key: string) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.error('Cache get error:', error);
      return null;
    }
  },
  
  set: (key: string, data: any) => {
    try {
      // For houses, strip out the images before caching
      if (key === 'houses') {
        const housesWithoutImages = data.map((house: House) => ({
          ...house,
          media: {
            ...house.media,
            photos: [], // Don't cache photos
            videos: []  // Don't cache videos
          }
        }));
        localStorage.setItem(key, JSON.stringify(housesWithoutImages));
      } else {
        localStorage.setItem(key, JSON.stringify(data));
      }
    } catch (error) {
      console.error('Cache set error:', error);
    }
  },
  
  remove: (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Cache remove error:', error);
    }
  }
}; 