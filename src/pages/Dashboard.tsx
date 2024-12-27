import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Package2, Users, Settings, Globe } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* Navigation Bar */}
      <nav className="border-b bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Package2 className="h-8 w-8" />
              <span className="ml-2 text-xl font-semibold">MovementBrand</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Globe className="h-5 w-5" />
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleSignOut}
              >
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome to your dashboard</p>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col items-center justify-center py-12">
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <Package2 className="h-12 w-12 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold mb-2">Let's get started</h2>
            <p className="text-gray-500 text-center max-w-md mb-4">
              You can customize this page by editing the Dashboard component
            </p>
          </div>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center space-y-2"
          >
            <Package2 className="h-6 w-6" />
            <span>Home</span>
          </Button>
          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center space-y-2"
          >
            <Users className="h-6 w-6" />
            <span>Members</span>
          </Button>
          <Button
            variant="outline"
            className="h-24 flex flex-col items-center justify-center space-y-2"
          >
            <Settings className="h-6 w-6" />
            <span>Settings</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;