import LayoutWrapper from '@/layout/wrapper/LayoutWrapper';
import Navbar from './sections/Navbar';
import HeroSection from './sections/HeroSection';
import AccountFeature from './sections/AccountFeature';
import GroupsFeature from './sections/GroupsFeature';
import ManagementFeature from './sections/ManagementFeature';
import KeyFeatures from './sections/KeyFeatures';
import SeamlessExperience from './sections/SeamlessExperience';
import Testimonials from './sections/Testimonials';
import CallToAction from './sections/CallToAction';
import Footer from './sections/Footer';

const LandingPage = () => {
  return (
    <LayoutWrapper>
      <Navbar />
      <HeroSection />
      <AccountFeature />
      <GroupsFeature />
      <ManagementFeature />
      <KeyFeatures />
      <SeamlessExperience />
      <Testimonials />
      <CallToAction />
      <Footer />
    </LayoutWrapper>
  );
};

export default LandingPage;
