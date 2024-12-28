import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tables } from "@/integrations/supabase/types";
import { Circle } from "lucide-react";

type HistoryItem = {
  id: string;
  type: 'project' | 'task' | 'status_change';
  title: string;
  status?: string;
  created_at: string;
  action: string;
  previous_status?: string;
};

export const ProjectHistory = ({ projectId }: { projectId: string }) => {
  const { data: history } = useQuery({
    queryKey: ['project-history', projectId],
    queryFn: async () => {
      // Fetch project details
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single();

      if (projectError) throw projectError;

      // Fetch tasks for this project
      const { data: tasks, error: tasksError } = await supabase
        .from('tasks')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (tasksError) throw tasksError;

      // Fetch status changes from project_history
      const { data: statusChanges, error: historyError } = await supabase
        .from('project_history')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (historyError) throw historyError;

      // Combine project, task, and status change history
      const historyItems: HistoryItem[] = [
        {
          id: project.id,
          type: 'project' as const,
          title: project.name,
          status: project.status,
          created_at: project.created_at,
          action: 'Project created'
        },
        ...(tasks?.map(task => ({
          id: task.id,
          type: 'task' as const,
          title: task.title,
          status: task.status,
          created_at: task.created_at,
          action: 'Task created'
        })) || []),
        ...(statusChanges?.map(change => ({
          id: change.id,
          type: 'status_change' as const,
          title: project.name,
          status: change.new_status || undefined,
          previous_status: change.previous_status || undefined,
          created_at: change.created_at,
          action: change.action
        })) || [])
      ];

      // Sort by date, most recent first
      return historyItems.sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    },
  });

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'todo':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getActionIcon = (type: string) => {
    switch (type) {
      case 'project':
        return '🎯';
      case 'task':
        return '✅';
      case 'status_change':
        return '🔄';
      default:
        return '📝';
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Project History</h2>
      </div>

      <ScrollArea className="h-[300px]">
        <div className="space-y-4">
          {history?.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-6 flex-shrink-0 text-center">
                <Circle 
                  className="stroke-[#ebebeb] fill-white" 
                  size={20}
                />
              </div>
              <div className="w-36 flex-shrink-0 text-xs">
                {formatDate(item.created_at)}
              </div>
              <div className="flex-1">
                <span className="font-medium">
                  {item.type === 'project' ? 'Project' : 
                   item.type === 'task' ? 'Task' : 
                   'Status Change'}:
                </span>{' '}
                {item.action} - "{item.title}"
                {item.type === 'status_change' && item.previous_status && (
                  <span className="text-gray-500">
                    {' '}(from {item.previous_status} to {item.status})
                  </span>
                )}
              </div>
              {item.status && (
                <div className={`text-xs px-2 py-1 rounded-full ${getStatusColor(item.status)}`}>
                  {item.status.replace('_', ' ')}
                </div>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
