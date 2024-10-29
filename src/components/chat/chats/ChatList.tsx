import { useState, useEffect } from "react";
import { useChat } from "../../../contexts/ChatContext";
import { IChat } from "../../../interfaces/chat/chats";
import { SearchBar } from "../../searchBar/SearchBar";
import { ChatUserCard } from "./ChatUserCard";
import { useRouter } from "next/navigation";

interface IChatListProps {
  onDeleteChat: () => void;
}

export default function ChatList(props: IChatListProps): JSX.Element {
  /* c8 ignore start */
  const router = useRouter();
  const { chats, currentUser, currentChat, setCurrentChat, refreshChats } = useChat() || {};
  const [searchTerm, setSearchTerm] = useState("");
  const filteredChats = filterChats(searchTerm);

  useEffect(() => {
    filterChats(searchTerm);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chats, searchTerm]);

  function handleSearch(search: string) {
    setSearchTerm(search.toLowerCase());
  }

  function handleSelectChat(chat: IChat) {
    setCurrentChat(chat);
  }

  function filterChats(search: string) {
    const deletedChats = JSON.parse(localStorage.getItem("deletedChats") || "{}");

    const newFilteredChats = chats?.filter(
      (chat) =>
        (chat.UserOneName.toLowerCase().includes(search) || chat.UserTwoName.toLowerCase().includes(search)) &&
        !deletedChats[chat._id]
    );

    return newFilteredChats || [];
  }

  function handleDeleteChat(chatId: string) {
    refreshChats();
    props.onDeleteChat();
  }

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
              handleDeleteChat={handleDeleteChat}
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
