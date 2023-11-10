"use client";

import { useEffect, useState } from "react";
import Conversation from "../../components/messages/chatBox/Conversation";
import UserList from "../../components/messages/userList/UserList";
import { IConversation, IConversations } from "../../interfaces/messages/conversations";
import { useConversationService } from "../../hooks/messages/useConversationService";
import { useMessageService } from "../../hooks/messages/useMessageService";
import { useRecieveMessageService } from "../../hooks/messages/useWebSocket";

export default function MessagesWrapper(): JSX.Element {
  const conversationService = useConversationService();
  const messageService = useMessageService(conversationService);
  useRecieveMessageService(conversationService, messageService);

  return (
    <div className="flex flex-row page-content-non-scrollable">
      <div className="lg:w-1/3 lg:min-w-[350px] lg:max-w-[500px]">
        <UserList conversationService={conversationService} />
      </div>
      <Conversation conversationService={conversationService} messageService={messageService} />
    </div>
  );
}
