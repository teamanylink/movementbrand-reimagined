import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface DashboardHeaderProps {
  onNewProject: () => void;
}

export const DashboardHeader = ({ onNewProject }: DashboardHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500">Welcome to your dashboard</p>
      </div>
      <Button 
        variant="default"
        size="sm"
        className="flex items-center gap-2 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] hover:opacity-90 transition-opacity"
        onClick={onNewProject}
      >
        <Plus className="h-4 w-4" />
        New Project
      </Button>
    </div>
  );
};