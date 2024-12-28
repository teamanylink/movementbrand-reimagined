import { EmptyStateMessage } from "./EmptyStateMessage";
import { KanbanColumn } from "./KanbanColumn";
import { useKanbanBoard } from "./kanban/useKanbanBoard";

export const KanbanBoard = () => {
  const { projects, loading, handleDelete, handleDrop, getProjectsByStatus } = useKanbanBoard();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (!projects?.length) {
    return <EmptyStateMessage />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <KanbanColumn
        title="To Do"
        status="todo"
        projects={getProjectsByStatus('todo')}
        titleColor="text-secondary"
        onDelete={handleDelete}
        onDrop={handleDrop}
      />
      <KanbanColumn
        title="In Progress"
        status="in_progress"
        projects={getProjectsByStatus('in_progress')}
        titleColor="text-primary"
        onDelete={handleDelete}
        onDrop={handleDrop}
      />
      <KanbanColumn
        title="Completed"
        status="completed"
        projects={getProjectsByStatus('completed')}
        titleColor="text-accent"
        onDelete={handleDelete}
        onDrop={handleDrop}
      />
    </div>
  );
};