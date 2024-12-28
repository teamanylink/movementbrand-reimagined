import { Routes, Route, Navigate } from "react-router-dom";
import { AuthenticatedLayout } from "./AuthenticatedLayout";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import ProjectDashboard from "@/pages/ProjectDashboard";
import Settings from "@/pages/Settings";
import Auth from "@/components/Auth";

interface AppRoutesProps {
  isAuthenticated: boolean;
}

export const AppRoutes = ({ isAuthenticated }: AppRoutesProps) => {
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