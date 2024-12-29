import { Clock, CheckCircle, Loader2, ListTodo } from "lucide-react";
import { Card } from "@/components/ui/card";

interface StatsProps {
  stats: {
    todos: number;
    completed: number;
    inProgress: number;
  };
}

export const DashboardStats = ({ stats }: StatsProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
      <Card className="p-3 sm:p-4 flex items-center space-x-3">
        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
          <ListTodo className="h-5 w-5 text-blue-600" />
        </div>
        <div className="min-w-0">
          <div className="text-lg sm:text-xl font-bold">{stats.todos}</div>
          <div className="text-sm text-gray-500 truncate">To Do</div>
        </div>
      </Card>
      
      <Card className="p-3 sm:p-4 flex items-center space-x-3">
        <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
          <CheckCircle className="h-5 w-5 text-green-600" />
        </div>
        <div className="min-w-0">
          <div className="text-lg sm:text-xl font-bold">{stats.completed}</div>
          <div className="text-sm text-gray-500 truncate">Projects Completed</div>
        </div>
      </Card>
      
      <Card className="p-3 sm:p-4 flex items-center space-x-3 sm:col-span-2 lg:col-span-1">
        <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
          <Loader2 className="h-5 w-5 text-purple-600" />
        </div>
        <div className="min-w-0">
          <div className="text-lg sm:text-xl font-bold">{stats.inProgress}</div>
          <div className="text-sm text-gray-500 truncate">Projects In-progress</div>
        </div>
      </Card>
    </div>
  );
};