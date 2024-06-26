import Image from 'next/image';
import ReservationForm from '@/components/form/ReservationForm';
import { TextGenerateEffect } from '@/components/ui/TextGenerate';
import { dbPrisma } from '@/lib/dbprisma';
import { getAllServices } from '@/data/Service';
import { Service } from '@prisma/client';
import assert from 'assert';
import { auth } from '@/auth';
import { cn } from '@/utils/cn';
import CardWrapper from '@/components/CardWrapper';

const BookingPage = async () => {
  const result = await getAllServices();
  const session = await auth();
  const isLoggedIn = !!session;

  //  TODO: REMOVE IN PRODUCTION
  assert(Array.isArray(result));
  return (
    <>
      <div className='flex min-h-dvh'>
        <div className='hidden basis-2/3 place-content-center bg-primary-100 p-10 lg:grid'>
          <TextGenerateEffect
            words={'SEA SALON The Best Salon in the World'}
            wordClassName='text-background text-5xl'
          ></TextGenerateEffect>
        </div>
        <div className='grid w-1/3 basis-full place-content-center bg-secondary shadow-lg lg:basis-1/3'>
          <CardWrapper className='w-full' title='Make a Reservation'>
            <ReservationForm
              serviceList={result}
              userName={session?.user?.name}
              // phone={session?.user?.phone} // TODO: IMPLEMENT
            />
          </CardWrapper>
        </div>
      </div>
    </>
  );
};
export default BookingPage;
