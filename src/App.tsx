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
import Auth from "./components/Auth";
import { AuthenticatedLayout } from "./components/layouts/AuthenticatedLayout";
import { useToast } from "./components/ui/use-toast";

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
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        // Debug current session state
        console.log('Initializing auth...');
        
        // Get current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          if (mounted) {
            setIsAuthenticated(false);
            localStorage.clear();
            toast({
              title: "Session Error",
              description: "Please sign in again.",
              variant: "destructive"
            });
          }
          return;
        }

        // Debug session data
        console.log('Current session:', session ? 'Valid' : 'None');
        
        if (session) {
          try {
            // Verify JWT is still valid
            const { data: user, error: userError } = await supabase.auth.getUser();
            
            if (userError) {
              console.error('User verification error:', userError);
              if (mounted) {
                setIsAuthenticated(false);
                localStorage.clear();
                await supabase.auth.signOut();
                toast({
                  title: "Session Expired",
                  description: "Please sign in again.",
                  variant: "destructive"
                });
              }
              return;
            }
            
            console.log('User verified:', !!user);
            if (mounted) {
              setIsAuthenticated(true);
            }
          } catch (verifyError) {
            console.error('Verification error:', verifyError);
            if (mounted) {
              setIsAuthenticated(false);
              localStorage.clear();
              await supabase.auth.signOut();
            }
          }
        } else {
          if (mounted) {
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        if (mounted) {
          setIsAuthenticated(false);
          localStorage.clear();
          toast({
            title: "Authentication Error",
            description: "Please try signing in again.",
            variant: "destructive"
          });
        }
      }
    };

    // Initialize auth state
    initializeAuth();

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, !!session);
      if (mounted) {
        if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
          localStorage.clear();
          setIsAuthenticated(false);
          toast({
            title: "Signed Out",
            description: "You have been logged out.",
          });
        } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          setIsAuthenticated(!!session);
          if (event === 'SIGNED_IN') {
            toast({
              title: "Signed In",
              description: "Welcome back!",
            });
          }
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [toast]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
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