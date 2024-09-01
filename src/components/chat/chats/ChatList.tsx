import { useState } from "react";
import { useChat } from "../../../contexts/ChatContext";
import { IChat } from "../../../interfaces/chat/chats";
import { SearchBar } from "../../searchBar/SearchBar";
import { ChatUserCard } from "./ChatUserCard";

export default function ChatList(): JSX.Element {
  /* c8 ignore start */
  const { chats, currentUser, currentChat, setCurrentChat } = useChat() || {};
  const [searchTerm, setSearchTerm] = useState("");

  function handleSearch(search: string) {
    setSearchTerm(search.toLowerCase());
  }

  function handleSelectChat(chat: IChat) {
    setCurrentChat(chat);
  }

  const filteredChats = chats?.filter(
    (chat) => chat.UserOneName.toLowerCase().includes(searchTerm) || chat.UserTwoName.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="bg-background-hl flex flex-col h-full shadow-[2px_0_3px_0px_rgba(170,170,170)]">
      <div className="m-6 sm:m-10">
        <SearchBar onSearch={handleSearch} />
      </div>
      {filteredChats && filteredChats.length > 0 ? (
        <div className="grid grid-cols-1 gap-3">
          {filteredChats.map((chat, index) => (
            <ChatUserCard
              key={chat._id}
              chat={chat}
              currentUser={currentUser}
              handleSelectChat={handleSelectChat}
              currentSelected={currentChat}
            />
          ))}
        </div>
      ) : (
        <div className="flex justify-center w-full">
          <span className="text-sm italic">Aucune conversation</span>
        </div>
      )}
    </div>
  );
}
/* c8 ignore stop */
