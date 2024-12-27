import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Package2, Users, Settings, Globe, Plus } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showProjectOptions, setShowProjectOptions] = useState(false);
  const [hasProjects, setHasProjects] = useState(false);
  const [selectedProjectType, setSelectedProjectType] = useState<string | null>(null);

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

  const projectTypes = [
    { name: "Automation", duration: "1 week" },
    { name: "Design", duration: "48 hours" },
    { name: "Landing Page", duration: "48 hours" },
    { name: "Micro-Saas", duration: "3 weeks" },
    { name: "Blog", duration: "48 hours" },
    { name: "Other", duration: "" },
  ];

  const renderContent = () => {
    if (selectedProjectType) {
      return (
        <div className="max-w-xl mx-auto w-full space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
                Let's give this project a name
              </label>
              <Input 
                id="projectName"
                placeholder="Enter project name"
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <Textarea 
                id="description"
                placeholder="Tell us about your project"
                className="w-full min-h-[120px]"
              />
            </div>
            <div className="flex justify-end pt-4">
              <Button 
                onClick={() => setSelectedProjectType(null)}
                variant="outline"
                className="mr-2"
              >
                Back
              </Button>
              <Button>
                Next
              </Button>
            </div>
          </div>
        </div>
      );
    }

    if (showProjectOptions) {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
          {projectTypes.map((project, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-md transition-shadow cursor-pointer border border-gray-100 hover:scale-102 transition-transform"
              onClick={() => setSelectedProjectType(project.name)}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                {project.duration && (
                  <p className="text-sm text-gray-500">Estimated time: {project.duration}</p>
                )}
              </div>
            </Card>
          ))}
        </div>
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

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-4 text-gray-700">To Do</h3>
          {/* Kanban column content will go here */}
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-4 text-gray-700">In Progress</h3>
          {/* Kanban column content will go here */}
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-4 text-gray-700">Completed</h3>
          {/* Kanban column content will go here */}
        </div>
      </div>
    );
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
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;