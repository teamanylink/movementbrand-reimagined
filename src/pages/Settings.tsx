import { useState } from "react";
import { SettingsLayout } from "@/components/settings/SettingsLayout";
import { SettingsNavigation } from "@/components/settings/SettingsNavigation";
import { AccountSection } from "@/components/settings/sections/AccountSection";
import { ProfileSection } from "@/components/settings/sections/ProfileSection";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "@/types/user";

const Settings = () => {
  const location = useLocation();
  const [section, setSection] = useState(location.hash.slice(1) || "profile");
  const [isSaving, setIsSaving] = useState(false);
  const [profileUpdates, setProfileUpdates] = useState<Partial<UserProfile>>({});

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

  const handleProfileChange = (updates: Partial<UserProfile>) => {
    setProfileUpdates(prev => ({ ...prev, ...updates }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('profiles')
        .update(profileUpdates)
        .eq('id', user.id);

      if (error) throw error;
    } catch (error) {
      console.error('Error updating profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1600px] mx-auto p-4 md:p-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Settings</h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12">
          <div className="w-full lg:w-64 shrink-0">
            <SettingsNavigation 
              activeSection={section} 
              onSectionChange={setSection}
            />
          </div>
          <div className="flex-1">
            {section === "profile" && (
              <ProfileSection
                profile={profile}
                onProfileChange={handleProfileChange}
                onSave={handleSave}
                isSaving={isSaving}
              />
            )}
            {section === "account" && <AccountSection />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;