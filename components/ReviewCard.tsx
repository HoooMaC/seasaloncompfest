import React from 'react';
import StarIcon from '@/components/icons/Star';

interface ReviewCardProps {
  name: string;
  message: string;
  rating: number;
}

const ReviewCard = ({ name, message, rating }: ReviewCardProps) => {
  return (
    <div className='flex h-full w-[500px] flex-col justify-between gap-8 bg-secondary p-4 shadow-lg sm:min-h-[240px]'>
      <div className='flex'>
        {Array.from({ length: rating }).map((_, index) => {
          return <StarIcon className='size-4 fill-accent' />;
        })}
      </div>
      <p>{message}</p>
      <h5 className='font-medium'>{name}</h5>
    </div>
  );
};
export default ReviewCard;
