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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 lg:gap-6">
      <Card className="p-3 md:p-4 lg:p-6 flex items-center space-x-3 md:space-x-4">
        <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-blue-100 flex items-center justify-center">
          <ListTodo className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
        </div>
        <div>
          <div className="text-xl md:text-2xl font-bold">{stats.todos}</div>
          <div className="text-sm md:text-base text-gray-500">To Do</div>
        </div>
      </Card>
      
      <Card className="p-3 md:p-4 lg:p-6 flex items-center space-x-3 md:space-x-4">
        <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
        </div>
        <div>
          <div className="text-xl md:text-2xl font-bold">{stats.completed}</div>
          <div className="text-sm md:text-base text-gray-500">Projects Completed</div>
        </div>
      </Card>
      
      <Card className="p-3 md:p-4 lg:p-6 flex items-center space-x-3 md:space-x-4 sm:col-span-2 lg:col-span-1">
        <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-purple-100 flex items-center justify-center">
          <Loader2 className="h-5 w-5 md:h-6 md:w-6 text-purple-600" />
        </div>
        <div>
          <div className="text-xl md:text-2xl font-bold">{stats.inProgress}</div>
          <div className="text-sm md:text-base text-gray-500">Projects In-progress</div>
        </div>
      </Card>
    </div>
  );
};