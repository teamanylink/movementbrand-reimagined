import Navigation from "@/components/Navigation";
import Feature from "@/components/Feature";
import { Button } from "@/components/ui/button";
import { RefreshCw, FileText, ThumbsUp } from "lucide-react";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { MembershipBenefits } from "@/components/MembershipBenefits";
import PricingSection from "@/components/PricingSection";
import ScrollingServices from "@/components/ScrollingServices";
import { MacbookScrollDemo } from "@/components/MacbookScrollDemo";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-0 px-4 relative overflow-hidden">
        <div className="container mx-auto text-center pt-8">
          <div className="absolute -left-20 top-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -right-20 top-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
          
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-bold mb-6">
              A <span className="relative inline-block">
                <span className="absolute -top-6 left-0 text-4xl md:text-5xl text-accent font-['Caveat']">movement</span>
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
            <div className="mt-6 text-sm text-gray-500 animate-pulse">Available now</div>
          </div>
          
          <MacbookScrollDemo />

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

      {/* Project Carousel */}
      <ProjectCarousel />

      {/* Features Section */}
      <section className="py-24 px-4 bg-white relative overflow-hidden">
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
      <section className="py-24 px-4 bg-[#F8F8F8]">
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
