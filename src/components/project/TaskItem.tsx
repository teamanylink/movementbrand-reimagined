import { Button } from "@/components/ui/button";
import { Circle, Trash2, MoreVertical, Pencil } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface TaskItemProps {
  task: {
    id: string;
    title: string;
    status: string;
  };
  onToggle: (taskId: string, status: string) => void;
  onDelete: (taskId: string) => void;
  onEdit: (taskId: string) => void;
}

export const TaskItem = ({ task, onToggle, onDelete, onEdit }: TaskItemProps) => {
  return (
    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onToggle(task.id, task.status)}
          className={task.status === 'completed' ? 'text-green-500' : ''}
        >
          <Circle 
            className={`h-4 w-4 ${
              task.status === 'completed' 
                ? 'fill-green-500 stroke-green-500' 
                : 'stroke-[#ebebeb] fill-white'
            }`}
          />
        </Button>
        <span className={task.status === 'completed' ? 'line-through text-gray-500' : ''}>
          {task.title}
        </span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-500 hover:text-gray-700"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-32">
          <DropdownMenuItem onClick={() => onEdit(task.id)} className="gap-2">
            <Pencil className="h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDelete(task.id)} className="gap-2 text-red-500 focus:text-red-500">
            <Trash2 className="h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};