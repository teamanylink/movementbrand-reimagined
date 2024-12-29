import { useState } from "react";
import { SettingsLayout } from "@/components/settings/SettingsLayout";
import { SettingsNavigation } from "@/components/settings/SettingsNavigation";
import { AccountSection } from "@/components/settings/sections/AccountSection";
import { ProfileSection } from "@/components/settings/sections/ProfileSection";
import { useQuery } from "@tanstack/react-query";
import { Tables } from "@/integrations/supabase/types";
import { supabase } from "@/integrations/supabase/client";
import { useLocation } from "react-router-dom";

type Profile = Tables<'profiles'>;

const Settings = () => {
  const location = useLocation();
  const defaultSection = location.state?.section || "profile";
  const [activeSection, setActiveSection] = useState(defaultSection);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);

  const { data: currentProfile } = useQuery({
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

  const handleProfileChange = (updatedProfile: Partial<Profile>) => {
    if (profile) {
      setProfile({ ...profile, ...updatedProfile });
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .update(profile!)
        .eq('id', profile!.id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

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