import { Home, Building2, Monitor, Wrench } from "lucide-react";

const ComparisonSection = () => {
  return (
    <section className="w-full py-24 bg-[#F8F8F8] relative overflow-hidden">
      {/* Floating background elements */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-[#8B5CF6]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-[#D946EF]/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-[pulse_4s_ease-in-out_infinite]" />
      <div className="absolute bottom-1/3 right-1/3 w-56 h-56 bg-secondary/10 rounded-full blur-3xl animate-[pulse_5s_ease-in-out_infinite]" />
      <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-[pulse_6s_ease-in-out_infinite]" />
      
      {/* Original content */}
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold mb-4 text-center">
            Hiring or traditional outsourcing?
            <br />
            Neither.
          </h2>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto text-center">
            Let's face it: <span className="font-semibold">traditional approaches to scaling design are outdated relics of the past.</span> You don't need an agency or freelancer, you need an extension to your in-house team.
          </p>

          <div className="grid gap-4 sm:mt-16 lg:grid-cols-3 lg:grid-rows-2">
            {/* In-House Teams - Spans 2 rows */}
            <div className="relative lg:row-span-2">
              <div className="absolute inset-0 bg-white/30 backdrop-blur-3xl rounded-3xl" />
              <div className="relative flex h-full flex-col p-8 overflow-hidden rounded-3xl border border-gray-100 bg-white/10 backdrop-filter backdrop-blur-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Home className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold">In-House Teams</h3>
                </div>
                <p className="text-gray-600">
                  Hiring additional designers to meet every capability is{" "}
                  <span className="font-semibold">expensive</span> and{" "}
                  <span className="font-semibold">impractical</span>.
                </p>
              </div>
            </div>

            {/* Creative Agencies */}
            <div className="relative">
              <div className="absolute inset-0 bg-white/30 backdrop-blur-3xl rounded-3xl" />
              <div className="relative flex h-full flex-col p-8 overflow-hidden rounded-3xl border border-gray-100 bg-white/10 backdrop-filter backdrop-blur-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Building2 className="w-6 h-6 text-secondary" />
                  <h3 className="text-xl font-semibold">Creative Agencies</h3>
                </div>
                <p className="text-gray-600">
                  Involving creative agencies can be{" "}
                  <span className="font-semibold">costly</span>, slow and{" "}
                  <span className="font-semibold">inflexible</span>.
                </p>
              </div>
            </div>

            {/* Freelancers */}
            <div className="relative lg:col-start-2 lg:row-start-2">
              <div className="absolute inset-0 bg-white/30 backdrop-blur-3xl rounded-3xl" />
              <div className="relative flex h-full flex-col p-8 overflow-hidden rounded-3xl border border-gray-100 bg-white/10 backdrop-filter backdrop-blur-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Monitor className="w-6 h-6 text-accent" />
                  <h3 className="text-xl font-semibold">Freelancers</h3>
                </div>
                <p className="text-gray-600">
                  Working with freelancers can be unreliable and hard to{" "}
                  <span className="font-semibold">scale</span>.
                </p>
              </div>
            </div>

            {/* Self-service tools - Spans 2 rows */}
            <div className="relative lg:row-span-2">
              <div className="absolute inset-0 bg-white/30 backdrop-blur-3xl rounded-3xl" />
              <div className="relative flex h-full flex-col p-8 overflow-hidden rounded-3xl border border-gray-100 bg-white/10 backdrop-filter backdrop-blur-lg">
                <div className="flex items-center gap-3 mb-4">
                  <Wrench className="w-6 h-6 text-primary" />
                  <h3 className="text-xl font-semibold">Self-service tools</h3>
                </div>
                <p className="text-gray-600">
                  Self-service solutions make{" "}
                  <span className="font-semibold">incremental improvements</span> to capacity and work mostly for simpler tasks.
                </p>
              </div>
            </div>
          </div>

          {/* The Better Way Card */}
          <div className="relative mt-6">
            <div className="absolute inset-0 bg-accent/20 backdrop-blur-3xl rounded-3xl" />
            <div className="relative p-12 rounded-3xl border border-gray-100 bg-white/10 backdrop-filter backdrop-blur-lg">
              <h3 className="text-sm font-semibold mb-2">THE BETTER WAY</h3>
              <h4 className="text-3xl font-bold mb-6">Movement Brand</h4>
              <p className="mb-6 text-lg">
                No other subscription on the market gives you the ability to request{" "}
                <span className="font-semibold">AI automations</span>,{" "}
                <span className="font-semibold">landing pages</span>, or{" "}
                <span className="font-semibold">microSaaS solutions</span>—all under one plan.
              </p>
              <p className="mb-6 text-lg">
                Building an internal team or hiring a large agency can easily cost{" "}
                <span className="font-semibold">six figures a year</span>, not to mention benefits and overhead.
              </p>
              <p className="text-lg">
                And in today's rapidly changing business landscape, you need{" "}
                <span className="font-semibold">flexibility</span>. That's where Movement Brand steps in: a simple subscription you can{" "}
                <span className="font-semibold">pause or resume whenever you like</span>. Pay only for what you need, exactly when you need it—no wasted resources, no rigid contracts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;