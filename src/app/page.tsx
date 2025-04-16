import HeroSection from '@src/components/landing/HeroSection';
import CTASection from '@src/components/landing/CTASection';
import DemoSection from '@src/components/landing/DemoSection';
import FeaturesSection from '@src/components/landing/FeaturesSection';
import SecurityStatsSection from '@src/components/landing/SecurityStatsSection';
import BackgroundCyber from '@src/components/ui/BackgroundCyber';

export default function Home() {
  return (
    <>
      <BackgroundCyber />
      <HeroSection />
      <FeaturesSection />
      <DemoSection />
      <SecurityStatsSection />
      <CTASection />
    </>
  );
}
