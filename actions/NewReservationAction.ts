'use server';

import { BookingSchema } from '@/schemas/BookingSchema';
import * as zod from 'zod';
import { dbPrisma } from '@/lib/dbprisma';
import { redirect } from 'next/navigation';

export const newReservation = async (
  values: zod.infer<typeof BookingSchema>
) => {
  //   -----------------------------------
  const validatedFields = BookingSchema.safeParse(values);
  if (!validatedFields.success)
    return { response: { error: 'invalid Fields' } };

  const { name, phone, type, date, time } = validatedFields.data;
  const stringDate = date.toDateString();
  const result = await dbPrisma.reservation.create({
    data: {
      name: name,
      phone: phone,
      type: type,
      date: stringDate,
      time: time,
    },
  });
  return redirect('http://localhost:3000/');
  //   -----------------------------------
};
