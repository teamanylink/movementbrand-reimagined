import { useState, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Settings2 } from "lucide-react";
import { ProfileSection } from "@/components/settings/ProfileSection";
import { SubscriptionSection } from "@/components/settings/SubscriptionSection";

const Settings = () => {
  const { toast } = useToast();
  const [profile, setProfile] = useState({
    email: "",
    first_name: "",
    last_name: "",
  });

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

  useEffect(() => {
    fetchProfile();
  }, [toast]);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex items-center space-x-2">
        <Settings2 className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <Card className="p-6 space-y-6">
        <ProfileSection profile={profile} onProfileUpdate={fetchProfile} />
      </Card>

      <Card className="p-6 space-y-6">
        <SubscriptionSection />
      </Card>
    </div>
  );
};

export default Settings;