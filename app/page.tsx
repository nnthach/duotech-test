import ScrollToTopButton from "@/components/custom/ScrollToTopButton";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import AvailabilitySection from "@/components/sections/home/AvailabilitySection";
import CtaSection from "@/components/sections/home/CtaSection";
import FeatureSection from "@/components/sections/home/WhyTrainlySection";
import HeroSection from "@/components/sections/home/HeroSection";
import HowItWorksSection from "@/components/sections/home/HowItWorksSection";
import MarqueeSection from "@/components/sections/home/MarqueeSection";
import PricingSection from "@/components/sections/home/PricingSection";
import ProblemSection from "@/components/sections/home/ProblemSection";
import TestimonialSection from "@/components/sections/home/TestimonialSection";
import TrainersSection from "@/components/sections/home/TrainersSection";
import DifferentSection from "@/components/sections/home/DifferentSection";
import WhyItWorkSection from "@/components/sections/home/WhyItWorkSection";

export default function Home() {
  return (
    <div className="bg-sand text-charcoal">
      {/* Header */}
      <Header />

      {/* Hero: the hook */}
      <HeroSection />

      {/* Ticker */}
      <MarqueeSection />

      {/* Problem: why fitness journeys stall */}
      <ProblemSection />

      {/* About: the Trainly difference */}
      <DifferentSection />

      {/* How it works */}
      <HowItWorksSection />

      <WhyItWorkSection />

      {/* Browse trainers */}
      <TrainersSection />

      {/* Why Trainly */}
      <FeatureSection />

      {/* Coaching plans */}
      <PricingSection />

      {/* Testimonials */}
      <TestimonialSection />

      {/* Availability */}
      <AvailabilitySection />

      {/* CTA */}
      <CtaSection />

      {/* Footer */}
      <Footer />

      <ScrollToTopButton />
    </div>
  );
}
