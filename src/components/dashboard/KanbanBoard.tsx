import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { KanbanColumn } from "./KanbanColumn";
import { EmptyStateMessage } from "./EmptyStateMessage";

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string;
  project_type: string;
}

export const KanbanBoard = () => {
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

  useEffect(() => {
    fetchProjects();
  }, []);

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

  const getProjectsByStatus = (status: string) => {
    return projects?.filter(project => project.status === status) || [];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  // If there are no projects, show the empty state message
  if (!projects?.length) {
    return <EmptyStateMessage />;
  }

  // If there are projects, show the Kanban board
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <KanbanColumn
        title="To Do"
        status="todo"
        projects={getProjectsByStatus('todo')}
        titleColor="text-secondary"
        onDelete={handleDelete}
        onDrop={handleDrop}
      />
      <KanbanColumn
        title="In Progress"
        status="in_progress"
        projects={getProjectsByStatus('in_progress')}
        titleColor="text-primary"
        onDelete={handleDelete}
        onDrop={handleDrop}
      />
      <KanbanColumn
        title="Completed"
        status="completed"
        projects={getProjectsByStatus('completed')}
        titleColor="text-accent"
        onDelete={handleDelete}
        onDrop={handleDrop}
      />
    </div>
  );
};