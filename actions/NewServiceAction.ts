'use server';

import { ServiceSchema } from '@/schemas/ServiceSchema';
import * as zod from 'zod';
import { dbPrisma } from '@/lib/dbprisma';
import { redirect } from 'next/navigation';

export const NewServiceAction = async (
  values: zod.infer<typeof ServiceSchema>
) => {
  const validatedFields = ServiceSchema.safeParse(values);
  if (!validatedFields.success)
    return { response: { error: 'invalid Fields' } };

  const { name, description, priceInRupiah, durationInMinute, image } =
    validatedFields.data;

  const stringImage: string = `${image}`;

  try {
    const result = await dbPrisma.service.create({
      data: {
        name: name,
        description: description,
        priceInRupiah: priceInRupiah,
        durationInMinute: durationInMinute,
        image: stringImage,
      },
    });
    if (!result) return { response: { error: 'invalid Data' } };
    return { response: { success: 'Successfully creating new service' } };
  } catch (error) {
    throw error;
  }
};
