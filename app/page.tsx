import AboutSection from '@/app/AboutSection';
import ServicesSection from '@/app/ServicesSection';
import GallerySection from '@/app/GallerySection';
import HeroSection from '@/app/HeroSection';
import BookSection from '@/app/BookSection';
import ReviewsSection from '@/app/ReviewsSection';
import NewReviewDialog from '@/components/NewReviewDialog';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <GallerySection />
        <ReviewsSection />
        <NewReviewDialog />
        <BookSection />
      </main>
      <Footer />
    </>
  );
}
