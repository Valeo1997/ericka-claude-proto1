import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { LiveTicker } from '../components/LiveTicker';
import { Hero } from '../components/Hero';
import { SocialProof } from '../components/SocialProof';
import { LiveDemo } from '../components/LiveDemo';
import { HowItWorks } from '../components/HowItWorks';
import { Features } from '../components/Features';
import { Emergency } from '../components/Emergency';
import { SuccessStory } from '../components/SuccessStory';
import { StoryCarousel } from '../components/StoryCarousel';
import { DashboardPreview } from '../components/DashboardPreview';
import { Pricing } from '../components/Pricing';
import { FAQ } from '../components/FAQ';
import { FinalCTA } from '../components/FinalCTA';
import { Footer } from '../components/Footer';
import { VoiceCallModal } from '../components/VoiceCallModal';

export const LandingPage = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen selection:bg-electric-blue/30 bg-navy-slate pb-12">
      {/* Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-electric-blue z-[60] transition-all duration-100 ease-linear glow-blue"
        style={{ width: `${scrollProgress}%` }}
      />
      
      <Navbar />
      <LiveTicker />
      <Hero />
      <SocialProof />
      <LiveDemo onOpenCall={() => setIsCallModalOpen(true)} />
      <HowItWorks />
      <StoryCarousel />
      <Emergency />
      <Features />
      <DashboardPreview />
      <SuccessStory />
      <Pricing />
      <FAQ />
      <FinalCTA />
      <Footer />
      <VoiceCallModal isOpen={isCallModalOpen} onClose={() => setIsCallModalOpen(false)} />
    </div>
  );
};
