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
  }, [currentUser]);

  useEffect(() => {
    if (props.convId && chats.length > 0) {
      console.log("chats", chats);
      const selectedChat = chats.find((chat) => chat._id === props.convId);
      console.log("selectedChat", selectedChat);
      if (selectedChat) {
        setCurrentChat(selectedChat);
        fetchMessages();
      }
    }
  }, [props.convId, chats]);

  useEffect(() => {
    if (currentChat) {
      fetchMessages();
    }
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
