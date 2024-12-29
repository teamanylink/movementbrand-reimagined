import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { supabase } from "@/integrations/supabase/client";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { ArrowLeft } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const SignInForm = ({ onSignUp }: { onSignUp: () => void }) => {
  const navigate = useNavigate();

  return (
    <div className="relative max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-lg">
      <div className="absolute left-4 top-4 mb-5">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="hover:bg-transparent rounded-full flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4 text-gray-500" />
          <span className="text-gray-500 text-xs hover:text-gray-400">Back to home</span>
        </Button>
      </div>
      <h2 className="text-3xl font-bold text-center mb-1 mt-12">Welcome Back</h2>
      <p className="text-base text-center mb-6">Please enter your details.</p>
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
          onClick={onSignUp}
          className="text-sm text-gray-500 hover:text-gray-600"
        >
          <span className="text-black">Don't have an account?</span> Sign up
        </button>
      </div>
    </div>
  );
};

export default SignInForm;