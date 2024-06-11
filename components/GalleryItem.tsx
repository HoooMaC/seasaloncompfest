'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ImageProps {
  image: string,
  title: string,
  description: string
}


const GalleryItem = ({ image, title, description }: ImageProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className="col-span-1 w-full"
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}>
      <div
        className="relative w-[400px] aspect-square bg-primary-100 cursor-none rounded-xl overflow-hidden">
        <Image
          src={image}
          alt={description}
          width={400}
          height={400}
          className={`object-cover w-full h-full ${isHovered ? 'opacity-30' : 'opacity-100'} `}
        />
        <div
          className={`absolute inset-0 transition-opacity cursor-none  text-center text-background text-2xl  place-content-center p-4  grid ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          {description}
        </div>
      </div>
      <h4
        className="text-xl font-medium my-4 text-bold block text-background text-center z-30">{title}</h4>
    </div>
  );
};

export default GalleryItem;