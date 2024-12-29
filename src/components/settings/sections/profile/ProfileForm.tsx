import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserProfile } from "@/types/user";

interface ProfileFormProps {
  profile: UserProfile;
  onProfileChange: (updates: Partial<UserProfile>) => void;
}

export function ProfileForm({ profile, onProfileChange }: ProfileFormProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            value={profile.first_name || ''}
            onChange={(e) => onProfileChange({ first_name: e.target.value })}
            placeholder="Enter your first name"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            value={profile.last_name || ''}
            onChange={(e) => onProfileChange({ last_name: e.target.value })}
            placeholder="Enter your last name"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          value={profile.email || ''}
          disabled
          className="bg-gray-50"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          value={profile.company || ''}
          onChange={(e) => onProfileChange({ company: e.target.value })}
          placeholder="Enter your company name"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Website URL</Label>
        <Input
          id="website"
          type="url"
          value={profile.website_url || ''}
          onChange={(e) => onProfileChange({ website_url: e.target.value })}
          placeholder="Enter your website URL"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={profile.phone_number || ''}
          onChange={(e) => onProfileChange({ phone_number: e.target.value })}
          placeholder="Enter your phone number"
        />
      </div>
    </>
  );
}