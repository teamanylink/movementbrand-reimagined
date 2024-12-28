import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useAuthState = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialState = async () => {
      try {
        console.log("Fetching initial auth state...");
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Session:", session);
        
        setIsAuthenticated(!!session);

        if (session) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          console.log("Profile:", profile);
          setUserProfile(profile);
        }
      } catch (error) {
        console.error('Error fetching initial state:', error);
      } finally {
        console.log("Setting loading to false");
        setIsLoading(false);
      }
    };

    fetchInitialState();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      const isAuthed = !!session;
      setIsAuthenticated(isAuthed);
      
      if (session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        setUserProfile(profile);
      } else {
        setUserProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { isAuthenticated, userProfile, isLoading };
};