import React from "react";
import { MacbookScroll } from "./ui/macbook-scroll";

export function MacbookScrollDemo() {
  return (
    <div className="overflow-hidden bg-white w-full relative">
      <MacbookScroll
        title={<div></div>}
        src="https://api.tella.tv/videos/deniss-video-h4fp/embed?autoplay=true&muted=true&loop=true&controls=false"
        isVideo={true}
      />
    </div>
  );
}