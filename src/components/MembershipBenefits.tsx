import { useRef } from "react";
import { useInView } from "framer-motion";
import { BenefitItem } from "./benefits/BenefitItem";
import { benefits } from "./benefits/benefitsData";

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
          High value services at scale that grows with your brands or business.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {benefits.map((benefit, index) => (
            <BenefitItem
              key={index}
              type={benefit.type}
              title={benefit.title}
              description={benefit.description}
              isInView={isInView}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}