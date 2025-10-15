import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "@/components/providers";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

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
    default: "Innovoco | Enterprise AI & Data Transformation Services",
    template: "%s | Innovoco"
  },
  description: "Transform your data warehouse into an intelligent business partner. Enterprise AI strategy, data engineering, and AI implementation services. 10+ years expertise, 1000+ solutions delivered.",
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
    title: 'Innovoco | Enterprise AI & Data Transformation',
    description: 'Transform your data warehouse into an intelligent business partner with enterprise AI services.',
    siteName: 'Innovoco',
    images: [{
      url: '/images/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Innovoco - Enterprise AI and Data Transformation',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Innovoco | Enterprise AI & Data Transformation',
    description: 'Enterprise AI strategy, implementation, and managed services.',
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
      </body>
    </html>
  );
}
