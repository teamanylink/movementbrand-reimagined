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
    category: "Digital Marketing",
    title: "Multi-channel campaigns that drive results",
    src: "/lovable-uploads/ce67e3a0-9197-45b1-91c8-da1e63440e56.png",
    description: "Transform your brand's digital presence with data-driven strategies"
  },
  {
    category: "Brand Strategy",
    title: "Building memorable brand experiences",
    src: "/lovable-uploads/ce67e3a0-9197-45b1-91c8-da1e63440e56.png",
    description: "Create lasting connections with your audience through strategic branding"
  },
  {
    category: "Content Creation",
    title: "Engaging content that tells your story",
    src: "/lovable-uploads/ce67e3a0-9197-45b1-91c8-da1e63440e56.png",
    description: "Captivate your audience with compelling narratives and visuals"
  },
  {
    category: "Social Media",
    title: "Amplify your social presence",
    src: "/lovable-uploads/ce67e3a0-9197-45b1-91c8-da1e63440e56.png",
    description: "Build meaningful connections across all social platforms"
  },
  {
    category: "Web Development",
    title: "Cutting-edge digital solutions",
    src: "/lovable-uploads/ce67e3a0-9197-45b1-91c8-da1e63440e56.png",
    description: "Create seamless digital experiences that convert"
  }
];

export function ProjectCarousel() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="w-full py-20 bg-[#F5F5F7]">
      <div 
        className="container mx-auto"
        style={{
          transform: isInView ? "none" : "translateY(50px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
        }}
      >
        <h2 className="max-w-7xl pl-4 mx-auto text-3xl md:text-5xl font-bold text-neutral-800 mb-12">
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
                <Card className="bg-white rounded-3xl overflow-hidden border-none shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-0">
                    <div className="relative">
                      <img
                        src={project.src}
                        alt={project.title}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 p-6 text-white">
                        <p className="text-sm font-medium mb-2">{project.category}</p>
                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                        <p className="text-sm opacity-90">{project.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-8 flex justify-end gap-2 pr-4">
            <CarouselPrevious className="position-static" />
            <CarouselNext className="position-static" />
          </div>
        </Carousel>
      </div>
    </section>
  );
}