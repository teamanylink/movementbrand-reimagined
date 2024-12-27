import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProjectChat } from "@/components/project/ProjectChat";
import { ProjectTasks } from "@/components/project/ProjectTasks";
import { ProjectHistory } from "@/components/project/ProjectHistory";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const ProjectDashboard = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { data: project, isLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/dashboard')}
            className="hover:bg-gray-200"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{project?.name}</h1>
            <p className="text-sm text-gray-500">{project?.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Tasks Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <ProjectTasks projectId={projectId!} />
          </div>

          {/* Chat Section */}
          <div className="col-span-1 row-span-2 bg-white rounded-xl shadow-sm">
            <ProjectChat projectId={projectId!} />
          </div>

          {/* History Section */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <ProjectHistory projectId={projectId!} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;