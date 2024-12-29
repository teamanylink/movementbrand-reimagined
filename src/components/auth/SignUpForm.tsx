import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Upload, Loader2 } from "lucide-react";

interface SignUpFormProps {
  onSubmit: (e: React.FormEvent) => void;
  onSignInClick: () => void;
  formData: {
    firstName: string;
    lastName: string;
    companyUrl: string;
    email: string;
    password: string;
  };
  setFormData: (data: any) => void;
  isLoading: boolean;
  selectedImage: File | null;
  previewUrl: string | null;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SignUpForm = ({
  onSubmit,
  onSignInClick,
  formData,
  setFormData,
  isLoading,
  selectedImage,
  previewUrl,
  handleImageChange,
}: SignUpFormProps) => {
  return (
    <div className="w-full max-w-md mx-auto p-8">
      <h2 className="text-xl font-semibold text-center mb-6">Create your account</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={previewUrl || ''} />
            <AvatarFallback className="bg-gray-100">
              <Upload className="h-8 w-8 text-gray-400" />
            </AvatarFallback>
          </Avatar>
          <div>
            <Input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="avatar-upload"
            />
            <label
              htmlFor="avatar-upload"
              className="cursor-pointer text-sm text-gray-500"
            >
              Upload profile picture
            </label>
          </div>
        </div>
        <div>
          <Input
            placeholder="First Name"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
            required
          />
        </div>
        <div>
          <Input
            placeholder="Last Name"
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
            required
          />
        </div>
        <div>
          <Input
            placeholder="Company URL"
            type="url"
            value={formData.companyUrl}
            onChange={(e) => setFormData({ ...formData, companyUrl: e.target.value })}
          />
        </div>
        <div>
          <Input
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
        </div>
        <div>
          <Input
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            required
            minLength={6}
          />
          <p className="text-sm text-gray-500 mt-1">Password must be at least 6 characters</p>
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing up...
            </>
          ) : (
            "Sign Up"
          )}
        </Button>
        <p className="text-center text-sm">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSignInClick}
            className="text-gray-500 hover:text-gray-600"
          >
            Sign in
          </button>
        </p>
      </form>
    </div>
  );
};
