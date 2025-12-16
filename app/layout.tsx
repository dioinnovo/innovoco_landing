import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

// Force dynamic rendering globally to avoid SSG issues with client component providers
export const dynamic = 'force-dynamic';

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: 'swap', // Ensures text is visible immediately
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']
});

export const metadata: Metadata = {
  metadataBase: new URL('https://innovoco.com'),
  title: {
    default: "Enterprise AI & Data Transformation | Proven Implementation Services",
    template: "%s | Innovoco"
  },
  description: "Transform your data warehouse into an AI-powered advantage. Enterprise AI strategy, implementation, and scaling services. From POC to production in 12-16 weeks. 1000+ solutions delivered, 500+ enterprises transformed.",
  keywords: [
    "enterprise AI consulting",
    "data warehouse modernization",
    "AI implementation services",
    "enterprise data transformation",
    "AI strategy consulting",
    "cloud data migration",
    "MLOps services",
    "managed AI services",
    "Azure AI services",
    "Google Cloud AI"
  ],
  authors: [{ name: "Innovoco", url: "https://innovoco.com" }],
  creator: "Innovoco",
  publisher: "Innovoco",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://innovoco.com',
    title: 'Enterprise AI & Data Transformation | Proven Implementation at Scale',
    description: 'Transform your data warehouse into an AI-powered advantage. From POC to production in 12-16 weeks. 1000+ solutions delivered, 500+ enterprises transformed.',
    siteName: 'Innovoco',
    images: [{
      url: '/images/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Innovoco - Enterprise AI and Data Transformation Leader',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Enterprise AI & Data Transformation | Proven Implementation',
    description: 'Enterprise AI strategy, implementation, and scaling services. 12-16 weeks from POC to production. 1000+ solutions, 500+ enterprises transformed.',
    images: ['/images/twitter-card.png'],
  },
  alternates: {
    canonical: 'https://innovoco.com',
  },
  icons: {
    icon: '/images/icons/Innovoco-NN-lores.png',
    shortcut: '/images/icons/Innovoco-NN-lores.png',
    apple: '/images/icons/Innovoco-NN-lores.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased transition-colors duration-300`}
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
