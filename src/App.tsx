import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import ProjectDashboard from "./pages/ProjectDashboard";
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
  const isMounted = useRef(true);
  const { toast } = useToast();

  useEffect(() => {
    let authListener: any = null;

    const initializeAuth = async () => {
      try {
        console.log("Initializing auth...");
        // First, check if there's an existing session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error("Session initialization error:", sessionError);
          throw sessionError;
        }

        if (isMounted.current) {
          console.log("Initial auth state:", session ? "Authenticated" : "Not authenticated");
          setIsAuthenticated(!!session);
          setIsLoading(false);
        }

        // Then set up the auth listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, currentSession) => {
          console.log("Auth state change:", event, currentSession ? "Session exists" : "No session");
          
          if (isMounted.current) {
            if (event === 'SIGNED_OUT') {
              console.log("User signed out, clearing cache...");
              queryClient.clear();
              setIsAuthenticated(false);
              toast({
                title: "Signed out successfully",
                description: "You have been logged out of your account.",
              });
            } else if (event === 'SIGNED_IN') {
              console.log("User signed in...");
              setIsAuthenticated(true);
              toast({
                title: "Signed in successfully",
                description: "Welcome back!",
              });
            }
            setIsLoading(false);
          }
        });

        authListener = subscription;
      } catch (error) {
        console.error("Auth initialization error:", error);
        if (isMounted.current) {
          setIsAuthenticated(false);
          setIsLoading(false);
          toast({
            title: "Authentication Error",
            description: "There was a problem with authentication. Please try logging in again.",
            variant: "destructive",
          });
        }
      }
    };

    initializeAuth();

    return () => {
      console.log("Cleaning up auth...");
      isMounted.current = false;
      if (authListener) {
        console.log("Unsubscribing from auth listener...");
        authListener.unsubscribe();
      }
    };
  }, [toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
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