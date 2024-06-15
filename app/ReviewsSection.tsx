import SectionTitle from '@/components/SectionTitle';
import RenderAllReviews from '@/components/RenderAllReviews';

const ReviewsSection = async () => {
  return (
    <>
      <section id='reviews' className='bg-background py-40 text-black'>
        <div className='container'>
          <SectionTitle className='text-text mb-12'>
            What People Say
          </SectionTitle>
          <div className='mb-12 flex flex-wrap items-center justify-center gap-4'>
            <RenderAllReviews />
          </div>
        </div>
      </section>
    </>
  );
};
export default ReviewsSection;
