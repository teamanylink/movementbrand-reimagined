import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/types/user";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface ProfileSectionProps {
  profile: UserProfile | null;
  onProfileChange: (updates: Partial<UserProfile>) => void;
  onSave: () => void;
  isSaving: boolean;
}

export function ProfileSection({ profile, onProfileChange, onSave, isSaving }: ProfileSectionProps) {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(profile?.avatar_url || null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleDeleteImage = async () => {
    if (!profile?.id) return;
    
    try {
      setIsUploading(true);
      // Delete the old image from storage if it exists
      if (profile.avatar_url) {
        const oldFilePath = profile.avatar_url.split('/').pop();
        if (oldFilePath) {
          await supabase.storage
            .from('project-files')
            .remove([`${profile.id}/avatar/${oldFilePath}`]);
        }
      }

      // Update profile with null avatar_url
      onProfileChange({ avatar_url: null });
      setPreviewUrl(null);
      setSelectedImage(null);

      toast({
        title: "Success",
        description: "Profile picture removed successfully",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove profile picture",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    if (!profile?.id) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Unable to save profile. Please try again.",
      });
      return;
    }

    if (selectedImage) {
      setIsUploading(true);
      try {
        // Delete old image if it exists
        if (profile.avatar_url) {
          const oldFilePath = profile.avatar_url.split('/').pop();
          if (oldFilePath) {
            await supabase.storage
              .from('project-files')
              .remove([`${profile.id}/avatar/${oldFilePath}`]);
          }
        }

        // Upload new image
        const fileExt = selectedImage.name.split('.').pop();
        const filePath = `${profile.id}/avatar/${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('project-files')
          .upload(filePath, selectedImage);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('project-files')
          .getPublicUrl(filePath);

        onProfileChange({ avatar_url: publicUrl });
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to upload profile picture",
        });
        // Reset preview if upload fails
        setPreviewUrl(profile.avatar_url);
        setSelectedImage(null);
        return;
      } finally {
        setIsUploading(false);
      }
    }

    onSave();
  };

  const getInitials = (firstName?: string | null, lastName?: string | null) => {
    const first = firstName?.charAt(0) || '';
    const last = lastName?.charAt(0) || '';
    return (first + last).toUpperCase() || '?';
  };

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
      <div className="grid gap-6">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={previewUrl || ''} />
            <AvatarFallback className="bg-gray-100">
              {previewUrl ? (
                <Loader2 className="h-8 w-8 animate-spin" />
              ) : (
                getInitials(profile?.first_name, profile?.last_name)
              )}
            </AvatarFallback>
          </Avatar>
          <div className="flex gap-4">
            <div>
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="avatar-upload"
                disabled={isUploading}
              />
              <label
                htmlFor="avatar-upload"
                className="cursor-pointer text-sm text-gray-500 hover:text-gray-600 flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                {profile?.avatar_url ? "Change profile picture" : "Upload profile picture"}
              </label>
            </div>
            {profile?.avatar_url && (
              <Button
                variant="ghost"
                size="sm"
                className="text-red-500 hover:text-red-600 hover:bg-red-50 p-0"
                onClick={handleDeleteImage}
                disabled={isUploading}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
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
          onClick={handleSave} 
          disabled={isSaving || isUploading}
          className="w-full md:w-auto"
        >
          {isSaving || isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isUploading ? "Uploading..." : "Saving..."}
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </Card>
  );
}