import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Bot, Paintbrush, Layout, Building2, BookOpen, Wrench } from "lucide-react";

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
      return <Bot className="h-8 w-8 text-accent mb-3" />;
    case 'design':
      return <Paintbrush className="h-8 w-8 text-accent mb-3" />;
    case 'landing page':
      return <Layout className="h-8 w-8 text-accent mb-3" />;
    case 'micro-saas':
      return <Building2 className="h-8 w-8 text-accent mb-3" />;
    case 'blog':
      return <BookOpen className="h-8 w-8 text-accent mb-3" />;
    default:
      return <Wrench className="h-8 w-8 text-accent mb-3" />;
  }
};

export const ProjectOptions = ({ projectTypes, onSelectProject, open, onOpenChange }: ProjectOptionsProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[900px] p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectTypes.map((project, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-lg transition-all cursor-pointer border border-gray-100 hover:scale-105 hover:border-accent/50"
              onClick={() => {
                onSelectProject(project.name);
                onOpenChange(false);
              }}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                {getProjectIcon(project.name)}
                <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                {project.duration && (
                  <p className="text-sm text-gray-500">Estimated time: {project.duration}</p>
                )}
              </div>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};