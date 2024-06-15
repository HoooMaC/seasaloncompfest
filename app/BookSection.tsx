import React from 'react';
import { SecondaryButton } from '@/components/Buttons';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const BookSection = () => {
  return (
    <section
      id='book'
      className='overflow-hidden bg-secondary py-40 text-black'
    >
      <div className='container'>
        <div className='relative mx-auto flex flex-col gap-8 lg:flex-row'>
          <div className='relative top-10 flex flex-col justify-center gap-4 lg:basis-3/5'>
            <h2 className='font-outfit text-text text-center text-5xl font-medium lg:text-left'>
              What are you waiting for
            </h2>
            <p className='text-center text-xl lg:text-left'>
              Transform your look with the expertise of our professional
              stylists at <b className='text-accent'>SEA SALON</b>. Our team is
              committed to giving you the perfect style, using only the finest
              products and the latest techniques.
              {/*For a limited time,*/}
              {/*enjoy an exclusive offer when you book your appointment. Don't*/}
              {/*miss out on this opportunity to experience luxury hair care at*/}
              {/*its best. Our appointments fill up fast, so secure your spot*/}
              {/*today and let us elevate your style to the next level.*/}
            </p>
            <Link
              // variant='default'
              className='inline-flex w-fit min-w-[100px] items-center justify-center whitespace-nowrap rounded-md bg-primary p-4 text-sm font-medium text-background ring-offset-background'
              href='/book'
            >
              Book Now
            </Link>
          </div>
          <div className='relative mx-auto lg:basis-2/5'>
            {/* The size should follow the image */}
            <div className='absolute left-1/2 top-10 hidden size-[243px] -translate-x-1/2 p-4 md:size-[294px] lg:block lg:size-[384px] lg:w-full xl:size-[400px] xl:size-full'>
              <div className='relative bottom-10 left-10 size-full rounded-2xl bg-accent'></div>
            </div>
            <Image
              src='/images/A modern hair salon reservation desk area - square.jpg'
              alt='A modern hair salon reservation desk area'
              className='relative left-1/2 top-10 -translate-x-1/2 rounded-2xl shadow-2xl xl:w-full'
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
export default BookSection;
