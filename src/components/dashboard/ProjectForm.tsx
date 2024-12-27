import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

interface ProjectFormProps {
  onBack: () => void;
  onSubmit: () => void;
  selectedProjectType: string;
}

export const ProjectForm = ({ onBack, onSubmit, selectedProjectType }: ProjectFormProps) => {
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast({
        title: "Error",
        description: "Please enter a project name",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Get the current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        throw new Error("User not found");
      }

      // Ensure user has a profile
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select()
        .eq('id', user.id)
        .single();

      // If no profile exists, create one
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

      // Create the project
      const { error: projectError } = await supabase
        .from('projects')
        .insert({
          name,
          description: description.trim() || null,
          project_type: selectedProjectType,
          user_id: user.id,
        });

      if (projectError) {
        throw projectError;
      }

      toast({
        title: "Success",
        description: "Project created successfully!",
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
        <div className="flex justify-end pt-4">
          <Button 
            onClick={onBack}
            variant="outline"
            className="mr-2"
            disabled={isSubmitting}
          >
            Back
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating..." : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};