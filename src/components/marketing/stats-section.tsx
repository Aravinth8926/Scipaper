"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { STATS } from "@/lib/constants";

function AnimatedCounter({ end, duration = 2 }: { end: string; duration?: number }) {
  const [count, setCount] = useState("0");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    // For non-numeric values, just display them
    if (!/^\d+/.test(end)) {
      setCount(end);
      return;
    }

    const endValue = parseInt(end.replace(/\D/g, ""), 10);
    const suffix = end.replace(/[\d.]/g, "");
    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / (duration * 1000);

      if (progress < 1) {
        const currentCount = Math.floor(endValue * progress);
        setCount(currentCount + suffix);
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-bold text-gradient">
      {count}
    </span>
  );
}

const stats = [
  { label: "Documents Analyzed", value: STATS.documentsAnalyzed },
  { label: "Journal Formats", value: STATS.journalFormats },
  { label: "Error Detection Rate", value: STATS.errorDetectionRate },
  { label: "Researchers Worldwide", value: STATS.researchers },
];

export function StatsSection() {
  return (
    <section className="py-20 md:py-28 lg:py-32 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <AnimatedCounter end={stat.value} />
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
