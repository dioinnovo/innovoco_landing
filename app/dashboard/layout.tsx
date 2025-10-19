"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { UserMenu } from "@/components/dashboard/user-menu";
import {
  Home,
  Megaphone,
  Layers,
  Briefcase,
  GitBranch,
  FolderKanban,
  TrendingUp,
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const sidebarItems = [
  {
    title: "Overview",
    href: "/dashboard",
    icon: Home,
  },
  {
    title: "Marketing",
    href: "/dashboard/marketing",
    icon: Megaphone,
  },
  {
    title: "AI Stack",
    href: "/dashboard/ai-stack",
    icon: Layers,
  },
  {
    title: "Pipeline",
    href: "/dashboard/pipeline",
    icon: GitBranch,
  },
  {
    title: "Projects",
    href: "/dashboard/projects",
    icon: FolderKanban,
  },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:flex flex-col border-r border-border/50 bg-card/50 backdrop-blur transition-all duration-300",
          sidebarCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b border-border/50">
          <Link href="/dashboard" className="flex items-center">
            {sidebarCollapsed ? (
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
            ) : (
              <Image 
                src="/images/logos/Innovoco-Logo-hires.png" 
                alt="Innovoco" 
                width={120} 
                height={40} 
                className="h-8 w-auto"
                priority
              />
            )}
          </Link>
          <div className="flex items-center gap-2">
            {!sidebarCollapsed && (
              <>
                <UserMenu />
                <ThemeToggle />
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="hover:bg-muted"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="h-4 w-4" />
              ) : (
                <ChevronLeft className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
        
        <ScrollArea className="flex-1 py-4">
          <nav className="space-y-1 px-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-3 rounded-lg px-3 py-2 transition-all hover:bg-muted",
                    isActive && "bg-primary/10 text-primary border-l-2 border-primary",
                    sidebarCollapsed && "justify-center"
                  )}
                  title={sidebarCollapsed ? item.title : undefined}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {!sidebarCollapsed && <span>{item.title}</span>}
                </Link>
              );
            })}
          </nav>
        </ScrollArea>
        
        <div className="p-4 border-t border-border/50">
          <Link href="/" target="_blank">
            <Button 
              variant="outline" 
              className={cn(
                "w-full border-border hover:bg-muted",
                sidebarCollapsed && "px-2"
              )}
            >
              {sidebarCollapsed ? "🌐" : "View Landing Page"}
            </Button>
          </Link>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 h-16 bg-background border-b border-border/50 flex items-center justify-between px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
        <Link href="/dashboard" className="flex items-center">
          <Image 
            src="/images/logos/Innovoco-Logo-hires.png" 
            alt="Innovoco" 
            width={100} 
            height={32} 
            className="h-7 w-auto"
          />
        </Link>
        <div className="flex items-center gap-2">
          <UserMenu />
          <ThemeToggle />
        </div>
      </div>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="flex-1 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <aside className="w-64 bg-card/95 backdrop-blur border-l border-border/50">
            <div className="flex h-16 items-center px-4 border-b border-border/50">
              <Link href="/dashboard" className="flex items-center">
                <Image 
                  src="/images/logos/Innovoco-Logo-hires.png" 
                  alt="Innovoco" 
                  width={120} 
                  height={40} 
                  className="h-8 w-auto"
                />
              </Link>
            </div>
            
            <ScrollArea className="h-[calc(100vh-4rem)] py-4">
              <nav className="space-y-1 px-2">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center space-x-3 rounded-lg px-3 py-2 transition-all hover:bg-muted",
                        isActive && "bg-primary/10 text-primary border-l-2 border-primary"
                      )}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  );
                })}
              </nav>
              
              <div className="p-4 mt-4 border-t border-border/50">
                <Link href="/" target="_blank">
                  <Button 
                    variant="outline" 
                    className="w-full border-border hover:bg-muted"
                  >
                    View Landing Page
                  </Button>
                </Link>
              </div>
            </ScrollArea>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6 lg:p-8 mt-16 lg:mt-0">
          {children}
        </div>
      </main>
    </div>
  );
}