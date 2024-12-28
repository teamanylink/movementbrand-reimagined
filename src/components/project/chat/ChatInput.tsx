import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface ChatInputProps {
  newMessage: string;
  setNewMessage: (message: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const ChatInput = ({ newMessage, setNewMessage, handleSubmit }: ChatInputProps) => {
  return (
    <div className="border-t p-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <Button 
          type="submit" 
          size="icon"
          className="rounded-full bg-purple-500 hover:bg-purple-600"
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};