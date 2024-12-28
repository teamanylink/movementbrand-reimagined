import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import ProjectDashboard from "./pages/ProjectDashboard";
import Settings from "./pages/Settings";
import Auth from "./components/Auth";
import { AuthenticatedLayout } from "./components/layouts/AuthenticatedLayout";
import { useToast } from "@/hooks/use-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  // Function to handle session cleanup and state reset
  const handleSessionCleanup = async () => {
    setIsAuthenticated(false);
    queryClient.clear();
    // Ensure we clear any lingering session
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Cleanup signout error:', error);
    }
  };

  useEffect(() => {
    let mounted = true;

    // Check initial session
    const checkSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session check error:", sessionError);
          await handleSessionCleanup();
          toast({
            variant: "destructive",
            title: "Authentication Error",
            description: "Please sign in again.",
          });
          return;
        }

        if (!session) {
          await handleSessionCleanup();
          return;
        }

        // Additional session validation
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !user) {
          console.error("User verification error:", userError);
          await handleSessionCleanup();
          toast({
            variant: "destructive",
            title: "Session Expired",
            description: "Your session has expired. Please sign in again.",
          });
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

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, !!session);
      
      if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
        await handleSessionCleanup();
        toast({
          title: "Signed out",
          description: "You have been successfully signed out.",
        });
      } else if (event === 'SIGNED_IN' && session) {
        setIsAuthenticated(true);
      } else if (event === 'TOKEN_REFRESHED' && session) {
        // Validate the refreshed session
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError || !user) {
          console.error("Session refresh validation error:", userError);
          await handleSessionCleanup();
          toast({
            variant: "destructive",
            title: "Session Error",
            description: "There was a problem with your session. Please sign in again.",
          });
          return;
        }
        setIsAuthenticated(true);
      }

      setIsLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Index />} 
            />
            <Route 
              path="/dashboard" 
              element={
                isAuthenticated ? (
                  <AuthenticatedLayout>
                    <Dashboard />
                  </AuthenticatedLayout>
                ) : (
                  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                    <Auth />
                  </div>
                )
              } 
            />
            <Route 
              path="/dashboard/settings" 
              element={
                isAuthenticated ? (
                  <AuthenticatedLayout>
                    <Settings />
                  </AuthenticatedLayout>
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            <Route 
              path="/project" 
              element={
                isAuthenticated ? (
                  <AuthenticatedLayout>
                    <ProjectDashboard />
                  </AuthenticatedLayout>
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
            <Route 
              path="/project/:projectId" 
              element={
                isAuthenticated ? (
                  <AuthenticatedLayout>
                    <ProjectDashboard />
                  </AuthenticatedLayout>
                ) : (
                  <Navigate to="/" replace />
                )
              } 
            />
          </Routes>
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;