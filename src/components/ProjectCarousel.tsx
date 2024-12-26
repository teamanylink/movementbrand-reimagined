import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    src: "/lovable-uploads/ce67e3a0-9197-45b1-91c8-da1e63440e56.png"
  },
  {
    src: "/lovable-uploads/ce67e3a0-9197-45b1-91c8-da1e63440e56.png"
  },
  {
    src: "/lovable-uploads/ce67e3a0-9197-45b1-91c8-da1e63440e56.png"
  },
  {
    src: "/lovable-uploads/ce67e3a0-9197-45b1-91c8-da1e63440e56.png"
  },
  {
    src: "/lovable-uploads/ce67e3a0-9197-45b1-91c8-da1e63440e56.png"
  }
];

export function ProjectCarousel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="w-full py-24 bg-[#F5F5F7]">
      <div 
        className="container mx-auto"
        style={{
          transform: isInView ? "none" : "translateY(50px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
        }}
      >
        <h2 className="max-w-7xl pl-4 mx-auto text-4xl md:text-6xl font-bold text-neutral-800 mb-16">
          Latest Projects
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-7xl mx-auto"
        >
          <CarouselContent>
            {projects.map((project, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <Card className="bg-white rounded-3xl overflow-hidden border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-0">
                    <img
                      src={project.src}
                      alt={`Project ${index + 1}`}
                      className="w-full h-[400px] object-cover"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-12 flex justify-end gap-4 pr-4">
            <CarouselPrevious className="position-static h-12 w-12 rounded-full border-2" />
            <CarouselNext className="position-static h-12 w-12 rounded-full border-2" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}