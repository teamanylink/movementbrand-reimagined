import React from "react";
import { MacbookScroll } from "./ui/macbook-scroll";

export function MacbookScrollDemo() {
  return (
    <div className="overflow-hidden bg-white w-full">
      <MacbookScroll
        title={
          <div className="text-4xl md:text-6xl font-bold text-center mb-8">
            <span className="text-primary">Design</span> that moves you <br /> 
            <span className="text-secondary">forward</span>.
          </div>
        }
        src="/placeholder.svg"
        showGradient={false}
      />
    </div>
  );
}