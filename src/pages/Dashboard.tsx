import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Globe, LogOut, Clock, CheckCircle, Loader2, Plus, Share2, CalendarDays } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { KanbanBoard } from "@/components/dashboard/KanbanBoard";
import { ProjectOptions } from "@/components/dashboard/ProjectOptions";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { EmptyStateMessage } from "@/components/dashboard/EmptyStateMessage";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

const Dashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [hasProjects, setHasProjects] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isProjectOptionsOpen, setIsProjectOptionsOpen] = useState(false);
  const [projectStats, setProjectStats] = useState({
    completed: 0,
    inProgress: 0,
    timesSaved: 12, // This would ideally come from your backend
  });

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

    const fetchProjectStats = async () => {
      const { data: completedProjects } = await supabase
        .from('projects')
        .select('id')
        .eq('status', 'completed');

      const { data: inProgressProjects } = await supabase
        .from('projects')
        .select('id')
        .eq('status', 'in_progress');

      setProjectStats({
        completed: completedProjects?.length || 0,
        inProgress: inProgressProjects?.length || 0,
        timesSaved: 12, // This would ideally be calculated from your backend
      });
    };

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

    fetchUserProfile();
    fetchProjectStats();
    checkExistingProjects();

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
  };

  const handleNewProject = () => {
    setIsProjectOptionsOpen(true);
  };

  const getUserInitials = (email: string | null) => {
    if (!email) return '';
    return email.charAt(0).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#F8F8F8]">
      {/* Top Navigation Bar */}
      <nav className="bg-white border-gray-800 h-[72px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4 text-[18px]">
              <div className="flex items-center">
                <span className="text-black font-semibold">MovementBrand</span>
                <span className="text-gray-400 mx-2">/</span>
                <span className="text-gray-400">{userEmail || 'Loading...'}</span>
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
        {/* Header with Date and Greeting */}
        <div className="mb-8">
          <div className="text-gray-500 mb-2">{format(new Date(), 'EEEE, do MMMM')}</div>
          <h1 className="text-4xl font-bold">Good {format(new Date(), 'a') === 'am' ? 'Morning' : 'Evening'}! {userEmail}</h1>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{projectStats.timesSaved}hrs</div>
              <div className="text-gray-500">Time Saved</div>
            </div>
          </Card>
          
          <Card className="p-6 flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{projectStats.completed}</div>
              <div className="text-gray-500">Projects Completed</div>
            </div>
          </Card>
          
          <Card className="p-6 flex items-center space-x-4">
            <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Loader2 className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold">{projectStats.inProgress}</div>
              <div className="text-gray-500">Projects In-progress</div>
            </div>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 mb-6">
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
          <Button onClick={handleNewProject} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Task
          </Button>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8 min-h-[600px] relative">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-semibold">My Projects</h2>
              <Button variant="outline" size="sm">This Week</Button>
            </div>
            <Button variant="link" className="text-gray-500">
              See All
            </Button>
          </div>
          {!hasProjects ? <EmptyStateMessage /> : <KanbanBoard />}
        </div>
        
        <ProjectOptions 
          projectTypes={projectTypes}
          onSelectProject={handleProjectSubmit}
          open={isProjectOptionsOpen}
          onOpenChange={setIsProjectOptionsOpen}
        />
      </div>
    </div>
  );
};

export default Dashboard;