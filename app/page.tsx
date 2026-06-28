import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import AboutSection from "@/components/sections/home/AboutSection";
import CtaSection from "@/components/sections/home/CtaSection";
import FeatureSection from "@/components/sections/home/FeatureSection";
import HeroSection from "@/components/sections/home/HeroSection";
import PricingSection from "@/components/sections/home/PricingSection";
import ProgramSection from "@/components/sections/home/ProgramSection";
import TestimonialSection from "@/components/sections/home/TestimonialSection";

export default function Home() {
  return (
    <div className="bg-black text-white">
      {/* Header */}
      <Header />

      {/* Hero */}
      <HeroSection />

      {/* Features */}
      <FeatureSection />

      {/* About */}
      <AboutSection />

      {/* Programs */}
      <ProgramSection />

      {/* CTA */}
      <CtaSection />

      {/* Pricing */}
      <PricingSection />

      {/* Testimonials */}
      <TestimonialSection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
