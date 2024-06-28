'use server';
import { dbPrisma } from '@/lib/dbprisma';

export async function addNewReview({
  name,
  message,
  rating,
}: {
  name: string;
  message: string;
  rating: number;
}) {
  const result = await dbPrisma.review.create({
    data: {
      name: name,
      message: message,
      rating: rating,
    },
  });

  // console.log({ result });
}

export async function getAllReviews() {
  const result = await dbPrisma.review.findMany();
  return result.length ? result[0] : null;
}
