import { UsersList } from "./UsersList";
import { ChatMessages } from "./ChatMessages";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ChatLayout = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [showUsersList, setShowUsersList] = useState(true);

  const handleSelectUser = (userId: string) => {
    setSelectedUserId(userId);
    // On mobile, hide the users list when a user is selected
    if (window.innerWidth < 768) {
      setShowUsersList(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-72px)]">
      {/* Users List - Hidden on mobile when chat is open */}
      <div className={`${
        !showUsersList ? 'hidden md:block' : ''
      } w-full md:w-80 border-r bg-white`}>
        <UsersList 
          onSelectUser={handleSelectUser} 
          selectedUserId={selectedUserId} 
        />
      </div>

      {/* Chat Messages */}
      <div className={`${
        showUsersList ? 'hidden md:flex' : 'flex'
      } flex-1 flex-col`}>
        {selectedUserId ? (
          <>
            <div className="md:hidden p-2 border-b">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowUsersList(true)}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to users
              </Button>
            </div>
            <div className="flex-1">
              <ChatMessages userId={selectedUserId} />
            </div>
          </>
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};