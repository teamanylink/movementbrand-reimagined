import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FAQs = () => {
  return (
    <section id="faqs" className="py-24 px-4 bg-white">
      <div className="container mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">Commonly asked questions</h2>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-medium">
                Why not just hire my own in-house team or a traditional agency?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Building an internal team or bringing on a big agency can run well into six figures annually—and that's before factoring in benefits or overhead. Plus, businesses today face fast-changing demands. Movement Brand offers a more nimble approach: a simple subscription you can pause or resume whenever you like. You only pay for what you need, exactly when you need it—no wasted resources, no rigid contracts.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-medium">
                Is there a cap on how many projects I can request?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Once you've signed up, you can submit an unlimited number of tasks, whether that's a quick landing page tweak, a complex automation, or an entire micro-SaaS build. We handle them one by one, so each gets the thorough attention it deserves.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-medium">
                When will I see results or finished work?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We send daily progress updates, so you'll never be left wondering where your project stands. Smaller items, like a logo revamp or basic landing page edits, can often be turned around in just a few days. Larger ventures, like building a micro-SaaS platform, typically span a few weeks to ensure quality and robust testing.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-medium">
                How does the timeline differ between smaller tasks and major projects?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Within 24 Hours: You'll get a detailed progress report or first draft on simpler requests. Over a Few Weeks: Complex efforts (like micro-SaaS or advanced automation workflows) are tackled in phases, with deliverables rolling out every couple of days until the full project is wrapped, typically within three weeks depending on complexity.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-medium">
                Who is behind Movement Brand?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Movement Brand was founded by Denis Estimon, a creative entrepreneur whose work has been spotlighted by CBS, ABC, and People. He's also collaborated with well-known brands like 3 Musketeers and has successfully launched and scaled multiple communities and digital products. Backed by a specialized network of designers, developers, and automation pros, Denis ensures every request is handled by the right expert.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-medium">
                Can I put my subscription on hold?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Absolutely. Your workload may vary from month to month. If you don't have ongoing projects, simply pause your plan. Whenever you're ready to ramp back up, your unused subscription days will still be there, so you're never paying for downtime.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-medium">
                What about bigger, more complex initiatives like micro-SaaS builds?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                For larger undertakings, we divide the process into logical stages. You'll receive incremental updates—usually every 24–48 hours—so you can offer feedback at each step. Overall, plan on a few weeks to complete highly involved projects like micro-SaaS, though actual timing depends on scope and complexity.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-medium">
                Which platforms and tools do you use?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We adapt our toolkit to your unique needs. From design software like Figma or Sketch for mockups to advanced frameworks such as React and Node.js for development, we make sure to use the best resources for the job. When it comes to automations, we can integrate existing platforms like Zapier or set up custom-coded solutions.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-medium">
                How do I request new projects or give feedback?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Everything flows through your personal Movement Brand dashboard. Simply log in, outline your new requests, upload any relevant files or videos, and leave feedback on ongoing tasks. We follow up with daily updates, so collaboration stays seamless.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-medium">
                What if the end result isn't what I had in mind?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Your satisfaction is our top priority. If an initial draft misses the mark, let us know through the dashboard. We'll refine it based on your notes until it aligns perfectly with your vision.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-11" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-medium">
                Do you have any limitations on project types?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Movement Brand covers most digital needs—landing pages, micro-SaaS, marketing automations, brand refreshes, and more. For highly specialized tasks (e.g., advanced 3D modeling or large-scale print-only projects), we'll let you know if it's outside our scope. Chances are, if it lives in the digital realm, we can tackle it.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-12" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-medium">
                Is there any type of design or project you don't cover?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                While Movement Brand handles a broad range of digital projects—like landing pages, micro-SaaS, and automation setups—we don't typically take on 3D modeling, fully animated graphics (advanced GIFs, etc.), highly specialized document designs (such as medical forms), large-scale print projects (e.g., magazines or books), or InDesign-based layouts. If you're unsure whether your request falls under these categories, just reach out. We'll gladly confirm if we can accommodate you or suggest an alternative option.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-13" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-medium">
                What if I only have a single request?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                No worries! Our subscription model is built for flexibility. You're welcome to pause your plan once you've completed a project, then resume whenever a new need arises. That way, you're never paying for time you aren't using.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-14" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-medium">
                Do you offer refunds if I'm dissatisfied?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                We stand behind the quality of our work; as a result, we don't issue refunds once deliverables have been provided. However, our goal is always to ensure you're thrilled with the final outcome, and we're more than happy to revise and refine until it meets your expectations.
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold mb-4">Have more questions?</h3>
            <p className="text-gray-600">
              Reach out anytime. Movement Brand is designed to help you stay agile, scale rapidly, and execute your biggest ideas without the traditional agency headaches.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQs;
