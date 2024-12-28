import { Auth as SupabaseAuth } from "@supabase/auth-ui-react";
import { supabase } from "@/integrations/supabase/client";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const Auth = () => {
  return (
    <div className="max-w-md w-full mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Create your account</h2>
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
        view="sign_up"
        showLinks={true}
        additionalData={{
          first_name: {
            label: 'First Name',
            type: 'text',
            required: true,
          },
          last_name: {
            label: 'Last Name',
            type: 'text',
            required: true,
          },
          company: {
            label: 'Company',
            type: 'text',
            required: false,
          },
          website_url: {
            label: 'Website URL',
            type: 'url',
            required: false,
          },
        }}
      />
    </div>
  );
};

export default Auth;