export function optimizeBase64Image(base64: string, maxWidth = 800, quality = 0.6): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = `data:image/jpeg;base64,${base64}`;
    
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const scale = maxWidth / img.width;
      canvas.width = maxWidth;
      canvas.height = img.height * scale;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject('Could not create canvas context');
      
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const optimizedBase64 = canvas.toDataURL('image/webp', quality).split(',')[1];
      resolve(optimizedBase64);
    };
    
    img.onerror = reject;
  });
}

export async function generateBlurPlaceholder(base64: string): Promise<string> {
  const img = new Image();
  img.src = `data:image/jpeg;base64,${base64}`;
  
  await new Promise(resolve => img.onload = resolve);
  
  const canvas = document.createElement('canvas');
  canvas.width = 20;
  canvas.height = Math.round((img.height / img.width) * 20);
  
  const ctx = canvas.getContext('2d');
  ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/webp', 0.2);
} 