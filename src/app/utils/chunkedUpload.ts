// New file: src/utils/chunkedUpload.ts
import { ref, set, get } from "firebase/database";
import { database } from "../Firebase/firebaseConfig";

const CHUNK_SIZE = 5; // Number of images per chunk
const MAX_RETRIES = 3; // Maximum number of retry attempts per chunk
const RETRY_DELAY = 1000; // Delay between retries in milliseconds

interface UploadProgress {
  totalImages: number;
  uploadedImages: number;
  currentChunk: number;
  retryCount: number;
}

export async function chunkedDatabaseWrite(
  path: string, 
  data: object,  
  imageArray: string[],
  onProgress?: (progress: UploadProgress) => void
) {
  try {
    // First write the house data without images
    const initialData = {
      ...data,
      media: {
        photos: [],
        videos: []
      }
    };
    
    await set(ref(database, path), initialData);
    
    // Then upload images in chunks with retry logic
    for (let i = 0; i < imageArray.length; i += CHUNK_SIZE) {
      let retryCount = 0;
      let success = false;
      
      while (!success && retryCount < MAX_RETRIES) {
        try {
          const chunk = imageArray.slice(0, i + CHUNK_SIZE); // Include all previous images plus new chunk
          
          // Update the photos array with the new chunk
          await set(ref(database, `${path}/media/photos`), chunk);
          
          // Verify the write was successful
          const verification = await get(ref(database, `${path}/media/photos`));
          if (!verification.exists() || verification.val().length !== chunk.length) {
            throw new Error('Verification failed');
          }
          
          success = true;
          
          // Report progress
          onProgress?.({
            totalImages: imageArray.length,
            uploadedImages: i + CHUNK_SIZE,
            currentChunk: Math.floor(i / CHUNK_SIZE) + 1,
            retryCount
          });
          
        } catch (error) {
          retryCount++;
          console.warn(`Chunk upload failed, attempt ${retryCount} of ${MAX_RETRIES}`, error);
          
          if (retryCount < MAX_RETRIES) {
            // Wait before retrying
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
          } else {
            // If all retries failed, try to recover by fetching current state
            const currentState = await get(ref(database, `${path}/media/photos`));
            const existingPhotos = currentState.exists() ? currentState.val() : [];
            
            throw new Error(`Failed to upload chunk after ${MAX_RETRIES} attempts. Successfully uploaded ${existingPhotos.length} of ${imageArray.length} images.`);
          }
        }
      }
      
      // Small delay between chunks to prevent rate limiting
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  } catch (error) {
    console.error('Error in chunked write:', error);
    throw error;
  }
}