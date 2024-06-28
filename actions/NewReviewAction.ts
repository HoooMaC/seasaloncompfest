'use server';
import * as zod from 'zod';
import { dbPrisma } from '@/lib/dbprisma';
import ReviewSchema from '@/schemas/ReviewSchema';

export const NewReviewAction = async (
  values: zod.infer<typeof ReviewSchema>
) => {
  const validatedFields = ReviewSchema.safeParse(values);
  if (!validatedFields.success)
    return { response: { error: 'invalid Fields' } };

  const { name, rating, message } = validatedFields.data;

  try {
    const result = await dbPrisma.review.create({
      data: {
        name,
        rating,
        message,
      },
    });
    if (!result) return { response: { error: 'invalid Data' } };
    console.log({ result });
    return { response: { success: 'Successfully creating new review' } };
  } catch (error) {
    console.log({ error });
    return { response: { error: 'Failed creating new review' } };
  }
};
