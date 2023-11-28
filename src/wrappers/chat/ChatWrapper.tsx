"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { IConnectedUser } from "../../interfaces/user/user";
import { Socket, io } from "socket.io-client";
import { myFetch } from "../../tools/myFetch";
import ChatList from "../../components/chat/chats/ChatList";
import { IChat, IChats } from "../../interfaces/chat/chats";
import Messages from "../../components/chat/messages/Messages";

export default function ChatWrapper(): JSX.Element {
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
        const res = await myFetch({ route: `/api/chats/${currentUser.user.id}`, method: "GET" });
        const data: IChats = await res.json();
        setChats(data);
      }
    }

    fetchChats();
  }, [currentUser]);

  useEffect(() => {
    if (chats.chats.length > 0) {
      setCurrentChat(chats.chats[0]);
    }
  }, [chats]);

  const handleChatChange = (chat: IChat) => {
    setCurrentChat(chat);
  };

  return (
    <div className="flex flex-row page-content-non-scrollable">
      <div className="lg:w-1/3 lg:min-w-[350px] lg:max-w-[500px]">
        <ChatList chats={chats} changeChat={handleChatChange} currentUser={currentUser} />
      </div>
      {currentChat === undefined ? (
        <></>
      ) : (
        <Messages currentChat={currentChat} currentUser={currentUser} socket={socket} />
      )}
    </div>
  );
}
