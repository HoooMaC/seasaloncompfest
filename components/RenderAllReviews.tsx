import ReviewCard from '@/components/ReviewCard';
import { dbPrisma } from '@/lib/dbprisma';

const RenderAllReviews = async () => {
  const allReviews = await dbPrisma.review.findMany();
  return (
    <div className='mx-auto flex w-full flex-wrap items-center justify-center gap-4'>
      {allReviews.map((review, index) => {
        return (
          <ReviewCard
            name={review.name}
            rating={review.rating}
            message={review.message}
          />
        );
      })}
    </div>
  );
};
export default RenderAllReviews;
