import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { Send, UserRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUserId(user.id);
      }
    };
    getCurrentUser();
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      fetchMessages();
      subscribeToMessages();
    }
  }, [selectedUserId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
    setTimeout(scrollToBottom, 100);
  };

  const subscribeToMessages = () => {
    const channel = supabase
      .channel('admin-chat')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'admin_chat_messages',
          filter: `user_id=eq.${selectedUserId}`,
        },
        (payload) => {
          setMessages(current => [...current, payload.new as Message]);
          scrollToBottom();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedUserId || !currentUserId) return;

    // Create optimistic message
    const optimisticMessage: Message = {
      id: crypto.randomUUID(),
      message: newMessage,
      admin_id: currentUserId,
      user_id: selectedUserId,
      created_at: new Date().toISOString(),
    };

    // Add optimistic message to state
    setMessages(current => [...current, optimisticMessage]);
    setNewMessage("");
    scrollToBottom();

    const { error } = await supabase
      .from('admin_chat_messages')
      .insert([{
        message: newMessage,
        user_id: selectedUserId,
        admin_id: currentUserId
      }]);

    if (error) {
      // Remove optimistic message on error
      setMessages(current => current.filter(msg => msg.id !== optimisticMessage.id));
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
      return;
    }
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
        {messages.map((message) => {
          const isCurrentUser = message.admin_id === currentUserId;
          
          return (
            <div 
              key={message.id} 
              className={`flex items-start gap-3 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className={`${isCurrentUser ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                  <UserRound className="h-4 w-4" />
                </AvatarFallback>
              </Avatar>
              <div 
                className={`rounded-2xl p-3 ${
                  isCurrentUser 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.message}</p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

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
    </Card>
  );
};