"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/lib/constants";

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28 lg:py-32 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-xs tracking-widest uppercase text-primary-500 font-semibold">
            TESTIMONIALS
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Trusted by researchers worldwide
          </h2>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-6">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center text-white font-semibold">
                  {testimonial.name.split(" ")[0][0]}
                  {testimonial.name.split(" ")[1]?.[0]}
                </div>
                <div>
                  <div className="font-medium text-sm text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {testimonial.title} · {testimonial.institution}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
