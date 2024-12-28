import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useAuthState = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchInitialState = async () => {
      try {
        console.log("Fetching initial auth state...");
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Session:", session);
        
        if (session) {
          setIsAuthenticated(true);
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          
          console.log("Profile:", profile);
          setUserProfile(profile);
        } else {
          setIsAuthenticated(false);
          setUserProfile(null);
        }
      } catch (error) {
        console.error('Error fetching initial state:', error);
        setIsAuthenticated(false);
        setUserProfile(null);
      } finally {
        console.log("Setting loading to false");
        setIsLoading(false);
      }
    };

    fetchInitialState();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session);
      
      if (session) {
        setIsAuthenticated(true);
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        setUserProfile(profile);
      } else {
        setIsAuthenticated(false);
        setUserProfile(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return { isAuthenticated, userProfile, isLoading };
};