import { Routes, Route } from "react-router-dom";
import { useAuthState } from "@/hooks/useAuthState";
import { AppProviders } from "@/components/providers/AppProviders";
import { createRoutes } from "@/routes/routes";

const App = () => {
  const { isAuthenticated, userProfile } = useAuthState();

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

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