import React, { useState, useEffect } from 'react';
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { SignupForm, SignupFormData } from './SignupForm';
import { useNavigate } from 'react-router-dom';

const PricingSection = () => {
  const [isPro, setIsPro] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSignupForm, setShowSignupForm] = useState(false);
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

  const handleGetStarted = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session) {
      navigate('/dashboard', { state: { showSignup: true } });
      return;
    }

    setShowSignupForm(true);
  };

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

  const handleSignupSubmit = async (formData: SignupFormData) => {
    setIsLoading(true);
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          first_name: formData.firstName,
          last_name: formData.lastName,
          company: formData.company,
          website_url: formData.websiteUrl,
          phone_number: formData.phoneNumber,
          email: formData.email
        })
        .eq('id', authData.user?.id);

      if (updateError) throw updateError;

      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          priceId: isPro ? 'price_1Qary9IHifxXxql3V4Dp8vB9' : 'price_1Qary9IHifxXxql3V4Dp8vB9',
          mode: 'subscription'
        }
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
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
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : isSubscribed ? "Manage Subscription" : "Get started"}
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

      <SignupForm
        open={showSignupForm}
        onOpenChange={setShowSignupForm}
        onSubmit={handleSignupSubmit}
        isLoading={isLoading}
      />
    </section>
  );
};

export default PricingSection;
