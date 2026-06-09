"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PRICING_TIERS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function PricingCards() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");

  return (
    <section className="py-20 md:py-28 lg:py-32" id="pricing">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs tracking-widest uppercase text-primary-500 font-semibold">
            PRICING
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Choose the plan that fits your research
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            Start free, upgrade when you need more power
          </p>

          {/* Billing Toggle */}
          <div className="mt-8 inline-flex items-center gap-3 rounded-full border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 p-1">
            <button
              onClick={() => setBillingPeriod("monthly")}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                billingPeriod === "monthly"
                  ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod("annual")}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                billingPeriod === "annual"
                  ? "bg-white dark:bg-gray-800 text-gray-900 dark:text-white shadow-sm"
                  : "text-gray-500 dark:text-gray-400"
              )}
            >
              Annual
              <span className="ml-2 text-xs text-green-600 dark:text-green-400">(Save 20%)</span>
            </button>
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {PRICING_TIERS.map((tier, index) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "relative rounded-2xl border bg-white dark:bg-gray-900 p-8 flex flex-col",
                tier.highlighted
                  ? "border-primary-500 shadow-xl scale-105 md:scale-110"
                  : "border-gray-200 dark:border-gray-800"
              )}
            >
              {tier.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex rounded-full bg-gradient-to-r from-primary-500 to-accent-500 px-4 py-1 text-xs font-semibold text-white">
                    {tier.badge}
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{tier.name}</h3>
                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {tier.description}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline">
                  <span className="text-5xl font-bold text-gray-900 dark:text-white">
                    ${tier.price[billingPeriod]}
                  </span>
                  <span className="ml-2 text-gray-500 dark:text-gray-400">/mo</span>
                </div>
                {billingPeriod === "annual" && tier.price.annual > 0 && (
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Billed annually (${tier.price.annual * 12}/year)
                  </p>
                )}
              </div>

              <ul className="mb-8 space-y-3 flex-1">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={tier.highlighted ? "default" : "outline"}
                size="lg"
                className="w-full"
                asChild
              >
                <Link href={tier.id === "team" ? "/contact" : "/sign-up"}>{tier.cta}</Link>
              </Button>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          All plans include SSL security, daily backups, and 99.9% uptime SLA
        </motion.p>
      </div>
    </section>
  );
}
