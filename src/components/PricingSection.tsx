import React, { useState } from 'react';
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

const PricingSection = () => {
  const [isPro, setIsPro] = useState(false);
  
  const price = isPro ? 8200 : 5280;
  const features = isPro ? [
    "Two projects at a time",
    "Unlimited Mirco-Saas",
    "Unlimited brands",
    "AI automations",
    "Landing pages",
    "4 hours of Consults",
    "Priority support"
  ] : [
    "One request at a time",
    "Unlimited Mirco-Saas",
    "Unlimited brands",
    "AI automations",
    "Landing pages",
    "2 hours of Consults"
  ];

  return (
    <section className="py-24 px-4 bg-white relative overflow-hidden">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Membership</h2>
          <div className="inline-flex items-center gap-2 bg-gray-100 p-1 rounded-full">
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${!isPro ? 'bg-yellow-300 text-black' : 'text-gray-600'}`}
              onClick={() => setIsPro(false)}
            >
              Standard
            </button>
            <button
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${isPro ? 'bg-black text-white' : 'text-gray-600'} flex items-center gap-2`}
              onClick={() => setIsPro(true)}
            >
              Pro <Zap className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="mb-8">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-5xl font-bold">${price}</span>
              <span className="text-gray-600">/m</span>
            </div>
            <p className="text-gray-600">One request at a time. Pause or cancel anytime.</p>
          </div>

          <div className="mb-8">
            <h3 className="text-lg font-semibold mb-4">What's included</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-black rounded-full" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button size="lg" className="px-8 py-6 text-lg rounded-xl">
              Get started
            </Button>
            <a href="#" className="text-sm underline">
              book a call
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;