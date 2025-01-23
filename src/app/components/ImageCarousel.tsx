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
          className={`transition-transform duration-300 ease-in-out min-w-[320px] flex justify-center`}
          style={{
            transform: `translateX(-${(currentIndex * 320)}px)`, // Adjusted for endless effect
          }}
        >
          <Image 
            src={image} 
            alt={`Carousel image ${index + 1}`} 
            className="carousel-image object-contain rounded-lg"
            style={{ borderRadius: '20px' }}
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