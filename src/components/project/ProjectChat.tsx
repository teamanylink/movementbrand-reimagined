import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Send, UserRound } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface Message {
  id: string;
  message: string;
  created_at: string;
  user_id: string;
}

// Mock users for the chat
const mockUsers = [
  {
    id: "1",
    avatar: "/lovable-uploads/3d28c59d-ed5d-4676-8112-bcaed14888cf.png",
    name: "Alex"
  },
  {
    id: "2",
    avatar: "/lovable-uploads/be79ceb2-a394-4096-a00b-470f8d078876.png",
    name: "Sam"
  }
];

export const ProjectChat = ({ projectId }: { projectId: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();

  useEffect(() => {
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

      // Add a mock message if there are no messages
      if (!data || data.length === 0) {
        const mockMessage = {
          id: "mock-1",
          message: "Hey, you free for a call this afternoon?",
          created_at: new Date().toISOString(),
          user_id: "mock-user"
        };
        setMessages([mockMessage]);
      } else {
        setMessages(data || []);
      }
    };

    fetchMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel('chat_messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `project_id=eq.${projectId}`,
        },
        (payload) => {
          setMessages((current) => [...current, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [projectId, toast]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const { error } = await supabase
      .from('chat_messages')
      .insert([
        {
          project_id: projectId,
          message: newMessage.trim(),
        },
      ]);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
      return;
    }

    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-[600px]">
      <div className="p-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Project Chat</h2>
        <div className="flex items-center -space-x-2">
          {mockUsers.map((user) => (
            <Avatar key={user.id} className="h-8 w-8 border-2 border-white">
              <AspectRatio ratio={1}>
                <AvatarImage src={user.avatar} alt={user.name} className="object-cover" />
                <AvatarFallback>{user.name[0]}</AvatarFallback>
              </AspectRatio>
            </Avatar>
          ))}
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className="flex items-start gap-3 bg-gray-50 rounded-lg p-3"
            >
              <div className="flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <UserRound className="h-5 w-5 text-gray-500" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">{message.message}</p>
                <span className="text-xs text-gray-500">
                  {new Date(message.created_at).toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <form onSubmit={handleSendMessage} className="p-4 border-t flex gap-2">
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button type="submit" size="icon">
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};