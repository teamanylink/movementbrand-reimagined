import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProjectFormBrandSelect } from "../ProjectFormBrandSelect";

interface ProjectDetailsStepProps {
  name: string;
  setName: (name: string) => void;
  description: string;
  setDescription: (description: string) => void;
  selectedBrand: string;
  setSelectedBrand: (brand: string) => void;
}

export const ProjectDetailsStep = ({
  name,
  setName,
  description,
  setDescription,
  selectedBrand,
  setSelectedBrand,
}: ProjectDetailsStepProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold mb-4">Step 1: Project Details</h2>
      <div>
        <label htmlFor="projectName" className="block text-sm font-medium text-gray-700 mb-1">
          Project Name
        </label>
        <Input 
          id="projectName"
          placeholder="Enter project name"
          className="w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <ProjectFormBrandSelect
        value={selectedBrand}
        onChange={setSelectedBrand}
      />
    </div>
  );
};