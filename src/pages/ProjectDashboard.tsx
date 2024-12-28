import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { KanbanBoard } from "@/components/dashboard/KanbanBoard";
import { ProjectOptions } from "@/components/dashboard/ProjectOptions";
import { ProjectDetails } from "@/components/project/ProjectDetails";
import { ProjectChat } from "@/components/project/ProjectChat";
import { ProjectFilesView } from "@/components/project/ProjectFilesView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectDashboardView } from "@/components/project/ProjectDashboardView";
import { useSubscription } from "@/hooks/use-subscription";
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ProjectDashboard = () => {
  const [isProjectOptionsOpen, setIsProjectOptionsOpen] = useState(false);
  const { projectId } = useParams();
  const { data: subscriptionData } = useSubscription();
  const { toast } = useToast();
  const navigate = useNavigate();

  const projectTypes = [
    { name: "Automation", duration: "1 week" },
    { name: "Design", duration: "48 hours" },
    { name: "Landing Page", duration: "48 hours" },
    { name: "Micro-Saas", duration: "3 weeks" },
    { name: "Blog", duration: "48 hours" },
    { name: "Other", duration: "" },
  ];

  const handleNewProjectClick = () => {
    if (!subscriptionData?.subscribed) {
      toast({
        title: "Subscription Required",
        description: "Please upgrade your account to create new projects.",
        variant: "destructive",
      });
      navigate('/dashboard/settings');
      return;
    }
    setIsProjectOptionsOpen(true);
  };

  // If we have a projectId, show the project detail view
  if (projectId) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-[1600px] mx-auto p-4 md:p-8">
          <Tabs defaultValue="dashboard" className="w-full space-y-4 md:space-y-8">
            <div className="bg-white rounded-xl shadow-sm p-3 md:p-4">
              <TabsList className="grid w-full max-w-[400px] grid-cols-3">
                <TabsTrigger 
                  value="dashboard"
                  className="data-[state=active]:bg-white data-[state=active]:text-gray-900 font-medium"
                >
                  Dashboard
                </TabsTrigger>
                <TabsTrigger 
                  value="chat"
                  className="data-[state=active]:bg-white data-[state=active]:text-gray-900 font-medium"
                >
                  Chat
                </TabsTrigger>
                <TabsTrigger 
                  value="files"
                  className="data-[state=active]:bg-white data-[state=active]:text-gray-900 font-medium"
                >
                  Files
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="dashboard" className="mt-0">
              <ProjectDashboardView projectId={projectId} />
            </TabsContent>
            <TabsContent value="chat" className="mt-0">
              <div className="bg-white rounded-xl shadow-sm">
                <ProjectChat projectId={projectId} />
              </div>
            </TabsContent>
            <TabsContent value="files" className="mt-0">
              <ProjectFilesView projectId={projectId} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
  }

  // Otherwise, show the projects list view
  return (
    <div className="p-4 md:p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 md:mb-8">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">Projects</h1>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Button 
                  onClick={handleNewProjectClick}
                  className="bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800 shadow-sm"
                  disabled={!subscriptionData?.subscribed}
                >
                  <Plus className="h-5 w-5 mr-2" />
                  New Project
                </Button>
              </span>
            </TooltipTrigger>
            {!subscriptionData?.subscribed && (
              <TooltipContent>
                <p>Upgrade your account to create projects</p>
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Kanban Board */}
      <div className="bg-white rounded-xl shadow-sm">
        <KanbanBoard />
      </div>

      {/* Project Options Dialog */}
      <ProjectOptions 
        projectTypes={projectTypes}
        open={isProjectOptionsOpen}
        onOpenChange={setIsProjectOptionsOpen}
        onSelectProject={() => {
          setIsProjectOptionsOpen(false);
        }}
      />
    </div>
  );
};

export default ProjectDashboard;