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
    title: "Digital Marketing",
    description: "Multi-channel campaigns that drive results",
    image: "/lovable-uploads/ce67e3a0-9197-45b1-91c8-da1e63440e56.png"
  },
  {
    title: "Brand Strategy",
    description: "Building memorable brand experiences",
    image: "/lovable-uploads/ce67e3a0-9197-45b1-91c8-da1e63440e56.png"
  },
  {
    title: "Content Creation",
    description: "Engaging content that tells your story",
    image: "/lovable-uploads/ce67e3a0-9197-45b1-91c8-da1e63440e56.png"
  }
];

export function ProjectCarousel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="py-20 px-4">
      <div 
        className="container mx-auto"
        style={{
          transform: isInView ? "none" : "translateY(50px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
        }}
      >
        <h2 className="text-3xl font-bold text-center mb-12">Latest Projects</h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto"
        >
          <CarouselContent>
            {projects.map((project, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex flex-col aspect-square items-center justify-center p-6">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover rounded-t-lg mb-4"
                      />
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-muted-foreground text-center">{project.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  );
}