import Image from 'next/image';
import ReservationForm from '@/app/book/ReservationForm';
import { TextGenerateEffect } from '@/components/ui/TextGenerate';
import { dbPrisma } from '@/lib/dbprisma';
import { getAllServices } from '@/data/Service';
import { Service } from '@prisma/client';
import assert from 'assert';
import { auth } from '@/auth';

const BookingPage = async () => {
  const { result: services } = await getAllServices();
  const session = await auth();
  const isLoggedIn = !!session;

  //  TODO: REMOVE IN PRODUCTION
  assert(Array.isArray(services));
  return (
    <>
      <div className='flex min-h-dvh'>
        <div className='hidden basis-2/3 place-content-center bg-primary-100 p-10 lg:grid'>
          <TextGenerateEffect
            words={'SEA SALON The Best Salon in the World'}
            wordClassName='text-background text-5xl'
          ></TextGenerateEffect>
        </div>

        <ReservationForm
          serviceList={services}
          isLoggedIn={isLoggedIn}
          userName={session?.user?.name}
          className='basis-full bg-secondary shadow-lg lg:basis-1/3'
        />
      </div>
    </>
  );
};
export default BookingPage;
