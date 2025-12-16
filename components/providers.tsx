"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./theme-provider";
// TEMPORARILY DISABLED: VirtualAssistant has bugs being fixed
// import VirtualAssistant from "./virtual-assistant";

// Suppress React DevTools warnings about async params/searchParams in Next.js 16
// These are dev-only warnings caused by DevTools serializing Promise objects
// Must run at module level to catch early warnings before React renders
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  const originalError = console.error;
  console.error = (...args: unknown[]) => {
    // Convert all arguments to a single string for matching
    const fullMessage = args.map(arg => String(arg)).join(' ');
    const firstArg = String(args[0] || '');

    // Suppress Next.js 16 async params/searchParams DevTools warnings
    if (
      firstArg.includes('params are being enumerated') ||
      firstArg.includes('params` is a Promise') ||
      (firstArg.includes('searchParams') && firstArg.includes('Promise'))
    ) {
      return;
    }

    // Suppress hydration mismatches from browser extensions (Cursor, etc.)
    // The error mentions "hydrat" and the diff shows "data-cursor-element-id"
    if (
      firstArg.includes('hydrat') &&
      fullMessage.includes('data-cursor-element-id')
    ) {
      return;
    }

    originalError.apply(console, args);
  };
}

export function Providers({ children }: { children: React.ReactNode }) {
  // Use environment variable to choose endpoint, default to LangGraph orchestrator
  // Set NEXT_PUBLIC_CHAT_ENDPOINT to switch between frameworks
  const chatEndpoint = typeof window !== 'undefined'
    ? process.env.NEXT_PUBLIC_CHAT_ENDPOINT || '/api/orchestrate'
    : '/api/orchestrate';

  // For easy testing, you can switch between:
  // - '/api/orchestrate' (LangGraph - recommended, with all fixes)
  // - '/api/chat/n8n' (N8N webhook integration)

  return (
    <SessionProvider refetchInterval={0} refetchOnWindowFocus={false}>
      <ThemeProvider defaultTheme="light">
        {children}
        {/* TEMPORARILY DISABLED: VirtualAssistant has bugs being fixed */}
        {/* <div className="print:hidden">
          <VirtualAssistant apiEndpoint={chatEndpoint} />
        </div> */}
      </ThemeProvider>
    </SessionProvider>
  );
}