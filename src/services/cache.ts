import { House } from "@/app/DataModels/House";


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
  
  set: (key: string, data: unknown) => {
    try {
      // For houses, strip out the images before caching
      if (key === 'houses') {
        if (!Array.isArray(data)) return;
        const housesData = data as House[];
        
        const housesWithoutImages = housesData.map((house: House) => ({
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