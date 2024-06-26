import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

const heroImage =
  '/images/view of various makeup brushes and beauty tools arranged neatly on a salon countertop.jpg';

const HeroSection = () => {
  return (
    <section
      id='hero'
      className='relative aspect-video min-h-[750px] w-full overflow-hidden'
    >
      <div className='aspect-video min-h-[750px] w-full bg-primary-100'>
        <Image
          src={heroImage}
          alt={heroImage}
          width={1920}
          height={1080}
          className='absolute bottom-0 block h-full w-full object-cover object-left-bottom opacity-50'
        />
        <div className='container relative top-1/2 z-10 mx-auto flex w-full -translate-y-1/2 flex-col gap-2 p-4'>
          <h1 className='font-outfit text-8xl text-background'>Sea Salon</h1>
          <p className='text-3xl text-background'>
            Experience Beauty and Elegance Redefined
          </p>
          <Link
            href='/book'
            className={`w-1/2 min-w-[100px] lg:w-1/5 ${buttonVariants({ variant: 'secondary' })}`}
          >
            Make Reservation
          </Link>
        </div>
      </div>
    </section>
  );
};
export default HeroSection;
