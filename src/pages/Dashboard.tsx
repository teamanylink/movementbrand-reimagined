import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { KanbanBoard } from "@/components/dashboard/KanbanBoard";
import { ProjectOptions } from "@/components/dashboard/ProjectOptions";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { EmptyStateMessage } from "@/components/dashboard/EmptyStateMessage";
import { useSubscription } from "@/hooks/use-subscription";
import { useNavigate } from "react-router-dom";
import { DashboardStats } from "@/components/dashboard/stats/DashboardStats";
import { SubscriptionBanner } from "@/components/dashboard/subscription/SubscriptionBanner";

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
    <div className="min-w-[320px] max-w-7xl mx-auto p-4 md:px-6 lg:px-8 py-6 md:py-8 space-y-6 md:space-y-8">
      {/* Header with Greeting */}
      <div>
        <h1 className="text-2xl md:text-4xl font-bold">
          Good {new Date().getHours() < 12 ? 'Morning' : 'Evening'} {userEmail} 👋
        </h1>
      </div>

      {/* Subscription Prompt */}
      {!subscriptionData?.subscribed && (
        <SubscriptionBanner 
          onUpgrade={handleUpgradeClick}
          isUpgrading={isUpgrading}
        />
      )}

      {/* Stats Cards */}
      <DashboardStats stats={projectStats} />

      {/* Main Content Area */}
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 min-h-[600px]">
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