import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Check, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Task {
  id: string;
  title: string;
  status: string;
  created_at: string;
}

export const ProjectTasks = ({ projectId }: { projectId: string }) => {
  const [newTask, setNewTask] = useState("");
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

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.trim()) return;

    const { error } = await supabase
      .from('tasks')
      .insert([
        {
          project_id: projectId,
          title: newTask.trim(),
          status: 'todo',
        },
      ]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to add task",
        variant: "destructive",
      });
      return;
    }

    setNewTask("");
    refetch();
  };

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

  return (
    <div>
      <h2 className="text-lg font-semibold mb-4">Tasks</h2>

      <form onSubmit={handleAddTask} className="flex gap-2 mb-4">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Plus className="h-4 w-4" />
        </Button>
      </form>

      <div className="space-y-2">
        {tasks?.map((task) => (
          <div
            key={task.id}
            className="flex items-center justify-between bg-gray-50 rounded-lg p-3"
          >
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleToggleTask(task.id, task.status)}
                className={task.status === 'completed' ? 'text-green-500' : ''}
              >
                <Check className="h-4 w-4" />
              </Button>
              <span className={task.status === 'completed' ? 'line-through text-gray-500' : ''}>
                {task.title}
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteTask(task.id)}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};