import { useEffect, useState } from "react";
import { SearchBar } from "../../searchBar/SearchBar";
import { ChatUserCard } from "./ChatUserCard";
import { ConversationService } from "../../../hooks/messages/useConversationService";
import { IChat, IChats } from "../../../interfaces/chat/chats";

export interface ChatListProps {
  chats: IChats;
  changeChat: (chat: IChat) => void;
}

export default function ChatList(props: ChatListProps): JSX.Element {
  const [currentSelected, setCurrentSelected] = useState<number>(0);

  {
    /* c8 ignore start */
  }
  function handleSearch(query: string) {}

  function changeCurrentChat(index: number, chat: IChat) {
    setCurrentSelected(index);
    props.changeChat(chat);
  }

  return (
    <div className="flex flex-col h-full bg-gray-100 shadow-[3px_0_3px_0px_rgba(170,170,170)]">
      <div className="m-6 sm:m-10">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="grid grid-cols-1 gap-3">
        {props.chats.conversations.map((chat, index) => (
          <ChatUserCard
            key={index}
            data={chat}
            handleSelectChat={changeCurrentChat}
            currentSelected={currentSelected}
            index={index}
          />
        ))}
      </div>
    </div>
  );
  {
    /* c8 ignore stop */
  }
}
