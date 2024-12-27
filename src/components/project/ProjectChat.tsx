import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Send } from "lucide-react";

interface Message {
  id: string;
  message: string;
  created_at: string;
  user_id: string;
}

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

      setMessages(data || []);
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
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Project Chat</h2>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className="bg-gray-50 rounded-lg p-3"
            >
              <p className="text-sm text-gray-900">{message.message}</p>
              <span className="text-xs text-gray-500">
                {new Date(message.created_at).toLocaleTimeString()}
              </span>
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