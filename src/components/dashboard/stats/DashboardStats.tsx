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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
      <Card className="p-4 md:p-6 flex items-center space-x-4">
        <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
          <ListTodo className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <div className="text-2xl font-bold">{stats.todos}</div>
          <div className="text-gray-500">To Do</div>
        </div>
      </Card>
      
      <Card className="p-4 md:p-6 flex items-center space-x-4">
        <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <div className="text-2xl font-bold">{stats.completed}</div>
          <div className="text-gray-500">Projects Completed</div>
        </div>
      </Card>
      
      <Card className="p-4 md:p-6 flex items-center space-x-4">
        <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
          <Loader2 className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <div className="text-2xl font-bold">{stats.inProgress}</div>
          <div className="text-gray-500">Projects In-progress</div>
        </div>
      </Card>
    </div>
  );
};