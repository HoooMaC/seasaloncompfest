'use server';

import { BookingSchema } from '@/schemas/BookingSchema';
import * as zod from 'zod';
import { dbPrisma } from '@/lib/dbprisma';
import { redirect } from 'next/navigation';
import { Branch, Role } from '@prisma/client';
import { calculateEndTime } from '@/lib/utils/time';

export const newReservation = async (
  values: zod.infer<typeof BookingSchema>
) => {
  //   -----------------------------------
  const validatedFields = BookingSchema.safeParse(values);
  if (!validatedFields.success)
    return { response: { error: 'invalid Fields' } };

  const { name, phone, type, date, time } = validatedFields.data;
  const stringDate = date.toDateString();

  const service = await dbPrisma.service.findFirst({
    where: {
      name: type,
    },
  });

  const branch = await dbPrisma.branch.findFirst({});
  // TODO
  const customer = await dbPrisma.user.findFirst({ where: { name: name } });

  const result = await dbPrisma.reservation.create({
    data: {
      name: customer?.name || name,
      phone: phone,
      date: date,
      startTime: time,
      endTime: calculateEndTime(time, service?.durationInMinute || 0),
      customerId: customer?.id,
      serviceId: service?.id || '',
      branchId: branch?.id || '',
    },
  });
  return redirect('http://localhost:3000/');
  //   -----------------------------------
};
