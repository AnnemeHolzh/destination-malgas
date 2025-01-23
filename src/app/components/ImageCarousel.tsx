"use client"

import React from 'react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';

interface ImageCarouselProps {
  images: StaticImageData[]; // Change to StaticImageData[]
  currentIndex: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, currentIndex }) => {
  return (
    <div className="flex overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`transition-transform duration-300 ease-in-out w-2/5 ${index === currentIndex ? 'scale-100' : 'scale-75'}`}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          <Image src={image} alt={`Carousel image ${index + 1}`} className="w-full h-auto rounded-lg" />
        </div>
      ))}
    </div>
  );
};

export default ImageCarousel;