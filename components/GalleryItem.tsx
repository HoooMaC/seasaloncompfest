import Image from 'next/image';
import { useState } from 'react';

interface ImageProps {
  image: string;
  title: string;
  description: string;
}

const GalleryItem = ({ image, title, description }: ImageProps) => {
  return (
    <div className='col-span-1 flex w-full flex-col items-center justify-center'>
      <div className='group relative aspect-square w-full max-w-[400px] cursor-none overflow-hidden rounded-xl bg-primary-100 sm:w-[400px]'>
        <Image
          src={image}
          alt={description}
          width={400}
          height={400}
          className={`h-full w-full rounded-2xl object-cover shadow-2xl group-hover:opacity-30`}
        />
        <div
          className={`absolute inset-0 grid cursor-none place-content-center p-4 text-center text-2xl text-background opacity-0 transition-opacity group-hover:opacity-100`}
        >
          {description}
        </div>
      </div>
      <h4 className='text-bold text-text z-30 my-4 block text-center text-xl font-medium'>
        {title}
      </h4>
    </div>
  );
};

export default GalleryItem;
