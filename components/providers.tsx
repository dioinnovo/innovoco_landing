"use client";

import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "./theme-provider";
import VirtualAssistant from "./virtual-assistant";

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
        {/* Temporarily disabled for production - debugging in progress */}
        {/* <div className="print:hidden">
          <VirtualAssistant apiEndpoint={chatEndpoint} />
        </div> */}
      </ThemeProvider>
    </SessionProvider>
  );
}