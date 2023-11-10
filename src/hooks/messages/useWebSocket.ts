import { useEffect } from "react";
import { io } from "socket.io-client";
import { ConversationService } from "./useConversationService";
import { MessageService } from "./useMessageService";
import { IMessage } from "../../interfaces/messages/messages";

const NEXT_PUBLIC_BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";
const socket = io(NEXT_PUBLIC_BACKEND_URL);

export function useRecieveMessageService(conversationService: ConversationService, messageService: MessageService) {
  useEffect(() => {
    socket.connect();

    socket.on("RecieveMessage", ({ convId, message }) => {
      if (conversationService.convSelected?.id && convId === conversationService.convSelected?.id) {
        messageService.recieveMessage(message);
      } else {
        conversationService.fetchConversations();
      }
    });

    return () => {
      socket.disconnect();
    };

  }, []);
}
