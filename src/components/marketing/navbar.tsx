"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { cn } from "@/lib/utils";
import { marketingConfig } from "@/config/site";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          scrolled
            ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-sm"
            : "bg-transparent"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <nav className="container mx-auto px-4 md:px-6">
          <div className="flex h-16 md:h-18 items-center justify-between">
            {/* Logo */}
            <Logo />

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {marketingConfig.mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors relative group"
                >
                  {item.title}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
              <Button variant="ghost" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
              <Button variant="gradient" asChild>
                <Link href="/dashboard/upload">Upload Document</Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden bg-white dark:bg-gray-950"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container mx-auto px-4 pt-24 pb-8">
              <nav className="flex flex-col gap-6">
                {marketingConfig.mainNav.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link
                      href={item.href}
                      className="text-2xl font-semibold text-gray-900 dark:text-white hover:text-primary-500 transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.title}
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  className="mt-8 flex flex-col gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Button variant="outline" size="lg" asChild className="w-full">
                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                      Dashboard
                    </Link>
                  </Button>
                  <Button variant="gradient" size="lg" asChild className="w-full">
                    <Link href="/dashboard/upload" onClick={() => setMobileMenuOpen(false)}>
                      Upload Document
                    </Link>
                  </Button>
                </motion.div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
