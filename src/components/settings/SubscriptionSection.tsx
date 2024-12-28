import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const SubscriptionSection = () => {
  const { toast } = useToast();

  const handleManageSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId: 'price_1Qary9IHifxXxql3V4Dp8vB9' }
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <CreditCard className="h-5 w-5" />
        <h2 className="text-xl font-semibold">Subscription</h2>
      </div>
      
      <div>
        <p className="text-sm text-gray-600 mb-4">
          Manage your subscription and billing information.
        </p>
        <Button 
          variant="outline" 
          onClick={handleManageSubscription}
          className="w-full sm:w-auto"
        >
          Manage Subscription
        </Button>
      </div>
    </div>
  );
};