import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

interface UsersListProps {
  onSelectUser: (userId: string) => void;
  selectedUserId: string | null;
}

export const UsersList = ({ onSelectUser, selectedUserId }: UsersListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: users } = useQuery({
    queryKey: ['chat-users'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .neq('id', user.id);
      
      if (error) throw error;
      return data || [];
    },
  });

  const filteredUsers = users?.filter(user => 
    user.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search users" 
            className="pl-9 h-9 bg-gray-50 border-none text-sm" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredUsers?.map((user) => (
          <button
            key={user.id}
            onClick={() => onSelectUser(user.id)}
            className={`w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors ${
              selectedUserId === user.id ? 'bg-gray-50' : ''
            }`}
          >
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-purple-100 text-purple-600">
                {user.email?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0 text-left">
              <p className="font-medium text-gray-900 truncate">
                {user.email?.split('@')[0]}
              </p>
              <p className="text-sm text-gray-500 truncate">
                {user.email}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};