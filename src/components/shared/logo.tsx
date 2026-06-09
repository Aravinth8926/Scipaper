"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className = "", showText = true }: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2 group">
      <motion.div
        className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-accent-500"
        whileHover={{ rotate: 10 }}
        transition={{ duration: 0.2 }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 text-white"
        >
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M12 18v-6" />
          <path d="m9 15 3 3 3-3" />
        </svg>
      </motion.div>
      {showText && (
        <span className="text-xl font-bold text-gray-900 dark:text-white transition-colors">
          SciPaper<span className="text-gradient">AI</span>
        </span>
      )}
    </Link>
  );
}
