"use client"

import React from 'react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';
import './hero-carousel.module.css';
interface ImageCarouselProps {
  images: StaticImageData[]; // Change to StaticImageData[]
  currentIndex: number;
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, currentIndex }) => {
  const totalImages = images.length;
  const displayImages = [...images, ...images]; // Duplicate images for endless effect

  return (
    <div className="flex overflow-hidden relative w-[800px] justify-center">
      {displayImages.map((image, index) => (
        <div
          key={index}
          className={`transition-all duration-500 ease-out min-w-[320px] flex justify-center
            hover:scale-105 transform-gpu`}
          style={{
            transform: `translateX(-${(currentIndex * 320)}px)`,
            opacity: '0.9',
            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <Image 
            src={image} 
            alt={`Carousel image ${index + 1}`} 
            className="carousel-image object-contain rounded-lg
              transition-transform duration-500 hover:shadow-2xl"
            style={{ 
              borderRadius: '20px',
              transform: `scale(${index === currentIndex ? 1.1 : 1})`,
            }}
            width={320}
            height={240}
            priority={index === currentIndex}
          />
        </div>
      ))}
    </div>
  );
};

export default ImageCarousel;