import { Button } from "@/components/ui/button";
import { Upload, Trash2 } from "lucide-react";

interface FileUploadStepProps {
  file: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: () => void;
}

export const FileUploadStep = ({ file, onFileChange, onRemoveFile }: FileUploadStepProps) => {
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
                  onChange={onFileChange}
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
              onClick={onRemoveFile}
              className="text-red-500 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};