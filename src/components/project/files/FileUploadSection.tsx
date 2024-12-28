import { Upload } from "lucide-react";

interface FileUploadSectionProps {
  file: File | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileUploadSection = ({ file, onFileChange }: FileUploadSectionProps) => {
  return (
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
                type="text"
                className="sr-only"
                onChange={onFileChange}
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs leading-5 text-gray-600">Any file up to 10MB</p>
        </div>
      ) : (
        <div className="text-sm text-gray-500">{file.name}</div>
      )}
    </div>
  );
};