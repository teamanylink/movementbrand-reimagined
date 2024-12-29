import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { supabase } from "@/integrations/supabase/client";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";
import { useLocation } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Upload, Loader2 } from "lucide-react";

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

  useEffect(() => {
    if (location.state?.showSignup) {
      setIsSignUp(true);
    }
  }, [location.state]);

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

  if (isSignUp) {
    return (
      <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Create your account</h2>
        <form onSubmit={handleSignUp} className="space-y-4">
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
                className="cursor-pointer text-sm text-blue-600 hover:underline"
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
              onClick={() => setIsSignUp(false)}
              className="text-blue-600 hover:underline"
            >
              Sign in
            </button>
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Welcome Back</h2>
      <SupabaseAuth 
        supabaseClient={supabase}
        appearance={{ 
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#000000',
                brandAccent: '#333333',
              },
            },
          },
        }}
        providers={[]}
        redirectTo={window.location.origin}
        view="sign_in"
        localization={{
          variables: {
            sign_in: {
              email_label: "Email",
              password_label: "Password",
              button_label: "Sign in",
              link_text: "",
              password_input_placeholder: "Password",
              email_input_placeholder: "Email",
            },
            forgotten_password: {
              link_text: "",
            },
            sign_up: {
              link_text: "",
            },
          },
        }}
      />
      <div className="mt-4 text-center">
        <button
          onClick={() => setIsSignUp(true)}
          className="text-sm text-blue-600"
        >
          <span className="text-black">Don't have an account?</span> Sign up
        </button>
      </div>
    </div>
  );
};

export default Auth;
