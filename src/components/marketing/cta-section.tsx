"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 md:py-28 lg:py-32 relative overflow-hidden">
      {/* Gradient Background */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
        }}
      />

      {/* Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 grid-pattern" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
            Ready to publish with confidence?
          </h2>
          <p className="mt-6 text-lg md:text-xl text-white/80">
            Join thousands of researchers who trust SciPaper AI to perfect their publications.
            Start analyzing your papers today — no credit card required.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="secondary"
              size="xl"
              className="bg-white text-primary-600 hover:bg-gray-100"
              asChild
            >
              <Link href="/sign-up">
                Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" className="border-white text-white hover:bg-white/10" asChild>
              <Link href="/contact">Contact Sales</Link>
            </Button>
          </div>

          <p className="mt-6 text-sm text-white/60">
            No credit card required. Free forever plan available.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
