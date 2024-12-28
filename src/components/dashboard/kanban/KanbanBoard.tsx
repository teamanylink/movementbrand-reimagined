import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { KanbanColumn } from "./KanbanColumn";

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string;
  project_type: string;
}

const fetchProjects = async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) throw new Error('No session');

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const KanbanBoard = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isDragging, setIsDragging] = useState(false);

  const { data: projects = [] } = useQuery({
    queryKey: ['projects'],
    queryFn: fetchProjects,
  });

  const updateProjectStatus = useMutation({
    mutationFn: async ({ projectId, newStatus }: { projectId: string; newStatus: string }) => {
      const { error } = await supabase
        .from('projects')
        .update({ status: newStatus })
        .eq('id', projectId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: "Project updated",
        description: "Project status has been updated successfully.",
      });
    },
    onError: (error) => {
      console.error('Error updating project:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update project status. Please try again.",
      });
    },
  });

  const deleteProject = useMutation({
    mutationFn: async (projectId: string) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: "Project deleted",
        description: "Project has been deleted successfully.",
      });
    },
    onError: (error) => {
      console.error('Error deleting project:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete project. Please try again.",
      });
    },
  });

  const handleDrop = (projectId: string, newStatus: string) => {
    updateProjectStatus.mutate({ projectId, newStatus });
  };

  const handleDelete = (projectId: string) => {
    deleteProject.mutate(projectId);
  };

  const columns = [
    { title: "To Do", status: "todo", color: "text-blue-600" },
    { title: "In Progress", status: "in_progress", color: "text-yellow-600" },
    { title: "Completed", status: "completed", color: "text-green-600" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map((column) => (
        <KanbanColumn
          key={column.status}
          title={column.title}
          status={column.status}
          projects={projects.filter((project: Project) => project.status === column.status)}
          titleColor={column.color}
          onDelete={handleDelete}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
};