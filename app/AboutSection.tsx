import SectionTitle from '@/components/SectionTitle';
import Image from 'next/image';

const AboutSection = () => {
  return (
    <section id='about' className='bg-background py-40 text-black'>
      <div className='container flex flex-col gap-20 p-4 lg:px-8'>
        <div className='flex h-full flex-col items-start justify-center'>
          <div className='flex flex-col items-center gap-20 lg:flex-row'>
            <div className='flex w-full flex-col items-start'>
              <h3 className='mb-12 text-center font-outfit text-5xl font-medium capitalize text-text lg:text-left'>
                beauty salon with premium treatments and services
              </h3>
              <p className='text-center lg:text-left'>
                Welcome to SEA Salon, a rising star in the salon industry known
                for its outstanding services and excellent reviews. Our
                commitment to providing top-notch beauty services has quickly
                earned us a reputation as your premier destination for all your
                beauty needs.
              </p>
            </div>
            <Image
              src='/images/A modern hair salon building front, designed in a sleek, contemporary style. The facade should feature large glass windows, minimalist lines, and a st.webp'
              alt='building of the salon'
              className='lg:size-1/3'
              width={400}
              height={400}
            />
          </div>
        </div>
        <div className='flex flex-col items-center gap-20 lg:flex-row'>
          <div className='flex size-2/3 flex-col items-start'>
            <h3 className='mb-12 text-center font-outfit text-5xl font-medium capitalize text-text lg:text-left'>
              beauty salon with premium treatments and services
            </h3>
            <p className='text-center lg:text-left'>
              Welcome to SEA Salon, a rising star in the salon industry known
              for its premium treatments and outstanding services. Our
              commitment to providing top-notch beauty solutions has quickly
              earned us a reputation as your premier destination for all your
              beauty needs.
            </p>
          </div>
          <Image
            src='/images/A luxurious beauty salon offering premium treatments and services. The interior should feature elegant decor with plush seating, stylish lighting, and.jpg'
            alt='building of the salon'
            className='lg:order-first lg:size-1/3'
            width={400}
            height={400}
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
