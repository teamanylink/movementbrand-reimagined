import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Globe, LogOut, Plus } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProjectForm } from "@/components/dashboard/ProjectForm";
import { KanbanBoard } from "@/components/dashboard/KanbanBoard";
import { ProjectOptions } from "@/components/dashboard/ProjectOptions";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { EmptyStateMessage } from "@/components/dashboard/EmptyStateMessage";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showProjectOptions, setShowProjectOptions] = useState(false);
  const [hasProjects, setHasProjects] = useState(false);
  const [selectedProjectType, setSelectedProjectType] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('email')
          .eq('id', user.id)
          .single();
        
        if (profile && profile.email) {
          const username = profile.email.split('@')[0];
          setUserEmail(username);
        }
      }
    };

    fetchUserProfile();

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

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN') {
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in.",
        });
        fetchUserProfile();
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

  const handleNewProject = () => {
    setShowProjectOptions(!showProjectOptions);
    setSelectedProjectType(null);
  };

  const getUserInitials = (email: string | null) => {
    if (!email) return '';
    return email.charAt(0).toUpperCase();
  };

  const renderContent = () => {
    if (selectedProjectType) {
      return (
        <div className="h-full flex items-center justify-center">
          <ProjectForm 
            onBack={() => setSelectedProjectType(null)}
            onSubmit={handleProjectSubmit}
            selectedProjectType={selectedProjectType}
          />
        </div>
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
      return <EmptyStateMessage />;
    }

    return <KanbanBoard />;
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      <nav className="bg-white border-gray-800 h-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4 text-[18px]">
              <div className="flex items-center">
                <span className="text-black font-semibold">MovementBrand</span>
                <span className="text-gray-400 mx-2">/</span>
                <span className="text-gray-400">{userEmail || 'Loading...'}</span>
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

            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                <Globe className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarFallback className="bg-accent text-accent-foreground">
                      {getUserInitials(userEmail)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <DashboardHeader onNewProject={handleNewProject} />
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 min-h-[600px] relative">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
