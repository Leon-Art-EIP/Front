"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { IChat } from "../interfaces/chat/chats";
import { IMessage } from "../interfaces/chat/messages";
import { IConnectedUser } from "../interfaces/user/user";
import { myFetch } from "../tools/myFetch";

interface ChatContextType {
  chats: IChat[];
  currentChat: IChat | undefined;
  currentUser: IConnectedUser | undefined;
  setCurrentChat: (chat: IChat) => void;
  messages: IMessage[];
  sendMessage: (message: string, to: string) => void;
  refreshChats: () => Promise<void>;
  fetchMessages: () => Promise<void>;
  fetchChatDetails: (chatId: string) => Promise<void>;
}

const defaultValue: ChatContextType = {
  chats: [],
  currentChat: undefined,
  currentUser: undefined,
  setCurrentChat: () => {},
  messages: [],
  sendMessage: () => {},
  refreshChats: async () => {},
  fetchMessages: async () => {},
  fetchChatDetails: async () => {},
};

const ChatContext = createContext<ChatContextType>(defaultValue);

export const useChat = () => useContext(ChatContext);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const socketRef = useRef<Socket | null>(null);

  const [chats, setChats] = useState<IChat[]>([]);
  const [currentChat, setCurrentChat] = useState<IChat | undefined>();
  const currentChatRef = useRef(currentChat);
  const [currentUser, setCurrentUser] = useState<IConnectedUser>();
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      router.push("/login");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("user") || "{}"));
    }
  }, []);

  useEffect(() => {
    socketRef.current = io(process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000");
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  useEffect(() => {
    currentChatRef.current = currentChat;
  }, [currentChat]);

  useEffect(() => {
    if (currentUser && socketRef.current) {
      socketRef.current.emit("add-user", currentUser.user.id);

      socketRef.current.on("msg-receive", (message: IMessage) => {
        console.log("senderId", message.senderId);
        console.log("currentChatRef", currentChatRef.current);
        if (message.senderId === currentChatRef.current?.UserOneId || message.senderId === currentChatRef.current?.UserTwoId) {
          setMessages((prevMessages) => [...prevMessages, message]);
        } else {
          refreshChats();
        }
      });
    }
  }, [currentUser]);

  async function sendMessage(message: string, to: string) {
    if (currentUser && currentChat && socketRef.current) {
      socketRef.current.emit("send-msg", {
        to: to,
        from: currentUser?.user.id,
        convId: currentChat._id,
        msg: message,
      });
      await myFetch({
        route: "/api/chats/messages/new",
        method: "POST",
        body: JSON.stringify({
          convId: currentChat._id,
          contentType: "text",
          userId: currentUser?.user.id,
          content: message,
        }),
      });
      const newMessages = [...messages];
      newMessages.push({
        id: newMessages.length + 1,
        senderId: currentUser.user.id || "",
        contentType: "text",
        content: message,
        dateTime: new Date().toISOString(),
        read: true,
      });
      setMessages(newMessages);
    }
  }

  async function refreshChats() {
    if (currentUser) {
      const res = await myFetch({ route: `/api/conversations/${currentUser!.user.id}`, method: "GET" });
      const data = res.json;
      setChats(data.chats);
      markChatAsReadIfOpened();
    }
  }

  function markChatAsReadIfOpened() {
    if (currentChat) {
      const updatedChats = chats.map(chat => {
        if (chat._id === currentChat._id) {
          return { ...chat, unreadMessages: false };
        }
        return chat;
      });
    
      setChats(updatedChats);
    }
  }

  async function fetchMessages() {
    if (currentChat) {
      const res = await myFetch({ route: `/api/chats/messages/${currentChat._id}`, method: "GET" });
      if (res.ok) {
        const data = res.json;
        setMessages(data.messages);
        markChatAsReadIfOpened();
      }
    }
  }

  async function fetchChatDetails(chatId: string) {
    const res = await myFetch({ route: `/api/conversations/single/${chatId}`, method: "GET" });
    const data = res.json;
    setCurrentChat(data.chat);
  }

  return (
    <ChatContext.Provider
      value={{
        chats,
        currentChat,
        currentUser,
        setCurrentChat,
        messages,
        sendMessage,
        refreshChats,
        fetchMessages,
        fetchChatDetails,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
