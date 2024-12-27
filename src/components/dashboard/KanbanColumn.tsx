import { KanbanCard } from "./KanbanCard";
import { useState } from "react";

interface Project {
  id: string;
  name: string;
  description: string | null;
  status: string;
  project_type: string;
}

interface KanbanColumnProps {
  title: string;
  status: string;
  projects: Project[];
  titleColor: string;
  onDelete: (id: string) => void;
  onDrop: (projectId: string, newStatus: string) => void;
}

export const KanbanColumn = ({
  title,
  status,
  projects,
  titleColor,
  onDelete,
  onDrop
}: KanbanColumnProps) => {
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (!isDraggingOver) {
      setIsDraggingOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDraggingOver(false);
    const projectId = e.dataTransfer.getData('projectId');
    if (projectId) {
      onDrop(projectId, status);
    }
  };

  return (
    <div 
      className={`bg-gray-50 p-4 rounded-lg transition-colors duration-200 ${
        isDraggingOver ? 'bg-blue-50 ring-2 ring-blue-200' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h3 className={`font-semibold mb-4 ${titleColor}`}>{title}</h3>
      <div className="space-y-3">
        {projects.map((project) => (
          <KanbanCard
            key={project.id}
            project={project}
            onDelete={onDelete}
            statusColor={titleColor}
          />
        ))}
      </div>
    </div>
  );
};