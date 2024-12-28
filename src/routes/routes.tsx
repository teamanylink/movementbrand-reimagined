import { Navigate } from "react-router-dom";
import Index from "@/pages/Index";
import Dashboard from "@/pages/Dashboard";
import ProjectDashboard from "@/pages/ProjectDashboard";
import Settings from "@/pages/Settings";
import Auth from "@/components/Auth";
import { SignupForm } from "@/components/SignupForm";
import { AuthenticatedLayout } from "@/components/layouts/AuthenticatedLayout";

export const createRoutes = (isAuthenticated: boolean | null, userProfile: any) => [
  {
    path: "/",
    element: isAuthenticated ? <Navigate to="/dashboard" replace /> : <Index />
  },
  {
    path: "/signup",
    element: isAuthenticated ? <Navigate to="/dashboard" replace /> : <SignupForm />
  },
  {
    path: "/dashboard",
    element: isAuthenticated && userProfile ? (
      <AuthenticatedLayout>
        <Dashboard />
      </AuthenticatedLayout>
    ) : isAuthenticated ? (
      <Navigate to="/signup" replace />
    ) : (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Auth />
      </div>
    )
  },
  {
    path: "/settings",
    element: isAuthenticated && userProfile ? (
      <AuthenticatedLayout>
        <Settings />
      </AuthenticatedLayout>
    ) : isAuthenticated ? (
      <Navigate to="/signup" replace />
    ) : (
      <Navigate to="/" replace />
    )
  },
  {
    path: "/project",
    element: isAuthenticated && userProfile ? (
      <AuthenticatedLayout>
        <ProjectDashboard />
      </AuthenticatedLayout>
    ) : isAuthenticated ? (
      <Navigate to="/signup" replace />
    ) : (
      <Navigate to="/" replace />
    )
  },
  {
    path: "/project/:projectId",
    element: isAuthenticated && userProfile ? (
      <AuthenticatedLayout>
        <ProjectDashboard />
      </AuthenticatedLayout>
    ) : isAuthenticated ? (
      <Navigate to="/signup" replace />
    ) : (
      <Navigate to="/" replace />
    )
  }
];