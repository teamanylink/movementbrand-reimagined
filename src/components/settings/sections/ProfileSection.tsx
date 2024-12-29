import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserProfile } from "@/types/user";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { AvatarUpload } from "./profile/AvatarUpload";
import { ProfileForm } from "./profile/ProfileForm";

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
    if (!profile?.id || !profile.avatar_url) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No profile image to delete",
      });
      return;
    }
    
    try {
      setIsUploading(true);
      
      const filePathMatch = profile.avatar_url.match(/project-files\/([^?]+)/);
      if (!filePathMatch) {
        throw new Error("Invalid file path");
      }
      const filePath = filePathMatch[1];

      const { error: deleteError } = await supabase.storage
        .from('project-files')
        .remove([filePath]);

      if (deleteError) throw deleteError;

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: null })
        .eq('id', profile.id);

      if (updateError) throw updateError;

      onProfileChange({ avatar_url: null });
      setPreviewUrl(null);
      setSelectedImage(null);

      toast({
        title: "Success",
        description: "Profile picture removed successfully",
      });
    } catch (error: any) {
      console.error('Error deleting image:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to remove profile picture. Please try again.",
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
        if (profile.avatar_url) {
          const filePathMatch = profile.avatar_url.match(/project-files\/([^?]+)/);
          if (filePathMatch) {
            const oldFilePath = filePathMatch[1];
            const { error: removeError } = await supabase.storage
              .from('project-files')
              .remove([oldFilePath]);
            
            if (removeError) throw removeError;
          }
        }

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
        console.error('Error uploading image:', error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to upload profile picture",
        });
        setPreviewUrl(profile.avatar_url);
        setSelectedImage(null);
        return;
      } finally {
        setIsUploading(false);
      }
    }

    onSave();
  };

  if (!profile) {
    return (
      <Card className="p-6">
        <div className="text-center">Loading profile...</div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-6">Profile Information</h2>
      <div className="grid gap-6">
        <AvatarUpload
          profile={profile}
          previewUrl={previewUrl}
          isUploading={isUploading}
          onImageChange={handleImageChange}
          onDeleteImage={handleDeleteImage}
        />

        <ProfileForm 
          profile={profile}
          onProfileChange={onProfileChange}
        />

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