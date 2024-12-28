import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import { Loader2, Zap } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

export function AccountSection() {
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const { toast } = useToast();

  const { data: profile } = useQuery({
    queryKey: ['current-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  const isSuperAdmin = profile?.is_superadmin;

  useEffect(() => {
    if (!isSuperAdmin) {
      checkSubscription();
    }
  }, [isSuperAdmin]);

  const checkSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) throw error;
      
      setIsSubscribed(data?.subscribed || false);
    } catch (error: any) {
      console.error('Error checking subscription:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to check subscription status.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgradeClick = async () => {
    setIsUpgrading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          priceId: 'price_1Qary9IHifxXxql3V4Dp8vB9',
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
        description: error.message || "Failed to initiate upgrade process.",
      });
    } finally {
      setIsUpgrading(false);
    }
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Account Settings</h2>
          {!isSuperAdmin && (
            isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Badge variant={isSubscribed ? "default" : "secondary"}>
                {isSubscribed ? "Active Subscription" : "No Active Subscription"}
              </Badge>
            )
          )}
        </div>

        <div className="space-y-4">
          {!isSuperAdmin && (
            <div className="p-4 bg-gray-50 rounded-lg space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium">Subscription</h3>
                  <p className="text-sm text-muted-foreground">
                    {isSubscribed 
                      ? "You have an active subscription" 
                      : "Upgrade to create unlimited projects"}
                  </p>
                </div>
                <Button
                  onClick={handleUpgradeClick}
                  disabled={isUpgrading || isSubscribed}
                  className="bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800"
                >
                  {isUpgrading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Zap className="h-4 w-4 mr-2" />
                      {isSubscribed ? "Already Subscribed" : "Upgrade Now"}
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <Label>Password</Label>
            <Button variant="secondary" className="w-auto">
              Change password
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Privacy Settings</h3>
          
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>New friend</Label>
              <p className="text-sm text-muted-foreground">
                Let your friend find your account
              </p>
            </div>
            <Switch />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Channel's friend</Label>
              <p className="text-sm text-muted-foreground">
                Let your friend add you from channel
              </p>
            </div>
            <Switch />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Account Management</h3>
          
          <div className="space-y-2">
            <Label>Remove Account</Label>
            <p className="text-sm text-muted-foreground">
              You can "Disable account" to take a break.
            </p>
            <div className="flex gap-4">
              <Button variant="destructive">Disable account</Button>
              <Button variant="ghost" className="text-destructive hover:text-destructive">
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
