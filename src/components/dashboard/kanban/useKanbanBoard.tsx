import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Project } from "@/integrations/supabase/types/project";

export const useKanbanBoard = () => {
  const [projects, setProjects] = useState<Project[]>();
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to fetch projects",
          variant: "destructive",
        });
        console.error("Error fetching projects:", error);
        return;
      }

      setProjects(data || []);
    } catch (error) {
      console.error("Error in fetchProjects:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (projectId: string) => {
    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) {
        toast({
          title: "Error",
          description: "Failed to delete project",
          variant: "destructive",
        });
        console.error("Error deleting project:", error);
        return;
      }

      toast({
        title: "Success",
        description: "Project deleted successfully",
      });
      
      fetchProjects();
    } catch (error) {
      console.error("Error in handleDelete:", error);
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  const handleDrop = async (projectId: string, newStatus: string) => {
    try {
      // Get the current project status before updating
      const currentProject = projects?.find(p => p.id === projectId);
      const previousStatus = currentProject?.status;

      // First, update the local state optimistically
      setProjects(prevProjects => 
        prevProjects?.map(project => 
          project.id === projectId 
            ? { ...project, status: newStatus }
            : project
        )
      );

      // Then, update the database
      const { error } = await supabase
        .from('projects')
        .update({ 
          status: newStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', projectId);

      if (error) {
        // If there's an error, revert the optimistic update
        fetchProjects();
        toast({
          title: "Error",
          description: "Failed to update project status",
          variant: "destructive",
        });
        console.error("Error updating project status:", error);
        return;
      }

      // Log the status change in the history
      if (previousStatus && previousStatus !== newStatus) {
        const { error: historyError } = await supabase
          .from('project_history')
          .insert({
            project_id: projectId,
            type: 'status_change',
            action: `Status changed from ${previousStatus} to ${newStatus}`,
            previous_status: previousStatus,
            new_status: newStatus
          });

        if (historyError) {
          console.error("Error logging status change:", historyError);
        }
      }

      toast({
        title: "Success",
        description: `Project moved to ${newStatus.replace('_', ' ')}`,
      });
    } catch (error) {
      console.error("Error in handleDrop:", error);
      // Revert the optimistic update on error
      fetchProjects();
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    handleDelete,
    handleDrop,
    getProjectsByStatus: (status: string) => projects?.filter(project => project.status === status) || []
  };
};