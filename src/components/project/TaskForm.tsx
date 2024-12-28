import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface TaskFormProps {
  projectId: string;
  onTaskAdded: () => void;
}

export const TaskForm = ({ projectId, onTaskAdded }: TaskFormProps) => {
  const [newTask, setNewTask] = useState("");
  const { toast } = useToast();

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
    onTaskAdded();
  };

  return (
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
  );
};