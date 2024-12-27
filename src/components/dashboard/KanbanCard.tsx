import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string;
  project_type: string;
}

interface KanbanCardProps {
  project: Project;
  onDelete: (id: string) => void;
  statusColor: string;
}

export const KanbanCard = ({ project, onDelete, statusColor }: KanbanCardProps) => {
  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('projectId', project.id);
    
    // Create a clone of the card for the drag image
    const dragImage = e.currentTarget.cloneNode(true) as HTMLDivElement;
    dragImage.style.position = 'absolute';
    dragImage.style.top = '-1000px';
    dragImage.style.opacity = '0.8';
    document.body.appendChild(dragImage);
    
    e.dataTransfer.setDragImage(dragImage, 20, 20);
    
    // Remove the clone after the drag starts
    requestAnimationFrame(() => {
      document.body.removeChild(dragImage);
    });

    e.currentTarget.style.opacity = '0.5';
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.opacity = '1';
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className="bg-white p-3 rounded-md shadow-sm cursor-move transition-all duration-200 hover:shadow-md active:shadow-lg"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h4 className={`font-medium ${statusColor}`}>{project.name}</h4>
          {project.description && (
            <p className="text-sm text-gray-500 mt-1">{project.description}</p>
          )}
          <span className={`inline-block mt-2 text-xs font-medium ${statusColor}/70`}>
            {project.project_type}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-500 hover:text-red-600"
          onClick={() => onDelete(project.id)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};