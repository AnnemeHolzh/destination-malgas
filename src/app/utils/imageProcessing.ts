import sharp from 'sharp';

export async function convertToWebP(file: File): Promise<File> {
  try {
    const image = await createImageBitmap(file);
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Failed to get canvas context');
    
    ctx.drawImage(image, 0, 0);
    
    const webpBlob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
      }, 'image/webp', 0.8);
    });
    
    return new File([webpBlob], file.name.replace(/\.[^/.]+$/, '.webp'), {
      type: 'image/webp'
    });
  } catch (error) {
    console.error('Error converting to WebP:', error);
    return file; // Return original file if conversion fails
  }
} 

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB limit

export function validateImageSize(file: File): boolean {
  return file.size <= MAX_FILE_SIZE;
}

export async function convertToBase64WebP(file: File): Promise<string> {
  if (!validateImageSize(file)) {
    throw new Error('File size exceeds 2MB limit');
  }
  try {
    const webpFile = await convertToWebP(file);
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        // Remove the data URL prefix to store only the Base64 data
        const base64Data = base64String.split(',')[1];
        resolve(base64Data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(webpFile);
    });
  } catch (error) {
    console.error('Error converting to Base64:', error);
    throw error;
  }
}

export async function convertPngToSvg(file: File): Promise<string> {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/image-processing', {
      method: 'POST',
      body: formData
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to convert image')
    }

    return data.svg
  } catch (error) {
    console.error('Detailed conversion error:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to convert PNG to SVG')
  }
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

export async function processSvg(file: File): Promise<string> {
  try {
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch('/api/image-processing', {
      method: 'POST',
      body: formData
    })

    const data = await response.json()
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to process SVG')
    }

    return data.svg
  } catch (error) {
    console.error('SVG processing error:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to process SVG')
  }
}