import React from 'react';
import { SecondaryButton } from '@/components/Buttons';
import Image from 'next/image';

const BookSection = () => {
  return (
    <section
      id='book'
      className='overflow-hidden bg-secondary py-40 text-black'
    >
      <div className='container'>
        <div className='relative mx-auto flex flex-col gap-8 lg:flex-row lg:p-8'>
          <div className='relative top-10 flex flex-col justify-center gap-4 p-4 lg:basis-3/5 lg:p-0'>
            <h2 className='text-center font-outfit text-5xl font-medium text-text lg:text-left'>
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
            <SecondaryButton className='mx-auto bg-accent lg:mx-[unset]'>
              Book Now
            </SecondaryButton>
          </div>
          <div className='relative mx-auto lg:basis-2/5'>
            {/* The size should follow the image */}
            <div className='absolute left-1/2 top-10 hidden size-[243px] -translate-x-1/2 p-4 md:size-[294px] lg:block lg:size-[384px] lg:w-full xl:size-[400px] xl:size-full'>
              <div className='relative bottom-10 left-10 size-full bg-accent'></div>
            </div>
            <Image
              src='/images/A modern hair salon reservation desk area - square.jpg'
              alt='A modern hair salon reservation desk area'
              className='relative left-1/2 top-10 -translate-x-1/2 lg:p-4 xl:w-full'
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
