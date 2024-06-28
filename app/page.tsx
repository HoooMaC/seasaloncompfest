import AboutSection from '@/app/AboutSection';
import ServicesSection from '@/app/ServicesSection';
import GallerySection from '@/app/GallerySection';
import HeroSection from '@/app/HeroSection';
import BookSection from '@/app/BookSection';
import ReviewsSection from '@/app/ReviewsSection';
import NewReviewDialog from '@/components/NewReviewDialog';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { auth } from '@/auth';

export default async function Home() {
  const session = await auth();
  const user = session?.user;
  return (
    <>
      <Navbar user={user} />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <GallerySection />
        <ReviewsSection />
        {user && <NewReviewDialog />}
        <BookSection />
      </main>
      <Footer />
    </>
  );
}
