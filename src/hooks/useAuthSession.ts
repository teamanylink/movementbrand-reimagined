import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { QueryClient } from "@tanstack/react-query";

export const useAuthSession = (queryClient: QueryClient) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const handleSessionCleanup = async () => {
    setIsAuthenticated(false);
    queryClient.clear();
    try {
      const { error } = await supabase.auth.signOut();
      if (error) console.error('Cleanup signout error:', error);
    } catch (error) {
      console.error('Cleanup signout error:', error);
    }
  };

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !session) {
          await handleSessionCleanup();
          if (sessionError) {
            toast({
              variant: "destructive",
              title: "Authentication Error",
              description: "Please sign in again.",
            });
          }
          return;
        }

        if (mounted) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Session check error:", error);
        await handleSessionCleanup();
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, !!session);
      
      if (event === 'SIGNED_OUT') {
        await handleSessionCleanup();
        toast({
          title: "Signed out",
          description: "You have been successfully signed out.",
        });
      } else if (event === 'SIGNED_IN' && session) {
        setIsAuthenticated(true);
      }

      setIsLoading(false);
    });

    checkSession();

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [queryClient, toast]);

  return { isAuthenticated, isLoading };
};