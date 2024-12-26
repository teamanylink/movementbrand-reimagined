"use client";
import React from "react";
import { cn } from "@/lib/utils";

export const AuroraBackground = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center w-full overflow-hidden rounded-lg",
        className
      )}
    >
      <div className="absolute inset-0 w-full h-full bg-white dark:bg-black">
        <div className="absolute inset-0 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      </div>
      <div className="absolute inset-0 w-full h-full">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 animate-aurora blur-3xl" />
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 animate-aurora blur-3xl" />
      </div>
      {children}
    </div>
  );
};