import { CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export const SubscriptionSection = () => {
  const { toast } = useToast();

  const handleManageSubscription = async () => {
    toast({
      title: "Coming Soon",
      description: "Subscription management will be available soon",
    });
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