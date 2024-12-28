import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { ArrowLeft, Upload, Trash2 } from "lucide-react";
import { ProjectFormBrandSelect } from "./ProjectFormBrandSelect";

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

      const { data: existingProfile } = await supabase
        .from('profiles')
        .select()
        .eq('id', user.id)
        .single();

      if (!existingProfile) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: user.id,
            email: user.email
          });

        if (profileError) {
          throw profileError;
        }
      }

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
    } catch (error) {
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
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold mb-4">Step 1: Project Details</h2>
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
      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">Step 2: File Upload (Optional)</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              {!file ? (
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-primary hover:text-primary/80"
                    >
                      <span>Upload a file</span>
                      <input
                        id="file-upload"
                        name="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">Any file up to 10MB</p>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">{file.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold mb-4">Step 3: Review</h2>
            <div className="bg-gray-50 p-4 rounded-lg space-y-3">
              <div>
                <span className="font-medium">Project Name:</span> {name}
              </div>
              <div>
                <span className="font-medium">Project Type:</span> {selectedProjectType}
              </div>
              {description && (
                <div>
                  <span className="font-medium">Description:</span> {description}
                </div>
              )}
              <div>
                <span className="font-medium">Brand:</span>{" "}
                {selectedBrand === "movementbrand" ? "MovementBrand" : "Other"}
              </div>
              {file && (
                <div>
                  <span className="font-medium">Attached File:</span> {file.name}
                </div>
              )}
              <div className="flex items-center space-x-2 pt-2">
                <Switch
                  id="draft-toggle"
                  checked={!isDraft}
                  onCheckedChange={(checked) => setIsDraft(!checked)}
                />
                <Label htmlFor="draft-toggle">Publish immediately</Label>
              </div>
            </div>
          </div>
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
