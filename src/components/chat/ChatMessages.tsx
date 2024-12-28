import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";
import { UserRound } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { ChatMessageList } from "./ChatMessageList";
import { ChatInput } from "./ChatInput";
import { Message } from "./types";

export const ChatMessages = ({ userId }: { userId: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { data: selectedUser } = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

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
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('admin_chat_messages')
        .select('*')
        .or(`user_id.eq.${userId},admin_id.eq.${userId}`)
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
      scrollToBottom();
    };

    fetchMessages();

    const channel = supabase
      .channel('chat-messages')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'admin_chat_messages',
          filter: `user_id=eq.${userId}`,
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
  }, [userId, toast]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUserId) return;

    // Create optimistic message
    const optimisticMessage: Message = {
      id: crypto.randomUUID(),
      message: newMessage,
      user_id: currentUserId,
      created_at: new Date().toISOString(),
    };

    // Add optimistic message to state
    setMessages(current => [...current, optimisticMessage]);
    setNewMessage("");
    scrollToBottom();

    // Send message to server
    const { error } = await supabase
      .from('admin_chat_messages')
      .insert([{ 
        message: newMessage, 
        user_id: currentUserId,
        admin_id: userId
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

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-purple-100 text-purple-600">
              {selectedUser?.email?.charAt(0).toUpperCase() || <UserRound className="h-4 w-4" />}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold">{selectedUser?.email?.split('@')[0]}</h2>
            <p className="text-sm text-gray-500">{selectedUser?.email}</p>
          </div>
        </div>
      </div>

      <ChatMessageList 
        messages={messages}
        currentUserId={currentUserId}
        selectedUser={selectedUser}
        formatTime={formatTime}
        messagesEndRef={messagesEndRef}
      />

      <ChatInput 
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};