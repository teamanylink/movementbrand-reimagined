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

  const getProjectsByStatus = (status: string) => {
    return projects?.filter(project => project.status === status) || [];
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-4 text-accent">To Do</h3>
        <div className="space-y-3">
          {getProjectsByStatus('todo').map((project) => (
            <div key={project.id} className="bg-white p-3 rounded-md shadow-sm">
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
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-4 text-primary">In Progress</h3>
        <div className="space-y-3">
          {getProjectsByStatus('in_progress').map((project) => (
            <div key={project.id} className="bg-white p-3 rounded-md shadow-sm">
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
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-4 text-secondary">Completed</h3>
        <div className="space-y-3">
          {getProjectsByStatus('completed').map((project) => (
            <div key={project.id} className="bg-white p-3 rounded-md shadow-sm">
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
    </div>
  );
};