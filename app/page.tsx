import Image from 'next/image';
import { aboutImages, galleryImage } from '@/contants/images';
import { Fragment } from 'react';
import { images } from 'next/dist/build/webpack/config/blocks/images';
import Gallery from '@/sections/Gallery';

const heroImage = '/images/view of various makeup brushes and beauty tools arranged neatly on a salon countertop.jpg';

export default function Home() {
  return (
    <main>
      <section
        id="hero"
        className="relative aspect-video w-full overflow-hidden"
      >
        <div className="bg-slate-800 w-full aspect-video">
          <Image
            src={heroImage}
            alt={heroImage}
            width={1920}
            height={1080}
            className="absolute bottom-0 block h-full w-full object-cover object-left-bottom opacity-50"
          />
          <div
            className="relative top-1/2 z-10 flex flex-col gap-2 -translate-y-1/2 container mx-auto  w-full">
            <h1 className="text-white font-outfit text-7xl">Sea Salon Beauty
              Elegance Redefined</h1>
            <p className="text-white">Haircuts, Styling, Manicure, Pedicure,
              Facial Treatments -
              Experience Beauty and Elegance Redefined</p>
            <button
              className="bg-secondary text-white py-4 px-10 mt-2 rounded-full w-[fit-content]">Explore
            </button>
          </div>
        </div>
      </section>

      <section
        id="about"
        className=" bg-white text-black py-40">
        <div className="container mx-auto">
          <h2 className="text-5xl font-medium font-outfit text-center">Haircuts
            Manicure Facial</h2>
          <p className="text-center">Sea Salon offers haircuts, manicure, and
            facial treatments for a complete beauty experience.</p>
          <div className="flex justify-between  mt-10 mx-auto w-full gap-8">
            {aboutImages.map((aboutImage, index) => {
              return (
                <div key={index} className="relative">
                  <Image
                    src={aboutImage.image}
                    alt={`Image ${index}`}
                    width={900}
                    height={400}
                    className="w-full rounded-2xl shadow-2xl aspect-square object-cover"
                  />
                  <div
                    className="w-[90%] relative left-1/2 p-8 shadow-lg grid place-content-center -translate-x-1/2 -translate-y-1/3 aspect-[4/1] bg-white text-center">
                    <h3 className="font-medium text-2xl">
                      {aboutImage.title}
                    </h3>
                    <p>
                      {aboutImage.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Gallery />

    </main>
  );
}
