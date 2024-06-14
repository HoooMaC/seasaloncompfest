'use client';
import React, { useState } from 'react';
import StarIcon from '@/components/icons/Star';

import { motion } from 'framer-motion';

interface ExperimentSectionProps {
  onRatingChange: (rating: number) => void;
}

const FormStar: React.FC<ExperimentSectionProps> = ({ onRatingChange }) => {
  const [newReviewRating, setNewReviewRating] = useState<number>(5);
  const [hoverReview, setHoverReview] = useState<number | null>(null);

  const handleRatingClick = (ratingValue: number) => {
    setNewReviewRating(ratingValue);
    onRatingChange(ratingValue); // Panggil fungsi callback untuk mengirim nilai rating ke komponen induk
  };

  return (
    <div className='flex'>
      {Array.from({ length: 5 }).map((_, index) => {
        const ratingValue = index + 1;
        return (
          <motion.label
            onMouseEnter={() => setHoverReview(index + 1)}
            onMouseLeave={() => setHoverReview(null)}
            key={index}
            whileHover={{ scale: 1.5 }}
            whileTap={{ scale: 2 }}
          >
            <input
              type='radio'
              className='sr-only'
              value={index + 1}
              onClick={() => handleRatingClick(ratingValue)}
            />
            <StarIcon
              className={`size-4 ${index < (hoverReview || newReviewRating) ? 'fill-accent' : 'fill-gray-500 transition-all duration-100'} `}
            />
          </motion.label>
        );
      })}
    </div>
  );
};
export default FormStar;
