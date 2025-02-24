export function optimizeBase64Image(base64: string, maxWidth = 800, quality = 0.8): Promise<string> {
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
      const optimizedBase64 = canvas.toDataURL('image/jpeg', quality).split(',')[1];
      resolve(optimizedBase64);
    };
    
    img.onerror = reject;
  });
} 