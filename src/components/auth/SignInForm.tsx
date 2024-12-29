import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { supabase } from "@/integrations/supabase/client";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export const SignInForm = ({ onSignUpClick }: { onSignUpClick: () => void }) => {
  return (
    <div className="w-full max-w-md mx-auto p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-semibold mb-2">Log in to your account</h1>
        <p className="text-gray-600">Welcome back! Please enter your details.</p>
      </div>
      <SupabaseAuth 
        supabaseClient={supabase}
        appearance={{ 
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#7C3AED',
                brandAccent: '#6D28D9',
              },
            },
          },
          className: {
            button: 'w-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white font-medium py-2 px-4 rounded-lg transition-colors',
            input: 'w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent',
            label: 'block text-sm font-medium text-gray-700 mb-1',
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
              password_input_placeholder: "••••••••",
              email_input_placeholder: "Enter your email",
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
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={onSignUpClick}
            className="text-[#7C3AED] hover:text-[#6D28D9] font-medium"
          >
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
};