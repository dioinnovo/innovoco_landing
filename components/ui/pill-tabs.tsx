"use client"

import * as React from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

interface PillTabsProps {
  tabs: {
    value: string
    label: string
    content: React.ReactNode
  }[]
  defaultValue?: string
  className?: string
}

export function PillTabs({ tabs, defaultValue, className }: PillTabsProps) {
  return (
    <Tabs defaultValue={defaultValue || tabs[0]?.value} className={cn("w-full", className)}>
      <PillTabsList>
        {tabs.map((tab) => (
          <PillTabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </PillTabsTrigger>
        ))}
      </PillTabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="space-y-6">
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  )
}

export function PillTabsList({
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsList>) {
  return (
    <TabsList
      className={cn(
        "grid w-full mb-8 rounded-full border border-gray-200 p-1.5 bg-white/70 backdrop-blur-sm shadow-sm h-14",
        className
      )}
      style={{
        gridTemplateColumns: `repeat(${React.Children.count(children)}, minmax(0, 1fr))`
      }}
      {...props}
    >
      {children}
    </TabsList>
  )
}

export function PillTabsTrigger({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsTrigger>) {
  return (
    <TabsTrigger
      className={cn(
        "rounded-full data-[state=active]:bg-white data-[state=active]:shadow-lg data-[state=active]:border data-[state=active]:border-gray-100 transition-all duration-200 data-[state=inactive]:text-gray-600 data-[state=active]:text-[#0A58D0] flex items-center justify-center h-full px-4 font-medium",
        className
      )}
      {...props}
    />
  )
}

export { TabsContent }