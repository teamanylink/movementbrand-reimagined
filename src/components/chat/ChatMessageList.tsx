import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { UserRound } from "lucide-react";
import { Message } from "./types";

interface ChatMessageListProps {
  messages: Message[];
  currentUserId: string | null;
  selectedUser: any;
  formatTime: (date: string) => string;
  messagesEndRef: React.RefObject<HTMLDivElement>;
}

export const ChatMessageList = ({ 
  messages, 
  currentUserId, 
  selectedUser, 
  formatTime,
  messagesEndRef 
}: ChatMessageListProps) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((message) => {
        const isCurrentUser = message.user_id === currentUserId;
        
        return (
          <div 
            key={message.id} 
            className={`flex items-start gap-3 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback className={`${isCurrentUser ? 'bg-purple-100 text-purple-600' : 'bg-blue-100 text-blue-600'}`}>
                {message.user_id === selectedUser?.id 
                  ? selectedUser?.email?.[0]?.toUpperCase() 
                  : currentUserId?.[0]?.toUpperCase() || 
                  <UserRound className="h-4 w-4" />}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1 max-w-[70%]">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>
                  {message.user_id === selectedUser?.id 
                    ? selectedUser?.email?.split('@')[0]
                    : 'You'}
                </span>
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
      <div ref={messagesEndRef} />
    </div>
  );
};