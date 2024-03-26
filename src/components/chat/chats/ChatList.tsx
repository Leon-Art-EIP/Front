import { useState } from "react";
import { IChat, IChats } from "../../../interfaces/chat/chats";
import { IConnectedUser } from "../../../interfaces/user/user";
import { SearchBar } from "../../searchBar/SearchBar";
import { ChatUserCard } from "./ChatUserCard";

export interface ChatListProps {
  chats: IChats;
  changeChat: (chat: IChat) => void;
  currentUser: IConnectedUser | undefined;
}

export default function ChatList(props: ChatListProps): JSX.Element {
  const [currentSelected, setCurrentSelected] = useState<number>();

  {
    /* c8 ignore start */
  }
  function handleSearch(query: string) {}

  function changeCurrentChat(index: number, chat: IChat) {
    setCurrentSelected(index);
    props.changeChat(chat);
  }

  return (
    <div className="bg-background-hl flex flex-col h-full shadow-[2px_0_3px_0px_rgba(170,170,170)]">
      <div className="m-6 sm:m-10">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="grid grid-cols-1 gap-3">
        {props.chats.chats.map((chat, index) => (
          <ChatUserCard
            key={index}
            data={chat}
            currentUser={props.currentUser}
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
