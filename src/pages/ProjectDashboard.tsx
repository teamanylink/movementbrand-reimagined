import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ProjectChat } from "@/components/project/ProjectChat";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Share2, MoreHorizontal, Grid, MessageSquare, Files } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProjectDashboardView } from "@/components/project/ProjectDashboardView";
import { ProjectFilesView } from "@/components/project/ProjectFilesView";

const ProjectDashboard = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*, profiles(*)')
        .eq('id', projectId)
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load project details",
          variant: "destructive",
        });
        throw error;
      }

      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB]">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b px-6 py-4 shadow-sm rounded-b-xl">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="hover:bg-[#F1F0FB] rounded-xl transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{project?.name}</h1>
              <p className="text-sm text-gray-500">{project?.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2 rounded-xl hover:bg-[#F1F0FB]">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="icon" className="rounded-xl hover:bg-[#F1F0FB]">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="mb-6 bg-white rounded-xl p-1 border shadow-sm">
            <TabsTrigger value="dashboard" className="gap-2 rounded-lg data-[state=active]:bg-[#F1F0FB]">
              <Grid className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="chat" className="gap-2 rounded-lg data-[state=active]:bg-[#F1F0FB]">
              <MessageSquare className="h-4 w-4" />
              Chat
            </TabsTrigger>
            <TabsTrigger value="files" className="gap-2 rounded-lg data-[state=active]:bg-[#F1F0FB]">
              <Files className="h-4 w-4" />
              Files
            </TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <ProjectDashboardView projectId={projectId!} />
          </TabsContent>

          <TabsContent value="chat">
            <div className="bg-white rounded-xl shadow-sm min-h-[600px]">
              <ProjectChat projectId={projectId!} />
            </div>
          </TabsContent>

          <TabsContent value="files">
            <ProjectFilesView />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectDashboard;