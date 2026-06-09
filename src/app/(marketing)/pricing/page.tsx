import { PricingCards } from "@/components/marketing/pricing-cards";

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
          Simple, Transparent Pricing
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Choose the plan that fits your research needs. Start free, upgrade anytime.
        </p>
      </div>
      <PricingCards />
    </div>
  );
}
