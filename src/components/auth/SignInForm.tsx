import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { supabase } from "@/integrations/supabase/client";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface SignInFormProps {
  onSignUpClick: () => void;
}

export const SignInForm = ({ onSignUpClick }: SignInFormProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-lg">
      <div className="flex items-center mb-6">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h2 className="text-2xl font-bold text-center flex-1 pr-10">Welcome Back</h2>
      </div>
      <p className="text-base text-center mb-6">Please enter your details.</p>
      <SupabaseAuth 
        supabaseClient={supabase}
        appearance={{ 
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#40E0D0',
                brandAccent: '#2CB5A8',
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
          onClick={onSignUpClick}
          className="text-sm text-gray-500 hover:text-gray-600"
        >
          <span className="text-black">Don't have an account?</span> Sign up
        </button>
      </div>
    </div>
  );
};