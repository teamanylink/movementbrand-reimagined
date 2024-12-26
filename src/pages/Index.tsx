import Navigation from "@/components/Navigation";
import Feature from "@/components/Feature";
import { Button } from "@/components/ui/button";
import { RefreshCw, FileText, ThumbsUp } from "lucide-react";
import { ProjectCarousel } from "@/components/ProjectCarousel";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="container mx-auto text-center">
          <div className="absolute -left-20 top-0 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -right-20 top-20 w-72 h-72 bg-secondary/20 rounded-full blur-3xl animate-pulse" />
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 relative z-10 flex flex-col gap-4">
            <div>
              A <span className="inline-block relative">
                <span className="relative">
                  <span className="absolute top-2 left-0 line-through decoration-secondary decoration-4">marketing</span>
                  <span className="invisible">marketing</span>
                </span>
                <span className="font-['Caveat'] text-primary absolute -top-12 left-0 animate-fade-up">movement</span>
              </span> agency
            </div>
            <div>on a mission</div>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            A single content subscription to move your movement forward.
            <br className="hidden md:block" />
            Pause or cancel anytime.
          </p>
          <Button size="lg" className="text-lg px-12 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300">
            See plans
          </Button>
          <div className="mt-6 text-sm text-gray-500 animate-pulse">Available now</div>
        </div>
      </section>

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