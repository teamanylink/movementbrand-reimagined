import { Routes, Route, Navigate } from "react-router-dom";
import { AuthenticatedLayout } from "./AuthenticatedLayout";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import ProjectDashboard from "@/pages/ProjectDashboard";
import Settings from "@/pages/Settings";
import AdminDashboard from "@/pages/AdminDashboard";
import Auth from "@/components/Auth";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Chat from "@/pages/Chat";

interface AppRoutesProps {
  isAuthenticated: boolean;
}

export const AppRoutes = ({ isAuthenticated }: AppRoutesProps) => {
  const { data: profile } = useQuery({
    queryKey: ['current-profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return null;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) throw error;
      return data;
    },
    enabled: isAuthenticated,
  });

  const isSuperAdmin = profile?.is_superadmin;

  return (
    <Routes>
      <Route 
        path="/" 
        element={
          isAuthenticated ? (
            <Navigate to={isSuperAdmin ? "/admin" : "/dashboard"} replace />
          ) : (
            <Index />
          )
        } 
      />
      <Route 
        path="/dashboard" 
        element={
          isAuthenticated ? (
            isSuperAdmin ? (
              <Navigate to="/admin" replace />
            ) : (
              <AuthenticatedLayout>
                <Dashboard />
              </AuthenticatedLayout>
            )
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
            isSuperAdmin ? (
              <Navigate to="/admin" replace />
            ) : (
              <AuthenticatedLayout>
                <ProjectDashboard />
              </AuthenticatedLayout>
            )
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
      <Route
        path="/admin"
        element={
          isAuthenticated && isSuperAdmin ? (
            <AuthenticatedLayout>
              <AdminDashboard />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route 
        path="/chat" 
        element={
          isAuthenticated ? (
            <AuthenticatedLayout>
              <Chat />
            </AuthenticatedLayout>
          ) : (
            <Navigate to="/" replace />
          )
        } 
      />
    </Routes>
  );
};
