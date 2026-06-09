"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

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
            FAQ
          </span>
          <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white">
            Frequently asked questions
          </h2>
        </motion.div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto space-y-4">
          {FAQ_ITEMS.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
              >
                <span className="font-semibold text-gray-900 dark:text-white pr-8">
                  {faq.question}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-gray-500 transition-transform flex-shrink-0",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              <motion.div
                initial={false}
                animate={{
                  height: openIndex === index ? "auto" : 0,
                  opacity: openIndex === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 text-sm text-gray-600 dark:text-gray-400">
                  {faq.answer}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
