import { useState, useEffect } from "react";
import { SettingsLayout } from "@/components/settings/SettingsLayout";
import { SettingsNavigation } from "@/components/settings/SettingsNavigation";
import { AccountSection } from "@/components/settings/sections/AccountSection";
import { ProfileSection } from "@/components/settings/sections/ProfileSection";
import { useQuery } from "@tanstack/react-query";
import { Tables } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";
import { useLocation } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

type Profile = Tables<'profiles'>;

const Settings = () => {
  const location = useLocation();
  const { toast } = useToast();
  const defaultSection = location.state?.section || "profile";
  const [activeSection, setActiveSection] = useState(defaultSection);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  const { data: currentProfile, isError: profileError } = useQuery({
    queryKey: ['current-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load profile data. Please try again.",
        });
        throw error;
      }
      return data;
    },
  });

  useEffect(() => {
    if (currentProfile) {
      console.log("Fetched profile:", currentProfile);
      setProfile(currentProfile);
    }
  }, [currentProfile]);

  const handleProfileChange = (updatedProfile: Partial<Profile>) => {
    if (profile) {
      setProfile({ ...profile, ...updatedProfile });
    }
  };

  const handleSave = async () => {
    if (!profile) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Profile data is missing. Please try again.",
      });
      return;
    }
  
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update(profile)
        .eq('id', profile.id);
  
      if (error) throw error;
  
      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update profile",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  if (profileError) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Failed to load settings. Please try again.</p>
      </div>
    );
  }

  return (
    <SettingsLayout>
      <SettingsNavigation 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
      />
      {activeSection === "account" && (
        <AccountSection />
      )}
      {activeSection === "profile" && currentProfile && (
        <ProfileSection
          profile={currentProfile}
          onProfileChange={handleProfileChange}
          onSave={handleSave}
          isSaving={isSaving}
        />
      )}
    </SettingsLayout>
  );
};

export default Settings;
