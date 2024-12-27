import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProjectChat } from "@/components/project/ProjectChat";
import { ProjectTasks } from "@/components/project/ProjectTasks";
import { ProjectHistory } from "@/components/project/ProjectHistory";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Share2, Paperclip, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

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
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation Bar */}
      <div className="bg-white border-b px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/dashboard')}
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">{project?.name}</h1>
              <p className="text-sm text-gray-500">{project?.description}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="icon">
              <MoreHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Tasks */}
          <div className="col-span-8">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <ProjectTasks projectId={projectId!} />
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6">
              <ProjectHistory projectId={projectId!} />
            </div>
          </div>

          {/* Right Column - Project Details & Chat */}
          <div className="col-span-4 space-y-6">
            {/* Project Details Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-700">Assignee</label>
                  <div className="mt-2 flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={project?.profiles?.avatar_url} />
                      <AvatarFallback>
                        {project?.profiles?.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-gray-900">{project?.profiles?.email}</span>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Due Date</label>
                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-900">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    {new Date().toLocaleDateString('en-US', { 
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Status</label>
                  <div className="mt-2">
                    <Badge variant="secondary" className="text-sm">
                      {project?.status || 'In Progress'}
                    </Badge>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Description</label>
                  <p className="mt-2 text-sm text-gray-600">
                    {project?.description || 'No description provided.'}
                  </p>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700">Attachments</label>
                  <Button variant="outline" className="mt-2 w-full justify-start gap-2 text-sm">
                    <Paperclip className="h-4 w-4" />
                    Add files
                  </Button>
                </div>
              </div>
            </div>

            {/* Chat Section */}
            <div className="bg-white rounded-xl shadow-sm">
              <ProjectChat projectId={projectId!} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDashboard;