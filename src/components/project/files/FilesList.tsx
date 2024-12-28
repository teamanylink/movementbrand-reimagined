import { Button } from "@/components/ui/button";
import { FileText, ImageIcon, Trash2 } from "lucide-react";
import { useState } from "react";

interface File {
  id: string;
  file_name: string;
  file_path: string;
  created_at: string;
}

interface FilesListProps {
  files: File[];
  onFileClick: (filePath: string, fileName: string) => void;
  onDeleteFile: (filePath: string, fileId: string) => void;
}

export const FilesList = ({ files, onFileClick, onDeleteFile }: FilesListProps) => {
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const handleDelete = async (filePath: string, fileId: string) => {
    setIsDeleting(fileId);
    await onDeleteFile(filePath, fileId);
    setIsDeleting(null);
  };

  return (
    <div className="space-y-3">
      {files.map((file) => {
        const fileType = file.file_name.split('.').pop()?.toLowerCase();
        const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileType || '');
        
        return (
          <div
            key={file.id}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            onClick={() => onFileClick(file.file_path, file.file_name)}
          >
            <div className="flex items-center space-x-3">
              {isImage ? (
                <ImageIcon className="h-5 w-5 text-blue-500" />
              ) : (
                <FileText className="h-5 w-5 text-gray-400" />
              )}
              <div>
                <p className="text-sm font-medium text-gray-700">{file.file_name}</p>
                <p className="text-xs text-gray-500">
                  {new Date(file.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(file.file_path, file.id);
              }}
              className="text-red-500 hover:text-red-700"
              disabled={isDeleting === file.id}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      })}
    </div>
  );
};