import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface ProjectFormStepsProps {
  step: number;
  isSubmitting: boolean;
  isDraft: boolean;
  handleBack: () => void;
  handleNext: () => void;
  handleSubmit: () => void;
}

export const ProjectFormSteps = ({ 
  step, 
  isSubmitting, 
  isDraft,
  handleBack,
  handleNext,
  handleSubmit 
}: ProjectFormStepsProps) => {
  return (
    <div className="flex justify-between pt-4">
      <Button 
        onClick={handleBack}
        variant="outline"
        className="flex items-center"
        disabled={isSubmitting}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
      {step < 3 ? (
        <Button onClick={handleNext}>
          Next
        </Button>
      ) : (
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating..." : isDraft ? "Save as Draft" : "Create Project"}
        </Button>
      )}
    </div>
  );
};