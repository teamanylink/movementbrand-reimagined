import { Routes, Route } from "react-router-dom";
import { useAuthState } from "@/hooks/useAuthState";
import { AppProviders } from "@/components/providers/AppProviders";
import { createRoutes } from "@/routes/routes";

const App = () => {
  const { isAuthenticated, userProfile, isLoading } = useAuthState();

  // Show loading spinner only during initial authentication check
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Once loading is complete, create routes based on auth state
  const routes = createRoutes(isAuthenticated, userProfile);

  return (
    <AppProviders>
      <Routes>
        {routes.map((route, index) => (
          <Route key={index} {...route} />
        ))}
      </Routes>
    </AppProviders>
  );
};

export default App;