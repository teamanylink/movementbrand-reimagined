import { useState } from "react";
import SettingsLayout from "@/components/settings/SettingsLayout";
import SettingsNavigation from "@/components/settings/SettingsNavigation";
import AccountSection from "@/components/settings/sections/AccountSection";
import ProfileSection from "@/components/settings/sections/ProfileSection";
import { useSubscription } from "@/hooks/use-subscription";
import { Profile } from "@/integrations/supabase/types";

const Settings = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { subscription } = useSubscription();

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  const handleProfileChange = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Add your save logic here
    setIsSaving(false);
  };

  return (
    <SettingsLayout>
      <SettingsNavigation 
        activeSection={activeSection} 
        onSectionChange={handleSectionChange}
      />
      {activeSection === "profile" ? (
        <ProfileSection 
          profile={profile}
          onProfileChange={handleProfileChange}
          onSave={handleSave}
          isSaving={isSaving}
        />
      ) : (
        <AccountSection subscription={subscription} />
      )}
    </SettingsLayout>
  );
};

export default Settings;