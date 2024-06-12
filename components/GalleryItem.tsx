'use client';

import Image from 'next/image';
import { useState } from 'react';

interface ImageProps {
  image: string;
  title: string;
  description: string;
}

const GalleryItem = ({ image, title, description }: ImageProps) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className='col-span-1 flex w-full flex-col items-center justify-center'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className='relative aspect-square w-[400px] cursor-none overflow-hidden rounded-xl bg-primary-100'>
        <Image
          src={image}
          alt={description}
          width={400}
          height={400}
          className={`h-full w-full object-cover ${isHovered ? 'opacity-30' : 'opacity-100'} `}
        />
        <div
          className={`absolute inset-0 grid cursor-none place-content-center p-4 text-center text-2xl text-background transition-opacity ${isHovered ? 'opacity-100' : 'opacity-0'}`}
        >
          {description}
        </div>
      </div>
      <h4 className='text-bold z-30 my-4 block text-center text-xl font-medium text-background'>
        {title}
      </h4>
    </div>
  );
};

export default GalleryItem;
