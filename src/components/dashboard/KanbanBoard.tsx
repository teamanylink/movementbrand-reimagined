import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { KanbanColumn } from "./KanbanColumn";

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string;
  project_type: string;
}

export const KanbanBoard = () => {
  const [projects, setProjects] = useState<Project[]>();
  const { toast } = useToast();

  const fetchProjects = async () => {
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
  };

  useEffect(() => {
    fetchProjects();
  }, [toast]);

  const handleDelete = async (projectId: string) => {
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
  };

  const handleDrop = async (projectId: string, newStatus: string) => {
    const { error } = await supabase
      .from('projects')
      .update({ status: newStatus })
      .eq('id', projectId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update project status",
        variant: "destructive",
      });
      console.error("Error updating project status:", error);
      return;
    }

    fetchProjects();
  };

  const getProjectsByStatus = (status: string) => {
    return projects?.filter(project => project.status === status) || [];
  };

  // If there are no projects, show the empty state message
  if (!projects?.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Start Your First Project!</h3>
        <p className="text-gray-500 max-w-md">
          Click the "New Project" button above to begin your journey with MovementBrand.
        </p>
      </div>
    );
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