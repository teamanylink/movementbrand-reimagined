import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Send, UserRound } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Message {
  id: string;
  message: string;
  user_id: string | null;
  created_at: string;
}

interface MockUser {
  id: number;
  name: string;
  avatar: string;
}

export const ProjectChat = ({ projectId }: { projectId: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('project_id', projectId)
      .order('created_at', { ascending: true });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to load messages",
        variant: "destructive",
      });
      return;
    }

    setMessages(data || []);
  };

  useEffect(() => {
    fetchMessages();
  }, [projectId, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const { error } = await supabase
      .from('chat_messages')
      .insert([{ message: newMessage, project_id: projectId }]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
      return;
    }

    setNewMessage("");
    fetchMessages();
  };

  const mockUsers = [
    {
      id: 1,
      name: "Alex Chen",
      avatar: "/lovable-uploads/89f2ac54-dbad-4de8-89b2-4f8a98396080.png"
    },
    {
      id: 2,
      name: "Sam Wilson",
      avatar: "/lovable-uploads/dcff319f-0927-47c3-bc8f-28a465752bf0.png"
    }
  ];

  return (
    <div className="flex flex-col h-[400px]">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="font-semibold">Project Chat</h2>
        <div className="flex items-center -space-x-2">
          {mockUsers.map((user) => (
            <Avatar 
              key={user.id} 
              className="h-8 w-8 border-2 border-white transition-transform hover:scale-105 hover:z-10 hover:bg-[#F1F0FB] cursor-pointer"
            >
              <AspectRatio ratio={1}>
                <AvatarImage src={user.avatar} alt={user.name} className="object-cover" />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </AspectRatio>
            </Avatar>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex items-start gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={mockUsers[0].avatar} />
              <AvatarFallback>
                <UserRound className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
            <div className="bg-gray-100 rounded-lg p-2 max-w-[80%]">
              <p className="text-sm">{message.message}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Button type="submit" size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};