'use server';

import { ServiceSchema } from '@/schemas/ServiceSchema';
import * as zod from 'zod';
import { dbPrisma } from '@/lib/dbprisma';
import { redirect } from 'next/navigation';

export const NewServiceAction = async (
  values: zod.infer<typeof ServiceSchema>
) => {
  const validatedFields = ServiceSchema.safeParse(values);
  console.log({ values });
  console.log({ validatedFields });
  if (!validatedFields.success)
    return { response: { error: 'invalid Fields' } };

  const { name, description, priceInRupiah, durationInMinute, image } =
    validatedFields.data;

  try {
    const result = await dbPrisma.service.create({
      data: {
        name: name,
        description: description,
        priceInRupiah: priceInRupiah,
        durationInMinute: durationInMinute,
        image: image || '',
      },
    });
    if (!result) return { response: { error: 'invalid Data' } };
  } catch (error) {
    throw error;
  } finally {
    return redirect('http://localhost:3000/');
  }
};
