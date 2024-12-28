import { Files, Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ProjectFilesView = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-lg font-semibold mb-4">Project Files</h2>
      <div className="text-center text-gray-500 py-8">
        <Files className="h-12 w-12 mx-auto mb-4 text-gray-400" />
        <p>No files uploaded yet</p>
        <Button variant="outline" className="mt-4 gap-2 rounded-xl hover:bg-[#F1F0FB]">
          <Paperclip className="h-4 w-4" />
          Upload Files
        </Button>
      </div>
    </div>
  );
};