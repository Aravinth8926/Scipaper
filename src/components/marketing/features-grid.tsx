"use client";

import { motion } from "framer-motion";
import { Code, Layout, Link, Brain, FileBarChart, Users } from "lucide-react";
import { staggerContainer, staggerItem } from "@/lib/animations";
import { FEATURES } from "@/lib/constants";

const iconMap = {
  Code,
  Layout,
  Link,
  Brain,
  FileBarChart,
  Users,
};

export function FeaturesGrid() {
  return (
    <section className="py-20 md:py-28 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs tracking-widest uppercase text-primary-500 font-semibold">
            FEATURES
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Everything you need to publish faster
          </h2>
          <p className="mt-4 text-lg text-gray-500 dark:text-gray-400">
            One platform to catch every error, format every page, and validate every citation.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {FEATURES.map((feature) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap];
            return (
              <motion.div
                key={feature.id}
                variants={staggerItem}
                className="group relative rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6 hover:border-primary-200 dark:hover:border-primary-800 hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary-50 dark:bg-primary-950/50 text-primary-500 mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
