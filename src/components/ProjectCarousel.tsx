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
    src: "/lovable-uploads/1a4c3030-f086-4d69-9eed-dddeacb5aa18.png",
    title: "Recaply - AI-Powered Daily Digest"
  },
  {
    src: "/lovable-uploads/a31fb496-0dcc-4ff9-b26e-05b6ccb6e76d.png",
    title: "Sendero Recovery - Social Media"
  },
  {
    src: "/lovable-uploads/aa833a7d-015d-4fee-8000-a244358334e1.png",
    title: "Automations"
  },
  {
    src: "/lovable-uploads/7cfa0beb-6a50-4632-972a-4bb987e52f7a.png",
    title: "Landing Pages"
  },
  {
    src: "/lovable-uploads/e9636c6c-5864-4749-8834-44ad2c0e8bc2.png",
    title: "Brand Design"
  },
  {
    src: "/lovable-uploads/adde8d93-13db-4c7e-ad5b-c3c2d091fe04.png",
    title: "Digital Products"
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
                    <div className="relative">
                      <img
                        src={project.src}
                        alt={project.title}
                        className="w-full h-[400px] object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                        <h3 className="text-white text-lg font-semibold">
                          {project.title}
                        </h3>
                      </div>
                    </div>
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