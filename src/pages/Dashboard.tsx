import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Globe, Plus } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ProjectForm } from "@/components/dashboard/ProjectForm";
import { KanbanBoard } from "@/components/dashboard/KanbanBoard";
import { ProjectOptions } from "@/components/dashboard/ProjectOptions";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showProjectOptions, setShowProjectOptions] = useState(false);
  const [hasProjects, setHasProjects] = useState(false);
  const [selectedProjectType, setSelectedProjectType] = useState<string | null>(null);

  useEffect(() => {
    const checkExistingProjects = async () => {
      const { count, error } = await supabase
        .from('projects')
        .select('*', { count: 'exact', head: true });

      if (error) {
        console.error("Error checking projects:", error);
        return;
      }

      setHasProjects(count ? count > 0 : false);
    };

    checkExistingProjects();

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

  const projectTypes = [
    { name: "Automation", duration: "1 week" },
    { name: "Design", duration: "48 hours" },
    { name: "Landing Page", duration: "48 hours" },
    { name: "Micro-Saas", duration: "3 weeks" },
    { name: "Blog", duration: "48 hours" },
    { name: "Other", duration: "" },
  ];

  const handleProjectSubmit = () => {
    setHasProjects(true);
    setShowProjectOptions(false);
    setSelectedProjectType(null);
  };

  const renderContent = () => {
    if (selectedProjectType) {
      return (
        <ProjectForm 
          onBack={() => setSelectedProjectType(null)}
          onSubmit={handleProjectSubmit}
          selectedProjectType={selectedProjectType}
        />
      );
    }

    if (showProjectOptions) {
      return (
        <ProjectOptions 
          projectTypes={projectTypes}
          onSelectProject={setSelectedProjectType}
        />
      );
    }

    if (!hasProjects) {
      return (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Start Your First Project!</h3>
          <p className="text-gray-500 max-w-md">
            Click the "New Project" button above to begin your journey with MovementBrand.
          </p>
        </div>
      );
    }

    return <KanbanBoard />;
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* Navigation Bar */}
      <nav className="bg-white border-gray-800 h-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Left section - Logo and workspace */}
            <div className="flex items-center space-x-4 text-[18px]">
              <div className="flex items-center">
                <span className="text-black font-semibold">MovementBrand</span>
                <span className="text-gray-400 mx-2">/</span>
                <span className="text-gray-400">yanitsuka</span>
              </div>
              <div className="hidden md:flex items-center space-x-1">
                <Button 
                  variant="ghost" 
                  className="bg-[#0f172a] text-white hover:bg-gray-800"
                  size="sm"
                >
                  Home
                </Button>
                <Button 
                  variant="ghost"
                  className="text-[#0f172a] hover:bg-gray-800 hover:text-white"
                  size="sm"
                >
                  Members
                </Button>
                <Button 
                  variant="ghost"
                  className="text-[#0f172a] hover:bg-gray-800 hover:text-white"
                  size="sm"
                >
                  Settings
                </Button>
              </div>
            </div>

            {/* Right section - Actions */}
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                <Globe className="h-5 w-5" />
              </Button>
              <Avatar 
                className="h-8 w-8 cursor-pointer"
                onClick={handleSignOut}
              >
                <AvatarFallback className="bg-accent text-accent-foreground">
                  MB
                </AvatarFallback>
              </Avatar>
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
          <Button 
            variant="default"
            size="sm"
            className="flex items-center gap-2"
            onClick={() => {
              setShowProjectOptions(!showProjectOptions);
              setSelectedProjectType(null);
            }}
          >
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 min-h-[600px]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;