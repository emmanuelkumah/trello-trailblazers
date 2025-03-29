import LayoutWrapper from "@/layout/wrapper/LayoutWrapper";
import HeroSection from "./sections/HeroSection";
import FeaturesSection from "./sections/FeaturesSection";
// import TestimonialsSection from "./sections/TestimonialsSection";
// import CTASection from "./sections/CTASection";

const LandingPage = () => {
  return (
    <LayoutWrapper>
      <HeroSection />
      <FeaturesSection />
      {/* <TestimonialsSection />
      <CTASection /> */}
    </LayoutWrapper>
  );
};

export default LandingPage;
