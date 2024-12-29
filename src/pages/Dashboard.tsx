import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Clock, CheckCircle, Loader2, ListTodo, Zap } from "lucide-react";
import { KanbanBoard } from "@/components/dashboard/KanbanBoard";
import { ProjectOptions } from "@/components/dashboard/ProjectOptions";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { EmptyStateMessage } from "@/components/dashboard/EmptyStateMessage";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/use-subscription";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { toast } = useToast();
  const [hasProjects, setHasProjects] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isProjectOptionsOpen, setIsProjectOptionsOpen] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [projectStats, setProjectStats] = useState({
    todos: 0,
    completed: 0,
    inProgress: 0,
  });
  const { data: subscriptionData } = useSubscription();
  const navigate = useNavigate();

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
      const { data: todoProjects } = await supabase
        .from('projects')
        .select('id')
        .eq('status', 'todo');

      const { data: completedProjects } = await supabase
        .from('projects')
        .select('id')
        .eq('status', 'completed');

      const { data: inProgressProjects } = await supabase
        .from('projects')
        .select('id')
        .eq('status', 'in_progress');

      setProjectStats({
        todos: todoProjects?.length || 0,
        completed: completedProjects?.length || 0,
        inProgress: inProgressProjects?.length || 0,
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
  }, []);

  const handleUpgradeClick = async () => {
    setIsUpgrading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          priceId: 'price_1Qary9IHifxXxql3V4Dp8vB9',
          mode: 'subscription'
        }
      });

      if (error) throw error;

      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error: any) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to initiate upgrade process.",
      });
    } finally {
      setIsUpgrading(false);
    }
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header with Greeting */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Good {new Date().getHours() < 12 ? 'Morning' : 'Evening'} {userEmail} 👋</h1>
      </div>

      {/* Subscription Prompt */}
      {!subscriptionData?.subscribed && (
        <div className="mb-8">
          <div className="p-4 bg-gray-50 rounded-lg space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Upgrade Your Account</h3>
                <p className="text-sm text-muted-foreground">
                  Unlock the ability to create unlimited projects
                </p>
              </div>
              <Button
                onClick={handleUpgradeClick}
                disabled={isUpgrading}
                className="bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800"
              >
                {isUpgrading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <>
                    <Zap className="h-4 w-4 mr-2" />
                    Upgrade Now
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 flex items-center space-x-4">
          <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <ListTodo className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <div className="text-2xl font-bold">{projectStats.todos}</div>
            <div className="text-gray-500">To Do</div>
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

      {/* Main Content Area */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8 min-h-[600px]">
        <DashboardHeader onNewProject={() => setIsProjectOptionsOpen(true)} />
        {!hasProjects ? <EmptyStateMessage /> : <KanbanBoard />}
      </div>
      
      <ProjectOptions 
        projectTypes={projectTypes}
        onSelectProject={handleProjectSubmit}
        open={isProjectOptionsOpen}
        onOpenChange={setIsProjectOptionsOpen}
      />
    </div>
  );
};

export default Dashboard;