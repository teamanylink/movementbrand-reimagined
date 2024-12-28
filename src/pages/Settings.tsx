import { useState } from "react";
import { SettingsLayout } from "@/components/settings/SettingsLayout";
import { SettingsNavigation } from "@/components/settings/SettingsNavigation";
import { ProfileSection } from "@/components/settings/sections/ProfileSection";
import { AccountSection } from "@/components/settings/sections/AccountSection";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { UserProfile } from "@/types/user";

export default function Settings() {
  const [activeSection, setActiveSection] = useState("profile");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const handleProfileChange = (updates: Partial<UserProfile>) => {
    if (profile) {
      setProfile({ ...profile, ...updates });
    }
  };

  const handleSaveProfile = async () => {
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
          phone_number: profile.phone_number
        })
        .eq('id', profile.id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Your profile has been updated.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to update profile.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50/50">
      <div className="flex-1 space-y-4 p-8">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        </div>
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="sticky top-8 h-fit lg:w-1/5">
            <SettingsNavigation
              activeSection={activeSection}
              onSectionChange={setActiveSection}
            />
          </aside>
          <div className="flex-1 lg:max-w-2xl">
            {activeSection === "profile" && (
              <ProfileSection
                profile={profile}
                onProfileChange={handleProfileChange}
                onSave={handleSaveProfile}
                isSaving={isSaving}
              />
            )}
            {activeSection === "account" && <AccountSection />}
          </div>
        </div>
      </div>
    </div>
  );
}