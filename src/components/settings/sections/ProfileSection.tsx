import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/types/user";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Upload, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ProfileSectionProps {
  profile: UserProfile | null;
  onProfileChange: (updates: Partial<UserProfile>) => void;
  onSave: () => void;
  isSaving: boolean;
}

export function ProfileSection({ profile, onProfileChange, onSave, isSaving }: ProfileSectionProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(profile?.avatar_url || null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      if (profile?.id) {
        const fileExt = file.name.split('.').pop();
        const filePath = `${profile.id}/avatar.${fileExt}`;

        try {
          const { error: uploadError } = await supabase.storage
            .from('project-files')
            .upload(filePath, file, { upsert: true });

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('project-files')
            .getPublicUrl(filePath);

          onProfileChange({ avatar_url: publicUrl });
        } catch (error: any) {
          console.error('Error uploading image:', error.message);
        }
      }
    }
  };

  const handleDeleteImage = async () => {
    if (profile?.id && profile.avatar_url) {
      try {
        // Extract the file path from the URL
        const urlParts = profile.avatar_url.split('/');
        const filePath = `${profile.id}/${urlParts[urlParts.length - 1]}`;

        await supabase.storage
          .from('project-files')
          .remove([filePath]);

        setPreviewUrl(null);
        setSelectedImage(null);
        onProfileChange({ avatar_url: null });
      } catch (error: any) {
        console.error('Error deleting image:', error.message);
      }
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
      <div className="grid gap-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={previewUrl || ''} />
            <AvatarFallback className="bg-gray-100">
              <Upload className="h-6 w-6 text-gray-400" />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center gap-2">
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="avatar-upload"
            />
            <label
              htmlFor="avatar-upload"
              className="cursor-pointer text-sm text-gray-500 hover:text-gray-600"
            >
              {profile?.avatar_url ? 'Change profile picture' : 'Upload profile picture'}
            </label>
            {profile?.avatar_url && (
              <button
                onClick={handleDeleteImage}
                className="flex items-center text-sm text-red-500 hover:text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete picture
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={profile?.first_name || ''}
              onChange={(e) => onProfileChange({ first_name: e.target.value })}
              placeholder="Enter your first name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={profile?.last_name || ''}
              onChange={(e) => onProfileChange({ last_name: e.target.value })}
              placeholder="Enter your last name"
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
            onChange={(e) => onProfileChange({ company: e.target.value })}
            placeholder="Enter your company name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website URL</Label>
          <Input
            id="website"
            type="url"
            value={profile?.website_url || ''}
            onChange={(e) => onProfileChange({ website_url: e.target.value })}
            placeholder="Enter your website URL"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            value={profile?.phone_number || ''}
            onChange={(e) => onProfileChange({ phone_number: e.target.value })}
            placeholder="Enter your phone number"
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