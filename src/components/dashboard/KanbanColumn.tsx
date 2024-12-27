import { KanbanCard } from "./KanbanCard";

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
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = '#f3f4f6';
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.style.backgroundColor = '#f9fafb';
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.currentTarget.style.backgroundColor = '#f9fafb';
    const projectId = e.dataTransfer.getData('projectId');
    onDrop(projectId, status);
  };

  return (
    <div 
      className="bg-gray-50 p-4 rounded-lg transition-colors duration-200"
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