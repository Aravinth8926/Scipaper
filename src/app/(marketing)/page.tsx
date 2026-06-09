"use client";

import { HeroSection } from "@/components/marketing/hero-section";
import { LogoCloud } from "@/components/marketing/logo-cloud";
import { FeaturesGrid } from "@/components/marketing/features-grid";
import { StatsSection } from "@/components/marketing/stats-section";
import { PricingCards } from "@/components/marketing/pricing-cards";
import { TestimonialsSection } from "@/components/marketing/testimonials";
import { FAQSection } from "@/components/marketing/faq-section";
import { CTASection } from "@/components/marketing/cta-section";

export default function LandingPage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <LogoCloud />
      <FeaturesGrid />
      <StatsSection />
      <TestimonialsSection />
      <PricingCards />
      <FAQSection />
      <CTASection />
    </div>
  );
}
