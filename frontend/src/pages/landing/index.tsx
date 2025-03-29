import React from 'react';
import LayoutWrapper from '@/layout/wrapper/LayoutWrapper';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AccountFeature from './components/AccountFeature';
import GroupsFeature from './components/GroupsFeature';
import ManagementFeature from './components/ManagementFeature';
import KeyFeatures from './components/KeyFeatures';
import SeamlessExperience from './components/SeamlessExperience';
import Testimonials from './components/Testimonials';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

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
