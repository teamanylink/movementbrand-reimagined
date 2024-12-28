import { Files } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useState, useRef } from "react";
import { FileUploadSection } from "./files/FileUploadSection";
import { FilesList } from "./files/FilesList";

interface ProjectFilesViewProps {
  projectId: string;
}

export const ProjectFilesView = ({ projectId }: ProjectFilesViewProps) => {
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    
    const file = e.target.files[0];
    setFile(file);
    setIsUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const filePath = `${projectId}/${crypto.randomUUID()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('project-files')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

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
      setFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDelete = async (filePath: string, fileId: string) => {
    try {
      // First, delete chat messages that reference this file
      const { error: chatError } = await supabase
        .from('chat_messages')
        .delete()
        .eq('file_id', fileId);

      if (chatError) throw chatError;

      // Then delete from storage
      const { error: storageError } = await supabase.storage
        .from('project-files')
        .remove([filePath]);

      if (storageError) throw storageError;

      // Finally delete from database
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
        .createSignedUrl(filePath, 3600);

      if (data?.signedUrl) {
        window.open(data.signedUrl, '_blank');
      }
    } catch (error) {
      console.error("Error getting file URL:", error);
      toast({
        title: "Error",
        description: "Failed to open file. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Project Files</h2>
      
      {/* File Upload Section */}
      <div className="mb-6">
        <FileUploadSection 
          file={file}
          onFileChange={handleFileChange}
        />
      </div>

      {/* Files List */}
      {files && files.length > 0 ? (
        <FilesList 
          files={files}
          onFileClick={handleFileClick}
          onDeleteFile={handleDelete}
        />
      ) : (
        <div className="text-center text-gray-500 py-8">
          <Files className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <p>No files uploaded yet</p>
        </div>
      )}
    </div>
  );
};