import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/types/user";

interface ProfileSectionProps {
  profile: UserProfile | null;
  onProfileChange: (updatedProfile: Partial<UserProfile>) => void;
  onSave: () => void;
  isSaving: boolean;
}

export function ProfileSection({ profile, onSave, isSaving, onProfileChange }: ProfileSectionProps) {
  if (!profile) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Profile data is missing. Please try again.</p>
      </div>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
      <div className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              defaultValue={profile?.first_name || ''}
              placeholder={profile?.first_name || 'Enter your first name'}
              onChange={(e) => onProfileChange({ first_name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              defaultValue={profile?.last_name || ''}
              placeholder={profile?.last_name || 'Enter your last name'}
              onChange={(e) => onProfileChange({ last_name: e.target.value })}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            defaultValue={profile?.email || ''}
            disabled
            className="bg-gray-50"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            defaultValue={profile?.company || ''}
            placeholder={profile?.company || 'Enter your company name'}
            onChange={(e) => onProfileChange({ company: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website URL</Label>
          <Input
            id="website"
            type="url"
            defaultValue={profile?.website_url || ''}
            placeholder={profile?.website_url || 'Enter your website URL'}
            onChange={(e) => onProfileChange({ website_url: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            defaultValue={profile?.phone_number || ''}
            placeholder={profile?.phone_number || 'Enter your phone number'}
            onChange={(e) => onProfileChange({ phone_number: e.target.value })}
          />
        </div>

        <Button 
          onClick={onSave} 
          disabled={isSaving}
          className="w-full md:w-auto"
        >
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </Card>
  );
}
