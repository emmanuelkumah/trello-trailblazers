import LayoutWrapper from '@/layout/wrapper/LayoutWrapper';
import Header from './sections/Header';
import HeroSection from './sections/HeroSection';
import FeaturesSection from './sections/FeaturesSection';
import TestimonialsSection from './sections/TestimonialsSection';
import CTASection from './sections/CTASection';

const LandingPage = () => {
  return (
    <LayoutWrapper>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </LayoutWrapper>
  );
};

export default LandingPage;
