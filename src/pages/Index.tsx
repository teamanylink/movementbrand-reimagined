import Navigation from "@/components/Navigation";
import Feature from "@/components/Feature";
import { Button } from "@/components/ui/button";
import { RefreshCw, FileText, ThumbsUp, Star } from "lucide-react";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { MembershipBenefits } from "@/components/MembershipBenefits";
import PricingSection from "@/components/PricingSection";
import ScrollingServices from "@/components/ScrollingServices";
import { MacbookScrollDemo } from "@/components/MacbookScrollDemo";
import ComparisonSection from "@/components/ComparisonSection";
import FAQs from "@/components/FAQs";
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import CalendlyBadge from "@/components/CalendlyBadge";

const Index = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isFeaturesInView = useInView(featuresRef, { once: true });

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <Navigation />
      
      <section 
        ref={heroRef}
        className="pt-32 pb-0 px-4 relative overflow-hidden"
        style={{
          transform: isHeroInView ? "none" : "translateY(20px)",
          opacity: isHeroInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
        }}
      >
        <div className="container mx-auto text-center pt-8">
          <div className="absolute -left-20 top-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -right-20 top-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
          
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              A <span className="relative inline-block">
                <span className="absolute -top-[26px] left-0 text-4xl md:text-5xl text-accent font-['Caveat']">movement</span>
                <span className="relative line-through decoration-4 decoration-red-500">marketing</span>
              </span> agency
              <br />
              on a mission
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Movement Brand was co-founded by Denis Estimon and Larry Hawkes. Denis is a creative entrepreneur whose work has been spotlighted by CBS, ABC, and People. He has also collaborated with well-known brands like 3 Musketeers and has successfully launched and scaled multiple movements worldwide. Larry is a Senior Data Engineer who has spent most of his career working with large-scale enterprises and Fortune 500 companies to develop software and data infrastructure at scale. Backed by a specialized network of designers, developers, and automation professionals, Denis and Larry ensure every request is handled by the right expert.
            </p>

            <Button 
              size="lg" 
              className="text-lg px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => scrollToSection('pricing')}
            >
              See plans
            </Button>
            <div className="mt-6 text-sm text-gray-500 animate-pulse">Pause or cancel anytime</div>

            {/* Social Proof Section */}
            <div className="flex items-center justify-center mt-8 space-x-4">
              <div className="flex -space-x-4">
                <Avatar className="w-10 h-10 border-2 border-white">
                  <AspectRatio ratio={1}>
                    <AvatarImage src="/lovable-uploads/a1be2f05-b555-4a80-9069-6879bf37dfc7.png" className="object-cover" />
                  </AspectRatio>
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <Avatar className="w-10 h-10 border-2 border-white">
                  <AspectRatio ratio={1}>
                    <AvatarImage src="/lovable-uploads/908e32d5-00a6-4606-bf80-e43e4f31358b.png" className="object-cover" />
                  </AspectRatio>
                  <AvatarFallback>MK</AvatarFallback>
                </Avatar>
                <Avatar className="w-10 h-10 border-2 border-white">
                  <AspectRatio ratio={1}>
                    <AvatarImage src="/lovable-uploads/c92cf53a-829b-48b9-8100-b91a7655b3e7.png" className="object-cover" />
                  </AspectRatio>
                  <AvatarFallback>RW</AvatarFallback>
                </Avatar>
                <Avatar className="w-10 h-10 border-2 border-white">
                  <AspectRatio ratio={1}>
                    <AvatarImage src="/lovable-uploads/2f9ed181-c0a8-4425-98bf-b47385724cf2.png" className="object-cover" />
                  </AspectRatio>
                  <AvatarFallback>AL</AvatarFallback>
                </Avatar>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">Join</span> the movement!
              </p>
            </div>

            {/* Five Star Rating */}
            <div className="flex items-center justify-center mt-4 space-x-1">
              {[...Array(5)].map((_, index) => (
                <Star key={index} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>

          </div>
          
          <MacbookScrollDemo />

          {/* Remaining sections */}
          <div className="flex flex-col items-center gap-6 mt-12 pb-12">
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
              we do the most
              <br />
              so you can
            </h1>
            <div className="transform -rotate-6 bg-black text-white px-6 py-3 text-3xl md:text-4xl font-bold rounded-lg shadow-lg hover:rotate-0 transition-transform duration-300">
              do the thing
            </div>
          </div>
        </div>
      </section>

      <ScrollingServices />

      <ComparisonSection />

      <ProjectCarousel />

      <section 
        id="how-it-works"
        ref={featuresRef}
        className="py-24 px-4 bg-white relative overflow-hidden"
        style={{
          transform: isFeaturesInView ? "none" : "translateY(20px)",
          opacity: isFeaturesInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
        }}
      >
        <div className="absolute -left-40 bottom-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        <div className="container mx-auto relative z-10">
          <div className="grid md:grid-cols-3 gap-12">
            <Feature
              icon={<RefreshCw className="w-10 h-10 text-primary" />}
              title="Subscribe & Request"
              description="Subscribe to a plan & request as many projects as you'd like."
            />
            <Feature
              icon={<FileText className="w-10 h-10 text-secondary" />}
              title="Quick Delivery"
              description="Receive your projects at lightning speed & receive 24 hour status updates for longer projects."
            />
            <Feature
              icon={<ThumbsUp className="w-10 h-10 text-accent" />}
              title="100% Satisfaction"
              description="We'll work on the project until you're 100% satisfied."
            />
          </div>
        </div>
      </section>

      <MembershipBenefits />

      <PricingSection />

      <FAQs />
      
      <CalendlyBadge />
    </div>
  );
};

export default Index;
