import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Send, UserRound, Paperclip } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  id: string;
  message: string;
  user_id: string | null;
  created_at: string;
}

export const ProjectChat = ({ projectId }: { projectId: string }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCurrentUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setCurrentUserId(user.id);
      }
    };
    getCurrentUser();
  }, []);

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*, profiles(email)')
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
    if (!newMessage.trim() || !currentUserId) return;

    const { error } = await supabase
      .from('chat_messages')
      .insert([{ 
        message: newMessage, 
        project_id: projectId,
        user_id: currentUserId
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

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div className="flex flex-col h-[600px]">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="font-semibold">Project Chat</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.map((message) => {
          const isCurrentUser = message.user_id === currentUserId;
          return (
            <div 
              key={message.id} 
              className={`flex items-start gap-3 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className={`${isCurrentUser ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                  {(message as any).profiles?.email?.[0]?.toUpperCase() || <UserRound className="h-4 w-4" />}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1 max-w-[70%]">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{(message as any).profiles?.email?.split('@')[0]}</span>
                  <span>{formatTime(message.created_at)}</span>
                </div>
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
            </div>
          );
        })}
      </div>

      <div className="border-t p-4">
        <form onSubmit={handleSubmit} className="flex gap-2">
          <div className="flex-1 flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <Button 
              type="button" 
              size="icon" 
              variant="outline"
              className="rounded-full hover:bg-purple-50 hover:text-purple-500"
            >
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button 
              type="submit" 
              size="icon"
              className="rounded-full bg-purple-500 hover:bg-purple-600"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};