"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const MacbookScroll = ({
  title,
  badge,
  src,
  showGradient,
  isVideo = false,
}: {
  title: string | React.ReactNode;
  badge?: React.ReactNode;
  src: string;
  showGradient?: boolean;
  isVideo?: boolean;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.7]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);

  return (
    <div
      ref={ref}
      className="min-h-[85vh] overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d] bg-[#F8F8F8]"
    >
      <motion.div
        style={{
          scale,
          y,
          opacity,
        }}
        className="flex flex-col items-center justify-start"
      >
        <div className="max-w-5xl">{title}</div>
        <div className="relative">
          {badge && <div className="absolute top-8 -right-12">{badge}</div>}
          <div className="pt-4 pr-8 pl-8">
            <div className="w-[76rem] aspect-[16/10.3] relative">
              <div className="absolute inset-0 bg-white/30 backdrop-blur-xl rounded-[2rem] p-8">
                <div className="w-full h-full rounded-[1.4rem] overflow-hidden bg-white/20 backdrop-blur-md p-4">
                  {isVideo ? (
                    <div className="w-full h-full relative">
                      <iframe
                        src={src}
                        className="absolute inset-0 w-full h-full rounded-[1rem]"
                        allow="autoplay; fullscreen"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <img src={src} className="w-full h-full object-cover rounded-[1rem]" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};