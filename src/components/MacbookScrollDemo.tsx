import React from "react";
import { MacbookScroll } from "./ui/macbook-scroll";
import { useIsMobile } from "@/hooks/use-mobile";

export function MacbookScrollDemo() {
  const isMobile = useIsMobile();

  return (
    <div className="overflow-hidden bg-white w-full relative">
      {isMobile ? (
        <div className="w-full aspect-video pt-8">
          <iframe
            src="https://www.tella.tv/video/cm57hi84v00030bmn2vhmh4fp/embed?b=0&title=0&a=1&loop=1&autoPlay=true&t=0&muted=1&wt=0"
            className="w-full h-full"
            allow="autoplay; fullscreen"
            allowFullScreen
          />
        </div>
      ) : (
        <div className="w-full aspect-auto pt-8">
          <MacbookScroll
            title={<div></div>}
            src="https://www.tella.tv/video/cm57hi84v00030bmn2vhmh4fp/embed?b=0&title=0&a=1&loop=1&autoPlay=true&t=0&muted=1&wt=0"
            isVideo={true}
          />
        </div>
      )}
    </div>
  );
}