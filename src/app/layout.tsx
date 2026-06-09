import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SciPaper AI - Your AI Research Partner",
    template: "%s | SciPaper AI",
  },
  description:
    "Detect LaTeX errors, validate citations, auto-format for any journal, and generate submission-ready reports — all powered by AI that understands science.",
  keywords: [
    "LaTeX",
    "scientific writing",
    "research papers",
    "citation validation",
    "journal formatting",
    "AI writing assistant",
  ],
  authors: [
    {
      name: "SciPaper AI",
      url: "https://scipaper.ai",
    },
  ],
  creator: "SciPaper AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://scipaper.ai",
    title: "SciPaper AI - Your AI Research Partner",
    description:
      "Your AI Research Partner for Flawless Scientific Publications",
    siteName: "SciPaper AI",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "SciPaper AI",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SciPaper AI - Your AI Research Partner",
    description:
      "Your AI Research Partner for Flawless Scientific Publications",
    images: ["/og-image.png"],
    creator: "@scipaperai",
  },
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://scipaper.ai"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
