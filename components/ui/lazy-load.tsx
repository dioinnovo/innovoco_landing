"use client";

import { Suspense, lazy } from 'react';
import { Loader2 } from 'lucide-react';

interface LazyLoadProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function LazyLoad({ children, fallback }: LazyLoadProps) {
  return (
    <Suspense 
      fallback={
        fallback || (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
          </div>
        )
      }
    >
      {children}
    </Suspense>
  );
}

// Helper for lazy loading with delay
export function lazyWithDelay<T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
  delay: number = 150
): React.LazyExoticComponent<T> {
  return lazy(() => {
    return Promise.all([
      importFunc(),
      new Promise(resolve => setTimeout(resolve, delay))
    ]).then(([moduleExports]) => moduleExports);
  });
}