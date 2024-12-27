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
import { useRef } from "react";
import { useInView } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Index = () => {
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const awardsRef = useRef(null);

  const isHeroInView = useInView(heroRef, { once: true });
  const isFeaturesInView = useInView(featuresRef, { once: true });
  const isAwardsInView = useInView(awardsRef, { once: true });

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <Navigation />
      
      {/* Hero Section */}
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
              A single content subscription to move your movement forward.
              <br />
              Pause or cancel anytime.
            </p>

            <Button size="lg" className="text-lg px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
              See plans
            </Button>
            <div className="mt-6 text-sm text-gray-500 animate-pulse">Pause or cancel anytime</div>

            {/* Social Proof Section */}
            <div className="flex items-center justify-center mt-8 space-x-4">
              <div className="flex -space-x-4">
                <Avatar className="w-10 h-10 border-2 border-white">
                  <AvatarImage src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=100&h=100&fit=crop" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
                <Avatar className="w-10 h-10 border-2 border-white">
                  <AvatarImage src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=100&h=100&fit=crop" />
                  <AvatarFallback>MK</AvatarFallback>
                </Avatar>
                <Avatar className="w-10 h-10 border-2 border-white">
                  <AvatarImage src="https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?w=100&h=100&fit=crop" />
                  <AvatarFallback>RW</AvatarFallback>
                </Avatar>
                <Avatar className="w-10 h-10 border-2 border-white">
                  <AvatarImage src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=100&h=100&fit=crop" />
                  <AvatarFallback>AL</AvatarFallback>
                </Avatar>
                <Avatar className="w-10 h-10 border-2 border-white">
                  <AvatarImage src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&h=100&fit=crop" />
                  <AvatarFallback>TG</AvatarFallback>
                </Avatar>
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-semibold">250+</span> creators joined this month
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

      {/* Comparison Section */}
      <ComparisonSection />

      {/* Project Carousel */}
      <ProjectCarousel />

      {/* Features Section */}
      <section 
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
              description="Subscribe to a plan & request as many designs as you'd like."
            />
            <Feature
              icon={<FileText className="w-10 h-10 text-secondary" />}
              title="Quick Delivery"
              description="Receive your design within two business days on average."
            />
            <Feature
              icon={<ThumbsUp className="w-10 h-10 text-accent" />}
              title="100% Satisfaction"
              description="We'll revise the designs until you're 100% satisfied."
            />
          </div>
        </div>
      </section>

      {/* Membership Benefits Section */}
      <MembershipBenefits />

      {/* Pricing Section */}
      <PricingSection />

      {/* Awards Section */}
      <section 
        ref={awardsRef}
        className="py-24 px-4 bg-[#F8F8F8]"
        style={{
          transform: isAwardsInView ? "none" : "translateY(20px)",
          opacity: isAwardsInView ? 1 : 0,
          transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.2s"
        }}
      >
        <div className="container mx-auto text-center">
          <p className="text-xl text-gray-600 mb-12 font-medium">We're talking 'Product of the Year' good.</p>
          <div className="flex flex-wrap justify-center gap-8">
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <p className="font-bold text-lg">#1 Design Agency 2024</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <p className="font-bold text-lg">Best Creative Solutions</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
              <p className="font-bold text-lg">Top Rated Service</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;