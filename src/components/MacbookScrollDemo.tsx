import React from "react";
import { MacbookScroll } from "./ui/macbook-scroll";
import { PlayCircle } from "lucide-react";

export function MacbookScrollDemo() {
  return (
    <div className="overflow-hidden bg-white w-full relative">
      <MacbookScroll
        title={<div></div>}
        src="/placeholder.svg"
        showGradient={false}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <div className="backdrop-blur-sm bg-white/30 p-6 rounded-full cursor-pointer hover:bg-white/40 transition-all duration-300">
          <PlayCircle className="w-16 h-16 text-white" />
        </div>
      </div>
    </div>
  );
}