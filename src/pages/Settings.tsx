import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Settings2, User, CreditCard } from "lucide-react";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    email: "",
    first_name: "",
    last_name: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          
          if (profileData) {
            setProfile({
              email: profileData.email || "",
              first_name: profileData.first_name || "",
              last_name: profileData.last_name || "",
            });
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast({
          title: "Error",
          description: "Failed to load profile information",
          variant: "destructive",
        });
      }
    };

    fetchProfile();
  }, [toast]);

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { error } = await supabase
        .from('profiles')
        .update({
          first_name: profile.first_name,
          last_name: profile.last_name,
        })
        .eq('id', user.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    // This is a placeholder for subscription management
    // You can implement Stripe customer portal redirection here
    toast({
      title: "Coming Soon",
      description: "Subscription management will be available soon",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex items-center space-x-2">
        <Settings2 className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <Card className="p-6 space-y-6">
        <div className="flex items-center space-x-2">
          <User className="h-5 w-5" />
          <h2 className="text-xl font-semibold">Profile Information</h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input 
              type="email" 
              value={profile.email} 
              disabled 
              className="bg-gray-50"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <Input 
              value={profile.first_name}
              onChange={(e) => setProfile(prev => ({ ...prev, first_name: e.target.value }))}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <Input 
              value={profile.last_name}
              onChange={(e) => setProfile(prev => ({ ...prev, last_name: e.target.value }))}
            />
          </div>

          <Button 
            onClick={handleUpdateProfile} 
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </div>
      </Card>

      <Card className="p-6 space-y-6">
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
      </Card>
    </div>
  );
};

export default Settings;