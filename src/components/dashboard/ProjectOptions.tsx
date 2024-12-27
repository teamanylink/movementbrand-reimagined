import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Bot, Paintbrush, Layout, Building2, BookOpen, Plus } from "lucide-react";
import { useState } from "react";
import { ProjectForm } from "./ProjectForm";

interface ProjectType {
  name: string;
  duration: string;
}

interface ProjectOptionsProps {
  projectTypes: ProjectType[];
  onSelectProject: (projectName: string) => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const getProjectIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case 'automation':
      return <Bot className="h-6 w-6 text-white" />;
    case 'design':
      return <Paintbrush className="h-6 w-6 text-white" />;
    case 'landing page':
      return <Layout className="h-6 w-6 text-white" />;
    case 'micro-saas':
      return <Building2 className="h-6 w-6 text-white" />;
    case 'blog':
      return <BookOpen className="h-6 w-6 text-white" />;
    default:
      return <Plus className="h-6 w-6 text-white" />;
  }
};

const getIconBackground = (name: string) => {
  switch (name.toLowerCase()) {
    case 'automation':
      return 'bg-gradient-to-br from-purple-500 to-indigo-600';
    case 'design':
      return 'bg-gradient-to-br from-pink-500 to-rose-500';
    case 'landing page':
      return 'bg-gradient-to-br from-blue-500 to-cyan-500';
    case 'micro-saas':
      return 'bg-gradient-to-br from-emerald-500 to-teal-600';
    case 'blog':
      return 'bg-gradient-to-br from-orange-500 to-amber-500';
    default:
      return 'bg-gradient-to-br from-gray-500 to-slate-600';
  }
};

export const ProjectOptions = ({ projectTypes, onSelectProject, open, onOpenChange }: ProjectOptionsProps) => {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleProjectSelect = (projectName: string) => {
    setSelectedType(projectName);
  };

  const handleBack = () => {
    setSelectedType(null);
  };

  const handleSubmit = () => {
    onSelectProject(selectedType!);
    setSelectedType(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] p-6">
        <DialogTitle className="text-2xl font-bold text-center mb-6">
          {!selectedType ? "Let's start a new project 🔥" : `Create ${selectedType} Project`}
        </DialogTitle>
        {!selectedType ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectTypes.map((project, index) => (
              <Card 
                key={index}
                className="p-6 hover:shadow-lg transition-all cursor-pointer border border-gray-100 hover:scale-105 hover:border-accent/50 group"
                onClick={() => handleProjectSelect(project.name)}
              >
                <div className="flex flex-col items-center text-center space-y-2">
                  <div className={`p-3 rounded-xl mb-3 ${getIconBackground(project.name)} shadow-lg group-hover:animate-glow-pulse`}>
                    {getProjectIcon(project.name)}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                  {project.duration && (
                    <p className="text-sm text-gray-500">Estimated time: {project.duration}</p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <ProjectForm 
            onBack={handleBack}
            onSubmit={handleSubmit}
            selectedProjectType={selectedType}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};