"use client";

import { motion } from "framer-motion";
import { UNIVERSITIES } from "@/lib/constants";

export function LogoCloud() {
  return (
    <section className="py-12 md:py-16 border-y border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16 opacity-60 hover:opacity-100 transition-opacity">
          {UNIVERSITIES.map((uni, index) => (
            <motion.div
              key={uni.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-center grayscale hover:grayscale-0 transition-all"
            >
              <span className="text-2xl font-bold text-gray-600 dark:text-gray-400">
                {uni.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
