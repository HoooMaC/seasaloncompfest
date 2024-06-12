import React from 'react';
import SectionTitle from '@/components/SectionTitle';
import { galleryImage } from '@/contants/images';
import GalleryItem from '@/components/GalleryItem';

const GallerySection = () => {
  return (
    <section id='gallery' className='bg-background py-40 text-black'>
      <div className='container lg:px-8'>
        <SectionTitle>Our Gallery</SectionTitle>
        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3'>
          {galleryImage.map(({ image, title, description }, index) => {
            return (
              <GalleryItem
                key={index}
                image={image}
                title={title}
                description={description}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default GallerySection;
