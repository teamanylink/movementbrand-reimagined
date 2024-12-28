import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface ProjectFormBrandSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const ProjectFormBrandSelect = ({ value, onChange }: ProjectFormBrandSelectProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="brand-select">Brand</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="brand-select" className="w-[200px]">
          <SelectValue placeholder="Select a brand" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="movementbrand">MovementBrand</SelectItem>
          <SelectItem value="other">Other</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};