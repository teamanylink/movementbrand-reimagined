import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { KanbanBoard } from "@/components/dashboard/KanbanBoard";
import { ProjectOptions } from "@/components/dashboard/ProjectOptions";

const ProjectDashboard = () => {
  const [isProjectOptionsOpen, setIsProjectOptionsOpen] = useState(false);

  const projectTypes = [
    { name: "Automation", duration: "1 week" },
    { name: "Design", duration: "48 hours" },
    { name: "Landing Page", duration: "48 hours" },
    { name: "Micro-Saas", duration: "3 weeks" },
    { name: "Blog", duration: "48 hours" },
    { name: "Other", duration: "" },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <Button 
          onClick={() => setIsProjectOptionsOpen(true)}
          className="bg-gradient-to-r from-purple-500 to-purple-700 text-white hover:from-purple-600 hover:to-purple-800"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Project
        </Button>
      </div>

      {/* Kanban Board */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <KanbanBoard />
      </div>

      {/* Project Options Dialog */}
      <ProjectOptions 
        projectTypes={projectTypes}
        open={isProjectOptionsOpen}
        onOpenChange={setIsProjectOptionsOpen}
        onSelectProject={() => {
          setIsProjectOptionsOpen(false);
        }}
      />
    </div>
  );
};

export default ProjectDashboard;