import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import ProjectDashboard from "./pages/ProjectDashboard";
import Settings from "./pages/Settings";
import AdminDashboard from "./pages/AdminDashboard";
import Auth from "./components/Auth";
import { AuthenticatedLayout } from "./components/layouts/AuthenticatedLayout";

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
  const [isSuperAdmin, setIsSuperAdmin] = useState<boolean>(false);
  const { toast } = useToast();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          setIsAuthenticated(false);
          toast({
            title: "Session Error",
            description: "There was a problem with your session. Please try logging in again.",
            variant: "destructive",
          });
          return;
        }

        if (!session) {
          setIsAuthenticated(false);
          return;
        }

        setIsAuthenticated(true);
        await checkSuperAdmin(session.user.id);
      } catch (error) {
        console.error('Error initializing auth:', error);
        setIsAuthenticated(false);
        toast({
          title: "Authentication Error",
          description: "There was a problem with authentication. Please try logging in again.",
          variant: "destructive",
        });
      }
    };

    initializeAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, !!session);
      
      if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
        setIsAuthenticated(false);
        setIsSuperAdmin(false);
        queryClient.clear();
        return;
      }

      if (session?.user) {
        setIsAuthenticated(true);
        await checkSuperAdmin(session.user.id);
      } else {
        setIsAuthenticated(false);
        setIsSuperAdmin(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const checkSuperAdmin = async (userId: string) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('is_superadmin')
        .eq('id', userId)
        .maybeSingle();
      
      if (error) {
        console.error('Error checking superadmin status:', error);
        toast({
          title: "Error",
          description: "Failed to check admin privileges. Please try refreshing the page.",
          variant: "destructive",
        });
        return;
      }
      
      setIsSuperAdmin(profile?.is_superadmin || false);
    } catch (error) {
      console.error('Error checking superadmin status:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred while checking admin status. Please try refreshing the page.",
        variant: "destructive",
      });
    }
  };

  if (isAuthenticated === null) {
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
              path="/dashboard/admin" 
              element={
                isAuthenticated && isSuperAdmin ? (
                  <AuthenticatedLayout>
                    <AdminDashboard />
                  </AuthenticatedLayout>
                ) : (
                  <Navigate to="/dashboard" replace />
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