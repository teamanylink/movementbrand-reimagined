import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SettingsLayoutProps {
  children: ReactNode;
  className?: string;
}

export function SettingsLayout({ children, className }: SettingsLayoutProps) {
  return (
    <div className={cn("max-w-6xl mx-auto p-6 space-y-6 relative", className)}>
      {children}
    </div>
  );
}