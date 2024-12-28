import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface ReviewStepProps {
  name: string;
  selectedProjectType: string;
  description: string;
  selectedBrand: string;
  file: File | null;
  isDraft: boolean;
  setIsDraft: (isDraft: boolean) => void;
}

export const ReviewStep = ({
  name,
  selectedProjectType,
  description,
  selectedBrand,
  file,
  isDraft,
  setIsDraft,
}: ReviewStepProps) => {
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
};