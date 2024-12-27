import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History } from "lucide-react";

interface HistoryItem {
  id: string;
  title: string;
  status: string;
  created_at: string;
}

export const ProjectHistory = ({ projectId }: { projectId: string }) => {
  const { data: history } = useQuery({
    queryKey: ['project-history', projectId],
    queryFn: async () => {
      // For now, we'll use tasks as history items
      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <History className="h-5 w-5 text-gray-500" />
        <h2 className="text-lg font-semibold">Project History</h2>
      </div>

      <ScrollArea className="h-[200px]">
        <div className="space-y-4">
          {history?.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 text-sm text-gray-600"
            >
              <div className="w-32 flex-shrink-0">
                {new Date(item.created_at).toLocaleDateString()}
              </div>
              <div className="flex-1">
                Task "{item.title}" was created
              </div>
              <div className="text-xs px-2 py-1 rounded-full bg-gray-100">
                {item.status}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};