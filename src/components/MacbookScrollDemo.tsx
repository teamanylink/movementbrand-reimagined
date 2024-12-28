import React from "react";
import { MacbookScroll } from "./ui/macbook-scroll";

export function MacbookScrollDemo() {
  return (
    <div className="overflow-hidden bg-white w-full relative">
      <MacbookScroll
        title={<div></div>}
        src="https://www.tella.tv/video/cm57hi84v00030bmn2vhmh4fp/embed?b=0&title=0&a=1&loop=1&autoPlay=true&t=0&muted=1&wt=0"
        isVideo={true}
      />
    </div>
  );
}