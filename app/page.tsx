import AboutSection from '@/app/AboutSection';
import ServicesSection from '@/app/ServicesSection';
import GallerySection from '@/app/GallerySection';
import HeroSection from '@/app/HeroSection';
import BookSection from '@/app/BookSection';
import ReviewsSection from '@/app/ReviewsSection';
import FormStar from '@/app/FormStar';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <ReviewsSection />
      <BookSection />
    </main>
  );
}
