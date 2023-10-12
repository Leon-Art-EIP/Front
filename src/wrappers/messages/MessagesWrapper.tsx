"use client";

import { useEffect, useState } from "react";
import Conversation from "../../components/messages/chatBox/Conversation";
import UserList from "../../components/messages/userList/UserList";
import { IConversation, IConversations } from "../../interfaces/messages/conversations";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useConversationService } from "../../hooks/messages/useConversationService";

export default function MessagesWrapper(): JSX.Element {
  const [showConversation, setShowConversation] = useState(false);
  const windowSize = useWindowSize();
  const conversationService = useConversationService();

  return (
    <div className="flex flex-row page-content-non-scrollable">
      <div className="lg:w-1/3 lg:min-w-[350px] lg:max-w-[500px]">
        {!showConversation && <UserList conversationService={conversationService} />}
      </div>
      {((windowSize.width && windowSize.width > 640) || showConversation) && (
        <Conversation conversationService={conversationService} />
      )}
    </div>
  );
}
