import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { supabase } from "@/integrations/supabase/client";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "./ui/use-toast";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyUrl: "",
    email: "",
    password: "",
  });
  const { toast } = useToast();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
    }
  };

  if (isSignUp) {
    return (
      <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Create your account</h2>
        <form onSubmit={handleSignUp} className="space-y-4">
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
          <Button type="submit" className="w-full">
            Sign Up
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
            sign_up: {
              link_text: "Don't have an account? Sign up",
              button_label: "Sign up",
              email_label: "Email",
              password_label: "Password",
            },
          },
        }}
      />
      <div className="mt-4 text-center">
        <button
          onClick={() => setIsSignUp(true)}
          className="text-sm text-blue-600 hover:underline"
        >
          Don't have an account? Sign up
        </button>
      </div>
    </div>
  );
};

export default Auth;