"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { IConnectedUser } from "../../interfaces/user/user";
import { Socket, io } from "socket.io-client";
import { myFetch } from "../../tools/myFetch";
import ChatList from "../../components/chat/chats/ChatList";
import { IChat, IChats } from "../../interfaces/chat/chats";
import Messages from "../../components/chat/messages/Messages";
import ForumIcon from "@mui/icons-material/Forum";

interface IChatWrapperProps {
  convId: string | undefined;
}

export default function ChatWrapper(props: IChatWrapperProps): JSX.Element {
  const router = useRouter();
  const socket = useRef<Socket | null>(null);
  const [chats, setChats] = useState<IChats>({ chats: [] });
  const [currentChat, setCurrentChat] = useState<IChat>();
  const [currentUser, setCurrentUser] = useState<IConnectedUser>();

  useEffect(() => {
    async function getCurrentUser() {
      if (!localStorage.getItem("user")) {
        router.push("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("user") || "{}"));
      }
    }
    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(process.env.NEXT_PUBLIC_BACKEND_URL || "http://back-dev.leonart-dev.ovh");
      socket.current.emit("add-user", currentUser.user.id);
    }
  }, [currentUser]);

  useEffect(() => {
    async function fetchChats() {
      if (currentUser) {
        const res = await myFetch({ route: `/api/conversations/${currentUser.user.id}`, method: "GET" });
        const data: IChats = res.json;
        setChats(data);
      }
    }
    async function fetchConversationDetails() {
      if (currentUser) {
        if (props.convId !== undefined) {
          const res = await myFetch({ route: `/api/conversations/single/${props.convId}`, method: "GET" });
          const data = res.json;
          handleChatChange(data.chat);
        }
      }
    }

    fetchConversationDetails();
    fetchChats();
  }, [currentUser, props.convId]);

  // useEffect(() => {
  //   if (chats.chats.length > 0) {
  //     setCurrentChat(chats.chats[0]);
  //   }
  // }, [chats]);

  const handleChatChange = (chat: IChat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="flex flex-row page-content-non-scrollable">
      <div className="lg:w-1/3 lg:min-w-[350px] lg:max-w-[500px]">
        <ChatList chats={chats} changeChat={handleChatChange} currentUser={currentUser} />
      </div>
      {props.convId === undefined && currentChat === undefined ? (
        <div className="flex flex-col items-center justify-center w-full h-full gap-4 text-gray-400">
          <ForumIcon sx={{ fontSize: 200 }} />
          <span className="text-2xl font-bold">Bienvenue sur votre messagerie</span>
          <div className="flex flex-col w-1/3 text-center gap-6">
            <span className="text-xl font-medium">
              Pour envoyer un message à un utilisateur, cliquez sur {'"aller à la conversation"'} depuis une commande
              dans l{"'"}onglet Commande
            </span>
            {chats.chats.length > 0 && (
              <span className="text-xl font-medium">
                Pour séléctionner une conversation existante, rien de plus simple, cliquez sur celle-ci dans la liste de
                gauche
              </span>
            )}
          </div>
        </div>
      ) : (
        <>
          {currentChat !== undefined && (
            <Messages currentChat={currentChat} currentUser={currentUser} socket={socket} />
          )}
        </>
      )}
    </div>
  );
}
