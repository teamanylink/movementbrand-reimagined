import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { TaskForm } from "./TaskForm";
import { TaskItem } from "./TaskItem";

interface Task {
  id: string;
  title: string;
  status: string;
  created_at: string;
}

export const ProjectTasks = ({ projectId }: { projectId: string }) => {
  const { toast } = useToast();

  const { data: tasks, refetch } = useQuery({
    queryKey: ['tasks', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleToggleTask = async (taskId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'completed' ? 'todo' : 'completed';

    const { error } = await supabase
      .from('tasks')
      .update({ status: newStatus })
      .eq('id', taskId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      });
      return;
    }

    refetch();
  };

  const handleDeleteTask = async (taskId: string) => {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', taskId);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      });
      return;
    }

    refetch();
  };

  const handleEditTask = (taskId: string) => {
    // TODO: Implement edit functionality
    console.log("Edit task:", taskId);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Tasks</h2>
      <TaskForm projectId={projectId} onTaskAdded={refetch} />
      <div className="space-y-2">
        {tasks?.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
          />
        ))}
      </div>
    </div>
  );
};