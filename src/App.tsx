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
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(true);
  const { toast } = useToast();

  useEffect(() => {
    const checkSession = async () => {
      try {
        console.log("Checking initial session...");
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Session check error:", error);
          throw error;
        }

        if (isMounted.current) {
          console.log("Initial session check:", session ? "Session exists" : "No session");
          setIsAuthenticated(!!session);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error checking session:", error);
        if (isMounted.current) {
          setIsAuthenticated(false);
          setIsLoading(false);
          toast({
            title: "Authentication Error",
            description: "There was a problem checking your session. Please try logging in again.",
            variant: "destructive",
          });
        }
      }
    };

    // Initial session check
    checkSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state change:", event, session ? "Session exists" : "No session");
      
      if (isMounted.current) {
        if (event === 'SIGNED_OUT') {
          // Clear any cached data
          queryClient.clear();
          toast({
            title: "Signed out successfully",
            description: "You have been logged out of your account.",
          });
        }

        setIsAuthenticated(!!session);
        setIsLoading(false);
      }
    });

    // Cleanup function
    return () => {
      isMounted.current = false;
      subscription.unsubscribe();
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