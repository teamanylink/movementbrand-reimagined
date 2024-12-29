import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Upload, Trash2, Loader2 } from "lucide-react";
import { UserProfile } from "@/types/user";

interface AvatarUploadProps {
  profile: UserProfile | null;
  previewUrl: string | null;
  isUploading: boolean;
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteImage: () => void;
}

export function AvatarUpload({
  profile,
  previewUrl,
  isUploading,
  onImageChange,
  onDeleteImage,
}: AvatarUploadProps) {
  const getInitials = (firstName?: string | null, lastName?: string | null) => {
    const first = firstName?.charAt(0) || '';
    const last = lastName?.charAt(0) || '';
    return (first + last).toUpperCase() || '?';
  };

  return (
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
      <div className="flex items-center gap-4">
        <div>
          <Input
            type="file"
            accept="image/*"
            onChange={onImageChange}
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
            className="text-red-500 hover:text-red-600 hover:bg-red-50 p-0 h-auto"
            onClick={onDeleteImage}
            disabled={isUploading}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
}