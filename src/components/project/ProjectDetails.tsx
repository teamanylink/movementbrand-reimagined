import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Paperclip } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const ProjectDetails = ({ projectId }: { projectId: string }) => {
  const { toast } = useToast();
  
  const { data: project } = useQuery({
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

  const getInitials = (email: string | null) => {
    if (!email) return '?';
    return email.charAt(0).toUpperCase();
  };

  return (
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
  );
};