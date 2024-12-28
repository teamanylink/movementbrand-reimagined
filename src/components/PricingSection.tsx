import React, { useState, useEffect } from 'react';
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";

const PricingSection = () => {
  const [isPro, setIsPro] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
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

  useEffect(() => {
    checkSubscription();
  }, []);

  const checkSubscription = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (session) {
      try {
        const { data, error } = await supabase.functions.invoke('check-subscription');
        
        if (error) throw error;
        
        setIsSubscribed(data?.subscribed || false);
      } catch (error) {
        console.error('Error checking subscription:', error);
      }
    }
  };

  const handleGetStarted = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        navigate("/dashboard");
        toast({
          title: "Create an account",
          description: "Please create an account to continue with your subscription.",
        });
        return;
      }

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId: isPro ? 'price_1Qary9IHifxXxql3V4Dp8vB9' : 'price_1Qary9IHifxXxql3V4Dp8vB9' }
      });

      if (error) {
        throw error;
      }

      if (data?.url) {
        window.location.href = data.url;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <section id="pricing" className="py-24 px-4 bg-white relative overflow-hidden">
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
            <Button 
              size="lg" 
              className="px-8 py-6 text-lg rounded-xl"
              onClick={handleGetStarted}
            >
              {isSubscribed ? "Manage Subscription" : "Get started"}
            </Button>
            <button 
              onClick={handleGetStarted}
              className="text-sm underline"
            >
              book a call
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;