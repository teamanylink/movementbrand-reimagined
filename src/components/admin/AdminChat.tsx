import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Send, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

interface Message {
  id: string;
  message: string;
  admin_id: string | null;
  user_id: string | null;
  created_at: string;
}

interface AdminChatProps {
  selectedUserId: string | null;
  selectedUserEmail: string | null;
}

export const AdminChat = ({ selectedUserId, selectedUserEmail }: AdminChatProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    if (selectedUserId) {
      fetchMessages();
    }
  }, [selectedUserId]);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('admin_chat_messages')
      .select('*')
      .or(`user_id.eq.${selectedUserId},admin_id.eq.${selectedUserId}`)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUserId) return;

    const { error } = await supabase
      .from('admin_chat_messages')
      .insert([{
        message: newMessage,
        user_id: selectedUserId,
        admin_id: (await supabase.auth.getUser()).data.user?.id
      }]);

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

  if (!selectedUserId) {
    return (
      <Card className="h-[600px] flex items-center justify-center text-gray-500">
        Select a user to start chatting
      </Card>
    );
  }

  return (
    <Card className="flex flex-col h-[600px]">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="font-semibold">Chat with {selectedUserEmail}</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex items-start gap-2">
            <Avatar className="h-8 w-8">
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
    </Card>
  );
};