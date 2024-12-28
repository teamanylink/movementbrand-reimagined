import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProjectChat } from "@/components/project/ProjectChat";
import { ProjectTasks } from "@/components/project/ProjectTasks";
import { ProjectHistory } from "@/components/project/ProjectHistory";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Share2, Paperclip, MoreHorizontal, Grid, MessageSquare, Files } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  const getInitials = (email: string | null) => {
    if (!email) return '?';
    return email.charAt(0).toUpperCase();
  };

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
                <div className="bg-white rounded-xl shadow-sm divide-y">
                  <div className="p-6">
                    <div className="space-y-6">
                      <div>
                        <label className="text-sm font-medium text-gray-500">Assignee</label>
                        <div className="mt-2 flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            {project?.profiles?.avatar_url ? (
                              <AvatarImage src={project.profiles.avatar_url} alt="User avatar" />
                            ) : (
                              <AvatarFallback className="bg-[#F1F0FB] text-gray-600">
                                {getInitials(project?.profiles?.email)}
                              </AvatarFallback>
                            )}
                          </Avatar>
                          <span className="text-sm text-gray-900">{project?.profiles?.email}</span>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-500">Due Date</label>
                        <div className="mt-2 flex items-center gap-2 text-sm text-gray-900">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          {new Date().toLocaleDateString('en-US', { 
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-500">Status</label>
                        <div className="mt-2">
                          <Badge 
                            variant="secondary" 
                            className={`text-sm rounded-lg ${
                              project?.status === 'completed' 
                                ? 'bg-[#F2FCE2] text-green-800' 
                                : project?.status === 'in_progress' 
                                ? 'bg-[#E5DEFF] text-purple-800'
                                : 'bg-[#D3E4FD] text-blue-800'
                            }`}
                          >
                            {project?.status || 'In Progress'}
                          </Badge>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-500">Description</label>
                        <p className="mt-2 text-sm text-gray-600">
                          {project?.description || 'No description provided.'}
                        </p>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-gray-500">Attachments</label>
                        <Button variant="outline" className="mt-2 w-full justify-start gap-2 text-sm rounded-xl hover:bg-[#F1F0FB]">
                          <Paperclip className="h-4 w-4" />
                          Add files
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chat">
            <div className="bg-white rounded-xl shadow-sm">
              <ProjectChat projectId={projectId!} />
            </div>
          </TabsContent>

          <TabsContent value="files">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Project Files</h2>
              <div className="text-center text-gray-500 py-8">
                <Files className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p>No files uploaded yet</p>
                <Button variant="outline" className="mt-4 gap-2 rounded-xl hover:bg-[#F1F0FB]">
                  <Paperclip className="h-4 w-4" />
                  Upload Files
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectDashboard;