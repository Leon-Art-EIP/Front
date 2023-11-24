import { useEffect } from "react";
import { SearchBar } from "../../searchBar/SearchBar";
import { UserCard } from "./UserCard";
import { ConversationService } from "../../../hooks/messages/useConversationService";

export interface UserListProps {
  conversationService: ConversationService;
}

export default function UserList(props: UserListProps): JSX.Element {
  {/* c8 ignore start */}
  function handleSearch(query: string) {
    props.conversationService.filterConversations(query);
  }

  function handleSelectConv(id: number) {
    props.conversationService.selectConversation(id);
  }

  return (
    <div className="flex flex-col h-full bg-gray-100 shadow-[3px_0_3px_0px_rgba(170,170,170)]">
      <div className="m-6 sm:m-10">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="grid grid-cols-1 gap-3">
        {props.conversationService.filteredConversations.conversations.map((conversation) => (
          <UserCard
            key={conversation.id}
            data={conversation}
            handleSelectConv={handleSelectConv}
            selected={props.conversationService.convSelected?.id === conversation.id}
          />
        ))}
      </div>
    </div>
  );
  {/* c8 ignore stop */}
}
