import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface ProjectFormProps {
  onBack: () => void;
  onSubmit: () => void;
  selectedProjectType: string;
}

export const ProjectForm = ({ onBack, onSubmit, selectedProjectType }: ProjectFormProps) => {
  return (
    <div className="max-w-xl mx-auto w-full space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
            Let's give this project a name
          </label>
          <Input 
            id="projectName"
            placeholder="Enter project name"
            className="w-full"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <Textarea 
            id="description"
            placeholder="Tell us about your project"
            className="w-full min-h-[120px]"
          />
        </div>
        <div className="flex justify-end pt-4">
          <Button 
            onClick={onBack}
            variant="outline"
            className="mr-2"
          >
            Back
          </Button>
          <Button onClick={onSubmit}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};