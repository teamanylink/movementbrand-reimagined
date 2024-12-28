import { UsersList } from "./UsersList";
import { ChatMessages } from "./ChatMessages";
import { useState } from "react";

export const ChatLayout = () => {
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);

  return (
    <div className="flex h-[calc(100vh-72px)]">
      <div className="w-80 border-r bg-white">
        <UsersList onSelectUser={setSelectedUserId} selectedUserId={selectedUserId} />
      </div>
      <div className="flex-1">
        {selectedUserId ? (
          <ChatMessages userId={selectedUserId} />
        ) : (
          <div className="flex h-full items-center justify-center text-gray-500">
            Select a user to start chatting
          </div>
        )}
      </div>
    </div>
  );
};