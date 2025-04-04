import LayoutWrapper from "@/layout/wrapper/LayoutWrapper";
import AccountFeature from "@/ui/landing/AccountFeature";
import CallToAction from "@/ui/landing/CallToAction";
import Footer from "@/ui/landing/Footer";
import GroupsFeature from "@/ui/landing/GroupsFeature";
import HeroSection from "@/ui/landing/HeroSection";
import KeyFeatures from "@/ui/landing/KeyFeatures";
import ManagementFeature from "@/ui/landing/ManagementFeature";
import Navbar from "@/ui/landing/Navbar";
import SeamlessExperience from "@/ui/landing/SeamlessExperience";
import Testimonials from "@/ui/landing/Testimonials";


export default function LandingPage() {
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
}
