import { useRef } from "react";
import { useInView } from "framer-motion";
import { FileText } from "lucide-react";

const benefits = [
  {
    icon: (
      <div className="w-24 h-24 bg-[#3EDAD9] rounded-full flex items-center justify-center relative">
        <div className="w-12 h-12 bg-[#FFD700] rounded-lg rotate-45 grid place-items-center">
          <div className="grid grid-cols-2 grid-rows-2 gap-1 -rotate-45">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-black rounded-sm" />
            ))}
          </div>
        </div>
      </div>
    ),
    title: "Project Portal",
    description: "Easily manage your design queue with a Trello board."
  },
  {
    icon: (
      <div className="w-24 h-24 bg-[#FF4500] rounded-full flex items-center justify-center">
        <div className="text-white">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13 3L4 14H11L11 21L20 10H13L13 3Z" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    ),
    title: "AI automation experts",
    description: "Add AI automation into your business or sell AI automation to your customers."
  },
  {
    icon: (
      <div className="w-24 h-24 bg-[#4169E1] rounded-full flex items-center justify-center">
        <div className="w-16 h-16 relative">
          <div className="absolute inset-0 bg-white rounded-lg rotate-45"></div>
          <div className="absolute inset-2 flex items-center justify-center">
            <span className="text-2xl font-bold">$</span>
          </div>
        </div>
      </div>
    ),
    title: "Fixed monthly rate",
    description: "No surprises here! Pay the same fixed price each month."
  },
  {
    icon: (
      <div className="w-24 h-24 bg-[#8A2BE2] rounded-full flex items-center justify-center">
        <div className="text-[#FFD700]">
          <FileText size={40} />
        </div>
      </div>
    ),
    title: "Content in your voice",
    description: "Insane quality content at scale in your specified brand voice."
  },
  {
    icon: (
      <div className="w-24 h-24 bg-[#FFD700] rounded-full flex items-center justify-center">
        <div className="w-16 h-8 border-4 border-black rounded-full relative">
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-4 bg-[#FF4500]"></div>
        </div>
      </div>
    ),
    title: "Flexible and scalable",
    description: "Scale up or down as needed, and pause or cancel at anytime."
  },
  {
    icon: (
      <div className="w-24 h-24 bg-[#FFC0CB] rounded-full flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-black rounded-full relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEyIDJDNi40NzcgMiAyIDYuNDc3IDIgMTJTNi40NzcgMjIgMTIgMjJTMjIgMTcuNTIzIDIyIDEyUzE3LjUyMyAyIDEyIDJaTTEyIDIwQzcuNTg5IDIwIDQgMTYuNDExIDQgMTJTNy41ODkgNCAxMiA0UzIwIDcuNTg5IDIwIDEyUzE2LjQxMSAyMCAxMiAyMFoiIGZpbGw9ImN1cnJlbnRDb2xvciIvPjwvc3ZnPg==')] bg-repeat"></div>
        </div>
      </div>
    ),
    title: "Unique and all yours",
    description: "Each of your designs is made especially for you and is 100% yours."
  }
];

export function MembershipBenefits() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section ref={ref} id="benefits" className="w-full py-24 bg-white relative overflow-hidden">
      {/* Decorative shape */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-[#FFD700] rounded-bl-full opacity-20"></div>
      
      <div 
        className="container mx-auto px-4"
        style={{
          transform: isInView ? "none" : "translateY(50px)",
          opacity: isInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s"
        }}
      >
        <h2 className="text-5xl md:text-7xl font-bold text-center mb-6">
          Membership benefits
        </h2>
        <p className="text-xl md:text-2xl text-center text-gray-600 max-w-3xl mx-auto mb-20">
          Perks so good you'll never need to go anywhere else for your design. Seriously.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="flex flex-col items-center text-center"
              style={{
                transform: isInView ? "none" : "translateY(50px)",
                opacity: isInView ? 1 : 0,
                transition: `all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ${0.5 + (index * 0.1)}s`
              }}
            >
              {benefit.icon}
              <h3 className="text-2xl font-bold mt-6 mb-3">{benefit.title}</h3>
              <p className="text-gray-600 text-lg">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
