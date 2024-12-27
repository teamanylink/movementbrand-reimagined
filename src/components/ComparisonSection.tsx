import { Home, Building2, Monitor, Wrench } from "lucide-react";

const ComparisonSection = () => {
  return (
    <section className="w-full py-24 bg-[#F8F8F8] relative overflow-hidden">
      {/* Glowing effects */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-[#8B5CF6]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-[#D946EF]/20 rounded-full blur-3xl animate-pulse" />
      
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            Hiring or traditional outsourcing?
            <br />
            Neither.
          </h2>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl">
            Let's face it: <span className="font-semibold">traditional approaches to scaling design are outdated relics of the past.</span> You don't need an agency or freelancer, you need an extension to your in-house team.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* In-House Teams */}
            <div className="bg-[#1A1F2C] text-white p-8 rounded-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Home className="w-6 h-6" />
                <h3 className="text-xl font-semibold">In-House Teams</h3>
              </div>
              <p>
                Hiring additional designers to meet every capability is{" "}
                <span className="font-semibold">expensive</span> and{" "}
                <span className="font-semibold">impractical</span>.
              </p>
            </div>

            {/* Creative Agencies */}
            <div className="bg-[#1A1F2C] text-white p-8 rounded-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Building2 className="w-6 h-6" />
                <h3 className="text-xl font-semibold">Creative Agencies</h3>
              </div>
              <p>
                Involving creative agencies can be{" "}
                <span className="font-semibold">costly</span>, slow and{" "}
                <span className="font-semibold">inflexible</span>, adding complexity and delays to project timelines.
              </p>
            </div>

            {/* Freelancers */}
            <div className="bg-[#1A1F2C] text-white p-8 rounded-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Monitor className="w-6 h-6" />
                <h3 className="text-xl font-semibold">Freelancers</h3>
              </div>
              <p>
                Working with freelancers can be unreliable and hard to{" "}
                <span className="font-semibold">scale</span>, resulting in inconsistent and questionable quality.
              </p>
            </div>

            {/* Self-service tools */}
            <div className="bg-[#1A1F2C] text-white p-8 rounded-3xl">
              <div className="flex items-center gap-3 mb-4">
                <Wrench className="w-6 h-6" />
                <h3 className="text-xl font-semibold">Self-service tools</h3>
              </div>
              <p>
                Self-service solutions make{" "}
                <span className="font-semibold">incremental improvements</span> to capacity and work mostly for simpler, repetitive tasks.
              </p>
            </div>
          </div>

          {/* The Better Way Card */}
          <div className="bg-[#4169E1] text-white p-8 rounded-3xl max-w-xl ml-auto">
            <h3 className="text-sm font-semibold mb-2">THE BETTER WAY</h3>
            <h4 className="text-3xl font-bold mb-4">Superside</h4>
            <p className="mb-4">
              Superside is an{" "}
              <span className="font-semibold">always-on, subscription-based service</span>{" "}
              enabled by technology to deliver compelling creative at scale.
            </p>
            <p>
              With remote,{" "}
              <span className="font-semibold">fully-managed creative talent</span>,
              a unique platform for{" "}
              <span className="font-semibold">easy collaborations</span>, plus a
              clear and{" "}
              <span className="font-semibold">flexible pricing model</span>, it's
              the better way to get creative done!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;