import React from "react";
import { MacbookScroll } from "./ui/macbook-scroll";
import { PlayCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

export function MacbookScrollDemo() {
  return (
    <div className="overflow-hidden bg-white w-full relative">
      <MacbookScroll
        title={<div></div>}
        src="/placeholder.svg"
        showGradient={false}
      />
      <Dialog>
        <DialogTrigger asChild>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
            <div className="backdrop-blur-sm bg-white/30 p-6 rounded-full cursor-pointer hover:bg-white/40 transition-all duration-300">
              <PlayCircle className="w-16 h-16 text-white" />
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[80vw] max-h-[80vh] p-0">
          <div className="aspect-video w-full">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}