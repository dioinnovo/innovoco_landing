"use client";

import { useEffect } from 'react';

export function PerformanceMonitor() {
  useEffect(() => {
    // Monitor Core Web Vitals
    if (typeof window !== 'undefined' && 'web-vital' in window) {
      try {
        // Lazy load web-vitals library
        import('web-vitals').then((vitals) => {
          vitals.onCLS(console.log);
          vitals.onINP(console.log); // FID is replaced by INP in web-vitals v3+
          vitals.onFCP(console.log);
          vitals.onLCP(console.log);
          vitals.onTTFB(console.log);
        });
      } catch (error) {
        console.error('Failed to load web-vitals:', error);
      }
    }

    // Monitor long tasks
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            // Log tasks longer than 50ms
            if (entry.duration > 50) {
              console.warn('Long task detected:', {
                duration: entry.duration,
                startTime: entry.startTime,
                name: entry.name
              });
            }
          }
        });
        
        observer.observe({ entryTypes: ['longtask'] });
        
        return () => observer.disconnect();
      } catch (error) {
        console.error('Failed to setup PerformanceObserver:', error);
      }
    }
  }, []);

  return null;
}