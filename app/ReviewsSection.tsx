import React from 'react';
import SectionTitle from '@/components/SectionTitle';
import { reviews } from '@/contants/reviews';

const ReviewsSection = () => {
  return (
    <section id='reviews' className='bg-white py-40 text-black'>
      <div className='container'>
        <SectionTitle color='text-text'>What People Say</SectionTitle>
        <div className='flex items-center justify-center gap-4'>
          {reviews.map((review, index) => {
            return (
              <div className='flex w-[500px] flex-col gap-8 bg-secondary p-4 shadow-lg'>
                <div>Star</div>
                <p>{review.message}</p>
                <div className='flex items-center gap-4'>
                  <div className='aspect-square w-8 rounded-full bg-accent'></div>
                  <h5 className='font-medium'>{review.name}</h5>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default ReviewsSection;
