import React from 'react';
import SectionTitle from '@/components/SectionTitle';
import { aboutImages } from '@/contants/images';
import Image from 'next/image';

const ServicesSection = () => {
  return (
    <section id='services' className='bg-secondary py-40 text-black'>
      <div className='container px-8'>
        <SectionTitle color='text-text'>Our Services</SectionTitle>
        <div className='mx-auto mt-10 flex flex-wrap justify-between gap-8 lg:w-full xl:flex-nowrap'>
          {aboutImages.map((aboutImage, index) => {
            return (
              <div
                key={index}
                className='lg: relative mx-auto w-8/12 lg:w-2/5 xl:w-full'
              >
                <Image
                  src={aboutImage.image}
                  alt={`Image ${index}`}
                  width={900}
                  height={400}
                  className='aspect-square w-full rounded-2xl object-cover shadow-2xl'
                />
                <div className='relative left-1/2 grid aspect-[4/1] w-[90%] -translate-x-1/2 -translate-y-1/3 place-content-center bg-white p-8 text-center shadow-lg'>
                  <h3 className='text-2xl font-medium'>{aboutImage.title}</h3>
                  <p>{aboutImage.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default ServicesSection;
