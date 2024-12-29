import { useState } from "react";
import { useLocation } from "react-router-dom";
import { useToast } from "./ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { SignInForm } from "./auth/SignInForm";
import { SignUpForm } from "./auth/SignUpForm";

const Auth = () => {
  const location = useLocation();
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyUrl: "",
    email: "",
    password: "",
  });
  const { toast } = useToast();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const uploadImage = async (userId: string) => {
    if (!selectedImage) return null;

    const fileExt = selectedImage.name.split('.').pop();
    const filePath = `${userId}/avatar.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from('project-files')
      .upload(filePath, selectedImage);

    if (uploadError) {
      throw uploadError;
    }

    const { data: { publicUrl } } = supabase.storage
      .from('project-files')
      .getPublicUrl(filePath);

    return publicUrl;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            website_url: formData.companyUrl,
          }
        }
      });

      if (error) throw error;

      if (data.user && selectedImage) {
        const avatarUrl = await uploadImage(data.user.id);
        if (avatarUrl) {
          await supabase
            .from('profiles')
            .update({ avatar_url: avatarUrl })
            .eq('id', data.user.id);
        }
      }

      toast({
        title: "Success",
        description: "Please check your email to verify your account",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      {isSignUp ? (
        <SignUpForm
          onSubmit={handleSignUp}
          onSignInClick={() => setIsSignUp(false)}
          formData={formData}
          setFormData={setFormData}
          isLoading={isLoading}
          selectedImage={selectedImage}
          previewUrl={previewUrl}
          handleImageChange={handleImageChange}
        />
      ) : (
        <SignInForm onSignUpClick={() => setIsSignUp(true)} />
      )}
    </div>
  );
};

export default Auth;