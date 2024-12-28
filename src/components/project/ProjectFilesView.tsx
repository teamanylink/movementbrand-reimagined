import { Files, Paperclip, Trash2, FileIcon, Image as ImageIcon, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProjectFilesViewProps {
  projectId: string;
}

export const ProjectFilesView = ({ projectId }: ProjectFilesViewProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{ url: string; type: string; name: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: files, refetch: refetchFiles } = useQuery({
    queryKey: ['project-files', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('project_files')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: false });

      if (error) {
        toast({
          title: "Error",
          description: "Failed to load project files",
          variant: "destructive",
        });
        throw error;
      }

      return data;
    },
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    
    const file = e.target.files[0];
    setIsUploading(true);

    try {
      // Upload file to storage
      const fileExt = file.name.split('.').pop();
      const filePath = `${projectId}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('project-files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // Create file record in database
      const { error: dbError } = await supabase
        .from('project_files')
        .insert({
          project_id: projectId,
          file_path: filePath,
          file_name: file.name
        });

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "File uploaded successfully",
      });
      
      refetchFiles();
    } catch (error: any) {
      console.error("Error uploading file:", error);
      toast({
        title: "Error",
        description: "Failed to upload file. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      // Reset the input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = async (filePath: string, fileId: string) => {
    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('project-files')
        .remove([filePath]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('project_files')
        .delete()
        .eq('id', fileId);

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "File deleted successfully",
      });
      
      refetchFiles();
    } catch (error: any) {
      console.error("Error deleting file:", error);
      toast({
        title: "Error",
        description: "Failed to delete file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleFileClick = async (filePath: string, fileName: string) => {
    try {
      const { data } = await supabase.storage
        .from('project-files')
        .createSignedUrl(filePath, 3600); // URL valid for 1 hour

      if (data?.signedUrl) {
        const fileType = fileName.split('.').pop()?.toLowerCase();
        const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileType || '');
        
        setSelectedFile({
          url: data.signedUrl,
          type: isImage ? 'image' : 'other',
          name: fileName
        });
      }
    } catch (error) {
      console.error("Error getting file URL:", error);
      toast({
        title: "Error",
        description: "Failed to preview file. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Project Files</h2>
      
      {/* File Upload Section */}
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 mb-6">
        <div className="text-center">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
          <Button 
            variant="outline" 
            className="gap-2 rounded-xl hover:bg-[#F1F0FB]"
            disabled={isUploading}
            onClick={handleUploadClick}
          >
            <Paperclip className="h-4 w-4" />
            {isUploading ? "Uploading..." : "Upload Files"}
          </Button>
        </div>
      </div>

      {/* Files List */}
      {files && files.length > 0 ? (
        <div className="space-y-3">
          {files.map((file) => {
            const fileType = file.file_name.split('.').pop()?.toLowerCase();
            const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileType || '');
            
            return (
              <div
                key={file.id}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                onClick={() => handleFileClick(file.file_path, file.file_name)}
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
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          <Files className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p>No files uploaded yet</p>
        </div>
      )}

      {/* File Preview Dialog */}
      <Dialog open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedFile?.name}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {selectedFile?.type === 'image' ? (
              <img 
                src={selectedFile.url} 
                alt={selectedFile.name}
                className="max-w-full rounded-lg"
              />
            ) : (
              <div className="text-center p-8">
                <FileIcon className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <p className="mb-4">This file type cannot be previewed</p>
                <Button asChild>
                  <a href={selectedFile?.url} download target="_blank" rel="noopener noreferrer">
                    Download File
                  </a>
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};