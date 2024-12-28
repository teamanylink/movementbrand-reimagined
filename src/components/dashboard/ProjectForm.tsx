import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { ProjectDetailsStep } from "./project-form/ProjectDetailsStep";
import { FileUploadStep } from "./project-form/FileUploadStep";
import { ReviewStep } from "./project-form/ReviewStep";

interface ProjectFormProps {
  onBack: () => void;
  onSubmit: () => void;
  selectedProjectType: string;
}

export const ProjectForm = ({ onBack, onSubmit, selectedProjectType }: ProjectFormProps) => {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("movementbrand");
  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDraft, setIsDraft] = useState(true);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
  };

  const handleNext = () => {
    if (step === 1 && !name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a project name",
        variant: "destructive",
      });
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step === 1) {
      onBack();
    } else {
      setStep(step - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    try {
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error("User not found");
      }

      // Create the project
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert({
          name,
          description: description.trim() || null,
          project_type: selectedProjectType,
          user_id: user.id,
          is_draft: isDraft,
          brand: selectedBrand
        })
        .select()
        .single();

      if (projectError || !project) {
        throw projectError;
      }

      // Handle file upload if a file was selected
      if (file && project.id) {
        const fileExt = file.name.split('.').pop();
        const filePath = `${project.id}/${crypto.randomUUID()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('project-files')
          .upload(filePath, file);

        if (uploadError) {
          throw uploadError;
        }

        const { error: fileError } = await supabase
          .from('project_files')
          .insert({
            project_id: project.id,
            file_path: filePath,
            file_name: file.name
          });

        if (fileError) {
          throw fileError;
        }
      }

      toast({
        title: "Success",
        description: isDraft ? "Project saved as draft!" : "Project created successfully!",
      });
      onSubmit();
    } catch (error: any) {
      console.error("Error creating project:", error);
      toast({
        title: "Error",
        description: "Failed to create project. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <ProjectDetailsStep
            name={name}
            setName={setName}
            description={description}
            setDescription={setDescription}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
          />
        );
      case 2:
        return (
          <FileUploadStep
            file={file}
            onFileChange={handleFileChange}
            onRemoveFile={removeFile}
          />
        );
      case 3:
        return (
          <ReviewStep
            name={name}
            selectedProjectType={selectedProjectType}
            description={description}
            selectedBrand={selectedBrand}
            file={file}
            isDraft={isDraft}
            setIsDraft={setIsDraft}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-xl mx-auto w-full space-y-6">
      <div className="space-y-4">
        {renderStepContent()}
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
      </div>
    </div>
  );
};