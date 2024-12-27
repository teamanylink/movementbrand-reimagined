import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const handleDragStart = (e: React.DragEvent, projectId: string) => {
    e.dataTransfer.setData("projectId", projectId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = async (e: React.DragEvent, newStatus: string) => {
    e.preventDefault();
    const projectId = e.dataTransfer.getData("projectId");
    
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

    toast({
      title: "Success",
      description: `Project moved to ${newStatus.replace('_', ' ')}`,
    });

    fetchProjects();
  };

  const getProjectsByStatus = (status: string) => {
    return projects?.filter(project => project.status === status) || [];
  };

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

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div 
        className="bg-gray-50 p-4 rounded-lg"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'todo')}
      >
        <h3 className="font-semibold mb-4 text-secondary">To Do</h3>
        <div className="space-y-3">
          {getProjectsByStatus('todo').map((project) => (
            <div 
              key={project.id} 
              className="bg-white p-3 rounded-md shadow-sm cursor-move hover:shadow-md transition-shadow"
              draggable
              onDragStart={(e) => handleDragStart(e, project.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-secondary">{project.name}</h4>
                  {project.description && (
                    <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                  )}
                  <span className="inline-block mt-2 text-xs font-medium text-secondary/70">
                    {project.project_type}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500 hover:text-red-600"
                  onClick={() => handleDelete(project.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div 
        className="bg-gray-50 p-4 rounded-lg"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'in_progress')}
      >
        <h3 className="font-semibold mb-4 text-primary">In Progress</h3>
        <div className="space-y-3">
          {getProjectsByStatus('in_progress').map((project) => (
            <div 
              key={project.id} 
              className="bg-white p-3 rounded-md shadow-sm cursor-move hover:shadow-md transition-shadow"
              draggable
              onDragStart={(e) => handleDragStart(e, project.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-primary">{project.name}</h4>
                  {project.description && (
                    <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                  )}
                  <span className="inline-block mt-2 text-xs font-medium text-primary/70">
                    {project.project_type}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500 hover:text-red-600"
                  onClick={() => handleDelete(project.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div 
        className="bg-gray-50 p-4 rounded-lg"
        onDragOver={handleDragOver}
        onDrop={(e) => handleDrop(e, 'completed')}
      >
        <h3 className="font-semibold mb-4 text-accent">Completed</h3>
        <div className="space-y-3">
          {getProjectsByStatus('completed').map((project) => (
            <div 
              key={project.id} 
              className="bg-white p-3 rounded-md shadow-sm cursor-move hover:shadow-md transition-shadow"
              draggable
              onDragStart={(e) => handleDragStart(e, project.id)}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h4 className="font-medium text-accent">{project.name}</h4>
                  {project.description && (
                    <p className="text-sm text-gray-500 mt-1">{project.description}</p>
                  )}
                  <span className="inline-block mt-2 text-xs font-medium text-accent/70">
                    {project.project_type}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-gray-500 hover:text-red-600"
                  onClick={() => handleDelete(project.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};