import { Card } from "@/components/ui/card";

interface ProjectType {
  name: string;
  duration: string;
}

interface ProjectOptionsProps {
  projectTypes: ProjectType[];
  onSelectProject: (projectName: string) => void;
}

export const ProjectOptions = ({ projectTypes, onSelectProject }: ProjectOptionsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
      {projectTypes.map((project, index) => (
        <Card 
          key={index}
          className="p-6 hover:shadow-md transition-shadow cursor-pointer border border-gray-100 hover:scale-102 transition-transform"
          onClick={() => onSelectProject(project.name)}
        >
          <div className="flex flex-col items-center text-center space-y-2">
            <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
            {project.duration && (
              <p className="text-sm text-gray-500">Estimated time: {project.duration}</p>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};