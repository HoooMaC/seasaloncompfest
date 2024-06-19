import Image from 'next/image';
import ReservationForm from '@/app/book/ReservationForm';
import { TextGenerateEffect } from '@/components/ui/TextGenerate';

const BookingPage = () => {
  return (
    <>
      <div className='flex min-h-dvh'>
        <div className='hidden basis-2/3 place-content-center bg-primary-100 p-10 lg:grid'>
          <TextGenerateEffect
            words={'SEA SALON The Best Salon in the World'}
            wordClassName='text-background text-5xl'
          ></TextGenerateEffect>
        </div>
        <ReservationForm className='basis-full bg-secondary shadow-lg lg:basis-1/3' />
      </div>
    </>
  );
};
export default BookingPage;
