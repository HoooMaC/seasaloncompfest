import React from 'react';
import { galleryImage } from '@/contants/images';
import GalleryItem from '@/components/GalleryItem';
import Section from '@/components/Section';

const Gallery = () => {
  return (
    <Section
      id='gallery'
      backgroundColor="bg-primary"
    >
        <h2 className="text-5xl text-background font-medium font-outfit text-center">Our
          Gallery</h2>
        <div className="grid gr mt-12">
          {galleryImage.map(({image, title, description}, index) => {
            return (
              <GalleryItem key={index} image={image} title={title} description={description} />
            );
          })}
        </div>
    </Section>
  );
};
export default Gallery;
