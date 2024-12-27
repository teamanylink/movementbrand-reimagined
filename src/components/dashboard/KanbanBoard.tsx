import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string;
  project_type: string;
}

export const KanbanBoard = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const { toast } = useToast();

  useEffect(() => {
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

    fetchProjects();
  }, [toast]);

  const getProjectsByStatus = (status: string) => {
    return projects.filter(project => project.status === status);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-4 text-gray-700">To Do</h3>
        <div className="space-y-3">
          {getProjectsByStatus('todo').map((project) => (
            <div key={project.id} className="bg-white p-3 rounded-md shadow-sm">
              <h4 className="font-medium text-gray-900">{project.name}</h4>
              {project.description && (
                <p className="text-sm text-gray-500 mt-1">{project.description}</p>
              )}
              <span className="inline-block mt-2 text-xs font-medium text-gray-500">
                {project.project_type}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-4 text-gray-700">In Progress</h3>
        <div className="space-y-3">
          {getProjectsByStatus('in_progress').map((project) => (
            <div key={project.id} className="bg-white p-3 rounded-md shadow-sm">
              <h4 className="font-medium text-gray-900">{project.name}</h4>
              {project.description && (
                <p className="text-sm text-gray-500 mt-1">{project.description}</p>
              )}
              <span className="inline-block mt-2 text-xs font-medium text-gray-500">
                {project.project_type}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="font-semibold mb-4 text-gray-700">Completed</h3>
        <div className="space-y-3">
          {getProjectsByStatus('completed').map((project) => (
            <div key={project.id} className="bg-white p-3 rounded-md shadow-sm">
              <h4 className="font-medium text-gray-900">{project.name}</h4>
              {project.description && (
                <p className="text-sm text-gray-500 mt-1">{project.description}</p>
              )}
              <span className="inline-block mt-2 text-xs font-medium text-gray-500">
                {project.project_type}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};