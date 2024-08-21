"use client";

import { useEffect } from "react";
import ChatList from "../../components/chat/chats/ChatList";
import { useChat } from "../../contexts/ChatContext";

import ForumIcon from "@mui/icons-material/Forum";
import Messages from "../../components/chat/messages/Messages";

interface IChatWrapperProps {
  convId: string | undefined;
}

export default function ChatWrapper(props: IChatWrapperProps): JSX.Element {
  const { chats, currentChat, currentUser, setCurrentChat, refreshChats, fetchMessages } = useChat();

  useEffect(() => {
    if (currentUser) {
      refreshChats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  useEffect(() => {
    if (props.convId && chats.length > 0 && !currentChat) {
      const selectedChat = chats.find((chat) => chat.id === props.convId);
      if (selectedChat) {
        setCurrentChat(selectedChat);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.convId, chats]);

  useEffect(() => {
    if (currentChat) {
      fetchMessages();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentChat]);

  return (
    <div className="bg-background flex flex-row page-content-non-scrollable">
      <div className="lg:w-1/3 lg:min-w-[350px] lg:max-w-[500px]">
        <ChatList />
      </div>
      {!currentChat ? (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4 text-gray-400">
          <ForumIcon sx={{ fontSize: 200 }} />
          <span className="text-2xl font-bold">Bienvenue sur votre messagerie</span>
          <div className="flex flex-col w-1/3 text-center gap-6">
            <span className="text-xl font-medium">
              Pour envoyer un message à un utilisateur, cliquez sur {'"aller à la conversation"'} depuis une commande
              dans l{"'"}onglet Commande
            </span>
            {chats.length > 0 && (
              <span className="text-xl font-medium">
                Pour séléctionner une conversation existante, rien de plus simple, cliquez sur celle-ci dans la liste de
                gauche
              </span>
            )}
          </div>
        </div>
      ) : (
        <Messages />
      )}
    </div>
  );
}
