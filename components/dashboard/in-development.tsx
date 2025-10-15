"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Construction, Lock } from "lucide-react";

export function InDevelopment() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-12rem)]">
      <Card className="max-w-md w-full">
        <CardContent className="pt-12 pb-12 text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Construction className="h-16 w-16 text-muted-foreground" />
              <Lock className="h-8 w-8 text-muted-foreground absolute -bottom-2 -right-2" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">In Development</h2>
          <p className="text-muted-foreground mb-4">
            This section is currently under development and not available in the public preview.
          </p>
          <div className="bg-muted rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              The full dashboard functionality includes advanced analytics, AI tools, and project management features
              that are part of our proprietary platform.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}