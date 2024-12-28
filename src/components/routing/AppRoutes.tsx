import { Routes, Route, Navigate } from "react-router-dom";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import ProjectDashboard from "@/pages/ProjectDashboard";
import Settings from "@/pages/Settings";
import Auth from "@/components/Auth";
import { AuthenticatedLayout } from "@/components/layouts/AuthenticatedLayout";
import { useAuthSession } from "@/hooks/useAuthSession";
import { QueryClient } from "@tanstack/react-query";

interface AppRoutesProps {
  queryClient: QueryClient;
}

export const AppRoutes = ({ queryClient }: AppRoutesProps) => {
  const { isAuthenticated, isLoading } = useAuthSession(queryClient);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
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
  );
};