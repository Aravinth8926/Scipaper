"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(59, 130, 246, 0.15) 0%, transparent 100%)",
        }}
      />

      {/* Floating Cards */}
      <motion.div
        className="absolute top-20 right-[10%] hidden lg:block"
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="glass-morphism rounded-xl p-4 w-64 shadow-lg">
          <pre className="text-xs text-gray-700 dark:text-gray-300 font-mono">
            {`\\begin{equation}
  E = mc^2
\\end{equation}`}
          </pre>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-32 left-[5%] hidden lg:block"
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="glass-morphism rounded-xl p-4 w-72 shadow-lg">
          <pre className="text-xs text-gray-700 dark:text-gray-300 font-mono">
            {`@article{Chen2023,
  author = "S. Chen",
  title = "Quantum Methods",
  year = "2023"
}`}
          </pre>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {/* Announcement Badge */}
          <motion.div variants={staggerItem} className="inline-flex mb-8">
            <Link
              href="/changelog"
              className="group inline-flex items-center gap-2 rounded-full border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-950/50 px-4 py-1.5 text-sm font-medium text-primary-700 dark:text-primary-300 hover:bg-primary-100 dark:hover:bg-primary-900/50 transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              <span>Now supporting 500+ journal formats</span>
              <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </motion.div>

          {/* Headline */}
          <motion.div variants={staggerItem} className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight">
              <span className="text-gray-600 dark:text-gray-400">Publish with</span>
              <br />
              <span className="text-gradient">Confidence.</span>
            </h1>
            <p className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mt-4">
              Your AI Research Partner for Flawless Scientific Publications
            </p>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            variants={staggerItem}
            className="mt-6 text-lg md:text-xl text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Detect LaTeX errors, validate citations, auto-format for any journal, and generate
            submission-ready reports — all powered by AI that understands science.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={staggerItem} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
            <Button variant="default" size="xl" asChild>
              <Link href="/sign-up">
                Start Free Analysis <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </motion.div>

          {/* Social Proof */}
          <motion.div variants={staggerItem} className="mt-12">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
              Trusted by 2,000+ researchers at leading institutions
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
