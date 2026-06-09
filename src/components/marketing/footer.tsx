import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { siteConfig } from "@/config/site";

const footerLinks = {
  product: [
    { name: "Features", href: "/features" },
    { name: "Pricing", href: "/pricing" },
    { name: "Changelog", href: "/changelog" },
    { name: "Roadmap", href: "/roadmap" },
    { name: "API Docs", href: "/docs/api" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
    { name: "Press", href: "/press" },
    { name: "Partners", href: "/partners" },
  ],
  legal: [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms", href: "/terms" },
    { name: "Security", href: "/security" },
    { name: "GDPR", href: "/gdpr" },
    { name: "Status", href: "https://status.scipaper.ai" },
  ],
};

const socialLinks = [
  { name: "Twitter", icon: Twitter, href: siteConfig.links.twitter },
  { name: "GitHub", icon: Github, href: siteConfig.links.github },
  { name: "LinkedIn", icon: Linkedin, href: siteConfig.links.linkedin },
];

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 max-w-xs">
              Your AI Research Partner for Flawless Scientific Publications
            </p>
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Product Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} SciPaper AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <select
              className="text-sm text-gray-500 dark:text-gray-400 bg-transparent border border-gray-300 dark:border-gray-700 rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-primary-500"
              defaultValue="en"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="de">Deutsch</option>
              <option value="fr">Français</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  );
}
