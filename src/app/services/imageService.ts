import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../Firebase/firebaseConfig';
import { convertToWebP } from '../utils/imageProcessing';
import { convertToBase64WebP } from '../utils/imageProcessing';

export interface UploadProgress { 
  progress: number;
  url?: string;
  error?: string;
}

export async function uploadImage(
  file: File,
  path: string,
  onProgress?: (progress: UploadProgress) => void
): Promise<string> {
  try {
    const webpFile = await convertToWebP(file);
    const storageRef = ref(storage, `${path}/${Date.now()}_${webpFile.name}`);
    
    const uploadTask = uploadBytesResumable(storageRef, webpFile);
    
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          onProgress?.({ progress });
        },
        (error) => {
          onProgress?.({ progress: 0, error: error.message });
          reject(error);
        },
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          onProgress?.({ progress: 100, url });
          resolve(url);
        }
      );
    });
  } catch (error) {
    throw error;
  }
} 

export interface UploadProgress {
  progress: number;
  data?: string;
  error?: string;
}

export async function processImage(
  file: File,
  onProgress?: (progress: UploadProgress) => void
): Promise<string> {
  try {
    // Start progress
    onProgress?.({ progress: 0 });
    
    // Convert to Base64
    const base64Data = await convertToBase64WebP(file);
    
    // Complete progress
    onProgress?.({ progress: 100, data: base64Data });
    
    return base64Data;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    onProgress?.({ progress: 0, error: errorMessage });
    throw error;
  }
}