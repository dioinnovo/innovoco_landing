import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap', // Prevent layout shift
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto']
});

export const metadata: Metadata = {
  title: "Innovoco AI & Automation - Enterprise AI Solutions",
  description: "Transform your data infrastructure into a competitive advantage with enterprise-grade AI solutions built for scale.",
  keywords: "AI solutions, enterprise AI, data transformation, automation, machine learning",
  openGraph: {
    title: "Innovoco AI & Automation",
    description: "Enterprise AI Solutions Built for Scale",
    images: ["/og-image.png"],
  },
};

export default function OptimizedRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/images/logos/innovoco-logo.png" as="image" />
        
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        
        {/* Resource hints for faster page loads */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#0A58D0" />
        
        {/* Optimize rendering */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* Script to prevent FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Prevent flash of unstyled content
              document.documentElement.style.visibility = 'hidden';
              document.addEventListener('DOMContentLoaded', function() {
                document.documentElement.style.visibility = '';
              });
            `,
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        
        {/* Performance monitoring script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Monitor Core Web Vitals
              if (typeof window !== 'undefined' && 'performance' in window) {
                window.addEventListener('load', function() {
                  const perfData = window.performance.timing;
                  const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                  console.log('Page Load Time:', pageLoadTime + 'ms');
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}