import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { supabase } from "@/integrations/supabase/client";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const Auth = () => {
  // Get the current URL for redirect
  const currentOrigin = window.location.origin;

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
        redirectTo={`${currentOrigin}/dashboard`}
        onlyThirdPartyProviders={false}
      />
    </div>
  );
};

export default Auth;