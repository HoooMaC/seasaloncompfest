import AboutSection from '@/app/AboutSection';
import ServicesSection from '@/app/ServicesSection';
import GallerySection from '@/app/GallerySection';
import HeroSection from '@/app/HeroSection';
import BookSection from '@/app/BookSection';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <GallerySection />
      <BookSection />
    </main>
  );
}
