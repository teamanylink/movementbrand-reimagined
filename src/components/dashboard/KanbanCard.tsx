import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface KanbanCardProps {
  id: string;
  title: string;
  description?: string | null;
  onDelete: (id: string) => void;
}

export const KanbanCard = ({ id, title, description, onDelete }: KanbanCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/project/${id}`);
  };

  return (
    <Card className="bg-white p-4 mb-2 cursor-pointer hover:shadow-md transition-shadow" onClick={handleClick}>
      <div className="flex justify-between items-start gap-2">
        <div>
          <h3 className="font-medium text-sm">{title}</h3>
          {description && (
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{description}</p>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-gray-500 hover:text-red-600"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};