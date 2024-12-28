import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface UserProfile {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  company: string | null;
  website_url: string | null;
  phone_number: string | null;
}

const Settings = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchUserProfile();
    checkSubscription();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
        
        setProfile(profile);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load profile information.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const checkSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('check-subscription');
      if (error) throw error;
      setIsSubscribed(data?.subscribed || false);
    } catch (error) {
      console.error('Error checking subscription:', error);
    }
  };

  const handleUpdateProfile = async () => {
    if (!profile) return;
    
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: profile.first_name,
          last_name: profile.last_name,
          company: profile.company,
          website_url: profile.website_url,
          phone_number: profile.phone_number,
        })
        .eq('id', (await supabase.auth.getUser()).data.user?.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully.",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update profile.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleManageSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          mode: 'subscription',
          priceId: 'price_1Qary9IHifxXxql3V4Dp8vB9'
        }
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
        description: "Failed to manage subscription.",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Settings</h1>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
        <div className="grid gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                value={profile?.first_name || ''}
                onChange={(e) => setProfile(prev => ({ ...prev!, first_name: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                value={profile?.last_name || ''}
                onChange={(e) => setProfile(prev => ({ ...prev!, last_name: e.target.value }))}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={profile?.email || ''}
              disabled
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={profile?.company || ''}
              onChange={(e) => setProfile(prev => ({ ...prev!, company: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Website URL</Label>
            <Input
              id="website"
              type="url"
              value={profile?.website_url || ''}
              onChange={(e) => setProfile(prev => ({ ...prev!, website_url: e.target.value }))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              value={profile?.phone_number || ''}
              onChange={(e) => setProfile(prev => ({ ...prev!, phone_number: e.target.value }))}
            />
          </div>

          <Button 
            onClick={handleUpdateProfile} 
            disabled={isSaving}
            className="w-full md:w-auto"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Subscription</h2>
        <div className="space-y-4">
          <p className="text-gray-600">
            {isSubscribed 
              ? "You are currently subscribed to our premium plan." 
              : "You are currently on the free plan."}
          </p>
          <Button onClick={handleManageSubscription}>
            {isSubscribed ? "Manage Subscription" : "Upgrade Plan"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Settings;